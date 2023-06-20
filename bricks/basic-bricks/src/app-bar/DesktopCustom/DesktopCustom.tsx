import React from "react";
import classNames from "classnames";
import { Link } from "@next-libs/basic-components";
import styles from "./DesktopCustom.module.css";
import defaultAppIcon from "../../images/default-app-icon.png";
import { PlusCircleFilled } from "@ant-design/icons";

interface DesktopCustomProps {
  name: string;
  url: string;
  isFavorite?: boolean;
  showAddIcon?: boolean;
  onAddClick: () => void;
  onClick?: () => void;
  size?: string;
  responsive?: boolean;
}

export function DesktopCustom({
  name,
  url,
  showAddIcon,
  isFavorite,
  onClick,
  onAddClick,
  size,
  responsive = true,
}: DesktopCustomProps): React.ReactElement {
  const handleItemClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onClick?.();
  };

  const handleAddIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onAddClick?.();
  };
  return (
    <>
      <Link
        className={classNames(styles.appLink, styles.circle, styles[size], {
          [styles.responsive]: responsive,
        })}
        href={url}
        target="_blank"
        onClick={handleItemClick}
      >
        <img className={styles.appIcon} src={defaultAppIcon} />
        {showAddIcon && isFavorite && (
          <PlusCircleFilled
            className={classNames(styles.addIcon, styles.circleIcon)}
            onClick={handleAddIconClick}
          />
        )}
      </Link>
      <div className={styles.appName} title={name}>
        {name}
      </div>
    </>
  );
}
