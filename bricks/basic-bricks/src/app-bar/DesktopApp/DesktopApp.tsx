import React from "react";
import classNames from "classnames";
import {
  Loading3QuartersOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
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
  responsive?: boolean;
}

export function DesktopApp({
  app,
  onAddClick,
  onClick,
  isFavorite,
  showAddIcon,
  size,
  responsive = true,
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

  return (
    <>
      <Link
        className={classNames(
          styles.appLink,
          styles[size],
          app.iconBackground === "circle" ? styles.circle : styles.square,
          {
            [styles.installing]: installing,
            [styles.responsive]: responsive,
          }
        )}
        to={app.homepage}
        onClick={handleAppClick}
      >
        <img
          className={styles.appIcon}
          src={
            app.icons && app.icons.large
              ? /^(\/|https?:\/\/)/.test(app.icons.large)
                ? app.icons.large
                : `micro-apps/${app.id}/${app.icons.large}`
              : defaultAppIcon
          }
        />

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
