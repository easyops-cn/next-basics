// @ts-nocheck
import React from "react";
import { Descriptions } from "antd";
import { DescriptionsProps } from "antd/lib/descriptions";
import { isPlainObject } from "lodash";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickDescriptionsItemProps } from "./index";

import styles from "./BrickDescriptions.module.css";

export interface BrickDescriptionsProps {
  configProps?: DescriptionsProps;
  itemList: BrickDescriptionsItemProps[];
  itemIdBrickMap?: Record<string, { useBrick: UseBrickConf }>;
  dataSource?: any;
  descriptionTitle?: string;
  column?: number;
  size?: "default" | "middle" | "small";
  bordered?: boolean;
  layout?: "horizontal" | "vertical";
  hideGroups?: string[] | string;
  extraBrick?: {
    useBrick: UseBrickConf;
  };
}

export function BrickDescriptions(
  props: BrickDescriptionsProps
): React.ReactElement {
  const {
    descriptionTitle,
    column,
    size,
    bordered,
    layout,
    dataSource,
    configProps,
    itemList,
    itemIdBrickMap,
    hideGroups,
    extraBrick,
  } = props;

  const hideGroupsSet = new Set([].concat(hideGroups).filter(Boolean));
  // istanbul ignore next
  const renderLegacyComponent = (
    item: BrickDescriptionsItemProps
  ): React.ReactElement => {
    // eslint-disable-next-line no-console
    console.warn(
      "`<presentational-bricks.brick-descriptions>.itemList[].component` are deprecated, use `useBrick` instead."
    );
    const { field, component } = item;
    if (field && Array.isArray(dataSource[field])) {
      return dataSource[field].map((data: any, i: number) => (
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
                dataSource: dataSource,
                ...component.properties,
              });
          }}
        />
      );
    }
  };

  // istanbul ignore next
  const renderBrick = (item: {
    useBrick?: UseBrickConf;
  }): React.ReactElement => {
    return <BrickAsComponent useBrick={item.useBrick} data={dataSource} />;
  };

  return (
    <Descriptions
      title={descriptionTitle}
      column={column}
      size={size}
      bordered={bordered}
      layout={layout}
      extra={extraBrick && renderBrick(extraBrick)}
      className={styles.descriptionWrapper}
      {...configProps}
    >
      {itemList
        ?.filter((item) => !hideGroupsSet.has(item.group))
        .map((item, idx) => {
          const { id, text, component, ...itemProps } = item;
          const useBrick = item.useBrick || itemIdBrickMap?.[id]?.useBrick;

          return (
            <Descriptions.Item
              key={id || idx}
              {...itemProps}
              className={styles.descriptionItem}
            >
              {useBrick
                ? renderBrick({ ...item, useBrick })
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
