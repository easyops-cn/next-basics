import { cloneDeep } from "lodash";
import { BrickOptionItem } from "../builder-container/interfaces";
import { scanBricksInBrickConf } from "@next-core/brick-utils";
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
 *
 * 在现有的 snippet 中找出只配置一个构件的片段，当成是该构件的下所属的 `构件 snippet`
 * 如果有 useInBricks 字段的，表明该 snippets 可用在这些构件上其归属于 `场景化 snippet`
 */
export function getSnippetsOfBrickMap(
  snippetList: BrickOptionItem[]
): Map<string, Map<SnippetType, BrickOptionItem[]>> {
  const brickMap = new Map();
  snippetList?.forEach((item) => {
    const bricks: string[] = [];
    item.bricks?.forEach((brickConf) => {
      bricks.push(...scanBricksInBrickConf(brickConf));
    });

    if (bricks.length === 1) {
      const brick = bricks[0];
      const find = brickMap.get(brick);
      if (!find) {
        brickMap.set(brick, new Map([[SnippetType.SelfBrick, [item]]]));
      } else {
        const selfSnippets = find.get(SnippetType.SelfBrick);

        selfSnippets
          ? selfSnippets.push(item)
          : find.set(SnippetType.SelfBrick, [item]);
      }
    } else {
      item.useInBricks?.forEach((brick) => {
        const find = brickMap.get(brick);
        if (!find) {
          brickMap.set(brick, new Map([[SnippetType.Scene, [item]]]));
        } else {
          const sceneSnippets = find.get(SnippetType.Scene);

          sceneSnippets
            ? sceneSnippets.push(item)
            : find.set(SnippetType.Scene, [item]);
        }
      });
    }
  });

  return brickMap;
}
