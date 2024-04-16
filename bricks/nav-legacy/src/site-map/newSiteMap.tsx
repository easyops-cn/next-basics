import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./SiteMap.module.css";
import {
  Button,
  Drawer,
  Input,
  Popover,
  Radio,
  Skeleton,
  Space,
  Spin,
} from "antd";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import { UnorderedListOutlined, StarOutlined } from "@ant-design/icons";
import {
  DownOutlined,
  UpOutlined,
  TagOutlined,
  SearchOutlined,
  StarFilled,
} from "@ant-design/icons";
import { K, NS_NAV_LEGACY } from "../i18n/constants";
import { useTranslation } from "react-i18next";
import { getNewModelGroups } from "./nav/modules-v3/cmdb";
import {
  CmdbObjectApi_searchCollect,
  CmdbObjectApi_collect,
} from "@next-sdk/cmdb-sdk";
import { cloneDeep, debounce, isArray, reject, sortBy, uniq } from "lodash";
import { JsonStorage } from "@next-libs/storage";
import {
  BrickAsComponent,
  getRuntime,
  useProvider,
} from "@next-core/brick-kit";

interface newSiteMapProps {
  urlTemplates?: Record<string, string>;
  favouriteObjectList?: string[];
}
export function matchSearchValue(model: Record<string, any>, value: string) {
  return (
    model.name.toLowerCase().includes(value.toLowerCase()) ||
    model.objectId.toLowerCase().includes(value.toLowerCase())
  );
}

