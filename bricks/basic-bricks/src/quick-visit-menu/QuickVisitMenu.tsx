import React, { useState, useEffect } from "react";
import { Button, Drawer, Input } from "antd";
import styles from "./index.module.css";
import { MenuTag } from "./MenuTag";
import { FavouriteMenu } from "./FavouriteMenu";
import { reject, isEmpty } from "lodash";
import { BrickAsComponent } from "@next-core/brick-kit";
import { SearchOutlined, CloseCircleFilled } from "@ant-design/icons";
import { K, NS_BASIC_BRICKS } from "../i18n/constants";
import { useTranslation } from "react-i18next";
import { Timer } from "d3";
interface QuickVisitMenuProps {
  buttonName: string;
  searchPlaceholder?: string;
  menu: Record<string, unknown>;
  favouriteMenus?: Record<string, unknown>[];
  handleMenuDrag: (items: Record<string, unknown>[]) => void;
  handleMenuRemove: (items: Record<string, unknown>[]) => void;
  handleMenuAdd: (items: Record<string, unknown>[]) => void;
  handleMenuClick: (item: Record<string, unknown>) => void;
  handleCollectFailed?: () => void;
  maxFavouriteCount?: number;
}
interface MenuContainerProps {
  searchPlaceholder?: string;
  allMenus: Record<string, unknown>[];
  favouriteMenus?: Record<string, unknown>[];
  handleMenuDrag?: (items: Record<string, unknown>[]) => void;
  handleMenuRemove?: (items: Record<string, unknown>[]) => void;
  handleMenuAdd?: (items: Record<string, unknown>[]) => void;
  handleMenuClick?: (item: Record<string, unknown>) => void;
  handleCollectFailed?: () => void;
  maxFavouriteCount?: number;
}

