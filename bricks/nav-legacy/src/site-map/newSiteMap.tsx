import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import styles from "./SiteMap.module.css";
import { Button, Drawer, Input, Radio, Skeleton, Space, message } from "antd";
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
import { debounce, isArray, reject, sortBy, uniq } from "lodash";
import { JsonStorage } from "@next-libs/storage";
import {
  BrickAsComponent,
  getRuntime,
  useProvider,
} from "@next-core/brick-kit";

// ============ 类型定义 ============
interface newSiteMapProps {
  urlTemplates?: Record<string, string>;
  favouriteObjectList?: string[];
  titleStyle?: React.CSSProperties;
}

interface ModelObject {
  objectId: string;
  name: string;
  to: string;
  isFavourite?: boolean;
}

interface SubCategoryData {
  title: string;
  name: string;
  objectList: ModelObject[];
  isOpen: boolean;
}

interface CategoryData {
  title: string;
  name: string;
  objectList: ModelObject[];
  subCategory: SubCategoryData[];
}

// ============ 常量配置 ============
const CATEGORY_ICON_MAP: Record<string, any> = {
  应用资源: { lib: "fa", icon: "cube", prefix: "fas" },
  基础设施: { lib: "fa", icon: "cubes", prefix: "fas" },
  平台资源: { lib: "easyops", icon: "workspace", category: "app" },
  组织信息: { lib: "easyops", icon: "production", category: "deploy" },
};

// ============ 自定义 Hooks ============

/**
 * 收藏管理 Hook
 */
