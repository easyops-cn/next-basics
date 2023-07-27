import { isNil } from "lodash";
import { getRuntime, i18nText } from "@next-core/brick-kit";
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
      ? brickList.filter((item) => item.id !== rootNode.templateId)
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
      keywords.every((keyword) =>
        (brick.$searchTextPool || [brick.id.toLowerCase()]).some((text) =>
          text.includes(keyword)
        )
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

  const installedBricksEnabled =
    getRuntime().getFeatureFlags()["next-builder-installed-bricks"];

  return (
    sortedBricks
      // Defaults to brick layer.
      .filter((item) => layerType === (item.layerType ?? LayerType.BRICK))
      .map((item) => {
        const brick = {
          ...item,
        };
        const find =
          !installedBricksEnabled &&
          storyList?.find((story) => story.storyId === item.id);
        if (find) {
          return {
            ...brick,
            category: find.category,
            title: i18nText(find.text),
            description: i18nText(find.description),
            icon: find.icon,
            $searchTextPool: (brick.$searchTextPool || []).concat(
              find.text ? Object.values(find.text).filter(Boolean) : []
            ),
          };
        }

        return brick;
      })
      .filter((item) => {
        if (isNil(category) || category === LIB_ALL_CATEGORY) {
          return true;
        }

        return item.category === category;
      })
  );
}

export function insertBricks(
  bricks: BrickOptionItem[],
  frequentlyUsed: Pick<BrickOptionItem, "type" | "id">[]
): BrickOptionItem[] {
  const brickList = bricks.slice();
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
