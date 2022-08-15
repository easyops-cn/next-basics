import React, {
  type ChangeEvent,
  useCallback,
  useMemo,
  useState,
  type ReactElement,
  createContext,
  useContext,
  useEffect,
} from "react";
import { Input } from "antd";
import { get, isMatch, pick } from "lodash";
import classNames from "classnames";
import { SearchOutlined } from "@ant-design/icons";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import { useWorkbenchTreeContext } from "./WorkbenchTreeContext";
import {
  useWorkbenchTreeDndContext,
  dragStatusEnum,
} from "./WorkbenchTreeDndContext";
import type { WorkbenchNodeData } from "./interfaces";
import { WorkbenchMiniActionBar } from "./WorkbenchMiniActionBar";
import { WorkbenchTextIcon } from "./WorkbenchTextIcon";
import { looseCheckIfOfComputed } from "@next-core/brick-kit";

import styles from "./WorkbenchTree.module.css";
import { WorkbenchTreeDndContext } from "./WorkbenchTreeDndContext";
import { setDragImage } from "../../workbench-component-select/WorkbenchComponentSelect";

const treeLevelPadding = 10;
const borderStyle = "0 0 0 1px #ba6d30";

export interface dropEmitProps {
  nodes: WorkbenchNodeData[];
  curNode: WorkbenchNodeData;
  overNode: WorkbenchNodeData;
  status: dragStatusEnum;
}

export interface WorkbenchTreeProps {
  nodes: WorkbenchNodeData[];
  placeholder?: string;
  searchPlaceholder?: string;
  noSearch?: boolean;
  allowDrag?: boolean;
  allowDragToRoot?: boolean;
  allowDragToInside?: boolean;
  dropEmit?: (detail: dropEmitProps) => void;
}

export interface TreeListProps {
  nodes: WorkbenchNodeData[];
  level: number;
}

const SearchingContext = createContext(false);

