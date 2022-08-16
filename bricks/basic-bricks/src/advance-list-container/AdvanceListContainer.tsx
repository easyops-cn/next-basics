import React, { useState, useEffect } from "react";
import { BrickAsComponent } from "@next-core/brick-kit";
import { List } from "antd";
import { UseBrickConf } from "@next-core/brick-types";
import classNames from "classnames";
import style from "./style.module.css";
export interface AdvanceListContainerProps {
  data: {
    list: Record<string, any>[];
    page_size?: number | string;
    page?: number | string;
  };
  titleBrick: { useBrick: UseBrickConf };
  suffixBrick?: { useBrick: UseBrickConf };
  itemClick?: (detail: any) => void;
  selectable?: boolean;
  defaultActiveIndex?: number;
  notTriggerClickEventWhenInit?: boolean;
}
export function AdvanceListContainer(
  props: AdvanceListContainerProps
): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(props.defaultActiveIndex || 0);
  const clickItemEvent = (data: any, index: number): void => {
    setActiveIndex(index);
    props.itemClick({ item: data, index });
  };
  const renderItemExtra = (item: Record<string, any>): React.ReactElement => {
    return (
      props?.suffixBrick?.useBrick && (
        <BrickAsComponent
          useBrick={props.suffixBrick.useBrick}
          data={item}
        ></BrickAsComponent>
      )
    );
  };
  useEffect(() => {
    if (props.data.list) {
      const item = props.data.list[props.defaultActiveIndex];
      item &&
        !props.notTriggerClickEventWhenInit &&
        props.itemClick({ item, index: props.defaultActiveIndex });
    }
  }, [props.defaultActiveIndex, props.data]);
  const renderItem = (
    item: Record<string, any>,
    index: number
  ): React.ReactElement => {
    return (
      <div
        className={classNames({
          [style.itemContainer]: true,
          [style.activeItem]: props.selectable && activeIndex === index,
        })}
        onClick={() => clickItemEvent(item, index)}
      >
        <div className={style.itemContainerInner}>
          <BrickAsComponent
            useBrick={props.titleBrick.useBrick}
            data={item}
          ></BrickAsComponent>
          {renderItemExtra(item)}
        </div>
      </div>
    );
  };
  return (
    <div>
      <List dataSource={props?.data?.list || []} renderItem={renderItem}></List>
    </div>
  );
}
