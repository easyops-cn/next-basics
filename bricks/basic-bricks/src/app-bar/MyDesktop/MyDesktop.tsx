import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DesktopCell } from "../DesktopCell/DesktopCell";
import styles from "./MyDesktop.module.css";
import { SettingOutlined, LoadingOutlined } from "@ant-design/icons";
import { FavoriteDesktopCell } from "../FavoriteDesktopCell/FavoriteDesktopCell";
import classNames from "classnames";
import { launchpadService } from "../LaunchpadService";
import { LaunchpadApi } from "@sdk/user-service-sdk";
import { Link } from "@next-libs/basic-components";
import { Spin } from "antd";

interface MyDesktopProps {
  desktopCount: number;
  arrowWidthPercent: number;
}

export function MyDesktop(props: MyDesktopProps): React.ReactElement {
  const [recentlyVisitedList, setRecentlyVisitedList] = useState(
    launchpadService.getAllVisitors()
  );
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstRendered, setFirstRendered] = useState(true);
  const getFavoriteList = async () => {
    setIsLoading(true);
    const favoriteList = await launchpadService.fetchFavoriteList();
    setIsLoading(false);
    setFavoriteList(favoriteList);
  };
  useEffect(() => {
    (async () => {
      getFavoriteList();
    })();
  }, []);

  const handleDeleteFavorite = async (
    item: LaunchpadApi.ListCollectionResponseItem
  ) => {
    try {
      await launchpadService.deleteFavorite(
        item.launchpadCollection.instanceId
      );
    } catch (e) {
      // Nothing to cache
    }

    await getFavoriteList();
  };

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
        <div className={styles.title}>
          我的收藏
          <Link to={"/launchpad-collection"}>
            <SettingOutlined className={styles.settings} />
          </Link>
        </div>

        {firstRendered && isLoading && (
          <Spin
            indicator={antIcon}
            spinning={isLoading}
            delay={500}
            className={styles.spin}
          />
        )}
        <div className={styles.favoriteContainer}>
          {favoriteList?.map((item, index) => (
            <FavoriteDesktopCell
              key={index}
              item={item}
              onDelete={handleDeleteFavorite}
            />
          ))}
        </div>
      </div>
    );
  }, [favoriteList, isLoading, firstRendered]);

  return (
    <div
      style={{
        flex: 1,
        padding: `0 ${props.arrowWidthPercent / props.desktopCount}%`,
      }}
    >
      {!!recentlyVisitedList?.length && renderRecentlyVisited}
      {renderMyFavorites}
    </div>
  );
}
