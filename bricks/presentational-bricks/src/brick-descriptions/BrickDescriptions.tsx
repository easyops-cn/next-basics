import React from "react";
import { Descriptions, Card } from "antd";
import {
  DescriptionsProps,
} from "antd/lib/descriptions";
import { isPlainObject } from "lodash";
import { BrickAsComponent } from "@next-core/brick-kit";
import styles from "./BrickDescriptions.module.css";
import { BrickDescriptionsItemProps } from "./index";

export interface BrickDescriptionsProps {
  configProps?: DescriptionsProps;
  itemList: BrickDescriptionsItemProps[];
  dataSource?: any;
  descriptionTitle?: string;
  column?: number;
  size?: "default" | "middle" | "small";
  bordered?: boolean;
  layout?: "horizontal" | "vertical";
}

export function BrickDescriptions(
  props: BrickDescriptionsProps
): React.ReactElement {
  const { configProps, itemList } = props;
  // istanbul ignore next
  const renderLegacyComponent = (
    item: BrickDescriptionsItemProps
  ): React.ReactElement => {
    // eslint-disable-next-line no-console
    console.warn(
      "`<presentational-bricks.brick-descriptions>.itemList[].component` are deprecated, use `useBrick` instead."
    );
    const { field, component } = item;
    if (field && Array.isArray(props.dataSource[field])) {
      return props.dataSource[field].map((data: any, i: number) => (
        <component.brick
          key={`${item.id}-${i}`}
          ref={(el: any) => {
            el &&
              Object.assign(el, {
                item,
                dataSource: data,
                ...component.properties,
              });
          }}
        />
      ));
    } else {
      return (
        <component.brick
          key={item.id}
          ref={(el: any) => {
            el &&
              Object.assign(el, {
                item,
                dataSource: props.dataSource,
                ...component.properties,
              });
          }}
        />
      );
    }
  };

  // istanbul ignore next
  const renderBrick = (
    item: BrickDescriptionsItemProps
  ): React.ReactElement => {
    return (
      <BrickAsComponent useBrick={item.useBrick} data={props.dataSource} />
    );
  };

  return (
    <Descriptions
      title={props.descriptionTitle}
      column={props.column}
      size={props.size}
      bordered={props.bordered}
      layout={props.layout}
      className={styles.descriptionWrapper}
      {...configProps}
    >
      {itemList?.map((item, idx) => {
        const { text, component, useBrick, ...itemProps } = item;
        return (
          <Descriptions.Item
            key={item.id || idx}
            {...itemProps}
            className={styles.descriptionItem}
          >
            {useBrick
              ? renderBrick(item)
              : component
              ? renderLegacyComponent(item)
              : isPlainObject(text)
              ? JSON.stringify(text)
              : text}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
}
