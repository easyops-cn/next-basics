import { BrickInfoItem, Field } from "./interface";

export function getTargetBrick(
  useBrickList: BrickInfoItem[],
  field: Field
): BrickInfoItem {
  return useBrickList.find((row) => {
    const result = row.brick === field.brick;

    if (!field.brickType) {
      return result;
    }

    return result && row.brickType === field.brickType;
  });
}
