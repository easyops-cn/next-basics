import { cloneDeep } from "lodash";
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
