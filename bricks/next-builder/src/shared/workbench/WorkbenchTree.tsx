import React, {
  type ChangeEvent,
  useCallback,
  useMemo,
  useState,
  type ReactElement,
  createContext,
  useContext,
} from "react";
import { Input } from "antd";
import { isMatch, pick } from "lodash";
import classNames from "classnames";
import { SearchOutlined } from "@ant-design/icons";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import { useWorkbenchTreeContext } from "./WorkbenchTreeContext";
import type { WorkbenchNodeData } from "./interfaces";
import { WorkbenchMiniActionBar } from "./WorkbenchMiniActionBar";
import { WorkbenchTextIcon } from "./WorkbenchTextIcon";

import styles from "./WorkbenchTree.module.css";

const treeLevelPadding = 10;

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
        <TreeList nodes={filteredNodes} level={1} />
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
      {nodes.map((node, index) => (
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
    clickFactory,
    mouseEnterFactory,
    mouseLeaveFactory,
    contextMenuFactory,
  } = useWorkbenchTreeContext();
  const searching = useContext(SearchingContext);

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

  if (searching && showMatchedNodeOnly && !node.matched) {
    return null;
  }

  return (
    <li>
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
            paddingLeft: level * treeLevelPadding + basePaddingLeft,
            color: node.labelColor,
          }}
          ref={nodeLabelCallback}
        >
          <span className={styles.nodeIcon}>
            {node.icon?.lib === "text" ? (
              <WorkbenchTextIcon icon={node.icon} />
            ) : (
              <GeneralIcon icon={node.icon} />
            )}
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
  );
}
