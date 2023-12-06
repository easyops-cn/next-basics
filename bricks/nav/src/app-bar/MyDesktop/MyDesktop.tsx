import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { DesktopCell } from "../DesktopCell/DesktopCell";
import styles from "./MyDesktop.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { FavoriteDesktopCell } from "../FavoriteDesktopCell/FavoriteDesktopCell";
import classNames from "classnames";
import { launchpadService } from "../LaunchpadService";
import { Link } from "@next-libs/basic-components";
import { Spin } from "antd";
import Icon from "@ant-design/icons";
import { isEmpty } from "lodash";
import { BrickIcon } from "@next-core/brick-icons";
import { SiteMap } from "../site-map/SiteMap";

interface MyDesktopProps {
  desktopCount: number;
  arrowWidthPercent: number;
}

enum ModeType {
  Favorities = "favorities",
  Sitemap = "sitemap",
}

let remberMode = ModeType.Sitemap;

export function MyDesktop(props: MyDesktopProps): React.ReactElement {
  const [recentlyVisitedList] = useState(launchpadService.getAllVisitors());
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(!launchpadService.favoritesLoaded);
  // const [firstRendered, setFirstRendered] = useState(true);
  const [mode, setMode] = useState<ModeType>(remberMode);
  const siteMapRef = createRef<HTMLDivElement>();
  const deskContainerRef = useRef<HTMLDivElement>();
  const [siteMapHeight, setSiteMapHeight] = useState<number>();

  const getFavoriteList = async (eager?: boolean): Promise<void> => {
    const favoriteList = await launchpadService.fetchFavoriteList(eager);
    setIsLoading(false);
    setFavoriteList(favoriteList);
  };

  const handleMode = (e: React.MouseEvent, mode: ModeType): void => {
    e.stopPropagation();
    remberMode = mode;
    setMode(mode);
  };
  useEffect(() => {
    (async () => {
      getFavoriteList();
    })();
  }, []);

  const handleOnSetAsFavorite = (): void => {
    getFavoriteList(true);
  };

  const handleSiteMapLoad = () => {
    // wait for launchpad open
    Promise.resolve().then(() => {
      const siteMapDom = siteMapRef.current.getBoundingClientRect();
      const deskContainerDom = deskContainerRef.current.getBoundingClientRect();
      const siteMapHeight = deskContainerDom.bottom - siteMapDom.top;

      setSiteMapHeight(siteMapHeight);
    });
  };

  const renderRecentlyVisited = useMemo(() => {
    return (
      <div className={styles.visited}>
        <div className={styles.title}>最近访问</div>
        <div className={styles.desktop}>
          {recentlyVisitedList?.map((item, index) => (
            <DesktopCell
              size="small"
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

  const renderMyFavorites = useMemo(() => {
    return (
      <div className={classNames([styles.section, styles.favorites])}>
        {isLoading && (
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: "2.5rem" }} />}
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
            <div className={styles.emptyTips}>
              把常用的页面链接加入收藏夹，方便快速访问 ~{" "}
              <Link to="/launchpad-collection" style={{ marginLeft: 30 }}>
                管理我的收藏
              </Link>
            </div>
          )
        )}
      </div>
    );
  }, [favoriteList, isLoading]);

  const renderSiteMap = useMemo(() => {
    const categoryList = launchpadService
      .getSitemapList()
      ?.filter((item) => item.apps?.length > 0);

    return (
      <SiteMap
        ref={siteMapRef}
        categoryList={categoryList}
        containerStyle={{
          height: siteMapHeight,
          overflow: "auto",
        }}
        onLoad={handleSiteMapLoad}
      />
    );
  }, [siteMapHeight]);

  return (
    <div
      ref={deskContainerRef}
      style={{
        flex: 1,
        padding: `0 ${
          props.desktopCount ? props.arrowWidthPercent / props.desktopCount : 10
        }%`,
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
                  <BrickIcon icon="launchpad-sitmap" category="app" />
                )}
                onClick={(e) => handleMode(e, ModeType.Sitemap)}
              />
            </div>
          ) : (
            <div className={styles.title}>
              系统地图
              <Icon
                className={styles.modeIcon}
                component={() => (
                  <BrickIcon icon="launchpad-collection" category="app" />
                )}
                onClick={(e) => handleMode(e, ModeType.Favorities)}
              />
            </div>
          )}
          {mode === ModeType.Favorities && (
            <div className={styles.settingsContainer}>
              <Link to={"/launchpad-collection"}>
                <Icon
                  className={styles.settings}
                  component={() => (
                    <BrickIcon icon="launchpad-setting" category="app" />
                  )}
                />
                管理收藏
              </Link>
            </div>
          )}
        </div>

        {mode === ModeType.Favorities ? renderMyFavorites : renderSiteMap}
      </div>
    </div>
  );
}
