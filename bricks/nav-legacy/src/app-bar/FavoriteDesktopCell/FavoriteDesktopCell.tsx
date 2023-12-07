import React, { useMemo } from "react";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import classNames from "classnames";
import styles from "./FavoriteDesktopCell.module.css";
import { LaunchpadApi_ListCollectionResponseItem } from "@next-sdk/user-service-sdk";
import { launchpadService } from "../LaunchpadService";
interface FavoriteDesktopCellProps {
  item: LaunchpadApi_ListCollectionResponseItem;
  onDelete?: (item: LaunchpadApi_ListCollectionResponseItem) => void;
}

export function FavoriteDesktopCell({
  item,
  onDelete,
}: FavoriteDesktopCellProps): React.ReactElement {
  const disabled = useMemo(
    () =>
      item.launchpadCollection.type === "microApp"
        ? !item.microAppId
        : item.launchpadCollection.type === "customItem"
        ? !item.customItemId
        : false,
    [item]
  );

  const setAsVisitor = () => {
    if (item.launchpadCollection.type === "link") return;
    launchpadService.setFavoriteAsVisitor(item);
  };
  const handleCellClick = (e: React.MouseEvent) => {
    // e.stopPropagation();
    if (disabled) {
      e.preventDefault();
      return;
    }

    setAsVisitor();

    if (
      (item.launchpadCollection.link.startsWith("https://") ||
        item.launchpadCollection.link.startsWith("http://")) &&
      !item.launchpadCollection.link.startsWith(document.baseURI)
    ) {
      e.preventDefault();
      window.open(item.launchpadCollection.link, "_blank");
    }
  };

  const realLink = useMemo(() => {
    const link = item.launchpadCollection.link;
    if (item.launchpadCollection.type === "microApp") return link;
    const baseUrl = document.baseURI;
    // const baseUrl = "http://192.168.100.162/next/";
    if (link.startsWith(baseUrl)) return link.replace(baseUrl, "/");
    return item.launchpadCollection.link;
  }, [item]);

  return (
    <div>
      <div
        className={classNames(styles.cellWrapper, {
          [styles.disabled]: disabled,
        })}
      >
        <Link className={styles.link} to={realLink} onClick={handleCellClick}>
          <>
            <span className={classNames(styles.appLink, styles.square)}>
              <GeneralIcon
                icon={item?.launchpadCollection.icon}
                style={{ fontSize: 18 }}
              />
            </span>
            <span className={styles.name}>
              {item?.launchpadCollection?.name}
            </span>
          </>
        </Link>
      </div>
    </div>
  );
}
