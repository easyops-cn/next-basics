/* istanbul ignore file temporary */
import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { Tooltip, Checkbox } from "antd";
import classnames from "classnames";
import { last } from "lodash";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import { WorkbenchMiniActionBar } from "@next-libs/visual-builder";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import { WorkbenchTreeContext, TreeListContext } from "../../constants";
import { StepTreeNodeData } from "../../../interfaces";
import styles from "./TreeList.module.css";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { getItemCheck, processCheck } from "../../CheckManagement";

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
  const isLeaf = !node.children?.length;
  const {
    activeKey,
    nodeClickFactory,
    actions,
    actionsHidden,
    collapsible,
    getCollapsedId,
    collapsedNodes,
    onNodeToggle,
    onActionClick,
    mouseEnterFactory,
    mouseLeaveFactory,
    contextMenuFactory,
  } = useContext(WorkbenchTreeContext);

  const { q, multipleSelectMode, checkedMap, setCheckedMap } =
    useContext(TreeListContext);

  const [collapseClicked, setCollapseClicked] = useState(false);
  const [collapsed, setCollapsed] = useState(
    collapsedNodes?.includes(getCollapsedId?.(node)) ?? false
  );
  const collapseButtonRef = useRef<HTMLSpanElement>(null);

  const isActive = activeKey && node.key === activeKey;

  const onClick = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      return nodeClickFactory?.(node)(e);
    },
    [node, nodeClickFactory]
  );

  const onMouseEnter = useCallback(
    () => mouseEnterFactory?.(node)(),
    [mouseEnterFactory, node]
  );

  const onMouseLeave = useCallback(
    () => mouseLeaveFactory?.(node)(),
    [mouseLeaveFactory, node]
  );

  const onContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      contextMenuFactory?.(node)?.(e);
    },
    [contextMenuFactory, node]
  );

  const handleCheckbox = (
    node: StepTreeNodeData,
    e: CheckboxChangeEvent
  ): void => {
    const nodeCheck = processCheck(node, e.target.checked);
    setCheckedMap(new Map([...checkedMap, ...nodeCheck]));
  };

  const handleCollapse = useCallback((event: React.MouseEvent | MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setCollapseClicked(true);
    setCollapsed((prev) => !prev);
  }, []);

  const preventMouseEvent = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );

  useEffect(() => {
    if (collapseClicked) {
      onNodeToggle?.(getCollapsedId?.(node), collapsed);
    }
  }, [collapseClicked, collapsed, getCollapsedId, node, onNodeToggle]);

  const collapseRefCallback = useCallback(
    (element: HTMLSpanElement) => {
      if (element) {
        collapseButtonRef.current = element;
        collapseButtonRef.current.addEventListener("click", handleCollapse);
        collapseButtonRef.current.addEventListener(
          "mousedown",
          preventMouseEvent
        );
      } else {
        collapseButtonRef.current.removeEventListener("click", handleCollapse);
        collapseButtonRef.current.removeEventListener(
          "mousedown",
          preventMouseEvent
        );
        collapseButtonRef.current = element;
      }
    },
    [handleCollapse, preventMouseEvent]
  );

  const allowCollapse = collapsible && !isLeaf;

  return (
    <li>
      <Link
        className={classnames(styles.nodeItem, {
          [styles.active]: isActive,
          [styles.matched]: !!q && node.matchedSelf,
          [styles.collapsed]: allowCollapse && collapsed,
        })}
        tabIndex={0}
        noEmptyHref
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onContextMenu={onContextMenu}
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

        {multipleSelectMode && (
          <span onClick={(e) => e.stopPropagation()}>
            <Checkbox
              onChange={(e) => handleCheckbox(node, e)}
              checked={getItemCheck(checkedMap, node.data)}
            />
          </span>
        )}

        {allowCollapse && (
          <span
            ref={collapseRefCallback}
            className={styles.collapseIcon}
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
      {!isLeaf && (
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