export function filterBySearch(groupList, value: string | string[]): any[] {
  if (!value) {
    return groupList;
  }
  const cloneArray = cloneDeep(groupList);
  const filteredGroups: any = [];
  const filterCategory = (objectList) => {
    if (isArray(value)) {
      return objectList.filter((object) => value.includes(object.objectId));
    } else {
      return objectList.filter((object) => matchSearchValue(object, value));
    }
  };
  cloneArray.forEach((category) => {
    const filteredObjectList = filterCategory(category.objectList);
    const filteredSubCategoryObjectList: any = [];
    category.subCategory.forEach((subCategory) => {
      const filteredObjectListInSubCategory = filterCategory(
        subCategory.objectList
      );
      if (filteredObjectListInSubCategory.length) {
        filteredSubCategoryObjectList.push({
          ...subCategory,
          objectList: filteredObjectListInSubCategory,
          isOpen: true,
        });
      }
    });
    if (filteredObjectList.length || filteredSubCategoryObjectList.length) {
      filteredGroups.push({
        ...category,
        objectList: filteredObjectList,
        subCategory: filteredSubCategoryObjectList,
      });
    }
  });
  return filteredGroups;
}
export function SubCategory(props: {
  title: string;
  name: string;
  objectList: any[];
  isOpen: boolean;
  highlightChar?: string;
  updateCollect: (object: Record<string, any>) => void;
  favouriteObjectList: string[];
}) {
  const {
    title,
    objectList,
    isOpen,
    highlightChar,
    updateCollect,
    favouriteObjectList,
  } = props;
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(isOpen);
  }, [isOpen]);
  const handleToggle = () => {
    setDisplay(!display);
  };
  return (
    <>
      <div className={styles.subCategoryItemContainer}>
        <Button type="link" onClick={handleToggle}>
          <div className={styles.toggleWrapper}>
            <span className={styles.categoryNameContainer}>{title}</span>
            {display ? <UpOutlined /> : <DownOutlined />}
          </div>
        </Button>
        {display && (
          <div className={styles.objectListContainer}>
            {objectList.map((object, i) => (
              <div className={styles.objectNameContainer} key={object.objectId}>
                <Link to={object.to} key={i}>
                  <RenderName
                    name={object.name}
                    highlightChar={highlightChar}
                  />
                </Link>
                <Button
                  type="text"
                  onClick={() => {
                    const { objectId, isFavourite } = object;
                    const newFavouriteList = getNewFavouriteList(
                      object.objectId,
                      favouriteObjectList,
                      !object.isFavourite
                    );
                    CmdbObjectApi_collect({
                      objectIdList: [objectId],
                      isCollect: !isFavourite,
                    });
                    updateCollect(newFavouriteList);
                  }}
                >
                  {object.isFavourite ? (
                    <StarFilled style={{ color: "rgb(255,213,130)" }} />
                  ) : (
                    <StarOutlined className={styles.collectStar} />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
function combineText(node: any, newText: string, isHighlight?: boolean) {
  return (
    <>
      {node}
      <span className={isHighlight ? styles.highlightText : ""}>{newText}</span>
    </>
  );
}

// 对特殊字符[]$^.*\?+{}()进行转义
export function encode(keyword: string): string {
  const reg = /[[($^.\]*\\?+{}|)]/gi;
  return keyword.replace(reg, (key) => `\\${key}`);
}

export function RenderName(props: { name: string; highlightChar?: string }) {
  const { name, highlightChar } = props;
  if (!highlightChar) {
    return <span>{name}</span>;
  }
  const _highlightChar = encode(highlightChar);
  const exp = new RegExp(_highlightChar, "ig");
  const iterator = name.matchAll(exp);
  let done = false,
    text,
    startIndex = 0,
    endIndex = name.length,
    first = true;
  while (!done) {
    const next = iterator.next();
    done = next.done;
    if (done) {
      if (!first) {
        startIndex += highlightChar.length;
      }
      endIndex = name.length;
      if (startIndex < endIndex) {
        text = combineText(text, `${name.substring(startIndex, endIndex)}`);
      }
      break;
    } else {
      const value = next.value;
      startIndex = value.index;
      if (startIndex > endIndex) {
        text = combineText(text, `${name.substring(endIndex + 1, startIndex)}`);
      }
      if (first) {
        if (startIndex > 0) {
          text = combineText(text, `${name.substring(0, startIndex)}`);
        }
        first = false;
      }
      text = combineText(
        text,
        `${name.substring(startIndex, startIndex + highlightChar.length)}`,
        true
      );
      endIndex = startIndex + highlightChar.length - 1;
    }
  }
  return text;
}
export function getNewFavouriteList(
  objectId: string,
  objectIdList: string[],
  isFavourite: boolean
) {
  return isFavourite
    ? uniq([...objectIdList, objectId])
    : reject(objectIdList, (item) => item === objectId);
}
export function ModelTree(props: {
  groupList: any[];
  highlightChar?: string;
  favouriteObjectList: string[];
  updateCollect: (string: []) => void;
}) {
  const { groupList, highlightChar, updateCollect, favouriteObjectList } =
    props;
  const { t } = useTranslation(NS_NAV_LEGACY);
  const renderObjectList = (object, i: number) => {
    return (
      <div
        className={`${styles.objectItemContainer} ${styles.categoryNameContainer} ${styles.objectNameContainer}`}
        key={i}
      >
        <Link to={object.to}>
          <RenderName name={object.name} highlightChar={highlightChar} />
        </Link>
        <Button
          type="text"
          onClick={() => {
            const { objectId, isFavourite } = object;
            CmdbObjectApi_collect({
              objectIdList: [objectId],
              isCollect: !isFavourite,
            });
            const newFavouriteList = getNewFavouriteList(
              object.objectId,
              favouriteObjectList,
              !object.isFavourite
            );
            updateCollect(newFavouriteList as any);
          }}
        >
          {object.isFavourite ? (
            <StarFilled style={{ color: "rgb(255,213,130)" }} />
          ) : (
            <StarOutlined className={styles.collectStar} />
          )}
        </Button>
      </div>
    );
  };
  return groupList?.length ? (
    <div className={styles.masonry}>
      {groupList?.map((category, i) => {
        const displaySubCategory =
          category.subCategory?.filter(
            (subCategory) => subCategory.objectList.length
          ) ?? [];
        return (
          <div className={styles.column} key={i}>
            <div className={styles.newItem}>
              <div className={styles.subCategoryContainer}>
                {category.title === "应用资源" ? (
                  <GeneralIcon
                    icon={{ lib: "fa", icon: "cube", prefix: "fas" }}
                  />
                ) : category.title === "基础设施" ? (
                  <GeneralIcon
                    icon={{ lib: "fa", icon: "cubes", prefix: "fas" }}
                  />
                ) : category.title === "平台资源" ? (
                  <GeneralIcon
                    icon={{
                      lib: "easyops",
                      icon: "workspace",
                      category: "app",
                    }}
                  />
                ) : category.title === "组织信息" ? (
                  <GeneralIcon
                    icon={{
                      lib: "easyops",
                      icon: "production",
                      category: "deploy",
                    }}
                  />
                ) : (
                  <TagOutlined
                    className={styles.categoryIcon}
                    style={{ marginRight: "4px" }}
                  />
                )}
                <span className={styles.categoryTitle}>{category.title}</span>
              </div>
              {displaySubCategory?.map((subCategory, i) => {
                const props = {
                  ...subCategory,
                  highlightChar,
                  updateCollect,
                  favouriteObjectList,
                };
                return <SubCategory {...props} key={i} />;
              })}
              {displaySubCategory?.length && category.objectList.length ? (
                <div style={{ height: "5px" }}></div>
              ) : (
                <></>
              )}
              {category.objectList.map((object, i) => {
                return renderObjectList(object, i);
              })}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <BrickAsComponent
      useBrick={{
        brick: "presentational-bricks.brick-illustration",
        properties: {
          name: "no-content",
          category: "default",
          footer: {
            text: t(K.NO_MODEL),
          },
        },
      }}
    />
  );
}
export function NewSiteMap(props: newSiteMapProps) {
  const { urlTemplates } = props;
  const [groupList, setGroupList] = useState(null);
  const [filteredGroupList, setFilteredGroupList] = useState(null);
  const [objectCategory, setObjectCategory] = useState(null);
  const [favouriteGroupList, setFavouriteGroupList] = useState(null);
  const [visible, setVisible] = useState(false);
  const [highlightChar, setHighlightChar] = useState("");
  const [favouriteObjectList, setFavouriteObjectList] = useState([]);
  const { t } = useTranslation(NS_NAV_LEGACY);
  const storage = new JsonStorage(localStorage);
  const sitemapOption = useRef(storage.getItem("sitemap-option"));
  const [siteMapTab, setSiteMapTab] = useState(sitemapOption.current ?? "all");
  const request = useProvider(
    "providers-of-cmdb.cmdb-object-api-get-object-basic-all",
    {
      transform: (c, v) => {
        return v.data;
      },
      data: [],
    }
  );
  const categoryRequest = useProvider(
    "providers-of-cmdb.cmdb-object-api-list-object-category"
  );
  const featureFlags = getRuntime().getFeatureFlags();
  const isShowAll = !!featureFlags["cmdb-sitemap-menu-show-all-model"];
  const getCollection = async () => {
    const collectList = await CmdbObjectApi_searchCollect();
    setFavouriteObjectList(collectList.objectIdList);
  };
  useEffect(() => {
    if (sitemapOption.current !== siteMapTab) {
      storage.setItem("sitemap-option", siteMapTab);
      sitemapOption.current = siteMapTab;
      if (visible) {
        getCollection();
      }
    }
  }, [siteMapTab]);
  useEffect(() => {
    if (visible) {
      getCollection();
    }
  }, [visible]);
  useEffect(() => {
    if (categoryRequest.data?.list) {
      const categoryOrders = ["应用资源", "平台资源", "基础设施"];
      const sortCategory = {
        list: sortBy(categoryRequest.data.list, (group) => {
          const index = categoryOrders.indexOf(group.name);
          return index === -1 ? categoryOrders.length : index;
        }),
      };
      setObjectCategory(sortCategory);
    }
  }, [categoryRequest.data]);
  useEffect(() => {
    if (request.data?.length) {
      const allGroups = getNewModelGroups(
        request.data,
        objectCategory?.list ?? [],
        urlTemplates,
        favouriteObjectList,
        isShowAll ? true : false
      );
      setGroupList(allGroups);
      const filteredGroups = filterBySearch(allGroups, highlightChar);

      setFilteredGroupList(filteredGroups);
    }
  }, [objectCategory, favouriteObjectList, highlightChar, request.data]);

  useEffect(() => {
    if (groupList) {
      const favouriteGroupList = filterBySearch(groupList, favouriteObjectList);
      setFavouriteGroupList(favouriteGroupList);
    }
  }, [groupList, favouriteObjectList]);
  const onSearch = (event: any) => {
    setHighlightChar(event.target.value);
  };
  const changeTab = (event: any) => {
    setSiteMapTab(event.target.value);
  };

  const skeleton = useMemo(() => {
    return (
      <Space size={80}>
        {new Array(5).fill(1).map((_, i) => (
          <Skeleton
            active={true}
            key={i}
            paragraph={{
              rows: 6,
              width: 150,
            }}
          />
        ))}
      </Space>
    );
  }, [request.loading]);

  const content = useMemo(() => {
    return (
      <div className={styles.menuMainContainer}>
        <div className={styles.titleContainer}>
          <span style={{ fontSize: "14px", marginRight: "8px" }}>
            {siteMapTab === "all" ? t(K.ALL_RESOURCES) : t(K.MY_FAVORITE)}
          </span>
          <Radio.Group
            defaultValue={siteMapTab}
            onChange={changeTab}
            size="small"
          >
            <Radio.Button value={"all"}>
              <UnorderedListOutlined />
            </Radio.Button>

            <Radio.Button value={"favourite"}>
              <StarOutlined />
            </Radio.Button>
          </Radio.Group>
        </div>
        {siteMapTab === "all" && (
          <>
            <div className={styles.menuSearchContainer}>
              <Input
                prefix={<SearchOutlined className={styles.searchIcon} />}
                onChange={onSearch}
                defaultValue={highlightChar}
                placeholder={t(K.SEARCH_BY_NAME_OR_ID)}
                autoFocus={true}
              />
            </div>
            {request.loading ? (
              skeleton
            ) : (
              <ModelTree
                groupList={filteredGroupList}
                highlightChar={highlightChar}
                favouriteObjectList={favouriteObjectList}
                updateCollect={setFavouriteObjectList}
              />
            )}
          </>
        )}
        {siteMapTab === "favourite" && (
          <ModelTree
            groupList={favouriteGroupList}
            favouriteObjectList={favouriteObjectList}
            updateCollect={setFavouriteObjectList}
          />
        )}
      </div>
    );
  }, [
    request.loading,
    filteredGroupList,
    highlightChar,
    favouriteObjectList,
    favouriteGroupList,
  ]);

  const triggerDrawerVisible = debounce((vis: boolean) => {
    if (visible === vis) return;
    setVisible(vis);

    if (vis === true) {
      !objectCategory &&
        categoryRequest.query([
          {
            isValidatePermission: true,
            visible: isShowAll ? "all" : "visible",
          },
        ]);
      !request.data.length &&
        request.query([
          {
            isValidatePermission: true,
            visible: isShowAll ? "all" : "visible",
          },
        ]);
    }
  }, 400);

  return (
    <div
      id="menuPopover"
      className={styles.menuPopover}
      onMouseEnter={() => triggerDrawerVisible(true)}
      onMouseLeave={() => triggerDrawerVisible(false)}
    >
      <div className={styles.newSiteMap}>
        <span className={styles.appName}>{t(K.IT_RESOURCE_MANAGEMENT)}</span>
      </div>
      <div id={"sitMapModelContainer"} className={styles.sitMapModelContainer}>
        <Drawer
          placement="top"
          title={null}
          className={styles.popoverInMenu}
          getContainer={() => {
            return document.getElementById("sitMapModelContainer");
          }}
          visible={visible}
          onClose={() => setVisible(false)}
          maskClosable={true}
          height={"calc(60vh - 24px)"}
          zIndex={-1}
        >
          {content}
        </Drawer>
      </div>
    </div>
  );
}
