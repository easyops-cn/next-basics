import { groupBricks } from "./groupBricks";
import { brickSearchResultLimit, frequentlyUsedBricks } from "../constants";
import { BrickOptionItem, GroupedBricks } from "../interfaces";

export function searchBricks(
  q: string,
  brickList: BrickOptionItem[],
  appId: string,
  limit = brickSearchResultLimit
): GroupedBricks[] {
  const keywords = (q ?? "").toLowerCase().match(/\S+/g);
  if (!keywords || !brickList) {
    return groupBricks(frequentlyUsedBricks.slice(0, limit), appId);
  }
  const bricks: BrickOptionItem[] = [];
  for (const brick of brickList) {
    if (
      keywords.every((keyword) => brick.name.toLowerCase().includes(keyword))
    ) {
      bricks.push(brick);
      if (bricks.length === limit) {
        break;
      }
    }
  }
  return groupBricks(bricks, appId);
}
