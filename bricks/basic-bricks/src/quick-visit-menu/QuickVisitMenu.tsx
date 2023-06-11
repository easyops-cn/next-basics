import React, { useState, useEffect } from "react";
import { Drawer, Input } from "antd";
import styles from "./index.module.css";
import { MenuTag } from "./MenuTag";
import { FavouriteMenu } from "./FavouriteMenu";
import { reject } from "lodash";
import { BrickAsComponent } from "@next-core/brick-kit";
import { SearchOutlined } from "@ant-design/icons";
import { K, NS_BASIC_BRICKS } from "../i18n/constants";
import { useTranslation } from "react-i18next";
interface QuickVisitMenuProps {
  buttonName: string;
  searchPlaceholder?: string;
  menu: Record<string, unknown>;
  favouriteMenus?: Record<string, unknown>[];
  handleMenuDrag: (items: Record<string, unknown>[]) => void;
  handleMenuRemove: (items: Record<string, unknown>[]) => void;
  handleMenuAdd: (items: Record<string, unknown>[]) => void;
  handleMenuClick: (item: Record<string, unknown>) => void;
}
interface MenuContainerProps {
  searchPlaceholder?: string;
  allMenus: Record<string, unknown>[];
  favouriteMenus?: Record<string, unknown>[];
  handleMenuDrag?: (items: Record<string, unknown>[]) => void;
  handleMenuRemove?: (items: Record<string, unknown>[]) => void;
  handleMenuAdd?: (items: Record<string, unknown>[]) => void;
  handleMenuClick?: (item: Record<string, unknown>) => void;
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
}: MenuContainerProps): React.ReactElement {
  const [isSearching, setIsSearching] = useState(false);
  const [filterMenus, setFilterMenus] = useState([]);
  const { t } = useTranslation(NS_BASIC_BRICKS);

  const onSearch = (event) => {
    setIsSearching(!!event.target.value);
    const searchResult = searchMenu(allMenus, event.target.value);
    setFilterMenus(searchResult);
  };
  const handleCollect = (item) => {
    const newFavouriteList = [...favouriteMenus, item];
    handleMenuAdd(newFavouriteList);
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
          prefix={<SearchOutlined className={styles.searchIcon} />}
          onChange={onSearch}
          placeholder={searchPlaceholder}
        />
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
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
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
  } = props;

  const [allMenus, setAllMenus] = useState([]);
  const { t } = useTranslation(NS_BASIC_BRICKS);
  useEffect(() => {
    setAllMenus(flattenMenus(menu, favouriteMenus));
  }, [favouriteMenus]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  function triggerDrawerVisible(visible: boolean) {
    if (drawerVisible !== visible) {
      setDrawerVisible(visible);
    }
  }

  const removeMenuItem = (favouriteList) => {
    handleMenuRemove(favouriteList);
  };

  return (
    <div
      data-testid="wrapper"
      onMouseEnter={() => triggerDrawerVisible(true)}
      onMouseLeave={() => {
        triggerDrawerVisible(false);
      }}
    >
      <span data-testid="buttonName">{buttonName}</span>
      <Drawer
        visible={drawerVisible}
        placement="top"
        maskClosable={true}
        onClose={() => triggerDrawerVisible(false)}
        height={
          window.innerHeight * 0.6 > 664
            ? 640
            : window.innerHeight * 0.6 < 240
            ? 226
            : window.innerHeight * 0.6 - 24
        }
      >
        <MenuContainer
          allMenus={allMenus}
          searchPlaceholder={searchPlaceholder ?? t(K.ENTER_KEY_WORDS)}
          favouriteMenus={favouriteMenus}
          handleMenuAdd={handleMenuAdd}
          handleMenuRemove={removeMenuItem}
          handleMenuDrag={handleMenuDrag}
          handleMenuClick={handleMenuClick}
        />
      </Drawer>
    </div>
  );
}
