import {
  DownOutlined,
  SearchOutlined,
  TagOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Input, Popover } from "antd";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import { cloneDeep } from "lodash";
import React, { Children, useState } from "react";
import { useTranslation } from "react-i18next";
import { NS_FRAME_BRICKS, K } from "../i18n/constants";
import styles from "./DropMenu.module.css";

interface DropMenuProps {
  menuData: any[];
  title: string;
  categoryFontSize?: string;
  subCategoryFontSize?: string;
  instanceMenuFontSize?: string;
  placeholder?: string;
}

export function matchSearchValue(model: Record<string, any>, value: string) {
  return model.name.toLowerCase().includes(value.toLowerCase());
}

export function filterBySearch(groupList, value: string): any[] {
  if (!value) {
    // setDisplay(false);
    return groupList;
  }
  const cloneArray = cloneDeep(groupList);
  const filteredGroups: any = [];
  const filterCategory = (objectList) => {
    return objectList?.filter((object) => matchSearchValue(object, value));
  };
  cloneArray.forEach((category) => {
    const filteredObjectList = filterCategory(category.children);
    const filteredSubCategoryObjectList: any = [];
    category.subCategory?.forEach((subCategory) => {
      const filteredObjectListInSubCategory = filterCategory(
        subCategory.children
      );
      if (filteredObjectListInSubCategory?.length) {
        filteredSubCategoryObjectList.push({
          ...subCategory,
          children: filteredObjectListInSubCategory,
        });
      }
    });

    if (filteredObjectList?.length || filteredSubCategoryObjectList?.length) {
      filteredGroups.push({
        ...category,
        children: filteredObjectList,
        subCategory: filteredSubCategoryObjectList,
      });
      // setDisplay(true);
    }
  });
  return filteredGroups;
}

export function SubCategory(subCategory) {
  const [open, setOpen] = useState(true);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.subCategoryItemContainer}>
      <Button type="link" onClick={handleToggle}>
        <div className={styles.toggleWrapper}>
          <span
            className={styles.categoryNameContainer}
            style={{ fontSize: subCategory.subCategoryFontSize }}
          >
            {subCategory.title}
          </span>
          {open ? <UpOutlined /> : <DownOutlined />}
        </div>
      </Button>
      {open && (
        <div className={styles.objectListContainer}>
          {subCategory?.children?.map((object, i) => (
            <Link
              href={object.to}
              key={i}
              style={{ fontSize: subCategory.instanceMenuFontSize }}
            >
              {object.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function DropMenu(props: DropMenuProps): React.ReactElement {
  const [groupList, setGroupList] = useState(props.menuData);
  const [filteredGroupList, setFilteredGroupList] = useState(props.menuData);

  const onSearch = (event: any) => {
    const filteredGroups = filterBySearch(groupList, event.target.value);
    setFilteredGroupList(filteredGroups);
  };

  const content = () => {
    return (
      <div className={styles.menuMainContainer}>
        <div className={styles.menuSearchContainer}>
          <Input
            prefix={<SearchOutlined className={styles.searchIcon} />}
            onChange={onSearch}
            placeholder={props.placeholder ?? "输入关键词搜索"}
          />
        </div>
        <div className={styles.masonry}>
          {filteredGroupList?.map((category, i) => {
            const displaySubCategory = category.subCategory?.filter(
              (subCategory) => subCategory.children.length
            );
            return (
              <div className={styles.column} key={i}>
                <div className={styles.newItem}>
                  <div className={styles.subCategoryContainer}>
                    <TagOutlined
                      className={styles.categoryIcon}
                      style={{ marginRight: "4px" }}
                    />
                    <span
                      className={styles.categoryTitle}
                      style={{ fontSize: props.categoryFontSize }}
                    >
                      {category.title}
                    </span>
                  </div>
                  {displaySubCategory?.map((subCategory, i) => {
                    const newSubCategory = {
                      ...subCategory,
                      subCategoryFontSize: props.subCategoryFontSize,
                      instanceMenuFontSize: props.instanceMenuFontSize,
                    };
                    return <SubCategory {...newSubCategory} key={i} />;
                  })}
                  {displaySubCategory?.length && category?.children?.length ? (
                    <div style={{ height: "5pxß" }}></div>
                  ) : (
                    <></>
                  )}
                  {category?.children?.map((object, i) => {
                    return (
                      <div
                        className={`${styles.objectItemContainer} ${styles.categoryNameContainer}`}
                        key={i}
                      >
                        <Link
                          href={object.to}
                          style={{ fontSize: props.instanceMenuFontSize }}
                        >
                          {object.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div id="menuPopover" className={styles.menuPopover}>
      <Popover
        placement="bottom"
        title={null}
        content={content}
        trigger={"hover"}
        overlayClassName={styles.popoverInMenu}
        getPopupContainer={() => {
          return document.getElementById("menuPopover");
        }}
      >
        <div className={styles.newSiteMap}>
          <span className={styles.appName}>{props.title}</span>
        </div>
      </Popover>
    </div>
  );
}
