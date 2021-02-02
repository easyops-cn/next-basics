import { groupBy } from "lodash";
import { BrickOptionItem, GroupedBricks } from "../interfaces";

export function groupBricks(brickList: BrickOptionItem[]): GroupedBricks[] {
  return Object.entries(
    groupBy(
      brickList.map((brick) => {
        const [scopeName, ...rest] = brick.name.split(".");
        return {
          ...brick,
          scopeName,
          shortName: rest.join("."),
        };
      }),
      (item) => item.scopeName
    )
  ).map(([scope, bricks]) => ({ scope, bricks }));
}
