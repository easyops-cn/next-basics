import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useContext,
} from "react";
import { Input, Tabs, Collapse, Popover } from "antd";
import { useTranslation } from "react-i18next";
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
} from "./constants";
import { i18nText, getRuntime } from "@next-core/brick-kit";
import { Story } from "@next-core/brick-types";
import { SettingFilled } from "@ant-design/icons";
import { debounce, compact, isEmpty } from "lodash";
import { GeneralIcon } from "@next-libs/basic-components";
import ResizeObserver from "resize-observer-polyfill";
import { adjustBrickSort, getSnippetsOfBrickMap } from "./processor";
import styles from "./WorkbenchComponentSelect.module.css";
import classNames from "classnames";
import {
  WorkbenchTreeDndContext,
  useWorkbenchTreeDndContext,
} from "../shared/workbench/WorkbenchTreeDndContext";
import { TooltipPlacement } from "antd/lib/tooltip";

interface ComponentSelectProps {
  brickList: BrickOptionItem[];
  storyList: Story[];
  isShowSuggest?: boolean;
  onActionClick?: (
    type: string,
    data: BrickOptionItem,
    e: React.MouseEvent
  ) => void;
  onDrag?: (isDrag: boolean) => void;
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
      title: i18nText(find.text),
      description: i18nText(find.description),
      $searchTextPool: (brick.$searchTextPool || []).concat(
        find.text ? Object.values(find.text).filter(Boolean) : []
      ),
      isExport: find.originData?.isExport,
    };
  }
  return brick;
}

export function WorkbenchComponentSelect({
  brickList,
  storyList,
  isShowSuggest = true,
  onActionClick,
  onDrag,
}: ComponentSelectProps): React.ReactElement {
  const [filterValue, setFilterValue] = useState<Record<string, string>>({});
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
    debounce((v: string, type: string) => {
      setFilterValue({
        ...filterValue,
        [type]: v,
      });
    }, 300)
  ).current;

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: string): void => {
      setValue(e.target.value, type);
    },
    [setValue]
  );

  const getBrickTransfromByType = useCallback(
    (brickList: BrickOptionItem[]): Record<string, BrickOptionItem[]> => {
      const obj: Record<string, BrickOptionItem[]> = {};
      const filterBricks = brickList.filter(
        (item) => !blankListOfBricks.some((id) => item.id === id)
      );
      filterBricks.forEach((item) => {
        if (item.layerType !== undefined && item.layerType !== "brick") {
          obj[item.layerType]
            ? obj[item.layerType].push(item)
            : (obj[item.layerType] = [item]);
        }
        // don't show legacy template
        else if (item.type !== "template") {
          const key = item.type;
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
        (item) => item.type !== "provider"
      );
      const data = getBrickTransfromByType(componentList);
      setComponetList(data);
    }
  }, [brickList, getBrickTransfromByType]);

  const snippetsOfBrickMap = useMemo(
    () => getSnippetsOfBrickMap(componentList?.snippet),
    [componentList]
  );

  const handleOnDragStart = (): void => onDrag(true);

  const handleOnDragEnd = (): void => onDrag(false);

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
          <Tabs centered size="small">
            {componentList &&
              // 组件库暂时不展示"片段"这个tab
              // Object.entries(componentList).map(([k, v]) => (
              Object.entries(componentList)
                .filter(([k]) => k !== "snippet")
                .map(([k, v]) => (
                  <Tabs.TabPane tab={i18nTransform[k]} key={k}>
                    <div className={styles.searchWrapper}>
                      <Input
                        placeholder={`Search for ${k}`}
                        onChange={(e) => handleFilterChange(e, k)}
                      ></Input>
                    </div>
                    <ComponentList
                      key={k}
                      componentType={k}
                      componentList={v}
                      q={filterValue[k]}
                      storyList={storyList}
                      isShowSuggest={isShowSuggest}
                      onActionClick={onActionClick}
                    />
                  </Tabs.TabPane>
                ))}
          </Tabs>
        </div>
      </WorkbenchTreeDndContext.Provider>
    </ComponentSelectContext.Provider>
  );
}

interface ComponentListProps
  extends Pick<ComponentSelectProps, "onActionClick"> {
  componentType: string;
  componentList: BrickOptionItem[];
  q: string;
  storyList: Story[];
  isShowSuggest?: boolean;
}

function ComponentList({
  componentType,
  componentList,
  q,
  storyList,
  isShowSuggest = true,
  onActionClick,
}: ComponentListProps): React.ReactElement {
  const initGroup = useCallback((): groupItem[] => {
    return suggest[componentType].length > 0 && isShowSuggest
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
            if (result.length === 12) {
              break;
            }
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

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const { width } = refWrapper.current.getBoundingClientRect();
      setColumnNumber(Math.round(width / 140));
      handleSetWrapperTop();
    });
    resizeObserver.observe(refWrapper.current);
    return () => {
      resizeObserver.disconnect();
    };
  });

  useEffect(() => {
    if (suggest[componentType].length) {
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
  }, [storyList, componentType, componentList]);

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
      {group?.length > 0 ? (
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
                    {...item}
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
        <div
          className={styles.componentWrapper}
          style={{
            gridTemplateColumns: `repeat(${columnNumber}, 1fr)`,
            padding: "0 15px",
          }}
        >
          {list.map((item, index) => (
            <ComponentItem
              key={index}
              {...item}
              onActionClick={onActionClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ComponentGroupProps extends groupItem {
  columnNumber: number;
  componentType: string;
  onActionClick?: ComponentSelectProps["onActionClick"];
}

function ComponentGroup({
  componentType,
  children,
  columnNumber,
  onActionClick,
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
        [styles.brickWrapper]: componentType === "brick",
      })}
      style={{
        gridTemplateColumns: `repeat(${columnNumber}, 1fr)`,
      }}
    >
      {children.map((item) => (
        <ComponentItem
          key={item.id}
          {...item}
          onActionClick={(type, data, e) => handleActionClick(type, data, e)}
        />
      ))}
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
            snippets.length >= 3 ? 3 : snippets.length
          }, 142px)`,
        }}
      >
        {snippets.map((row) => (
          <ComponentItem key={row.id} {...row} />
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
            {itemElem(false)}
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
