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
          <a
            className={styles.tabLink}
            role="button"
            onClick={handleRouteClick}
            title="View Route"
            data-testid="view-route"
          >
            <BranchesOutlined />
          </a>
        )}
        <RootNodeSelect />
      </div>
      <div className={styles.toolbarRight}>
        <a
          className={styles.tabLink}
          role="button"
          onClick={handleBuildAndPush}
          title="Build & Push (Ctrl+B)"
          data-testid="build-and-push"
        >
          <ApiOutlined />
        </a>
        <a
          className={styles.tabLink}
          role="button"
          onClick={handlePreview}
          title="Preview"
          data-testid="preview"
        >
          <CaretRightOutlined />
        </a>
      </div>
    </div>
  );
}
