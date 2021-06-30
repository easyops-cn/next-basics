import { isNil, cloneDeep } from "lodash";
import { i18nText } from "@next-core/brick-kit";
import { Story, BuilderRouteOrBrickNode } from "@next-core/brick-types";
import {
  brickSearchResultLimit,
  LIB_ALL_CATEGORY,
  frequentlyUsedBricks,
  frequentlyUsedLayout,
  frequentlyUsedWidget,
} from "../constants";
import { BrickOptionItem, LayerType } from "../interfaces";

export function filterBricks({
  q,
  category = LIB_ALL_CATEGORY,
  brickList,
  storyList,
  limit = brickSearchResultLimit,
  appId,
  rootNode,
  layerType,
}: {
  q: string;
  category?: string;
  brickList: BrickOptionItem[];
  storyList: Story[];
  limit?: number;
  appId: string;
  rootNode?: BuilderRouteOrBrickNode;
  layerType: LayerType;
}): BrickOptionItem[] {
  const formatBrickList = processBricks(
    rootNode?.type === "custom-template"
      ? brickList.filter((item) => item.name !== rootNode.templateId)
      : brickList,
    storyList,
    appId,
    category,
    layerType
  );

  const keywords = (q ?? "").toLowerCase().match(/\S+/g);
  if (!keywords) {
    return formatBrickList.slice(0, limit);
  }

  const bricks: BrickOptionItem[] = [];
  for (const brick of formatBrickList) {
    if (
      keywords.every(
        (keyword) =>
          brick.name.toLowerCase().includes(keyword) ||
          brick.title?.toLowerCase()?.includes(keyword)
      )
    ) {
      bricks.push(brick);
      if (bricks.length === limit) {
        break;
      }
    }
  }
  return bricks;
}

export function processBricks(
  brickList: BrickOptionItem[],
  storyList: Story[],
  appId: string,
  category: string = LIB_ALL_CATEGORY,
  layerType: LayerType
): BrickOptionItem[] {
  const frequentlyUsed =
    layerType === LayerType.LAYOUT
      ? frequentlyUsedLayout
      : layerType === LayerType.WIDGET
      ? frequentlyUsedWidget
      : frequentlyUsedBricks;

  const sortedBricks =
    category === LIB_ALL_CATEGORY
      ? insertBricks(brickList, frequentlyUsed)
      : brickList;

  return sortedBricks
    .filter((item) => {
      if (!item.layerType) {
        //  default brick type if no value
        return layerType === LayerType.BRICK;
      }

      return item.layerType === layerType;
    })
    .map((item) => {
      const brick = {
        ...item,
        shortName: getShortName(item, appId),
      };
      const find = storyList?.find((story) => story.storyId === item.name);
      if (find) {
        return {
          ...brick,
          category: find.category,
          title: i18nText(find.text),
          description: i18nText(find.description),
          icon: find.icon,
        };
      }

      return brick;
    })
    .filter((item) => {
      if (isNil(category) || category === LIB_ALL_CATEGORY) {
        return true;
      }

      return item.category === category;
    });
}

export function getShortName(brick: BrickOptionItem, appId: string): string {
  if (
    ["customTemplate", "snippet"].includes(brick.type) &&
    !brick.name.includes(".")
  ) {
    return brick.name;
  } else {
    const [, ...rest] = brick.name.split(".");
    return rest.join(".");
  }
}

export function insertBricks(
  bricks: BrickOptionItem[],
  frequentlyUsed: BrickOptionItem[]
): BrickOptionItem[] {
  const brickList = cloneDeep(bricks);
  for (const item of [...frequentlyUsed].reverse()) {
    const index = brickList.findIndex((brick) => {
      return brick.id === item.id && brick.type === item.type;
    });

    if (index !== -1) {
      const [remove] = brickList.splice(index, 1);
      brickList.unshift(remove);
    }
  }

  return brickList;
}
