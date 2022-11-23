import React, { ReactElement, useEffect, useState } from "react";
import {
  UseBrickConf,
  AntdIcon,
  FaIcon,
  EasyopsIcon,
  MenuIcon,
} from "@next-core/brick-types";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import { Menu, Input } from "antd";
import { uniq, cloneDeep } from "lodash";
import style from "./index.module.css";
import { SelectParam } from "antd/lib/menu";
import { BrickAsComponent } from "@next-core/brick-kit";
import classNames from "classnames";
import { LocationDescriptor } from "history";

export interface SubMenuFilterSimpleItem {
  title: string;
  key: string;
  type?: "item";
  icon: MenuIcon;
  to?: LocationDescriptor;
}

export interface SubMenuFilterGroup {
  type: "group" | "subMenu";
  title: string;
  items: SubMenuFilterSimpleItem[];
  key?: string;
}

export type SubMenuFilterItem = SubMenuFilterSimpleItem | SubMenuFilterGroup;

function isGroup(item: SubMenuFilterItem): item is SubMenuFilterGroup {
  return item.type === "group";
}

function isSubMenu(item: SubMenuFilterItem): item is SubMenuFilterGroup {
  return item.type === "subMenu";
}

function getSubMenuKeys(items: SubMenuFilterItem[]): string[] {
  let subMenuKeys: string[] = [];
  items.map((item) => {
    item.type === "subMenu" && subMenuKeys.push(item.key);
    if ((item as SubMenuFilterGroup)?.items) {
      subMenuKeys = subMenuKeys.concat(
        getSubMenuKeys((item as SubMenuFilterGroup).items)
      );
    }
  });
  return subMenuKeys;
}

export interface SubMenuFilterProps {
  defaultSelectedKeys: string[];
  defaultOpenKeys: string[];
  selectable: boolean;
  suffixBrick?: { useBrick: UseBrickConf };
  menuItems: SubMenuFilterItem[];
  placeholder?: string;
  unsearchable: boolean;
  onSelect: (menuItem: SubMenuFilterItem[]) => void;
  onClick: (menuItem: SubMenuFilterItem) => void;
  onSearch: (query: string) => void;
  multiple: boolean;
  inlineIndent?: number;
  transparentBackground?: boolean;
  accordion?: boolean;
}

