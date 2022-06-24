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
import { isMatch, pick } from "lodash";
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

const treeLevelPadding = 10;
const borderStyle = "0 0 0 1px #ba6d30";
export interface WorkbenchTreeProps {
  nodes: WorkbenchNodeData[];
  placeholder?: string;
  searchPlaceholder?: string;
  noSearch?: boolean;
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
}: WorkbenchTreeProps): ReactElement {
  const [q, setQ] = useState<string>(null);
  const { onDragOver, onDrop } = useWorkbenchTreeDndContext();

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
        <div onDragOver={onDragOver} onDrop={onDrop}>
          <TreeList nodes={filteredNodes} level={1} />
        </div>
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
    clickFactory,
    mouseEnterFactory,
    mouseLeaveFactory,
    contextMenuFactory,
    onNodeToggle,
    getCollapsedId,
  } = useWorkbenchTreeContext();
  const { allow, onDragStart, dragNode, dragOverNode, dragStatus } =
    useWorkbenchTreeDndContext();

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
          ? `${data.parent.$$uid}:${data.mountPoint}`
          : data.$$uid;
      };
      return getNodeUid(node.data);
    }
  }, [node.data]);

  useEffect(() => {
    if (dragStatus === dragStatusEnum.inside) {
      return;
    }
    if ([dragStatusEnum.top, dragStatusEnum.bottom].includes(dragStatus)) {
      setCacheDragStatus(dragStatus);
    }
  }, [dragStatus]);

  const isDragNode = useMemo(() => {
    if (dragNode) {
      const dragUid = dragNode.dataset.uid;
      return Number(dragUid) === nodeUid;
    }
    return false;
  }, [dragNode, nodeUid]);

  const isDragActive = useMemo(() => {
    if (dragOverNode) {
      const dragUid = dragOverNode.dataset.uid;
      return Number(dragUid) === nodeUid;
    }
    return false;
  }, [dragOverNode, nodeUid]);

  const nodeStyle = useMemo((): React.CSSProperties => {
    const commomStyle: React.CSSProperties = {};
    let style: React.CSSProperties = {
      opacity: isDragNode ? 0.2 : 1,
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
  }, [isDragActive, isDragNode, dragStatus]);

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
      {isDragActive && level !== 1 && cacheDragStatus === dragStatusEnum.top && (
        <PlaceholderDOM
          style={{
            marginLeft: nodePaddingLeft,
          }}
        />
      )}
      <li
        draggable={allow && typeof nodeUid === "number"}
        onDragStart={onDragStart}
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
          {...pick(node.link, ["to", "href"])}
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
        level !== 1 &&
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