export function filterMenuTitle(title: string, key: string) {
  return title.toLowerCase().includes(key.trim().toLocaleLowerCase());
}
export function flagFavourite(favouriteMenus: Record<string, unknown>[], menu) {
  return favouriteMenus.length
    ? !!favouriteMenus.find((item) => menuIsSame(item, menu))
    : false;
}
export function flattenMenus(menu, favouriteMenus = []) {
  const allMenus = [];
  const { menuItems } = menu;
  menuItems.forEach((menuItem) => {
    const { items: secondItems = [] } = menuItem;
    secondItems.forEach((secondItem) => {
      if (!secondItem.items?.length) {
        allMenus.push({
          ...secondItem,
          categoryTitle: menuItem.title,
          isFavourite: flagFavourite(favouriteMenus, secondItem),
        });
      } else {
        const { items: thirdItems } = secondItem;
        allMenus.push(
          ...thirdItems.map((thirdItem) => {
            return {
              ...thirdItem,
              groupTitle: secondItem.title,
              categoryTitle: menuItem.title,
              isFavourite: flagFavourite(favouriteMenus, thirdItem),
            };
          })
        );
      }
    });
  });
  return allMenus;
}
export function menuIsSame(menu1, menu2) {
  return (
    menu1.text === menu2.text &&
    (menu1.to === menu2.to || menu1.href === menu2.href)
  );
}
export function removeItemFromList(list, item) {
  return reject(list, (menu) => menuIsSame(menu, item));
}
export function searchMenu(menus, key: string) {
  if (key.trim() === "") {
    return [];
  }
  const result = menus.filter((menu) => {
    return (
      filterMenuTitle(menu.text, key) ||
      (menu.categoryTitle && filterMenuTitle(menu.categoryTitle, key)) ||
      (menu.groupTitle && filterMenuTitle(menu.groupTitle, key))
    );
  });
  return result;
}
export function MenuContainer({
  searchPlaceholder,
  allMenus,
  favouriteMenus = [],
  handleMenuAdd,
  handleMenuRemove,
  handleMenuClick,
  handleMenuDrag,
  handleCollectFailed,
  maxFavouriteCount,
}: MenuContainerProps): React.ReactElement {
  const [isSearching, setIsSearching] = useState(false);
  const [filterMenus, setFilterMenus] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [favouriteCount, setFavouriteCount] = useState(0);
  const { t } = useTranslation(NS_BASIC_BRICKS);
  useEffect(() => {
    setFavouriteCount(favouriteMenus.length);
  }, [favouriteMenus]);
  const onSearch = (event) => {
    setSearchKey(event.target.value);
    setIsSearching(!!event.target.value);
    const searchResult = searchMenu(allMenus, event.target.value);
    setFilterMenus(searchResult);
  };
  const handleCollect = (item) => {
    const newFavouriteList = [...favouriteMenus, item];
    handleMenuAdd(newFavouriteList);
  };
  const handleCollectMenuFailed = () => {
    handleCollectFailed();
  };
  const removeSingleMenu = (item) => {
    const newFavouriteList = removeItemFromList(favouriteMenus, item);
    handleMenuRemove(newFavouriteList);
  };
  const removeFavouriteItem = (newFavouriteList) => {
    handleMenuRemove(newFavouriteList);
  };
  const reorderFavouriteItem = (
    newFavouriteList,
    oldIndex: number,
    newIndex: number
  ) => {
    if (oldIndex !== newIndex) {
      handleMenuDrag(newFavouriteList);
    }
  };
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.menuSearchContainer}>
        <Input
          className={styles.searchInput}
          prefix={<SearchOutlined className={styles.searchIcon} />}
          onChange={onSearch}
          placeholder={searchPlaceholder}
          value={searchKey}
        />
        {!isEmpty(searchKey) && (
          <CloseCircleFilled
            className={styles.clearBtn}
            onClick={() => {
              setSearchKey("");
              onSearch({ target: { value: "" } });
            }}
          />
        )}
      </div>
      {!isSearching && (
        <div>
          <div className={styles.titleWrapper} data-testid="quick-visit">
            <div className={styles.title}>{t(K.QUICK_ACCESS)}</div>
          </div>
          {favouriteMenus?.length ? (
            <FavouriteMenu
              menus={favouriteMenus}
              handleMenuRemove={removeFavouriteItem}
              handleMenuDrag={reorderFavouriteItem}
              handleMenuClick={handleMenuClick}
            />
          ) : (
            <div className={styles.favouriteEmpty}>{t(K.NO_VISIT_ACCESS)}</div>
          )}
        </div>
      )}
      {isSearching && (
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{t(K.RECOMMEND_SEARCH)}</div>
          {!filterMenus?.length && isSearching && (
            <BrickAsComponent
              useBrick={{
                brick: "presentational-bricks.brick-illustration",
                properties: {
                  name: "no-content",
                  category: "default",
                  footer: {
                    text: t(K.SEARCH_RESULT_EMPTY),
                  },
                },
              }}
            />
          )}
          <div className={styles.container}>
            {filterMenus.map((item) => (
              <MenuTag
                data-testid="menu-tag"
                menu={item}
                key={item.text}
                handleCollect={handleCollect}
                handleMenuClick={handleMenuClick}
                handleMenuRemove={removeSingleMenu}
                favouriteCount={favouriteCount}
                maxFavouriteCount={maxFavouriteCount}
                handleCollectFailed={handleCollectMenuFailed}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export function getContainer() {
  return document.getElementById("quickVisitContainer");
}
export function QuickVisitMenu(props: QuickVisitMenuProps): React.ReactElement {
  const {
    buttonName,
    menu,
    favouriteMenus = [],
    handleMenuDrag,
    handleMenuRemove,
    handleMenuAdd,
    handleMenuClick,
    searchPlaceholder,
    handleCollectFailed,
    maxFavouriteCount,
  } = props;

  const [allMenus, setAllMenus] = useState([]);
  const { t } = useTranslation(NS_BASIC_BRICKS);
  useEffect(() => {
    setAllMenus(flattenMenus(menu, favouriteMenus));
  }, [favouriteMenus, menu]);
  let timer;
  const [drawerVisible, setDrawerVisible] = useState(false);
  function triggerDrawerVisible(visible: boolean) {
    if (!visible && drawerVisible) {
      timer = setTimeout(() => {
        setDrawerVisible(false);
      }, 100);
    } else {
      setDrawerVisible(true);
      if (timer) {
        clearTimeout(timer);
      }
    }
  }

  const removeMenuItem = (favouriteList) => {
    handleMenuRemove(favouriteList);
  };

  return (
    <div
      data-testid="wrapper"
      className={styles.menuPopover}
      onMouseEnter={() => triggerDrawerVisible(true)}
      onMouseLeave={() => {
        if (drawerVisible) {
          triggerDrawerVisible(false);
        }
      }}
    >
      <div className={styles.appNameWrapper}>
        <span data-testid="buttonName" className={styles.appName}>
          {buttonName}
        </span>
      </div>
      <div id="quickVisitContainer" className={styles.quickVisitContainer}>
        <Drawer
          visible={drawerVisible}
          title={null}
          placement="top"
          maskClosable={true}
          closable={false}
          onClose={() => setDrawerVisible(false)}
          className={styles.popoverInMenu}
          getContainer={getContainer}
          height={
            window.innerHeight * 0.6 > 664
              ? 640
              : window.innerHeight * 0.6 < 240
              ? 226
              : window.innerHeight * 0.6 - 24
          }
          zIndex={-1}
        >
          <MenuContainer
            allMenus={allMenus}
            searchPlaceholder={searchPlaceholder ?? t(K.ENTER_KEY_WORDS)}
            favouriteMenus={favouriteMenus}
            handleMenuAdd={handleMenuAdd}
            handleMenuRemove={removeMenuItem}
            handleMenuDrag={handleMenuDrag}
            handleMenuClick={handleMenuClick}
            handleCollectFailed={handleCollectFailed}
            maxFavouriteCount={maxFavouriteCount}
          />
        </Drawer>
      </div>
    </div>
  );
}
