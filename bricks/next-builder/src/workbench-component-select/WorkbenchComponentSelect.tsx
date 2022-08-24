import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useContext,
} from "react";
import { Input, Tabs, Collapse } from "antd";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { BrickOptionItem } from "../builder-container/interfaces";
import {
  suggest,
  defaultGroup,
  suggestGroup,
  groupItem,
  i18nTransform,
  BrickSortField,
  ComponentSelectContext,
} from "./constants";
import { i18nText, getRuntime } from "@next-core/brick-kit";
import { Story } from "@next-core/brick-types";
import { BuildFilled } from "@ant-design/icons";
import { debounce } from "lodash";
import { GeneralIcon } from "@next-libs/basic-components";
import ResizeObserver from "resize-observer-polyfill";
import { adjustBrickSort, getSnippetsOfBrickMap } from "./processor";
import styles from "./WorkbenchComponentSelect.module.css";
import classNames from "classnames";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";

interface ComponentSelectProps {
  brickList: BrickOptionItem[];
  storyList: Story[];
  isShowSuggest?: boolean;
  onActionClick?: (
    type: string,
    data: BrickOptionItem,
    e: React.MouseEvent
  ) => void;
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
    };
  }
  return brick;
}

export function WorkbenchComponentSelect({
  brickList,
  storyList,
  isShowSuggest = true,
  onActionClick,
}: ComponentSelectProps): React.ReactElement {
  const [filterValue, setFilterValue] = useState<Record<string, string>>({});
  const [componentList, setComponetList] =
    useState<Record<string, BrickOptionItem[]>>();

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
      brickList.forEach((item) => {
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
    []
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

  return (
    <ComponentSelectContext.Provider
      value={{
        snippetsOfBrickMap,
      }}
    >
      <div className={styles.componentSelect}>
        <Tabs centered size="small">
          {componentList &&
            Object.entries(componentList).map(([k, v]) => (
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
      const renderList = list.map((item) => transformInfo(item, storyList));
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

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const { width } = refWrapper.current.getBoundingClientRect();
      setColumnNumber(Math.round(width / 140));
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
    if (refWrapper.current) {
      const { top } = refWrapper.current.getBoundingClientRect();
      refWrapper.current.style.height = `calc(100vh - ${top || 280}px)`;
      refWrapper.current.style.overflow = "auto";
    }
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

const findItemElement = (elem: HTMLElement): HTMLElement => {
  while (elem) {
    if (elem.className === styles.brickItem) {
      return elem;
    }

    elem = elem.parentElement;
  }
};

function ComponentGroup({
  componentType,
  children,
  columnNumber,
  onActionClick,
}: ComponentGroupProps): React.ReactElement {
  const [curIndex, setCurIndex] = useState<number>(-1);
  const [show, setShow] = useState(false);
  const [snippetsOfBrick, setSnippetsOfBrick] = useState<BrickOptionItem[]>([]);
  const [arrowOffset, setArrowOffset] = useState(0);
  const { snippetsOfBrickMap } = useContext(ComponentSelectContext);

  const handleActionClick = (
    type: string,
    data: BrickOptionItem,
    index: number,
    e: React.MouseEvent
  ): void => {
    if (type === "snippet") {
      setCurIndex(index);
      setSnippetsOfBrick(snippetsOfBrickMap.get(data.id));
      const brickItemElem = findItemElement(e.target as HTMLElement);
      if (brickItemElem) {
        const { width } = brickItemElem.getBoundingClientRect();
        const cursor = index - Math.floor(index / columnNumber) * columnNumber;
        // 15px 为项目之间的间距
        const position = width * (cursor + 1) + cursor * 15 - width / 2;
        setArrowOffset(position);
      }
      setShow(true);
    }
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
      {children.map((item, index) => (
        <ComponentItem
          key={item.id}
          {...item}
          onActionClick={(type, data, e) =>
            handleActionClick(type, data, index, e)
          }
        />
      ))}
      {componentType === "brick" && (
        <CSSTransition
          in={show}
          timeout={300}
          unmountOnExit
          classNames={{
            enter: styles.slideEnter,
            exit: styles.slideExit,
          }}
        >
          <div
            className={styles.popover}
            style={{
              gridRowStart: Math.floor(curIndex / columnNumber) + 2,
              gridColumn: `span ${columnNumber}`,
              gridTemplateColumns: `repeat(${columnNumber}, 1fr)`,
            }}
          >
            <span
              className={styles.close}
              onClick={() => setShow(false)}
            ></span>
            <span
              className={styles.arrow}
              style={{
                left: arrowOffset,
              }}
            />
            {snippetsOfBrick.map((row) => (
              <ComponentItem
                key={row.id}
                {...row}
                onDragEnd={() => setShow(false)}
              />
            ))}
          </div>
        </CSSTransition>
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
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const handleDragStart = (e: React.DragEvent): void => {
    setDragImage(e, componentData.title);
    const nodeData = {
      brick: componentData.id,
      bricks: componentData.bricks,
      type: "brick",
    };
    e.dataTransfer.setData("nodeData", JSON.stringify(nodeData));
  };

  const getIcon = (data: Partial<BrickOptionItem>): React.ReactElement => {
    if (data.icon) {
      return (
        <GeneralIcon
          icon={data.icon}
          style={{
            fontSize: 20,
          }}
        />
      );
    }
    if (data.thumbnail) {
      return (
        <img
          style={{
            width: "auto",
            height: "100%",
          }}
          src={
            // Prepend public_root if the thumbnail is not an absolute url.
            /^(?:https?|data):|^\//.test(data.thumbnail)
              ? data.thumbnail
              : `${window.PUBLIC_ROOT ?? ""}${data.thumbnail}`
          }
        />
      );
    }
    return <BuildFilled />;
  };

  const handleActionClick = (
    type: string,
    data: any,
    e: React.MouseEvent
  ): void => {
    componentData.onActionClick?.(type, data, e);
  };

  const itemElem = (
    <div
      draggable="true"
      className={styles.componentItem}
      title={componentData.description || componentData.title}
      onDragStart={handleDragStart}
      onDragEnd={componentData?.onDragEnd}
    >
      <div className={styles.icon}>{getIcon(componentData)}</div>
      <div className={styles.name}>{componentData.title}</div>
    </div>
  );

  if (componentData.layerType === "brick" && componentData.type === "brick") {
    return (
      <div className={styles.brickItem}>
        <div className={styles.actionWrapper}>
          <span
            className={styles.badge}
            title={t(K.DOCUMENT)}
            onClick={(e) => handleActionClick("document", componentData, e)}
          >
            <GeneralIcon
              icon={{
                lib: "easyops",
                category: "app",
                icon: "next-documents",
              }}
            />
          </span>
          {snippetsOfBrickMap.get(componentData.id) && (
            <span
              className={styles.badge}
              title={t(K.SNIPPET)}
              onClick={(e) => handleActionClick("snippet", componentData, e)}
            >
              <GeneralIcon
                icon={{ lib: "antd", icon: "thunderbolt", theme: "outlined" }}
              />
            </span>
          )}
        </div>
        {itemElem}
      </div>
    );
  }

  return itemElem;
}
