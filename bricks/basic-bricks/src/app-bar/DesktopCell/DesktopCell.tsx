import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { DesktopItem, MicroApp } from "@next-core/brick-types";
import styles from "./DesktopCell.module.css";
import { DesktopApp } from "../DesktopApp/DesktopApp";
import { DesktopDir } from "../DesktopDir/DesktopDir";
import { DesktopCustom } from "../DesktopCustom/DesktopCustom";
import { launchpadService } from "../LaunchpadService";
import {
  DesktopItemApp,
  DesktopItemCustom,
} from "@next-core/brick-types/dist/types/manifest";
import { Modal } from "antd";
import { getHistory } from "@next-core/brick-kit";

interface DesktopCellProps {
  item: DesktopItem;
  active?: boolean;
  showAddIcon?: boolean;
  position?: "left" | "center" | "right";
  onSetAsFavorite?: () => void;
  isFavorite?: boolean;
  size?: string;
}

export function DesktopCell(props: DesktopCellProps): React.ReactElement {
  const checkFavoriteUpperLimit = () => {
    const favoriteLength = launchpadService.getFavoritesLength();
    if (favoriteLength >= 25) {
      Modal.warning({
        // launchpad 遮罩层z-index为5000
        zIndex: 5001,
        title: "收藏数量已达上限",
        content: "当前收藏链接数量已达上限（25个），请删除部分链接后再添加。",
      });

      return false;
    }
    return true;
  };

  const addItemToFavorite = async () => {
    if (checkFavoriteUpperLimit()) {
      let params;
      if (props.item.type === "app") {
        const app = props.item as Partial<DesktopItemApp>;
        params = {
          microAppId: app.id,
          launchpadCollection: {
            type: "microApp",
            name: app.app.name,
          },
        };
      } else {
        const custom = props.item as DesktopItemCustom;
        params = {
          customItemId: custom.id,
          launchpadCollection: {
            type: "customItem",
            name: custom.name,
          },
        };
      }
      try {
        await launchpadService.setAsFavorite(params);
        props?.onSetAsFavorite?.();
      } catch (e) {
        // Noting to cache
      }
    }
  };

  const handleAppClick = () => {
    const app = (props.item as DesktopItemApp).app;
    launchpadService.pushVisitor("app", app);
    if (app.standaloneMode) {
      const url = getHistory().createHref({
        pathname: app.homepage,
      });
      location.replace(url);
    }
  };

  const handleCustomClick = () => {
    const custom = props.item as DesktopItemCustom;
    launchpadService.pushVisitor("custom", custom);
  };

  return (
    <div
      className={classNames(styles.cellWrapper, {
        [styles.positionLeft]: props?.position === "left",
      })}
    >
      <div
        className={classNames(styles.cellItem, styles[props.size], {
          [styles.active]: props.active,
        })}
      >
        {props.item.type === "app" ? (
          <DesktopApp
            showAddIcon={props.showAddIcon}
            isFavorite={props.isFavorite}
            app={props.item.app}
            onClick={handleAppClick}
            onAddClick={addItemToFavorite}
            size={props.size}
          />
        ) : props.item.type === "custom" ? (
          <DesktopCustom
            showAddIcon={props.showAddIcon}
            isFavorite={props.isFavorite}
            name={props.item.name}
            url={props.item.url}
            onClick={handleCustomClick}
            onAddClick={addItemToFavorite}
            size={props.size}
          />
        ) : (
          <DesktopDir
            name={props.item.name}
            items={props.item.items}
            size={props.size}
          />
        )}
      </div>
    </div>
  );
}
