import React from "react";
import styles from "./BuilderToolbar.module.css";
import { RootNodeSelect } from "../RootNodeSelect/RootNodeSelect";
import {
  BranchesOutlined,
  CaretRightOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { BuilderRouteNode } from "@next-core/brick-types";
import { useBuilderUIContext } from "../BuilderUIContext";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { BuilderDataType } from "../interfaces";
import { Tooltip } from "antd";

export function BuilderToolbar(): React.ReactElement {
  const {
    onCurrentRouteClick,
    onBuildAndPush,
    onPreview,
    dataType,
  } = useBuilderUIContext();
  const rootNode = useBuilderNode({ isRoot: true });
  const handleRouteClick = () => {
    onCurrentRouteClick?.(rootNode as BuilderRouteNode);
  };

  const handlePreview = () => {
    onPreview?.();
  };

  const handleBuildAndPush = () => {
    onBuildAndPush?.();
  };

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.toolbarLeft}>
        {dataType !== BuilderDataType.CUSTOM_TEMPLATE && (
          <Tooltip title="View Route" placement="bottom">
            <a
              className={styles.tabLink}
              role="button"
              onClick={handleRouteClick}
              data-testid="view-route"
            >
              <BranchesOutlined />
            </a>
          </Tooltip>
        )}
        <RootNodeSelect />
      </div>
      <div className={styles.toolbarRight}>
        <Tooltip title="Build & Push (Ctrl+B)" placement="bottom">
          <a
            className={styles.tabLink}
            role="button"
            onClick={handleBuildAndPush}
            data-testid="build-and-push"
          >
            <ApiOutlined />
          </a>
        </Tooltip>
        <Tooltip title="Preview" placement="bottom">
          <a
            className={styles.tabLink}
            role="button"
            onClick={handlePreview}
            data-testid="preview"
          >
            <CaretRightOutlined />
          </a>
        </Tooltip>
      </div>
    </div>
  );
}
