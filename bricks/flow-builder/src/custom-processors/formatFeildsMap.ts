import { getRuntime } from "@next-core/brick-kit";
import { isNil } from "lodash";
import { FieldItem } from "../fields-mapping-editor/interfaces";

interface FieldMapItem
  extends Pick<FieldItem, "name" | "type" | "description" | "source"> {
  fields?: FieldMapItem[];
}

interface FieldMapValue {
  name: string;
  value?: any;
  source?: string;
  fields?: FieldMapValue[];
}

type ProcessedFieldMapValue = Record<string, any>;

function traverseFields(
  fieldList: FieldMapItem[],
  fieldValuesMap: Map<string, ProcessedFieldMapValue>,
  arr: FieldItem[],
  preIndex?: string,
  preName?: string
): void {
  fieldList?.forEach((item, index) => {
    const curIndex = isNil(preIndex) ? String(index) : `${preIndex}-${index}`;
    const curName = isNil(preName) ? item.name : `${preName}.${item.name}`;
    const v = {
      name: item.name,
      key: curIndex,
      type: item.type,
      source: fieldValuesMap.get(curName)?.source,
      description: item.description,
      value: fieldValuesMap.get(curName)?.value,
    } as FieldItem;
    arr.push(v);

    if (item.fields && item.type === "object") {
      v.fields = [];
      traverseFields(item.fields, fieldValuesMap, v.fields, curIndex, curName);
    }
  });
}

export function processValue(
  fieldValueList: FieldMapValue[]
): Map<string, ProcessedFieldMapValue> {
  const fieldMap: Map<string, ProcessedFieldMapValue> = new Map();

  const processValueItem = (
    list: FieldMapValue[],
    valueMap: Map<string, ProcessedFieldMapValue>,
    prefixName?: string
  ): void => {
    list?.forEach((item) => {
      const name = isNil(prefixName) ? item.name : `${prefixName}.${item.name}`;
      fieldMap.set(name, item);
      if (item.fields) {
        processValueItem(item.fields, valueMap, name);
      }
    });
  };

  processValueItem(fieldValueList, fieldMap);
  return fieldMap;
}

export function formatFeildsMap(
  fieldList: FieldMapItem[],
  fieldValueList: FieldMapValue[]
): FieldItem[] {
  const list = [] as FieldItem[];
  const fieldValuesMap = processValue(fieldValueList);
  traverseFields(fieldList, fieldValuesMap, list);
  return list;
}

getRuntime().registerCustomProcessor(
  "flowBuilder.formatFeildsMap",
  formatFeildsMap
);