export function WorkbenchTree({
  nodes,
  placeholder,
  searchPlaceholder,
  noSearch,
  allowDragToRoot,
  allowDragToInside,
  dropEmit,
}: WorkbenchTreeProps): ReactElement {
  const [q, setQ] = useState<string>(null);
  const [isDragging, setIsDragging] = useState<boolean>();
  const [curNode, setCurNode] = useState<WorkbenchNodeData>();
  const [curElement, setCurElement] = useState<HTMLElement>();
  const [overNode, setOverNode] = useState<WorkbenchNodeData>();
  const [overElement, setOverElement] = useState<HTMLElement>();
  const [overStatus, setOverStatus] = useState<dragStatusEnum>();
  const { nodeKey, onBrickDrop } = useWorkbenchTreeContext();

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQ(event.target.value);
    },
    []
  );

  const { matchNode } = useWorkbenchTreeContext();

  const trimmedLowerQ = q?.trim().toLowerCase();
  const filteredNodes = useMemo(() => {
    if (noSearch || !trimmedLowerQ || !nodes) {
      return nodes;
    }
    const walk = (node: WorkbenchNodeData): boolean => {
      node.matchedSelf = matchNode(node, trimmedLowerQ);
      const hasMatchedChildren = node.children?.map(walk).includes(true);
      node.matched = node.matchedSelf || hasMatchedChildren;
      return node.matched;
    };
    nodes.forEach(walk);
    return nodes.slice();
  }, [noSearch, trimmedLowerQ, nodes, matchNode]);

  const findDragParent = (element: HTMLElement, equal = true): HTMLElement => {
    let node = element;
    while (node) {
      if (
        node.draggable &&
        (equal || node !== element) &&
        node.tagName !== "A"
      ) {
        return node;
      }
      node = node.parentElement;
    }
  };

  const findNode = (
    nodes: WorkbenchNodeData[],
    id: string,
    nodeKey: string
  ): WorkbenchNodeData => {
    return nodes.find((item) => {
      if ((item.data as Record<string, unknown>)[nodeKey] === id) {
        return item;
      }
      if (item.children) {
        return findNode(item.children, id, nodeKey);
      }
    });
  };

  const getDragState = (
    e: React.DragEvent<HTMLElement>
  ): {
    element: HTMLElement;
    node: WorkbenchNodeData;
    status: dragStatusEnum;
  } => {
    const element = findDragParent(e.target as HTMLElement);
    const id = element.dataset.uid;
    if (element === curElement || id.includes(":")) {
      return;
    }
    const { top, bottom } = element.getBoundingClientRect();
    let status: dragStatusEnum;
    const repair = allowDragToInside ? 5 : 10;
    if (e.clientY < top + repair) {
      status = dragStatusEnum.top;
    } else if (e.clientY > bottom - repair) {
      status = dragStatusEnum.bottom;
    } else {
      status = allowDragToInside ? dragStatusEnum.inside : null;
    }

    return {
      element,
      node: findNode(nodes, id, nodeKey),
      status,
    };
  };

  const handleOnDragStart = (
    e: React.DragEvent,
    node: WorkbenchNodeData
  ): void => {
    setIsDragging(true);
    const element = e.target as HTMLElement;
    setDragImage(e, element.innerText);
    setCurElement(element);
    setCurNode(node);
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLElement>): void => {
    e.preventDefault();
    if (!isDragging) return;
    if ((e.target as HTMLElement).className === "workbenchTree-placeholder-dom")
      return;
    const dom = getDragState(e);
    if (dom && !curElement?.contains(dom.element)) {
      setOverElement(dom.element);
      setOverNode(dom.node);
      setOverStatus(dom.status);
    }
  };

  const handleOnDragEnd = (): void => {
    setCurElement(null);
    setOverElement(null);
    setOverNode(null);
    setOverStatus(null);
    setIsDragging(false);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLElement>): void => {
    if (!isDragging) return;
    if (onBrickDrop) {
      let parentElement = overElement;
      if ([dragStatusEnum.top, dragStatusEnum.bottom].includes(overStatus)) {
        parentElement = findDragParent(parentElement, false);
      }
      onBrickDrop(e, {
        curElement,
        overElement,
        parentElement,
        overStatus,
      });
    } else {
      const filterNodes = (nodes: WorkbenchNodeData[]): WorkbenchNodeData[] => {
        let flag = false;
        const newNodes = nodes.filter((node) => {
          if (node.children) {
            node.children = filterNodes(node.children);
          }
          if (node.key === overNode.key) flag = true;
          return node.key !== curNode.key;
        });
        if (flag) {
          newNodes.splice(
            newNodes.findIndex((item) => item.key === overNode.key) +
              (overStatus === "top" ? 0 : 1),
            0,
            curNode
          );
        }
        return newNodes;
      };

      dropEmit({
        nodes: filterNodes(nodes),
        curNode,
        overNode,
        status: overStatus,
      });
    }
    handleOnDragEnd();
  };

  useEffect(() => {
    window.addEventListener("dragend", handleOnDragEnd);
    return () => {
      window.removeEventListener("dragend", handleOnDragEnd);
    };
  }, []);

  return nodes?.length ? (
    <div>
      {!noSearch && (
        <div className={styles.searchBox}>
          <Input
            value={q}
            onChange={handleSearchChange}
            size="small"
            placeholder={searchPlaceholder}
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>
      )}
      <SearchingContext.Provider value={!!q}>
        <WorkbenchTreeDndContext.Provider
          value={{
            allow: true,
            allowDragToRoot: allowDragToRoot,
            dragElement: curElement,
            dragOverElement: overElement,
            dragStatus: overStatus,
            onDragStart: handleOnDragStart,
          }}
        >
          <div onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
            <TreeList nodes={filteredNodes} level={1} />
          </div>
        </WorkbenchTreeDndContext.Provider>
      </SearchingContext.Provider>
    </div>
  ) : (
    <div className={styles.placeholder}>{placeholder}</div>
  );
}

function TreeList({ nodes, level }: TreeListProps): ReactElement {
  const lastIndex = nodes.length - 1;
  return (
    <ul className={styles.tree}>
      {nodes
        .filter((item) => looseCheckIfOfComputed(item))
        .map((node, index) => (
          <TreeNode
            key={node.key}
            node={node}
            level={level}
            isFirst={index === 0}
            isLast={index === lastIndex}
          />
        ))}
    </ul>
  );
}

