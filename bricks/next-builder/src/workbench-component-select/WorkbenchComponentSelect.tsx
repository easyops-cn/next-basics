import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input, Tabs } from "antd";
import { BrickOptionItem } from "../builder-container/interfaces";
import {
  suggest,
  defaultGroup,
  suggestGroup,
  groupItem,
  i18nTransform,
} from "./constants";
import { i18nText } from "@next-core/brick-kit";
import { Story } from "@next-core/brick-types";
import { BuildFilled } from "@ant-design/icons";
import { debounce } from "lodash";
import { GeneralIcon } from "@next-libs/basic-components";
import ResizeObserver from "resize-observer-polyfill";
import styles from "./WorkbenchComponentSelect.module.css";

interface ComponentSelectProps {
  brickList: BrickOptionItem[];
  storyList: Story[];
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
        } else {
          let key = item.type;
          const brickItem: BrickOptionItem = {
            ...item,
            category: item.type === "template" ? item.type : item.category,
          };
          if (item.type === "template") key = "brick";
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

  return (
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
              />
            </Tabs.TabPane>
          ))}
      </Tabs>
    </div>
  );
}

interface ComponentListProps {
  componentType: string;
  componentList: BrickOptionItem[];
  q: string;
  storyList: Story[];
}

function ComponentList({
  componentType,
  componentList,
  q,
  storyList,
}: ComponentListProps): React.ReactElement {
  const initGroup = useCallback((): groupItem[] => {
    return suggest[componentType].length > 0
      ? suggestGroup.concat(defaultGroup[componentType] ?? [])
      : defaultGroup[componentType] ?? [];
  }, [componentType]);
  const [group, setGroup] = useState<groupItem[]>(initGroup());
  const [list, setList] = useState([]);
  const [suggestList, setSuggestList] = useState([]);
  const [columnNumber, setColumnNumber] = useState(3);
  const refWrapper = useRef<HTMLDivElement>();

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
        group: newGroup,
        list: result,
      };
    },
    [initGroup, storyList]
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
    setList(list);
  }, [suggestList, componentList, q, getRenderData]);

  useEffect(() => {
    if (refWrapper.current) {
      const { top } = refWrapper.current.getBoundingClientRect();
      refWrapper.current.style.height = `calc(100vh - ${top || 280}px)`;
      refWrapper.current.style.overflow = "auto";
    }
  }, [group, list]);

  return (
    <div ref={refWrapper}>
      {group?.length > 0 ? (
        group.map((item) => {
          if (item.children?.length > 0) {
            return (
              <div key={item.key}>
                <div className={styles.componentCategory}>{item.text}</div>
                <div
                  className={styles.componentWraper}
                  style={{
                    gridTemplateColumns: `repeat(${columnNumber}, 1fr)`,
                  }}
                >
                  {item.children.map((item, index) => (
                    <ComponentItem key={index} {...item} />
                  ))}
                </div>
              </div>
            );
          }
        })
      ) : (
        <div
          className={styles.componentWraper}
          style={{
            gridTemplateColumns: `repeat(${columnNumber}, 1fr)`,
          }}
        >
          {list.map((item, index) => (
            <ComponentItem key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

function ComponentItem(
  componentData: Partial<BrickOptionItem>
): React.ReactElement {
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
          src={data.thumbnail}
        />
      );
    }
    return <BuildFilled />;
  };

  return (
    <div
      draggable="true"
      className={styles.componentItem}
      title={componentData.description || componentData.title}
      onDragStart={handleDragStart}
    >
      <div className={styles.icon}>{getIcon(componentData)}</div>
      <div className={styles.name}>{componentData.title}</div>
    </div>
  );
}
