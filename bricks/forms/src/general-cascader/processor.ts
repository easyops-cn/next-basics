import { CascaderOptionType, FieldNamesType } from "antd/lib/cascader";

export function getTargetOption(
  fieldNames: FieldNamesType,
  selectedOptions: CascaderOptionType[],
  allOptions: CascaderOptionType[]
): CascaderOptionType {
  let find: CascaderOptionType;
  const { value, children } = fieldNames;

  for (let i = 0; i < selectedOptions.length; i++) {
    const selected = selectedOptions[i];
    const list: CascaderOptionType[] = i === 0 ? allOptions : find?.[children];
    find = list?.find((item) => item[value] === selected[value]);
    if (!find) break;
  }

  return find;
}
