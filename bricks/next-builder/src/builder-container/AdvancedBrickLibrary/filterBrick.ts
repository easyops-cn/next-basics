import {
  brickSearchResultLimit,
  LIB_ALL_CATEGORY,
  frequentlyUsedBricks,
} from "../constants";
import i18next from "i18next";
import { BrickOptionItem } from "../interfaces";
import { Story, I18nString } from "@next-core/brick-types";
import { isNil, uniqBy } from "lodash";

const lang = i18next.language
  ? (i18next.language.split("-")[0] as keyof I18nString)
  : "zh";

export function filterBricks({
  q,
  category = LIB_ALL_CATEGORY,
  brickList,
  storyList,
  limit = brickSearchResultLimit,
  appId,
}: {
  q: string;
  category?: string;
  brickList: BrickOptionItem[];
  storyList: Story[];
  limit?: number;
  appId: string;
}) {
  const formatBirckList = processBricks(brickList, storyList, appId, category);

  const keywords = (q ?? "").toLowerCase().match(/\S+/g);
  if (!keywords) {
    return formatBirckList.slice(0, limit);
  }

  const bricks: BrickOptionItem[] = [];
  for (const brick of formatBirckList) {
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
  category: string = LIB_ALL_CATEGORY
) {
  const sortedBricks =
    category === LIB_ALL_CATEGORY
      ? insertBricks(brickList, frequentlyUsedBricks)
      : brickList;

  return sortedBricks
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
          title: find.text?.[lang],
          description: find.description?.[lang],
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
  if (brick.type === "customTemplate" && !brick.name.includes(".")) {
    return brick.name;
  } else {
    const [, ...rest] = brick.name.split(".");
    return rest.join(".");
  }
}

export function insertBricks(
  bricks: BrickOptionItem[],
  frequentlyUsedBricks: BrickOptionItem[]
) {
  return uniqBy(
    frequentlyUsedBricks.concat(bricks),
    (item) => `${item.type}:${item.name}`
  );
}
