import { TypeFieldItem, ComparatorOption } from "../interface";
import { get } from "lodash";

export function getDefaultComparator(
  fieldList: TypeFieldItem[],
  id: string,
  comparatorMap: Record<string, ComparatorOption[]>
): string {
  const currentField = fieldList.find((item) => item.id === id);

  return get(comparatorMap[currentField?.originType], "[0].id");
}
