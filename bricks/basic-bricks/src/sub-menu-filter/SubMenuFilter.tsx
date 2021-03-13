import React, { ReactElement, useEffect, useState } from "react";
import {
  UseBrickConf,
  AntdIcon,
  FaIcon,
  EasyopsIcon,
  MenuIcon,
} from "@next-core/brick-types";
import { GeneralIcon } from "@next-libs/basic-components";
import { Menu, Input } from "antd";
import { uniq, cloneDeep, isEmpty } from "lodash";
import style from "./index.module.css";
import { SelectParam } from "antd/lib/menu";
import { BrickAsComponent } from "@next-core/brick-kit";
import { CaretRightFilled, CaretDownFilled } from "@ant-design/icons";
import { leastIndex } from "d3";

export interface SubMenuFilterSimpleItem {
  title: string;
  key: string;
  type?: "item";
  icon: MenuIcon;
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

export interface SubMenuFilterProps {
  defaultSelectedKeys: string[];
  defaultOpenKeys: string[];
  selectable: boolean;
  suffixBrick?: { useBrick: UseBrickConf };
  menuItems: SubMenuFilterItem[];
  placeholder?: string;
  unsearchable: boolean;
  onSelect: (menuItem: SubMenuFilterItem[]) => void;
  onSearch: (query: string) => void;
  multiple: boolean;
  treeMode: boolean;
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
  onSearch,
  multiple,
  treeMode,
}: SubMenuFilterProps): React.ReactElement {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const [expandStateMap, setExpandStateMap] = useState<any>({});

  const computeNewDefaultOpenKeys = () => {
    const newDefaultOpenKeys = [...defaultOpenKeys];
    defaultOpenKeys.forEach((key) => {
      while (key.includes("/")) {
        const nextKey = key.slice(0, key.lastIndexOf("/"));
        newDefaultOpenKeys.push(nextKey);
        key = nextKey;
      }
    });
    return uniq(newDefaultOpenKeys);
  };

  useEffect(() => {
    setMenuItems(cloneDeep(rowMenuItem));
  }, [rowMenuItem]);

  useEffect(() => {
    defaultSelectedKeys && setSelectedKeys(defaultSelectedKeys);
  }, [defaultSelectedKeys]);

  useEffect(() => {
    if (treeMode && !isEmpty(defaultOpenKeys)) {
      setOpenKeys(computeNewDefaultOpenKeys());
    } else {
      defaultOpenKeys && setOpenKeys(defaultOpenKeys);
    }
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
          <div>
            {renderIcon(item)}
            <span className={style.menuItemText}>{item.title}</span>
          </div>
          {renderItemExtra(item)}
        </div>
      </Menu.Item>
    );
  };

  /* eslint-disable @typescript-eslint/no-use-before-define */
  const renderGroupMenu = (item: SubMenuFilterGroup): React.ReactNode => {
    return (
      <Menu.ItemGroup key={item.key} title={item.title}>
        {item.items.map((innerItem) => renderMenuItem(innerItem))}
      </Menu.ItemGroup>
    );
  };
  const handleSubMenuclick = (item) => {
    setExpandStateMap({
      ...expandStateMap,
      [item.key]: {
        subMenuExpand: !expandStateMap[item.key]?.subMenuExpand,
      },
    });
    onSelect([item]);
  };

  const renderTreeModeMenuTitle = (item: SubMenuFilterGroup) => {
    let newDefaultOpenKeys: any = [];
    if (!isEmpty(defaultOpenKeys)) {
      newDefaultOpenKeys = computeNewDefaultOpenKeys();
    }

    return (
      <div
        onClick={(e) => handleSubMenuclick(item)}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span>
          {!expandStateMap[item.key]?.subMenuExpand &&
          !newDefaultOpenKeys.includes(item.key) ? (
            <CaretRightFilled />
          ) : (
            <CaretDownFilled />
          )}
          {renderIcon(item)}
          {item.title}
        </span>
        <span style={{ marginRight: "8px", color: "#8c8c8c" }}>
          {item.count}
        </span>
      </div>
    );
  };

  const renderMenuTitle = (item: SubMenuFilterGroup) => (
    <div>
      {renderIcon(item)}
      {item.title}
    </div>
  );

  const renderSubMenu = (item: SubMenuFilterGroup): React.ReactNode => {
    return (
      <Menu.SubMenu
        key={item.key}
        title={treeMode ? renderTreeModeMenuTitle(item) : renderMenuTitle(item)}
      >
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

  const handleOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
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

  return (
    <div className={style.subMenuContainer}>
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
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        onOpenChange={handleOpenChange}
        expandIcon={treeMode ? <></> : null}
      >
        {menuItems && menuItems.map((item) => renderMenuItem(item))}
      </Menu>
    </div>
  );
}