function useFavourite() {
  const [favouriteList, setFavouriteList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 获取收藏列表
  const fetchFavourites = useCallback(async () => {
    // 取消上一个请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setLoading(true);
      const collectList = await CmdbObjectApi_searchCollect();
      if (!controller.signal.aborted) {
        setFavouriteList(collectList.objectIdList || []);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch favourites:", err);
        message.error("获取收藏列表失败");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // 切换收藏状态
  const toggleFavourite = useCallback(
    async (objectId: string, isFavourite: boolean) => {
      try {
        await CmdbObjectApi_collect({
          objectIdList: [objectId],
          isCollect: !isFavourite,
        });

        setFavouriteList((prev) =>
          !isFavourite
            ? uniq([...prev, objectId])
            : reject(prev, (item) => item === objectId)
        );
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to toggle favourite:", err);
        message.error("操作失败，请重试");
      }
    },
    []
  );

  // 清理函数
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { favouriteList, loading, fetchFavourites, toggleFavourite };
}
// ============ 工具函数 ============

export function matchSearchValue(model: ModelObject, value: string): boolean {
  const lowerValue = value.toLowerCase();
  return (
    model.name.toLowerCase().includes(lowerValue) ||
    model.objectId.toLowerCase().includes(lowerValue)
  );
}

export function filterBySearch(
  groupList: CategoryData[],
  value: string | string[]
): CategoryData[] {
  if (!value || (isArray(value) && value.length === 0)) {
    return groupList;
  }

  const filteredGroups: CategoryData[] = [];
  const filterCategory = (objectList: ModelObject[]): ModelObject[] => {
    if (isArray(value)) {
      return objectList.filter((object) => value.includes(object.objectId));
    } else {
      return objectList.filter((object) => matchSearchValue(object, value));
    }
  };

  groupList.forEach((category) => {
    const filteredObjectList = filterCategory(category.objectList);
    const filteredSubCategoryObjectList: SubCategoryData[] = [];

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
// ============ 组件 ============

interface SubCategoryProps {
  title: string;
  name: string;
  objectList: ModelObject[];
  isOpen: boolean;
  highlightChar?: string;
  onToggleFavourite: (objectId: string, isFavourite: boolean) => void;
}

export function SubCategory(props: SubCategoryProps) {
  const { title, objectList, isOpen, highlightChar, onToggleFavourite } = props;
  const [display, setDisplay] = useState(isOpen);

  useEffect(() => {
    setDisplay(isOpen);
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    setDisplay((prev) => !prev);
  }, []);

  return (
    <div className={styles.subCategoryItemContainer}>
      <Button type="link" onClick={handleToggle}>
        <div className={styles.toggleWrapper}>
          <span className={styles.categoryNameContainer}>{title}</span>
          {display ? <UpOutlined /> : <DownOutlined />}
        </div>
      </Button>
      {display && (
        <div className={styles.objectListContainer}>
          {objectList.map((object) => (
            <div className={styles.objectNameContainer} key={object.objectId}>
              <Link to={object.to}>
                <RenderName name={object.name} highlightChar={highlightChar} />
              </Link>
              <Button
                type="text"
                onClick={() =>
                  onToggleFavourite(object.objectId, !!object.isFavourite)
                }
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
  );
}

// 对特殊字符[]$^.*\?+{}()进行转义
export function encode(keyword: string): string {
  const reg = /[[($^.\]*\\?+{}|)]/gi;
  return keyword.replace(reg, (key) => `\\${key}`);
}

/**
 * 简化的高亮渲染逻辑
 */
export function RenderName(props: { name: string; highlightChar?: string }) {
  const { name, highlightChar } = props;

  if (!highlightChar) {
    return <span>{name}</span>;
  }

  const escapedChar = encode(highlightChar);
  const parts = name.split(new RegExp(`(${escapedChar})`, "gi"));

  return (
    <>
      {parts
        .filter((part) => part)
        .map((part, index) => {
          const isMatch = part.toLowerCase() === highlightChar.toLowerCase();
          return (
            <span key={index} className={isMatch ? styles.highlightText : ""}>
              {part}
            </span>
          );
        })}
    </>
  );
}
interface ModelTreeProps {
  groupList: CategoryData[];
  highlightChar?: string;
  onToggleFavourite: (objectId: string, isFavourite: boolean) => void;
}

export function ModelTree(props: ModelTreeProps) {
  const { groupList, highlightChar, onToggleFavourite } = props;
  const { t } = useTranslation(NS_NAV_LEGACY);

  const renderObjectList = useCallback(
    (object: ModelObject, index: number) => {
      return (
        <div
          className={`${styles.objectItemContainer} ${styles.categoryNameContainer} ${styles.objectNameContainer}`}
          key={index}
        >
          <Link to={object.to}>
            <RenderName name={object.name} highlightChar={highlightChar} />
          </Link>
          <Button
            type="text"
            onClick={() =>
              onToggleFavourite(object.objectId, !!object.isFavourite)
            }
          >
            {object.isFavourite ? (
              <StarFilled style={{ color: "rgb(255,213,130)" }} />
            ) : (
              <StarOutlined className={styles.collectStar} />
            )}
          </Button>
        </div>
      );
    },
    [highlightChar, onToggleFavourite]
  );

  const filteredGroupList = useMemo(() => {
    return groupList?.filter(
      (v) =>
        v.objectList.length > 0 ||
        v.subCategory.filter((c) => c.objectList.length > 0).length > 0
    );
  }, [groupList]);

  if (!filteredGroupList?.length) {
    return (
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

  return (
    <div className={styles.masonry}>
      {filteredGroupList.map((category, i) => {
        const displaySubCategory =
          category.subCategory?.filter(
            (subCategory) => subCategory.objectList.length
          ) ?? [];

        const iconConfig = CATEGORY_ICON_MAP[category.title];

        return (
          <div className={styles.column} key={i}>
            <div className={styles.newItem}>
              <div className={styles.subCategoryContainer}>
                {iconConfig ? (
                  <GeneralIcon icon={iconConfig} />
                ) : (
                  <TagOutlined
                    className={styles.categoryIcon}
                    style={{ marginRight: "4px" }}
                  />
                )}
                <span className={styles.categoryTitle}>{category.title}</span>
              </div>

              {displaySubCategory.map((subCategory, idx) => (
                <SubCategory
                  key={idx}
                  {...subCategory}
                  highlightChar={highlightChar}
                  onToggleFavourite={onToggleFavourite}
                />
              ))}

              {displaySubCategory.length > 0 &&
                category.objectList.length > 0 && (
                  <div style={{ height: "5px" }} />
                )}

              {category.objectList.map((object, idx) =>
                renderObjectList(object, idx)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export function NewSiteMap(props: newSiteMapProps) {
  const { urlTemplates } = props;
  const { t } = useTranslation(NS_NAV_LEGACY);

  // ========== 状态管理 ==========
  const [visible, setVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [objectCategory, setObjectCategory] = useState<any>(null);

  const storage = useMemo(() => new JsonStorage(localStorage), []);
  const sitemapOption = useRef(storage.getItem("sitemap-option"));
  const [siteMapTab, setSiteMapTab] = useState(sitemapOption.current ?? "all");

  // ========== Provider 请求 ==========
  const request = useProvider(
    "providers-of-cmdb.cmdb-object-api-get-object-basic-all",
    {
      transform: (c, v) => v.data,
      data: [],
    }
  );

  const categoryRequest = useProvider(
    "providers-of-cmdb.cmdb-object-api-list-object-category"
  );

  const featureFlags = getRuntime().getFeatureFlags();
  const isShowAll = !!featureFlags["cmdb-sitemap-menu-show-all-model"];

  // ========== 收藏管理 ==========
  const { favouriteList, fetchFavourites, toggleFavourite } = useFavourite();

  // ========== 搜索防抖 ==========
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSetSearch(searchInput);
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [searchInput, debouncedSetSearch]);

  // ========== 分类排序 ==========
  const sortedCategory = useMemo(() => {
    if (!categoryRequest.data?.list) return null;

    const categoryOrders = ["应用资源", "平台资源", "基础设施"];
    return {
      list: sortBy(categoryRequest.data.list, (group) => {
        const index = categoryOrders.indexOf(group.name);
        return index === -1 ? categoryOrders.length : index;
      }),
    };
  }, [categoryRequest.data]);

  useEffect(() => {
    if (sortedCategory) {
      setObjectCategory(sortedCategory);
    }
  }, [sortedCategory]);

  // ========== 生成模型分组 ==========
  const groupList = useMemo(() => {
    if (!request.data?.length || !objectCategory?.list) return null;

    return getNewModelGroups(
      request.data,
      objectCategory.list,
      urlTemplates,
      favouriteList,
      isShowAll
    );
  }, [request.data, objectCategory, urlTemplates, favouriteList, isShowAll]);

  // ========== 过滤分组（搜索） ==========
  const filteredGroupList = useMemo(() => {
    if (!groupList) return null;
    return filterBySearch(groupList as CategoryData[], debouncedSearch);
  }, [groupList, debouncedSearch]);

  // ========== 收藏分组 ==========
  const favouriteGroupList = useMemo(() => {
    if (!groupList) return null;
    return filterBySearch(groupList as CategoryData[], favouriteList);
  }, [groupList, favouriteList]);

  // ========== Tab 切换处理 ==========
  useEffect(() => {
    if (sitemapOption.current !== siteMapTab) {
      storage.setItem("sitemap-option", siteMapTab);
      sitemapOption.current = siteMapTab;
    }
  }, [siteMapTab, storage]);

  // ========== 可见性变化时获取收藏列表 ==========
  useEffect(() => {
    if (visible && siteMapTab === "favourite") {
      fetchFavourites();
    }
  }, [visible, siteMapTab, fetchFavourites]);

  // ========== 事件处理 ==========
  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }, []);

  const changeTab = useCallback((event: any) => {
    setSiteMapTab(event.target.value);
  }, []);

  const handleToggleFavourite = useCallback(
    (objectId: string, isFavourite: boolean) => {
      toggleFavourite(objectId, isFavourite);
    },
    [toggleFavourite]
  );

  // ========== 抽屉显示/隐藏（使用 useMemo 固定 debounce 实例）==========
  const triggerDrawerVisible = useMemo(
    () =>
      debounce((vis: boolean) => {
        setVisible((prevVisible) => {
          if (prevVisible === vis) return prevVisible;

          if (vis === true) {
            if (!objectCategory) {
              categoryRequest.query([
                {
                  isValidatePermission: true,
                  visible: isShowAll ? "all" : "visible",
                },
              ]);
            }
            if (!request.data.length) {
              request.query([
                {
                  isValidatePermission: true,
                  visible: isShowAll ? "all" : "visible",
                },
              ]);
            }
          }

          return vis;
        });
      }, 400),
    [objectCategory, isShowAll, categoryRequest, request]
  );

  // 清理 debounce
  useEffect(() => {
    return () => {
      triggerDrawerVisible.cancel();
    };
  }, [triggerDrawerVisible]);

  // ========== 骨架屏 ==========
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
  }, []);

  // ========== 内容渲染 ==========
  const content = useMemo(() => {
    return (
      <div className={styles.menuMainContainer}>
        <div className={styles.titleContainer}>
          <span style={{ fontSize: "14px", marginRight: "8px" }}>
            {siteMapTab === "all" ? t(K.ALL_RESOURCES) : t(K.MY_FAVORITE)}
          </span>
          <Radio.Group value={siteMapTab} onChange={changeTab} size="small">
            <Radio.Button value="all">
              <UnorderedListOutlined />
            </Radio.Button>
            <Radio.Button value="favourite">
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
                value={searchInput}
                placeholder={t(K.SEARCH_BY_NAME_OR_ID)}
                autoFocus={true}
              />
            </div>
            {request.loading ? (
              skeleton
            ) : (
              <ModelTree
                groupList={filteredGroupList}
                highlightChar={debouncedSearch}
                onToggleFavourite={handleToggleFavourite}
              />
            )}
          </>
        )}

        {siteMapTab === "favourite" && (
          <ModelTree
            groupList={favouriteGroupList}
            onToggleFavourite={handleToggleFavourite}
          />
        )}
      </div>
    );
  }, [
    siteMapTab,
    searchInput,
    debouncedSearch,
    filteredGroupList,
    favouriteGroupList,
    request.loading,
    skeleton,
    onSearch,
    changeTab,
    handleToggleFavourite,
    t,
  ]);

  return (
    <div
      id="menuPopover"
      className={styles.menuPopover}
      onMouseEnter={() => triggerDrawerVisible(true)}
      onMouseLeave={() => triggerDrawerVisible(false)}
    >
      <div className={styles.newSiteMap}>
        <span className={styles.appName} style={{ ...props.titleStyle }}>
          {t(K.IT_RESOURCE_MANAGEMENT)}
        </span>
      </div>
      <div id="sitMapModelContainer" className={styles.sitMapModelContainer}>
        <Drawer
          placement="top"
          title={null}
          className={styles.popoverInMenu}
          getContainer={() => document.getElementById("sitMapModelContainer")}
          visible={visible}
          onClose={() => setVisible(false)}
          maskClosable={true}
          height="calc(60vh - 24px)"
          zIndex={-1}
        >
          {content}
        </Drawer>
      </div>
    </div>
  );
}
