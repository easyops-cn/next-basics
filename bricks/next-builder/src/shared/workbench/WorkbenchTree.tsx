// istanbul ignore file
// For temporary usage only, will change soon.
import React, { useMemo, type ReactElement } from "react";
import { pick } from "lodash";
import classNames from "classnames";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import { useWorkbenchTreeContext } from "./WorkbenchTreeContext";
import type { WorkbenchNodeData } from "./interfaces";
import { WorkbenchMiniActionBar } from "./WorkbenchMiniActionBar";

import styles from "./WorkbenchTree.module.css";

const treeLevelPadding = 10;

export interface WorkbenchTreeProps {
  nodes: WorkbenchNodeData[];
  placeholder?: string;
}

export interface TreeListProps {
  nodes: WorkbenchNodeData[];
  level: number;
}

export function WorkbenchTree({
  nodes,
  placeholder,
}: WorkbenchTreeProps): ReactElement {
  return nodes?.length ? (
    <div className={styles.container}>
      <TreeList nodes={nodes} level={1} />
    </div>
  ) : (
    <div className={styles.placeholder}>{placeholder}</div>
  );
}

function TreeList({ nodes, level }: TreeListProps): ReactElement {
  return (
    <ul className={styles.tree}>
      {nodes.map((node) => (
        <TreeNode key={node.key} node={node} level={level} />
      ))}
    </ul>
  );
}

export interface TreeNodeProps {
  node: WorkbenchNodeData;
  level: number;
}

function TreeNode({ node, level }: TreeNodeProps): ReactElement {
  const isLeaf = !node.children?.length;
  const {
    hoverKey,
    activeKey,
    basePaddingLeft,
    clickFactory,
    mouseEnterFactory,
    mouseLeaveFactory,
    contextMenuFactory,
  } = useWorkbenchTreeContext();

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

  return (
    <li>
      <Link
        className={classNames(styles.nodeLabelRow, {
          [styles.active]: isActive,
          [styles.hover]: hoverKey && node.key === hoverKey,
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
            <GeneralIcon icon={node.icon} />
          </span>
          <span className={styles.nodeName}>{node.name}</span>
        </span>
        <WorkbenchMiniActionBar
          className={styles.nodeActionsBar}
          data={node.data}
        />
      </Link>
      {isLeaf || <TreeList nodes={node.children} level={level + 1} />}
    </li>
  );
}
