import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useContext,
  useImperativeHandle,
  forwardRef,
  CSSProperties,
} from "react";
import { Input, Collapse, Popover, Badge } from "antd";
import { BrickOptionItem } from "../builder-container/interfaces";
import {
  suggest,
  defaultGroup,
  suggestGroup,
  groupItem,
  i18nTransform,
  BrickSortField,
  ComponentSelectContext,
  defaultBlankListOfBricks,
  SnippetType,
  componetSortConf,
  suggestFormBricks,
  otherFormBrick,
  suggestV3FormBricks,
} from "./constants";
import { i18nText, getRuntime } from "@next-core/brick-kit";
import { Story } from "@next-core/brick-types";
import {
  QuestionCircleOutlined,
  SearchOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { debounce, compact, isEmpty } from "lodash";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import ResizeObserver from "resize-observer-polyfill";
import { adjustBrickSort, getSnippetsOfBrickMap } from "./processor";
import styles from "./WorkbenchComponentSelect.module.css";
import classNames from "classnames";
import {
  WorkbenchTreeDndContext,
  useWorkbenchTreeDndContext,
} from "../shared/workbench/WorkbenchTreeDndContext";
import { TooltipPlacement } from "antd/lib/tooltip";
import classnames from "classnames";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import { useTranslation } from "react-i18next";
import { ProviderItem } from "./ProviderItem";

export interface ComponentSelectProps {
  brickList: BrickOptionItem[];
  storyList: Story[];
  isShowSuggest?: boolean;
  currentBrick?: string;
  onActionClick?: (
    type: string,
    data: BrickOptionItem,
    e: React.MouseEvent
  ) => void;
  onDrag?: (isDrag: boolean) => void;
  onFeedbackClick?: (type: string) => void;
  onInstructionsClick?: (type: string) => void;
}

export function setDragImage(
  e: DragEvent | React.DragEvent,
  title: string
): void {
  const canvas = document.createElement("canvas");
  document.body.append(canvas);
  const context = canvas.getContext("2d");
  canvas.width = context.measureText(title).width + 60;
  canvas.height = 20;
  canvas.style.position = "absolute";
  canvas.style.left = "-100%";
  canvas.style.zIndex = "-100";

  context.fillStyle = "#333333";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#999999";
  context.font = "bold 14px Arial";
  context.fillText(title, 20, 15);

  e.dataTransfer.setDragImage(canvas, 0, 0);
}

function transformInfo(
  brick: BrickOptionItem,
  storyList: Story[]
): BrickOptionItem {
  const find = storyList?.find((story) => story.storyId === brick.id);
  if (find) {
    return {
      ...brick,
      title: i18nText(find.text) || brick.id,
      description: i18nText(find.description),
      $searchTextPool: (brick.$searchTextPool || []).concat(
        find.text ? Object.values(find.text).filter(Boolean) : []
      ),
      isExport: find.originData?.isExport,
    };
  }
  return brick;
}

export interface ComponentSelectRef {
  snippetMap: Map<string, Map<SnippetType, BrickOptionItem[]>>;
  getSnippetByBrick: (id: string) => BrickOptionItem[];
}

export function ComponentSelect(
  {
    brickList,
    storyList,
    isShowSuggest = true,
    currentBrick,
    onActionClick,
    onDrag,
    onFeedbackClick,
    onInstructionsClick,
  }: ComponentSelectProps,
  ref: React.Ref<ComponentSelectRef>
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [filterValue, setFilterValue] = useState<string>("");
  const [curComponentType, setCurComponentType] = useState<string>("");
  const [curComponentList, setCurComponentList] = useState<BrickOptionItem[]>(
    []
  );
  const [componentList, setComponetList] =
    useState<Record<string, BrickOptionItem[]>>();
  const { config } = useMemo(() => getRuntime().getCurrentApp(), []);

  const blankListOfBricks = useMemo(
    () =>
      compact(
        defaultBlankListOfBricks.concat(
          config.blankListOfBrickLibrary as string[]
        )
      ),
    [config.blankListOfBrickLibrary]
  );

  const setValue = useRef(
    debounce((v: string) => {
      setFilterValue(v);
    }, 300)
  ).current;

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const handleChangeTabs = useCallback((k: string, v: BrickOptionItem[]) => {
    setCurComponentType(k);
    setCurComponentList(v);
  }, []);

  const getBrickTransfromByType = useCallback(
    (brickList: BrickOptionItem[]): Record<string, BrickOptionItem[]> => {
      const obj: Record<string, BrickOptionItem[]> = {};
      const filterBricks = brickList.filter(
        (item) => !blankListOfBricks.some((id) => item.id === id)
      );
      filterBricks.forEach((item) => {
        if (item.layerType !== undefined && item.layerType !== "brick") {
          const key =
            item.layerType === null && item.type === "snippet"
              ? "customSnippet"
              : item.layerType;
          obj[key] ? obj[key].push(item) : (obj[key] = [item]);
        }
        // don't show legacy template
        else if (item.type !== "template") {
          let key;
          if (item.category === "workflow") {
            key = item.category;
          } else if (item.v3Brick) {
            key = item.type === "provider" ? "v3Provider" : "v3Brick";
          } else {
            key = item.type;
          }
          const brickItem: BrickOptionItem = {
            ...item,
            category: item.category,
          };
          obj[key] ? obj[key].push(brickItem) : (obj[key] = [brickItem]);
        }
      });
      return obj;
    },
    [blankListOfBricks]
  );

  useEffect(() => {
    if (brickList) {
      const componentList = brickList.filter(
        (item) => item.v3Brick || item.type !== "provider"
      );
      const data = getBrickTransfromByType(componentList);
      setComponetList(data);
    }
  }, [brickList, getBrickTransfromByType]);

  const snippetsOfBrickMap = useMemo(
    () => getSnippetsOfBrickMap(componentList?.snippet),
    [componentList]
  );

  const getSnippetByBrick = useCallback(
    (id: string) => {
      const snippetsMap = snippetsOfBrickMap.get(id);
      return [
        ...(snippetsMap?.get(SnippetType.SelfBrick) ?? []),
        ...(snippetsMap?.get(SnippetType.Scene) ?? []),
      ];
    },
    [snippetsOfBrickMap]
  );

  useImperativeHandle(ref, () => ({
    snippetMap: snippetsOfBrickMap,
    getSnippetByBrick,
  }));

  const handleOnDragStart = (): void => onDrag(true);

  const handleOnDragEnd = (): void => onDrag(false);

  useEffect(() => {
    if (!componentList || Object.keys(componentList).length <= 0) return;
    const [k, v] = Object.entries(componentList)
      .sort((a, b) => componetSortConf[a[0]] - componetSortConf[b[0]])
      .filter(
        ([k]) =>
          !["snippet", config.libraryShowV3Brick ? "" : "v3Brick"].includes(k)
      )[0];
    handleChangeTabs(k, v);
  }, [componentList]);

  useEffect(() => {
    window.addEventListener("dragend", handleOnDragEnd);
    return () => {
      window.removeEventListener("dragend", handleOnDragEnd);
    };
  });

  return (
    <ComponentSelectContext.Provider
      value={{
        snippetsOfBrickMap,
      }}
    >
      <WorkbenchTreeDndContext.Provider
        value={{
          onDragStart: handleOnDragStart,
        }}
      >
        <div className={styles.componentSelect}>
          {curComponentType && (
            <div className={styles.searchWrapper}>
              <Input
                placeholder={`Search for component`}
                onChange={(e) => handleFilterChange(e)}
                suffix={<SearchOutlined />}
              ></Input>
            </div>
          )}
          {componentList && (
            <div className={styles.tabBtnWrapper}>
              {Object.entries(componentList)
                .sort((a, b) => componetSortConf[a[0]] - componetSortConf[b[0]])
                // 组件库暂时不展示"片段"这个 tab
                .filter(
                  ([k]) =>
                    ![
                      "snippet",
                      config.libraryShowV3Brick ? "" : "v3Brick",
                    ].includes(k)
                )
                .map(([k, v]) => {
                  const tab = (
                    <div
                      onClick={() => handleChangeTabs(k, v)}
                      key={k}
                      className={classnames(styles.tabBtn, {
                        [styles.tabBtnSelected]: curComponentType === k,
                      })}
                    >
                      {i18nTransform[k]}
                    </div>
                  );

                  return k === "v3Brick" ? (
                    <Badge
                      style={{
                        color: "var(--antd-text-color)",
                        background: "var(--theme-red-color)",
                        boxShadow: "none",
                      }}
                      offset={[-20, -2]}
                      key={k}
                      count={t(K.BRICK_CATEGORY_RECOMMENDED)}
                    >
                      {tab}
                    </Badge>
                  ) : (
                    tab
                  );
                })}
            </div>
          )}
          <ComponentList
            key={curComponentType}
            componentType={curComponentType}
            componentList={curComponentList}
            q={filterValue}
            storyList={storyList}
            isShowSuggest={isShowSuggest}
            onActionClick={onActionClick}
            currentBrick={currentBrick}
            onFeedbackClick={onFeedbackClick}
            onInstructionsClick={onInstructionsClick}
          />
        </div>
      </WorkbenchTreeDndContext.Provider>
    </ComponentSelectContext.Provider>
  );
}

interface ComponentListProps
  extends Pick<
    ComponentSelectProps,
    "onActionClick" | "onFeedbackClick" | "onInstructionsClick"
  > {
  componentType: string;
  componentList: BrickOptionItem[];
  q: string;
  storyList: Story[];
  isShowSuggest?: boolean;
  currentBrick?: string;
}

function ComponentList({
  componentType,
  componentList,
  q,
  storyList,
  isShowSuggest = true,
  onActionClick,
  onFeedbackClick,
  onInstructionsClick,
  currentBrick,
}: ComponentListProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const initGroup = useCallback((): groupItem[] => {
    return suggest[componentType]?.length > 0 && isShowSuggest
      ? suggestGroup.concat(defaultGroup[componentType] ?? [])
      : defaultGroup[componentType] ?? [];
  }, [componentType, isShowSuggest]);
  const [group, setGroup] = useState<groupItem[]>(initGroup());
  const [list, setList] = useState([]);
  const [suggestList, setSuggestList] = useState([]);
  const [columnNumber, setColumnNumber] = useState(3);
  const [activePanels, setActivePanels] = useState<string[]>();
  const refWrapper = useRef<HTMLDivElement>();
  const { config } = useMemo(() => getRuntime().getCurrentApp(), []);

  const getRenderData = useCallback(
    (
      list: BrickOptionItem[],
      q: string
    ): {
      list: BrickOptionItem[];
      group: groupItem[];
    } => {
      let result: BrickOptionItem[] = [];
      const renderList: BrickOptionItem[] = [];

      list.forEach((item) => {
        const brick = transformInfo(item, storyList);

        // 显性指定为 false 才不显示，其余情况都显示
        if (brick.isExport !== false) {
          renderList.push(brick);
        }
      });
      if (q) {
        const keywords = (q ?? "").toLowerCase().match(/\S+/g);
        for (const brick of renderList) {
          if (
            keywords.every((keyword) =>
              (brick.$searchTextPool || [brick.id.toLowerCase()]).some((text) =>
                text.includes(keyword)
              )
            )
          ) {
            result.push(brick);
          }
        }
      } else {
        result = result.concat(renderList);
      }
      const newGroup: groupItem[] = initGroup();
      newGroup.forEach((item) => (item.children = []));
      result.forEach((item) => {
        if (item.category) {
          const res = newGroup.find((child) => child.key === item.category);
          res
            ? (res.children || (res.children = [])).push(item)
            : newGroup.push({
                text: item.category,
                key: item.category,
                children: [item],
              });
        }
      });

      return {
        group: adjustBrickSort(
          newGroup,
          config?.brickLibrarySort as BrickSortField[]
        ),
        list: result,
      };
    },
    [initGroup, storyList, config.brickLibrarySort]
  );

  const handleSetWrapperTop = (): void => {
    if (refWrapper.current) {
      const { top } = refWrapper.current.getBoundingClientRect();
      refWrapper.current.style.height = `calc(100vh - ${top || 280}px)`;
      refWrapper.current.style.overflow = "auto";
    }
  };

  const isFormBrick = (componentType: string, currentBrick: string) => {
    if (componentType === "brick") {
      const originData = componentList.find(
        (brick) => brick.id === currentBrick
      );
      return (
        originData?.source === "forms-NB" ||
        otherFormBrick.includes(currentBrick)
      );
    } else if (componentType === "v3Brick") {
      const originData = componentList.find(
        (brick) => brick.id === currentBrick
      );
      return originData?.source === "form-NB";
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const { width } = refWrapper.current.getBoundingClientRect();
      const itemWidth = componentType === "v3Provider" ? 240 : 140;
      setColumnNumber(Math.round(width / itemWidth));
      handleSetWrapperTop();
    });
    resizeObserver.observe(refWrapper.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [componentType]);

  useEffect(() => {
    if (isFormBrick(componentType, currentBrick)) {
      // 如果当前编辑构件是表单项构件，则精确推荐表单相关的构件
      const suggestBricks =
        componentType === "brick" ? suggestFormBricks : suggestV3FormBricks;
      setSuggestList(
        suggestBricks.map((item) => {
          const originData = componentList.find(
            (brick) => brick.id === item.id
          );
          return {
            ...originData,
            ...item,
            category: "suggest",
          };
        })
      );
    } else if (suggest[componentType]?.length) {
      setSuggestList(
        suggest[componentType].map((item) => {
          const originData = componentList.find(
            (brick) => brick.id === item.id
          );
          return {
            ...originData,
            ...item,
            category: "suggest",
          };
        })
      );
    }
  }, [currentBrick, storyList, componentType, componentList]);

  useEffect(() => {
    const { group, list } = getRenderData(suggestList.concat(componentList), q);
    setGroup(group);
    setActivePanels(group.map((item) => item.key));
    setList(list);
  }, [suggestList, componentList, q, getRenderData]);

  useEffect(() => {
    handleSetWrapperTop();
  }, [group, list]);

  const handlePanelChange = (keys: string[]): void => {
    setActivePanels(keys);
  };

  return (
    <div ref={refWrapper}>
      {componentType === "v3Provider" && (
        <Link
          className={styles.instructions}
          onClick={() => onInstructionsClick?.(componentType)}
        >
          {t(K.INSTRUCTIONS_FOR_USE)}
          <QuestionCircleOutlined />
        </Link>
      )}
      {config.showV3BrickFeedback &&
        ["v3Brick", "v3Provider"].includes(componentType) && (
          <Link
            className={styles.feedbackLink}
            onClick={() => onFeedbackClick?.(componentType)}
          >
            {t(K.V3_BRICK_FEEDBACK)}
          </Link>
        )}
      {group?.every((item) => item.children?.length === 0) &&
      list.length === 0 ? (
        <div className={styles.noDataTips}>No Data</div>
      ) : group?.length > 0 ? (
        <Collapse
          ghost
          activeKey={activePanels}
          expandIconPosition="right"
          onChange={(keys) => handlePanelChange(keys as string[])}
        >
          {group.map((item) => {
            if (item.children?.length > 0) {
              return (
                <Collapse.Panel header={item.text} key={item.key}>
                  <ComponentGroup
                    list={item.children}
                    onActionClick={onActionClick}
                    columnNumber={columnNumber}
                    componentType={componentType}
                  />
                </Collapse.Panel>
              );
            }
          })}
        </Collapse>
      ) : (
        <ComponentGroup
          list={list}
          onActionClick={onActionClick}
          columnNumber={columnNumber}
          componentType={componentType}
          wrapperStyle={{ padding: "0 15px" }}
        />
      )}
    </div>
  );
}

interface ComponentGroupProps {
  list: groupItem["children"];
  columnNumber: number;
  componentType: string;
  onActionClick?: ComponentSelectProps["onActionClick"];
  wrapperStyle?: CSSProperties;
}

function ComponentGroup({
  componentType,
  list,
  columnNumber,
  onActionClick,
  wrapperStyle,
}: ComponentGroupProps): React.ReactElement {
  const handleActionClick = (
    type: string,
    data: BrickOptionItem,
    e: React.MouseEvent
  ): void => {
    onActionClick?.(type, data, e);
  };

  return (
    <div
      className={classNames(styles.componentWrapper, {
        [styles.brickWrapper]:
          componentType === "brick" || componentType === "v3Brick",
      })}
      style={{
        gridTemplateColumns: `repeat(${columnNumber}, 1fr)`,
        ...wrapperStyle,
      }}
    >
      {list.map((item) =>
        componentType === "v3Provider" ? (
          <ProviderItem key={item.id} {...item} onActionClick={onActionClick} />
        ) : (
          <ComponentItem
            key={item.id}
            {...item}
            onActionClick={(type, data, e) => handleActionClick(type, data, e)}
          />
        )
      )}
    </div>
  );
}

interface ComponentItemProps extends Partial<BrickOptionItem> {
  onActionClick?: ComponentSelectProps["onActionClick"];
  onDragEnd?: (e: React.DragEvent) => void;
}

function ComponentItem(componentData: ComponentItemProps): React.ReactElement {
  const { snippetsOfBrickMap } = useContext(ComponentSelectContext);
  const itemElementRef = useRef<HTMLDivElement>();
  const [snippetsOfSelfBrick, setSnippetsOfSelfBrick] = useState([]);
  const [snippetsOfScene, setSnippetsOfScene] = useState([]);
  const [popoverPlacement, setPopoverPlacement] =
    useState<TooltipPlacement>("top");
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const { onDragStart } = useWorkbenchTreeDndContext();
  const handleDragStart = (e: React.DragEvent): void => {
    setDragImage(e, componentData.title);
    const nodeData = {
      brick: componentData.id,
      bricks: componentData.bricks,
      type: "brick",
      ...(componentData.originBrick?.id
        ? {
            originBrick: {
              id: componentData.originBrick.id,
            },
          }
        : {}),
      ...(componentData.type === "snippet"
        ? {
            params: componentData.snippetParams,
            data: componentData.snippetData,
          }
        : {}),
    };
    e.dataTransfer.setData("nodeData", JSON.stringify(nodeData));
    onDragStart(null, null);
  };

  const getIcon = (
    data: Partial<BrickOptionItem>,
    isDraggable: boolean
  ): React.ReactElement => {
    if (data.icon) {
      return (
        <div className={styles.icon}>
          <GeneralIcon
            icon={data.icon}
            style={{
              fontSize: 20,
            }}
            noPublicRoot
            imageLoading="lazy"
          />
        </div>
      );
    }
    if (data.thumbnail) {
      return (
        <div className={styles.icon}>
          <img
            style={{
              width: "auto",
              height: "100%",
            }}
            draggable={isDraggable}
            src={
              // Prepend public_root if the thumbnail is not an absolute url.
              /^(?:https?|data):|^\//.test(data.thumbnail)
                ? data.thumbnail
                : `${getRuntime().getBasePath()}${data.thumbnail}`
            }
            loading="lazy"
          />
        </div>
      );
    }
    return (
      <div className={styles.defaultIcon}>
        <SettingFilled />
      </div>
    );
  };

  const isShowSnippets = useMemo(() => {
    const snippetsMap = snippetsOfBrickMap.get(componentData.id);
    return !(
      isEmpty(snippetsMap?.get(SnippetType.SelfBrick)) &&
      isEmpty(snippetsMap?.get(SnippetType.Scene))
    );
  }, [componentData.id, snippetsOfBrickMap]);

  const handleMouseOver = (): void => {
    const brickItemElem = itemElementRef.current;
    if (brickItemElem) {
      const { width, right } = brickItemElem.getBoundingClientRect();
      const windowWidth = document.body.clientWidth;
      if (windowWidth - width < right) {
        setPopoverPlacement("topRight");
      }
    }
  };

  const dragStartListener = (): void => {
    setPopoverOpen(false);
  };

  useEffect(() => {
    const snippetsMap = snippetsOfBrickMap.get(componentData.id);
    setSnippetsOfSelfBrick(snippetsMap?.get(SnippetType.SelfBrick));
    setSnippetsOfScene(snippetsMap?.get(SnippetType.Scene));
    window.addEventListener("dragstart", dragStartListener);
    return () => {
      window.removeEventListener("dragstart", dragStartListener);
    };
  }, []);

  const itemElem = (isDraggable = true): React.ReactElement => (
    <div
      ref={itemElementRef}
      draggable={isDraggable}
      className={styles.componentItem}
      style={{
        cursor: isDraggable ? "grab" : "not-allowed",
      }}
      title={componentData.description || componentData.title}
      onMouseOver={handleMouseOver}
      onDragStart={isDraggable ? handleDragStart : null}
      onDragEnd={isDraggable ? componentData?.onDragEnd : null}
    >
      {getIcon(componentData, isDraggable)}
      <div className={styles.name}>{componentData.title}</div>
    </div>
  );

  const renderSnippetsGroup = (
    snippets: BrickOptionItem[]
  ): React.ReactElement => {
    return (
      <div
        className={styles.popoverContent}
        style={{
          gridTemplateColumns: `repeat(${
            snippets?.length >= 3 ? 3 : snippets.length
          }, 142px)`,
        }}
      >
        {snippets.map((row) => (
          <ComponentItem key={row.id} {...row} originBrick={componentData} />
        ))}
      </div>
    );
  };

  if (componentData.layerType === "brick" && componentData.type === "brick") {
    return (
      <div className={styles.brickItem}>
        {isShowSnippets ? (
          <Popover
            title="示例(可拖拽)"
            placement={popoverPlacement}
            onVisibleChange={setPopoverOpen}
            visible={popoverOpen}
            content={
              <>
                {!isEmpty(snippetsOfSelfBrick) &&
                  renderSnippetsGroup(snippetsOfSelfBrick)}
                {!isEmpty(snippetsOfScene) &&
                  renderSnippetsGroup(snippetsOfScene)}
              </>
            }
          >
            {itemElem(true)}
          </Popover>
        ) : (
          itemElem(true)
        )}
        <div className={styles.actionWrapper}>
          <div
            className={styles.action}
            onClick={(e) =>
              componentData.onActionClick("document", componentData as any, e)
            }
          >
            文档
          </div>
        </div>
      </div>
    );
  }

  return itemElem(true);
}

export const WorkbenchComponentSelect = forwardRef(ComponentSelect);
