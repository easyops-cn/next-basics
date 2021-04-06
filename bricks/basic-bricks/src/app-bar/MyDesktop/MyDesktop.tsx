import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
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

export function MyDesktop(props: MyDesktopProps, ref: any): React.ReactElement {
  const [recentlyVisitedList] = useState(launchpadService.getAllVisitors());
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstRendered, setFirstRendered] = useState(true);
  const [mode, setMode] = useState<ModeType>(ModeType.Sitemap);
  const siteMapRef = createRef<HTMLDivElement>();
  const deskContainerRef = useRef<HTMLDivElement>();
  const [siteMapHeight, setSiteMapHeight] = useState<number>();

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

  const handleSiteMapLoad = () => {
    // wait for launchpad open
    Promise.resolve().then(() => {
      const siteMapDom = siteMapRef.current.getBoundingClientRect();
      const deskContainerDom = deskContainerRef.current.getBoundingClientRect();
      const siteMapHeight = deskContainerDom.bottom - siteMapDom.top;

      setSiteMapHeight(siteMapHeight);
    });
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
  }, [favoriteList, isLoading, firstRendered]);

  const renderSiteMap = useMemo(() => {
    const categoryList = launchpadService.getSitemapList();

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
      test-id="my-destop"
      ref={deskContainerRef}
      style={{
        flex: 1,
        padding: `0 ${props.arrowWidthPercent / props.desktopCount}%`,
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
                <SettingOutlined className={styles.settings} />
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
