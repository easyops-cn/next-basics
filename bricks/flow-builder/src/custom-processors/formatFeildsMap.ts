import { getRuntime } from "@next-core/brick-kit";
import { isNil } from "lodash";
import { FieldItem } from "../fields-mapping-editor/interfaces";

interface FieldMapItem
  extends Pick<FieldItem, "name" | "type" | "description"> {
  fields?: FieldMapItem[];
}

interface FieldMapValue {
  name: string;
  value?: any;
  fields?: FieldMapValue[];
}

type ProcessedFieldMapValue = Record<string, any>;

function traverseFields(
  fieldList: FieldMapItem[],
  processedFieldValues: ProcessedFieldMapValue,
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
      description: item.description,
      value: processedFieldValues[curName],
    } as FieldItem;
    arr.push(v);

    if (item.fields && item.type === "object") {
      v.fields = [];
      traverseFields(
        item.fields,
        processedFieldValues,
        v.fields,
        curIndex,
        curName
      );
    }
  });
}

export function processValue(
  fieldValueList: FieldMapValue[]
): ProcessedFieldMapValue {
  const obj: ProcessedFieldMapValue = {};

  const processValueItem = (
    list: FieldMapValue[],
    valueMap: ProcessedFieldMapValue,
    prefixName?: string
  ): void => {
    list?.forEach((item) => {
      const name = isNil(prefixName) ? item.name : `${prefixName}.${item.name}`;
      if (!isNil(item.value)) {
        obj[name] = item.value;
      } else if (item.fields) {
        processValueItem(item.fields, valueMap, name);
      }
    });
  };

  processValueItem(fieldValueList, obj);
  return obj;
}

export function formatFeildsMap(
  fieldList: FieldMapItem[],
  fieldValueList: FieldMapValue[]
): FieldItem[] {
  const list = [] as FieldItem[];
  const processedFieldValues = processValue(fieldValueList);
  traverseFields(fieldList, processedFieldValues, list);
  return list;
}

getRuntime().registerCustomProcessor(
  "flowBuilder.formatFeildsMap",
  formatFeildsMap
);
