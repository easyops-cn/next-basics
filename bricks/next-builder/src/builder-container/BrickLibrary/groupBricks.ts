import { groupBy } from "lodash";
import { BrickOptionItem, GroupedBricks } from "../interfaces";

export function groupBricks(
  brickList: BrickOptionItem[],
  appId: string
): GroupedBricks[] {
  return Object.entries(
    groupBy(
      brickList.map((brick) => {
        if (brick.type === "customTemplate" && !brick.name.includes(".")) {
          // For a custom template defined in a micro-app,
          // it has no scope name in its brick name.
          return {
            ...brick,
            scopeName: appId,
            shortName: brick.name,
          };
        }
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
