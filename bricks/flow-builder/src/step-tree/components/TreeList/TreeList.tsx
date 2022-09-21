/* istanbul ignore file temporary */
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import classnames from "classnames";
import { last } from "lodash";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import { WorkbenchMiniActionBar } from "@next-libs/visual-builder";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import { WorkbenchTreeContext, TreeListContext } from "../../constants";
import { StepTreeNodeData } from "../../../interfaces";
import styles from "./TreeList.module.css";

export interface TreeListProps {
  nodes: StepTreeNodeData[];
  level: number;
  isStart?: boolean[];
  isEnd?: boolean[];
}

export function TreeList({
  nodes,
  level,
  isStart,
  isEnd,
}: TreeListProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  return (
    <ul className={styles.treeWrapper}>
      {nodes.map((node, index) => (
        <TreeNode
          key={node.key}
          node={node}
          level={level}
          isStart={[...(isStart || []), index === 0]}
          isEnd={[...(isEnd || []), nodes.length - 1 === index]}
        />
      ))}
    </ul>
  );
}

export interface TreeNodeProps {
  node: StepTreeNodeData;
  level: number;
  isStart?: boolean[];
  isEnd?: boolean[];
}

export function TreeNode({
  node,
  level,
  isStart,
  isEnd,
}: TreeNodeProps): React.ReactElement {
  const {
    activeKey,
    nodeClickFactory,
    actions,
    actionsHidden,
    onActionClick,
    mouseEnterFactory,
  } = useContext(WorkbenchTreeContext);

  const { q } = useContext(TreeListContext);

  const isActive = activeKey && node.key === activeKey;

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      return nodeClickFactory?.(node)(e);
    },
    [node, nodeClickFactory]
  );

  const onMouseEnter = useCallback(
    () => mouseEnterFactory?.(node)(),
    [mouseEnterFactory, node]
  );

  return (
    <li>
      <Link
        className={classnames(styles.nodeItem, {
          [styles.active]: isActive,
          [styles.matched]: !!q && node.matchedSelf,
        })}
        tabIndex={0}
        noEmptyHref
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        <span className={styles.treeIndent}>
          {[...Array(level - 1)].map((_, i) => {
            return (
              <span
                key={i}
                className={
                  isEnd[i]
                    ? styles.treeIndentUnitEnd
                    : styles.treeIndentUnitLine
                }
              />
            );
          })}
        </span>
        <span className={styles.switcherWrapper}>
          <span
            className={classnames(styles.treeLine, {
              [styles.isLast]: last(isEnd),
            })}
          />
        </span>

        <Tooltip title={node.iconTooltip}>
          <span className={styles.iconWrapper}>
            <GeneralIcon icon={node.icon} />
          </span>
        </Tooltip>
        <span className={styles.nodeLabel}>{node.name}</span>

        <WorkbenchMiniActionBar
          className={styles.nodeActionsBar}
          data={node.data}
          isFirst={last(isStart)}
          isLast={last(isEnd)}
          actions={actions}
          actionsHidden={actionsHidden}
          onActionClick={onActionClick}
        />
      </Link>
      {node.children?.length && (
        <TreeList
          nodes={node.children}
          level={level + 1}
          isStart={isStart}
          isEnd={isEnd}
        />
      )}
    </li>
  );
}
