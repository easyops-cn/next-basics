import { UseBrickConf } from "@next-core/brick-types";
import React from "react";
import { BrickAsComponent } from "@next-core/brick-kit";
import { CustomColumnComponent } from "../brick-table";

export const getCustomHeader = (
  useBrick: UseBrickConf,
  data?: { title: unknown }
): (() => React.ReactElement) => {
  return function CustomHeader() {
    return <BrickAsComponent useBrick={useBrick} data={data} />;
  };
};

export const getCustomComp = (
  useBrick: UseBrickConf,
  component?: CustomColumnComponent,
  itemBrickDataMap?: ItemBrickDataMap,
  awardsComponent?: (index: number) => void | null,
  size?: "default" | "small"
) => {
  return function CustomComp(
    value: any,
    item: Record<string, any>,
    index: number
  ) {
    if (useBrick) {
      let brickData: BrickData = itemBrickDataMap.get(item);

      if (!brickData) {
        brickData = {
          cellData: value,
          rowData: item,
          columnIndex: index,
        };
        itemBrickDataMap.set(item, brickData);
      }

      if (typeof awardsComponent === "function") {
        return (
          <div style={{ display: "flex" }}>
            {awardsComponent(index)}
            <div style={{ margin: "auto 0" }}>
              <BrickAsComponent useBrick={useBrick} data={brickData} />
            </div>
          </div>
        );
      }
      return <BrickAsComponent useBrick={useBrick} data={brickData} />;
    }

    if (component.fields) {
      // eslint-disable-next-line no-console
      console.warn(
        "`<presentational-bricks.brick-table>.columns[].component` is deprecated, use `useBrick` instead."
      );
      const props: Record<string, any> = Object.assign(
        {},
        component.properties
      );
      const {
        value: valueKey,
        item: itemKey,
        index: indexKey,
      } = component.fields;
      if (valueKey) {
        props[valueKey] = value;
      }

      if (itemKey) {
        props[itemKey] = item;
      }

      if (indexKey) {
        props[indexKey] = index;
      }

      if (typeof awardsComponent === "function") {
        return (
          <>
            {awardsComponent(index)}
            <BrickAsComponent
              key={value}
              useBrick={{
                ...component,
                properties: props,
              }}
            />
          </>
        );
      }

      return (
        <BrickAsComponent
          key={value}
          useBrick={{
            ...component,
            properties: props,
          }}
        />
      );
    }
  };
};

type ItemBrickDataMap = Map<unknown, BrickData>;
type BrickData = {
  cellData: unknown;
  rowData: Record<string, unknown>;
  columnIndex: number;
};
