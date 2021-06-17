import { isNil, pick, uniqBy } from "lodash";
import { i18nText } from "@next-core/brick-kit";
import {
  Story,
  BuilderRouteOrBrickNode,
  BuilderSnippetNode,
} from "@next-core/brick-types";
import {
  brickSearchResultLimit,
  LIB_ALL_CATEGORY,
  frequentlyUsedBricks,
} from "../constants";
import { BrickOptionItem, InstalledBrick } from "../interfaces";

export function filterBricks({
  q,
  category = LIB_ALL_CATEGORY,
  brickList,
  storyList,
  installedBricks,
  limit = brickSearchResultLimit,
  appId,
  rootNode,
}: {
  q: string;
  category?: string;
  brickList: BrickOptionItem[];
  storyList: Story[];
  installedBricks: InstalledBrick[];
  limit?: number;
  appId: string;
  rootNode?: BuilderRouteOrBrickNode;
}): BrickOptionItem[] {
  const formatBrickList = processBricks(
    rootNode?.type === "custom-template"
      ? brickList.filter((item) => item.name !== rootNode.templateId)
      : brickList,
    storyList,
    installedBricks,
    appId,
    category
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
  installedBricks: InstalledBrick[],
  appId: string,
  category: string = LIB_ALL_CATEGORY
): BrickOptionItem[] {
  const sortedBricks = (
    category === LIB_ALL_CATEGORY
      ? insertBricks(brickList, frequentlyUsedBricks)
      : brickList
  ).concat(
    (
      installedBricks.filter(
        // istanbul ignore next: Will change soon.
        (brick) => brick.type === "snippet"
      ) as BuilderSnippetNode[]
    ).map(
      // istanbul ignore next: Will change soon.
      (snippet) =>
        ({
          type: "snippet",
          name: snippet.id,
          title: i18nText(snippet.text),
          description: i18nText(snippet.description),
          ...pick(snippet, ["category", "thumbnail", "bricks"]),
        } as BrickOptionItem)
    )
  );

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
  frequentlyUsedBricks: BrickOptionItem[]
): BrickOptionItem[] {
  return uniqBy(
    frequentlyUsedBricks.concat(bricks),
    (item) => `${item.type}:${item.name}`
  );
}
