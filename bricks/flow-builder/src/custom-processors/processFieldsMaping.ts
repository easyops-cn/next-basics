import { getRuntime } from "@next-core/brick-kit";
import { isNil } from "lodash";

interface FieldItem {
  name: string;
  value?: any;
  source?: string;
  description?: string;
  type?: string;
  fields?: FieldItem[];
  disabledEdit?: boolean;
}

export function processFieldsMaping(fieldList: FieldItem[]): any {
  const list = [] as FieldItem[];

  const traverseFields = (
    fields: FieldItem[],
    arr: FieldItem[],
    preIndex?: string,
    preName?: string,
    disabledEdit?: boolean
  ): void => {
    Array.isArray(fields) &&
      fields.forEach((item, index) => {
        const curIndex = isNil(preIndex)
          ? String(index)
          : `${preIndex}-${index}`;
        const curName = isNil(preName) ? item.name : `${preName}.${item.name}`;
        let curDisabledEdit = disabledEdit;
        const v = {
          name: item.name,
          key: curIndex,
          type: item.type,
          source: item.source,
          description: item.description,
          value:
            item.source === "const" && typeof item.value === "string"
              ? // eslint-disable-next-line no-useless-escape
                item.value.replace(/[\'\"\\\/]/g, "")
              : item.value,
          disabledEdit: curDisabledEdit,
        } as FieldItem;
        arr.push(v);

        if (item.fields && ["object", "object[]"].includes(item.type)) {
          v.fields = [];
          if (item.type === "object[]") {
            curDisabledEdit = true;
          }
          traverseFields(
            item.fields,
            v.fields,
            curIndex,
            curName,
            curDisabledEdit
          );
        }
      });
  };

  traverseFields(fieldList, list);
  return list;
}

getRuntime().registerCustomProcessor(
  "flowBuilder.processFieldsMaping",
  processFieldsMaping
);
