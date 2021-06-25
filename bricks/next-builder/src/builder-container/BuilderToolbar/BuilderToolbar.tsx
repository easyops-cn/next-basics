import React, { useMemo, useState } from "react";
import { Tooltip, Button, Divider } from "antd";
import { useTranslation } from "react-i18next";
import {
  BranchesOutlined,
  CaretRightOutlined,
  ApiOutlined,
  BlockOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PlusOutlined,
  CloseOutlined,
  LayoutOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import {
  BuilderRouteNode,
  BuilderCustomTemplateNode,
  BuilderSnippetNode,
} from "@next-core/brick-types";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import styles from "./BuilderToolbar.module.css";
import { RootNodeSelect } from "../RootNodeSelect/RootNodeSelect";
import { LibraryDropdown } from "../LibraryDropdown/LibraryDropdown";
import { SettingDropdown } from "../SettingDropdown/SettingDropdown";
import { useBuilderUIContext } from "../BuilderUIContext";
import { BuilderDataType, LayerType } from "../interfaces";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import shareStyles from "../share.module.css";
import { getRuntime } from "@next-core/brick-kit";
import { brickMenus, layoutMenus, widgetMenus } from "../constants";

export function BuilderToolbar(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const enableLayerView = React.useMemo(
    () => getRuntime().getFeatureFlags()["next-builder-layer-view"],
    []
  );

  const [libsDropdownVisible, setLibsDropdownVisible] = useState<
    { [key in typeof LayerType[keyof typeof LayerType]]: boolean }
  >({
    [LayerType.LAYOUT]: false,
    [LayerType.WIDGET]: false,
    [LayerType.BRICK]: false,
  });

  const {
    onCurrentRouteClick,
    onCurrentTemplateClick,
    onCurrentSnippetClick,
    onBuildAndPush,
    onPreview,
    dataType,
    fullscreen,
    setFullscreen,
    onWorkbenchClose,
  } = useBuilderUIContext();

  const rootNode = useBuilderNode({ isRoot: true });

  const handleRouteClick = (): void => {
    onCurrentRouteClick?.(rootNode as BuilderRouteNode);
  };

  const handleTemplateClick = (): void => {
    onCurrentTemplateClick?.(rootNode as BuilderCustomTemplateNode);
  };

  const handleSnippetClick = (): void => {
    onCurrentSnippetClick?.(rootNode as BuilderSnippetNode);
  };

  const handlePreview = (): void => {
    onPreview?.();
  };

  const handleBuildAndPush = (): void => {
    onBuildAndPush?.();
  };

  const handleToggleFullscreen = React.useCallback(() => {
    setFullscreen((prev) => !prev);
  }, [setFullscreen]);

  const handleClose = (): void => {
    onWorkbenchClose?.();
  };

  const divider = useMemo(
    () => <Divider type="vertical" style={{ height: 25 }} />,
    []
  );

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.toolbarLeft}>
        {dataType === BuilderDataType.SNIPPET ? (
          <Tooltip title={t(K.VIEW_SNIPPET)} placement="bottomLeft">
            <a
              className={shareStyles.tabLink}
              role="button"
              onClick={handleSnippetClick}
              data-testid="view-snippet"
            >
              <BlockOutlined />
            </a>
          </Tooltip>
        ) : dataType === BuilderDataType.CUSTOM_TEMPLATE ? (
          <Tooltip title={t(K.VIEW_TEMPLATE)} placement="bottomLeft">
            <a
              className={shareStyles.tabLink}
              role="button"
              onClick={handleTemplateClick}
              data-testid="view-template"
            >
              <BlockOutlined />
            </a>
          </Tooltip>
        ) : (
          <Tooltip title={t(K.VIEW_ROUTE)} placement="bottomLeft">
            <a
              className={shareStyles.tabLink}
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
        {enableLayerView && (
          <>
            <LibraryDropdown
              menuItems={layoutMenus}
              type={LayerType.LAYOUT}
              onVisbleChange={(visible) =>
                setLibsDropdownVisible({
                  ...libsDropdownVisible,
                  [LayerType.LAYOUT]: visible,
                })
              }
            >
              <Tooltip
                title={t(K.LAYOUT_LIBRARY)}
                placement="bottomRight"
                overlayStyle={{
                  // Hide tooltip when dropdown is open.
                  display: libsDropdownVisible[LayerType.LAYOUT]
                    ? "none"
                    : undefined,
                }}
              >
                <Button
                  type="link"
                  size="small"
                  className={shareStyles.tabLink}
                  style={{ marginRight: "10px" }}
                >
                  <LayoutOutlined />
                </Button>
              </Tooltip>
            </LibraryDropdown>

            <LibraryDropdown
              menuItems={widgetMenus}
              type={LayerType.WIDGET}
              onVisbleChange={(visible) =>
                setLibsDropdownVisible({
                  ...libsDropdownVisible,
                  [LayerType.WIDGET]: visible,
                })
              }
            >
              <Tooltip
                title={t(K.WIDGET_LIBRARY)}
                placement="bottomRight"
                overlayStyle={{
                  display: libsDropdownVisible[LayerType.WIDGET]
                    ? "none"
                    : undefined,
                }}
              >
                <Button
                  type="link"
                  size="small"
                  className={shareStyles.tabLink}
                  style={{ marginRight: "10px" }}
                >
                  <GoldOutlined />
                </Button>
              </Tooltip>
            </LibraryDropdown>
          </>
        )}
        <LibraryDropdown
          menuItems={brickMenus}
          type={LayerType.BRICK}
          onVisbleChange={(visible) =>
            setLibsDropdownVisible({
              ...libsDropdownVisible,
              [LayerType.BRICK]: visible,
            })
          }
        >
          <Tooltip
            title={t(K.BRICK_LIBRARY)}
            placement="bottomRight"
            overlayStyle={{
              display: libsDropdownVisible[LayerType.BRICK]
                ? "none"
                : undefined,
            }}
          >
            <Button
              type="link"
              size="small"
              style={{ marginRight: "10px" }}
              className={shareStyles.tabLink}
            >
              <PlusOutlined />
            </Button>
          </Tooltip>
        </LibraryDropdown>
        {divider}
        <Tooltip title={t(K.BUILD_AND_PUSH_TOOLTIP)} placement="bottomRight">
          <a
            className={shareStyles.tabLink}
            role="button"
            onClick={handleBuildAndPush}
            data-testid="build-and-push"
          >
            <ApiOutlined />
          </a>
        </Tooltip>
        <Tooltip title={t(K.PREVIEW)} placement="bottomRight">
          <a
            className={shareStyles.tabLink}
            role="button"
            onClick={handlePreview}
            data-testid="preview"
          >
            <CaretRightOutlined />
          </a>
        </Tooltip>
        {divider}
        <SettingDropdown />
        {!fullscreen && (
          <Tooltip
            title={t(fullscreen ? K.EXIT_FULLSCREEN : K.ENTER_FULLSCREEN)}
            placement="bottomRight"
          >
            <a
              className={shareStyles.tabLink}
              role="button"
              onClick={handleToggleFullscreen}
              data-testid="toggle-fullscreen"
            >
              {fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            </a>
          </Tooltip>
        )}
        <Tooltip title={t(K.CLOSE)} placement="bottomRight">
          <a
            className={shareStyles.tabLink}
            role="button"
            onClick={handleClose}
            data-testid="workbench-close"
          >
            <CloseOutlined />
          </a>
        </Tooltip>
      </div>
    </div>
  );
}
