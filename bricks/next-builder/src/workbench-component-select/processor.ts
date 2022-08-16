import { cloneDeep } from "lodash";
import { BrickOptionItem } from "../builder-container/interfaces";
import { scanBricksInBrickConf } from "@next-core/brick-utils";
import { groupItem, BrickSortField } from "./constants";

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
 * 在现有的 snippet 中找出只配置一个构件的片段，当成是该构件的下所属的 snippet
 */
export function getSnippetsOfBrickMap(
  snippetList: BrickOptionItem[]
): Map<string, BrickOptionItem[]> {
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
        const arr = [item];
        brickMap.set(brick, arr);
      } else {
        find.push(item);
      }
    }
  });

  return brickMap;
}
