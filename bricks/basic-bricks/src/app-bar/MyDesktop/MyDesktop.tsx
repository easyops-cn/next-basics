import React, { useEffect, useMemo, useState } from "react";
import { DesktopCell } from "../DesktopCell/DesktopCell";
import styles from "./MyDesktop.module.css";
import { SettingOutlined, LoadingOutlined } from "@ant-design/icons";
import { FavoriteDesktopCell } from "../FavoriteDesktopCell/FavoriteDesktopCell";
import classNames from "classnames";
import { launchpadService } from "../LaunchpadService";
import { Link } from "@next-libs/basic-components";
import { Spin } from "antd";
import Icon from "@ant-design/icons";
import { isEmpty } from "lodash";
import { BrickIcon } from "@next-core/brick-icons";
import { SiteMap } from "../site-map/SiteMap";
import { data as mockData } from "../site-map/mockData";

interface MyDesktopProps {
  desktopCount: number;
  arrowWidthPercent: number;
}

enum ModeType {
  Favorities = "favorities",
  Sitemap = "sitemap",
}

export enum SiteMapDirection {
  Up,
  Down,
}

export function MyDesktops(
  props: MyDesktopProps,
  ref: any
): React.ReactElement {
  const [recentlyVisitedList] = useState(launchpadService.getAllVisitors());
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstRendered, setFirstRendered] = useState(true);
  const [mode, setMode] = useState<ModeType>(ModeType.Sitemap);
  const [mapCursor, setMapCursor] = useState(0);

  const handleSlider = (direction: SiteMapDirection) => {
    if (direction === SiteMapDirection.Up) {
      setMapCursor(1);
    } else if (direction === SiteMapDirection.Down) {
      setMapCursor(0);
    }
  };

  React.useImperativeHandle(ref, () => ({
    handleSlider,
  }));

  const getFavoriteList = async () => {
    setIsLoading(true);
    const favoriteList = await launchpadService.fetchFavoriteList();
    setIsLoading(false);
    setFavoriteList(favoriteList);
  };

  const handleMode = (e: React.MouseEvent, mode: ModeType): void => {
    e.stopPropagation();
    setMode(mode);
  };
  useEffect(() => {
    (async () => {
      getFavoriteList();
    })();
  }, []);

  const handleOnSetAsFavorite = async () => {
    await getFavoriteList();
  };

  useEffect(() => {
    !isLoading && firstRendered && setFirstRendered(false);
  }, [isLoading, firstRendered]);

  const renderRecentlyVisited = useMemo(() => {
    return (
      <div className={classNames([styles.section, styles.visited])}>
        <div className={styles.title}>最近访问</div>
        <div className={styles.desktop}>
          {recentlyVisitedList?.map((item, index) => (
            <DesktopCell
              position={"left"}
              size="small"
              responsive={false}
              key={index}
              item={item}
              showAddIcon={true}
              isFavorite={!launchpadService.isFavorite(item)}
              onSetAsFavorite={handleOnSetAsFavorite}
            />
          ))}
        </div>
      </div>
    );
  }, [recentlyVisitedList, isLoading]);
  const antIcon = <LoadingOutlined style={{ fontSize: "2.5rem" }} />;
  const renderMyFavorites = useMemo(() => {
    return (
      <div className={classNames([styles.section, styles.favorites])}>
        {firstRendered && isLoading && (
          <Spin
            indicator={antIcon}
            spinning={isLoading}
            delay={500}
            className={styles.spin}
          />
        )}
        {!isEmpty(favoriteList) ? (
          <div className={styles.favoriteContainer}>
            {favoriteList?.map((item, index) => (
              <FavoriteDesktopCell key={index} item={item} />
            ))}
          </div>
        ) : (
          !isLoading && (
            <span>
              把常用的页面链接加入收藏夹，方便快速访问 ~{" "}
              <Link to="/launchpad-collection" style={{ marginLeft: 15 }}>
                管理我的收藏夹
              </Link>
            </span>
          )
        )}
      </div>
    );
  }, [favoriteList, isLoading, firstRendered]);

  const renderSiteMap = useMemo(() => {
    return <SiteMap categoryList={mockData} />;
  }, []);

  return (
    <div
      test-id="my-destop"
      style={{
        flex: 1,
        padding: `0 ${props.arrowWidthPercent / props.desktopCount}%`,
        marginTop: `${mapCursor === 1 ? "-190px" : 0}`,
        transition: "margin-top 400ms ease-out",
      }}
    >
      {!!recentlyVisitedList?.length && renderRecentlyVisited}
      <div className={styles.modeWrapper}>
        <div className={styles.header}>
          {mode === ModeType.Favorities ? (
            <div className={styles.title}>
              {" "}
              我的收藏
              <Icon
                className={styles.modeIcon}
                component={() => (
                  <BrickIcon icon="launchpad-collection" category="app" />
                )}
                onClick={(e) => handleMode(e, ModeType.Sitemap)}
              />
            </div>
          ) : (
            <div className={styles.title}>
              系统地图
              <Icon
                style={{ fontSize: 12 }}
                className={styles.modeIcon}
                component={() => (
                  <BrickIcon icon="launchpad-sitmap" category="app" />
                )}
                onClick={(e) => handleMode(e, ModeType.Favorities)}
              />
            </div>
          )}
          {mode === ModeType.Favorities && (
            <div>
              <Link to={"/launchpad-collection"}>
                <SettingOutlined className={styles.settings} />
              </Link>
              管理收藏
            </div>
          )}
        </div>

        {mode === ModeType.Favorities ? renderMyFavorites : renderSiteMap}
      </div>
    </div>
  );
}

export const MyDesktop = React.forwardRef(MyDesktops);
