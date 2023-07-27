import { cloneDeep } from "lodash";
import { BrickOptionItem } from "../builder-container/interfaces";
// import { scanBricksInBrickConf } from "@next-core/brick-utils";
import { groupItem, BrickSortField, SnippetType } from "./constants";

export function adjustBrickSort(
  group: groupItem[],
  sortTemplates: BrickSortField[]
): groupItem[] {
  if (!sortTemplates) return group;

  const list = cloneDeep(group);

  let cursor = 0;
  sortTemplates.forEach((item) => {
    const groupIndex = list.findIndex((g) => g.key === item.group);

    if (groupIndex !== -1) {
      const [element] = list.splice(groupIndex, 1);
      list.splice(cursor, 0, element);
      cursor++;

      const bricks = element.children;
      let brickCursor = 0;
      item.position?.forEach((id) => {
        const brickIndex = bricks.findIndex((brick) => brick.id === id);

        if (brickIndex !== -1) {
          const [movedBrick] = bricks.splice(brickIndex, 1);
          bricks.splice(brickCursor, 0, movedBrick);
          brickCursor++;
        }
      });
    }
  });

  return list;
}

/**
 * 如果有 useInBricks 字段的，表明该 snippets 可用在这些构件上其归属于 `场景化 snippet`
 * 否则找到最外层的brick，当成是该构件的下所属的 `构件 snippet`
 *
 */
export function getSnippetsOfBrickMap(
  snippetList: BrickOptionItem[]
): Map<string, Map<SnippetType, BrickOptionItem[]>> {
  const brickMap = new Map();

  snippetList?.forEach((item) => {
    const hasThumbnail = item.thumbnail;
    if (item.useInBricks) {
      item.useInBricks?.forEach((brick) => {
        const find = brickMap.get(brick);
        if (!find) {
          brickMap.set(brick, new Map([[SnippetType.Scene, [item]]]));
        } else {
          const sceneSnippets = find.get(
            SnippetType.Scene
          ) as Array<BrickOptionItem>;

          if (sceneSnippets) {
            if (hasThumbnail) {
              const lastNoThumbnailIndex =
                sceneSnippets.findIndex((item) => !item.thumbnail) !== -1
                  ? sceneSnippets.findIndex((item) => !item.thumbnail)
                  : sceneSnippets.length;
              sceneSnippets.splice(lastNoThumbnailIndex, 0, item);
            } else {
              sceneSnippets.push(item);
            }
          } else {
            find.set(SnippetType.Scene, [item]);
          }
        }
      });
    } else if (item.bricks) {
      const brick = item.bricks[0].brick;
      const find = brickMap.get(brick);
      if (!find) {
        brickMap.set(brick, new Map([[SnippetType.SelfBrick, [item]]]));
      } else {
        const selfSnippets = find.get(
          SnippetType.SelfBrick
        ) as Array<BrickOptionItem>;

        if (selfSnippets) {
          if (hasThumbnail) {
            const lastNoThumbnailIndex =
              selfSnippets.findIndex((item) => !item.thumbnail) !== -1
                ? selfSnippets.findIndex((item) => !item.thumbnail)
                : selfSnippets.length;
            selfSnippets.splice(lastNoThumbnailIndex, 0, item);
          } else {
            selfSnippets.push(item);
          }
        } else {
          find.set(SnippetType.SelfBrick, [item]);
        }
      }
    }
  });

  return brickMap;
}