export function SubMenuFilter({
  defaultSelectedKeys,
  defaultOpenKeys,
  selectable = true,
  suffixBrick,
  menuItems: rowMenuItem,
  placeholder = "",
  unsearchable,
  onSelect,
  onClick,
  onSearch,
  multiple,
  inlineIndent,
  transparentBackground,
  accordion,
}: SubMenuFilterProps): React.ReactElement {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const [subMenuKeys, setSubMenuKeys] = useState([]);

  useEffect(() => {
    setMenuItems(cloneDeep(rowMenuItem));
    setSubMenuKeys(getSubMenuKeys(rowMenuItem));
  }, [rowMenuItem]);

  useEffect(() => {
    defaultSelectedKeys && setSelectedKeys(defaultSelectedKeys);
  }, [defaultSelectedKeys]);

  useEffect(() => {
    defaultOpenKeys && setOpenKeys(defaultOpenKeys);
  }, [defaultOpenKeys]);

  const renderIcon = (item: SubMenuFilterSimpleItem) => (
    <>
      {item.icon && (
        <i className={style.menuItemIcon}>
          <GeneralIcon icon={item.icon} />
        </i>
      )}
    </>
  );

  const renderItemExtra = (item: Record<string, any>): ReactElement => {
    return (
      suffixBrick?.useBrick && (
        <BrickAsComponent useBrick={suffixBrick.useBrick} data={item} />
      )
    );
  };

  const renderSimpleMenuItem = (
    item: SubMenuFilterSimpleItem
  ): React.ReactNode => {
    return (
      <Menu.Item key={String(item.key)} title={item.title}>
        <div className={style.itemContainerInner}>
          {item.to ? (
            <Link to={item.to} className={style.blockLink}>
              <div className={style.menuItemMainPart}>
                {renderIcon(item)}
                <span className={style.menuItemText}>{item.title}</span>
              </div>
              {renderItemExtra(item)}
            </Link>
          ) : (
            <>
              <div className={style.menuItemMainPart}>
                {renderIcon(item)}
                <span className={style.menuItemText}>{item.title}</span>
              </div>
              {renderItemExtra(item)}
            </>
          )}
        </div>
      </Menu.Item>
    );
  };

  const renderGroupTitle = (item: SubMenuFilterGroup) => (
    <div className={style.menuItemMainPart}>{item.title}</div>
  );

  /* eslint-disable @typescript-eslint/no-use-before-define */
  const renderGroupMenu = (item: SubMenuFilterGroup): React.ReactNode => {
    return (
      <Menu.ItemGroup key={item.key} title={renderGroupTitle(item)}>
        {item.items.map((innerItem) => renderMenuItem(innerItem))}
      </Menu.ItemGroup>
    );
  };
  const renderMenuTitle = (item: SubMenuFilterGroup) => (
    <div className={style.menuItemMainPart}>
      {renderIcon(item)}
      {item.title}
    </div>
  );
  const renderSubMenu = (item: SubMenuFilterGroup): React.ReactNode => {
    return (
      <Menu.SubMenu key={item.key} title={renderMenuTitle(item)}>
        {item.items.map((innerItem) => renderMenuItem(innerItem))}
      </Menu.SubMenu>
    );
  };

  const renderMenuItem = (item: SubMenuFilterItem): React.ReactNode => {
    return isSubMenu(item)
      ? renderSubMenu(item)
      : isGroup(item)
      ? renderGroupMenu(item)
      : renderSimpleMenuItem(item);
  };
  /* eslint-enable @typescript-eslint/no-use-before-define */

  function searchMenu(
    menuItem: SubMenuFilterItem[],
    query: string,
    selectedKeys: string[]
  ): SubMenuFilterItem[] {
    return menuItem.filter((menu) => {
      const m = menu as SubMenuFilterGroup;
      if (m.items && m.items.length) {
        if (m.items.length > 0) {
          const result = searchMenu(m.items, query, selectedKeys);
          if (result.length === 0) {
            return (menu = null);
          }
          selectedKeys.push(menu.key);
          return (m.items = result);
        }
      } else {
        if (menu.title.toLowerCase().includes(query.toLowerCase())) {
          selectedKeys.push(menu.key);
          return menu;
        }
      }
    });
  }

  const getMenuItemByKey = (
    menuItem: SubMenuFilterItem[],
    key: string
  ): null | SubMenuFilterSimpleItem => {
    let data = null;
    menuItem.forEach((menu) => {
      if (menu.key === key) {
        data = menu;
        return;
      }

      if (menu.items) {
        const result = getMenuItemByKey(menu.items, key);
        if (result) {
          data = result;
        }
      }
    });
    return data;
  };

  const getSelectedMenuItemByKeys = (selectedKeys: string[]) => {
    const data = [] as SubMenuFilterSimpleItem[];
    const m = cloneDeep(rowMenuItem);
    selectedKeys.forEach((key) => {
      data.push(getMenuItemByKey(m, key));
    });

    return data.filter(Boolean);
  };
  const handleSearch = (value: string) => {
    onSearch && onSearch(value);
    if (value) {
      const keys: string[] = [];
      const m = cloneDeep(rowMenuItem);
      const result = searchMenu(m, value, keys);
      setMenuItems(result);
      setOpenKeys(keys);
    } else {
      setMenuItems([...rowMenuItem]);
      setOpenKeys(defaultOpenKeys || []);
    }
  };

  const handleOpenChange = (keys: string[]) => {
    // istanbul ignore else
    if (!accordion) {
      setOpenKeys(keys);
    } else {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      if (subMenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    }
  };

  const handleSelect = ({ key }: SelectParam) => {
    const newSelectedKeys = multiple
      ? [...new Set([...selectedKeys, key])]
      : [key];
    setSelectedKeys(newSelectedKeys);

    onSelect && onSelect(getSelectedMenuItemByKeys(newSelectedKeys));
  };

  const handleDeselect = ({ key }: SelectParam) => {
    const newSelectedKeys = [...selectedKeys.filter((k) => k !== key)];
    setSelectedKeys(newSelectedKeys);
    onSelect && onSelect(getSelectedMenuItemByKeys(newSelectedKeys));
  };

  const handleClick = ({ key }: { key: React.Key }): void => {
    onClick?.(getMenuItemByKey(rowMenuItem, key as string));
  };

  return (
    <div
      className={classNames(style.subMenuContainer, {
        [style.transparentBackground]: transparentBackground,
      })}
    >
      {!unsearchable && (
        <Input.Search
          placeholder={placeholder}
          onSearch={handleSearch}
          style={{ width: "100%" }}
        />
      )}
      <Menu
        multiple={multiple}
        mode="inline"
        selectable={selectable}
        defaultOpenKeys={uniq(defaultOpenKeys)}
        defaultSelectedKeys={defaultSelectedKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        style={{ height: "100%", borderRight: 0 }}
        className={style.menuContainer}
        onClick={handleClick}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        onOpenChange={handleOpenChange}
        inlineIndent={inlineIndent}
      >
        {menuItems && menuItems.map((item) => renderMenuItem(item))}
      </Menu>
    </div>
  );
}
