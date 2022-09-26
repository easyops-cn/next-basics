import React from "react";
import classNames from "classnames";
import { Loading3QuartersOutlined, PlusCircleFilled } from "@ant-design/icons";
import { getRuntime } from "@next-core/brick-kit";
import { MicroApp } from "@next-core/brick-types";
import { Link } from "@next-libs/basic-components";
import styles from "./DesktopApp.module.css";
import defaultAppIcon from "../../images/default-app-icon.png";

interface DesktopAppProps {
  app: MicroApp;
  isFavorite?: boolean;
  showAddIcon?: boolean;
  onAddClick?: () => void;
  onClick?: () => void;
  size?: string;
}

export function DesktopApp({
  app,
  onAddClick,
  onClick,
  isFavorite,
  showAddIcon,
  size,
}: DesktopAppProps): React.ReactElement {
  const installing = app.installStatus === "running";

  const handleAppClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (installing) {
      e.preventDefault();
    }
    onClick?.();
    getRuntime().resetWorkspaceStack();
  };

  const handleAddIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onAddClick?.();
  };

  const src =
    app.icons && app.icons.large
      ? /^(?:https?|data):|^\//.test(app.icons.large)
        ? app.icons.large
        : `${
            window.STANDALONE_MICRO_APPS
              ? // 如果是独立打包模式下打开的图片
                app.standaloneMode
                ? // 如果微应用是独立应用, 需要带独立打包默认前缀
                  `/sa-static/${app.id}/versions/${app.currentVersion}/webroot/-/micro-apps/${app.id}/${app.icons.large}`
                : // 否则使用PUBLIC_CDN + 默认前缀
                  `${window.PUBLIC_CDN || ""}micro-apps/${app.id}/${
                    app.icons.large
                  }`
              : // 非独立打包应用使用旧模式进行设置
                `${window.PUBLIC_ROOT || ""}micro-apps/${app.id}/${
                  app.icons.large
                }`
          }`
      : defaultAppIcon;

  return (
    <>
      <Link
        className={classNames(
          styles.appLink,
          styles[size],
          app.iconBackground === "circle" ? styles.circle : styles.square,
          {
            [styles.installing]: installing,
          }
        )}
        to={app.homepage}
        onClick={handleAppClick}
      >
        <img className={styles.appIcon} src={src} />

        {showAddIcon && isFavorite && (
          <PlusCircleFilled
            className={classNames(
              styles.addIcon,
              app.iconBackground === "circle"
                ? styles.circleIcon
                : styles.squareIcon
            )}
            onClick={handleAddIconClick}
          />
        )}
      </Link>
      <span className={styles.appName}>
        {installing && (
          <Loading3QuartersOutlined spin style={{ paddingRight: 5 }} />
        )}
        {app.localeName}
      </span>
    </>
  );
}
