import React, { useImperativeHandle, useState, Ref, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import {
  GeneralIcon,
  ItemActionsComponent,
  filterActions,
  ContentItemActions,
} from "@next-libs/basic-components";
import { MenuIcon, UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import styles from "./WorkflowNode.module.css";

export interface StatusStyle {
  hover: Record<string, string>;
  active: Record<string, string>;
}

export interface WorkFlowNodeRef {
  setActive(flag: boolean): void;
}

export interface WorkflowNodeProps {
  header: string;
  headerBgColor?: string;
  icon?: MenuIcon;
  descUseBrick?: {
    useBrick: UseBrickConf;
  };
  suffixBrick?: {
    useBrick: UseBrickConf;
  };
  containerStyle?: React.CSSProperties;
  descStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  contentItemActions?: ContentItemActions;
  dataSource?: Record<string, any>;
  statusStyle?: StatusStyle;
  onNodeClick?: () => void;
}

export function LegacyWorkflowNode(
  props: WorkflowNodeProps,
  ref: Ref<WorkFlowNodeRef>
): React.ReactElement {
  const {
    header,
    icon,
    descUseBrick,
    suffixBrick,
    containerStyle,
    headerBgColor,
    descStyle,
    iconStyle,
    contentItemActions,
    dataSource,
    onNodeClick,
    statusStyle,
  } = props;
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [isHover, setHover] = useState(false);
  const [isActive, setActive] = useState(false);
  const filteredActions = filterActions(contentItemActions, dataSource);

  const handleMouseEnter = (): void => {
    setHover(true);
  };

  const handleMouseLeave = (): void => {
    setHover(false);
  };

  useImperativeHandle(ref, () => ({
    setActive,
  }));

  return (
    <div className={styles.layout}>
      <div
        className={classNames(styles.container, {
          [styles.hasDesc]: descUseBrick?.useBrick,
        })}
        style={{
          ...(isHover ? { ...statusStyle?.hover } : null),
          ...(isActive ? { ...statusStyle?.active } : null),
          ...containerStyle,
        }}
        onClick={onNodeClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.header} style={{ background: headerBgColor }}>
          <div
            className={styles.iconWrapper}
            style={{ background: headerBgColor, ...iconStyle }}
          >
            <GeneralIcon icon={icon} />
          </div>
          <div>{header}</div>
        </div>

        {!!filteredActions.length && (
          <div
            className={styles.actionsToolbar}
            onClick={(e) => e.stopPropagation()}
          >
            <ItemActionsComponent
              filteredActions={filteredActions}
              item={dataSource}
              buttonType="text"
            />
          </div>
        )}
        {descUseBrick?.useBrick && (
          <div className={styles.description} style={descStyle}>
            <BrickAsComponent
              useBrick={descUseBrick.useBrick}
              data={dataSource}
            />
          </div>
        )}
      </div>
      {suffixBrick?.useBrick && (
        <BrickAsComponent useBrick={suffixBrick.useBrick} data={dataSource} />
      )}
    </div>
  );
}

export const WorkflowNode = forwardRef(LegacyWorkflowNode);
