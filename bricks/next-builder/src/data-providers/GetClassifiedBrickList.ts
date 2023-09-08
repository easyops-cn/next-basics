import { createProviderClass } from "@next-core/brick-utils";
import { getRuntime } from "@next-core/brick-kit";
import i18next from "i18next";
import { omit, get, reduce } from "lodash";
import { BrickOptionItem } from "../builder-container/interfaces";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import {
  i18nTransform as typeI18nMap,
  defaultGroup,
  defaultBlankListOfBricks,
} from "../workbench-component-select/constants";

const push = <T>(obj: Record<string, T[]>, field: string, value: T): void => {
  if (!field) return;
  obj[field] ? obj[field].push(value) : (obj[field] = [value]);
};

export function GetClassifiedBrickList(brickList: BrickOptionItem[]): any {
  const { config } = getRuntime().getCurrentApp();

  const libraryShowV3Brick = config?.libraryShowV3Brick;
  const symbolForAll = "__all__";
  const classifiedList: Record<string, Record<string, any>> = {};
  const brickMap: Record<string, any> = {};
  const i18nMap = {
    type: typeI18nMap,
    category: reduce(
      typeI18nMap,
      (pre, value, key) => {
        pre[key] = {
          [symbolForAll]: i18next.t(`${NS_NEXT_BUILDER}:${K.ALL}`),
        };
        defaultGroup[key]?.map((v) => {
          pre[key][v.key as string] = v.text;
        });
        return pre;
      },
      {} as Record<string, Record<string, string>>
    ),
  };

  const i18nTransform = (type: string, key: string): string => {
    return get(i18nMap, type)?.[key] || key;
  };

  const filterBricks = brickList.filter(
    (item) => !defaultBlankListOfBricks.some((id) => item.id === id)
  );

  filterBricks.forEach((item) => {
    let _type;
    // const _category = item.id.includes(".") ? item.id.split(".")[0] : null;
    const _category = item.category;
    const _originBricks = []
      .concat(item.useInBricks || [])
      .concat(get(item, "bricks[0].brick") || []);

    if (item.type === "brick" && item.layerType !== "snippet") {
      // brick, widget
      _type = item.v3Brick ? "v3Brick" : item.layerType;
    } else if (item.type === "provider") {
      // provider
      _type = "brick";
    } else if (item.type === "customTemplate") {
      // customTemplate
      _type = item.type;
    } else if (item.type === "snippet" && item.layerType !== "brick") {
      // layout
      _type = item.layerType;
    }

    const _item = { ...item, _type, _category, _originBricks };

    brickMap[_item.id] = _item;

    if (!_type) return;

    if (classifiedList[_type]) {
      push(classifiedList[_type], symbolForAll, _item);
      push(classifiedList[_type], _category, _item);
    } else {
      classifiedList[_type] = {
        [symbolForAll]: [_item],
      };
      push(classifiedList[_type], _category, _item);
    }
  });
  return {
    classifiedList: libraryShowV3Brick
      ? classifiedList
      : omit(classifiedList, "v3Brick"),
    brickMap,
    i18nTransform,
  };
}

customElements.define(
  "next-builder.provider-get-classified-brick-list",
  createProviderClass(GetClassifiedBrickList)
);