function PlaceholderDOM({
  style,
}: {
  style: React.CSSProperties;
}): React.ReactElement {
  const { dragStatus } = useWorkbenchTreeDndContext();
  const styles: React.CSSProperties = {
    height: 22,
    border: "1px dashed goldenrod",
    opacity: dragStatus === dragStatusEnum.inside ? "0" : "1",
    ...style,
  };

  return <li className="workbenchTree-placeholder-dom" style={styles} />;
}
export interface TreeNodeProps {
  node: WorkbenchNodeData;
  level: number;
  isFirst?: boolean;
  isLast?: boolean;
  skipNotify?: boolean;
}

function TreeNode({
  node,
  level,
  isFirst,
  isLast,
}: TreeNodeProps): ReactElement {
  const isLeaf = !node.children?.length;
  const {
    hoverKey,
    activeKey,
    isTransformName,
    basePaddingLeft,
    showMatchedNodeOnly,
    fixedActionsFor,
    collapsible,
    collapsedNodes,
    nodeKey,
    clickFactory,
    mouseEnterFactory,
    mouseLeaveFactory,
    contextMenuFactory,
    onNodeToggle,
    getCollapsedId,
    skipNotify = true,
  } = useWorkbenchTreeContext();
  const {
    allow,
    allowDragToRoot,
    onDragStart,
    dragElement,
    dragOverElement,
    dragStatus,
  } = useWorkbenchTreeDndContext();

  const nodePaddingLeft = level * treeLevelPadding + basePaddingLeft - 2;
  const searching = useContext(SearchingContext);
  const [cacheDragStatus, setCacheDragStatus] = useState(null);
  const [collapseClicked, setCollapseClicked] = useState(false);
  const [collapsed, setCollapsed] = useState(
    collapsedNodes?.includes(getCollapsedId?.(node)) ?? false
  );

  const onClick = useMemo(() => clickFactory?.(node), [clickFactory, node]);

  const onMouseEnter = useMemo(
    () => mouseEnterFactory?.(node),
    [mouseEnterFactory, node]
  );
  const onMouseLeave = useMemo(
    () => mouseLeaveFactory?.(node),
    [mouseLeaveFactory, node]
  );

  const onContextMenu = useMemo(
    () => contextMenuFactory?.(node),
    [contextMenuFactory, node]
  );

  const isActive = activeKey && node.key === activeKey;

  const nodeLabelCallback = useMemo(
    () =>
      isActive
        ? (element: HTMLElement) => {
            element?.scrollIntoView({
              block: "center",
              inline: "center",
              // behavior: "smooth",
            });
          }
        : null,
    // Only for initial active node.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const nodeUid = useMemo(() => {
    if (node.data) {
      const getNodeUid = (data: Record<string, any>): number | string => {
        return data.type === "mount-point"
          ? data.parent[nodeKey] || `${data.parent.$$uid}:${data.mountPoint}`
          : data[nodeKey] || data.$$uid;
      };
      return getNodeUid(node.data);
    }
  }, [nodeKey, node.data]);

  useEffect(() => {
    if (dragStatus === dragStatusEnum.inside) {
      return;
    }
    if ([dragStatusEnum.top, dragStatusEnum.bottom].includes(dragStatus)) {
      setCacheDragStatus(dragStatus);
    }
  }, [dragStatus]);

  const isDragElement = useMemo(() => {
    if (dragElement) {
      const dragUid = dragElement.dataset.uid;
      return dragUid === String(nodeUid);
    }
    return false;
  }, [dragElement, nodeUid]);

  const isDragActive = useMemo(() => {
    if (dragOverElement) {
      const dragUid = dragOverElement.dataset.uid;
      return dragUid === String(nodeUid);
    }
    return false;
  }, [dragOverElement, nodeUid]);

  const nodeStyle = useMemo((): React.CSSProperties => {
    const commomStyle: React.CSSProperties = {};
    let style: React.CSSProperties = {
      opacity: isDragElement ? 0.2 : 1,
    };
    if (isDragActive) {
      if (dragStatus === dragStatusEnum.inside) {
        style = {
          boxShadow: borderStyle,
          background: "rgba(255, 255, 255, 0.1)",
        };
      }
    }
    return Object.assign(commomStyle, style);
  }, [isDragActive, isDragElement, dragStatus]);

  const handleCollapse = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setCollapseClicked(true);
    setCollapsed((prev) => !prev);
  }, []);

  const preventMouseEvent = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  useEffect(() => {
    if (collapseClicked) {
      onNodeToggle?.(getCollapsedId?.(node), collapsed);
    }
  }, [collapseClicked, collapsed, getCollapsedId, node, onNodeToggle]);

  // Disallow collapse leaf nodes, or any nodes when searching.
  const allowCollapse = collapsible && !isLeaf && !searching;

  if (searching && showMatchedNodeOnly && !node.matched) {
    return null;
  }

  return (
    <>
      {isDragActive &&
        (allowDragToRoot || level !== 1) &&
        cacheDragStatus === dragStatusEnum.top && (
          <PlaceholderDOM
            style={{
              marginLeft: nodePaddingLeft,
            }}
          />
        )}
      <li
        draggable={allow}
        onDragStart={(e) => onDragStart(e, node)}
        data-uid={nodeUid}
        style={nodeStyle}
      >
        <Link
          className={classNames(styles.nodeLabelRow, {
            [styles.active]: isActive,
            [styles.hover]: hoverKey && node.key === hoverKey,
            [styles.matched]:
              searching && node.matchedSelf && !showMatchedNodeOnly,
            [styles.fixedActions]:
              fixedActionsFor &&
              []
                .concat(fixedActionsFor)
                .some((source) =>
                  isMatch(node.data as Record<string, unknown>, source)
                ),
            [styles.collapsed]: allowCollapse && collapsed,
            [styles.collapsible]: allowCollapse,
          })}
          tabIndex={0}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onContextMenu={onContextMenu}
          noEmptyHref
          onClick={onClick}
          {...(skipNotify
            ? { ...pick(node.link, ["to", "href"]) }
            : {
                to: {
                  pathname: get(node.link, "to", "href"),
                  state: {
                    notify: false,
                  },
                },
              })}
        >
          <span
            className={styles.nodeLabel}
            style={{
              paddingLeft: nodePaddingLeft,
              color: node.labelColor,
            }}
            ref={nodeLabelCallback}
          >
            <span className={styles.nodeIconWrapper}>
              {allowCollapse && (
                <span
                  className={styles.collapseIcon}
                  onClick={handleCollapse}
                  onMouseDown={preventMouseEvent}
                  title={collapsed ? "Expand" : "Collapse"}
                  role="button"
                >
                  <GeneralIcon
                    icon={{
                      lib: "antd",
                      theme: "outlined",
                      icon: collapsed ? "right" : "down",
                    }}
                  />
                </span>
              )}
              <span className={styles.nodeIcon}>
                {node.icon?.lib === "text" ? (
                  <WorkbenchTextIcon icon={node.icon} />
                ) : (
                  <GeneralIcon icon={node.icon} />
                )}
              </span>
            </span>
            <span className={styles.nodeName}>
              {isTransformName
                ? smartDisplayForEvaluableString(node.name)
                : node.name}
            </span>
          </span>
          <WorkbenchMiniActionBar
            className={styles.nodeActionsBar}
            data={node.data}
            isFirst={isFirst}
            isLast={isLast}
          />
          {node.badge && (
            <span className={styles.badge}>
              <GeneralIcon icon={node.badge} />
            </span>
          )}
        </Link>
        {isLeaf || <TreeList nodes={node.children} level={level + 1} />}
      </li>
      {isDragActive &&
        (allowDragToRoot || level !== 1) &&
        cacheDragStatus === dragStatusEnum.bottom && (
          <PlaceholderDOM
            style={{
              marginLeft: nodePaddingLeft,
            }}
          />
        )}
    </>
  );
}
