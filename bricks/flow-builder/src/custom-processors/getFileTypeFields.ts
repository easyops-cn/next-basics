import { getRuntime } from "@next-core/brick-kit";
import { isEmpty } from "lodash";
import { Field } from "./interfaces";

function _getFieldModel(field: Field): string {
  if (field.ref) {
    const [refName] = field.ref.split(".");
    return refName;
  } else {
    return field.type.replace("[]", "");
  }
}

function _getFileTypeFields(
  field: Field,
  fileTypeList: Field[],
  parentsModels: string[]
): void {
  if (field.__fields__) {
    const curModel = _getFieldModel(field);

    if (!parentsModels.includes(curModel)) {
      const models = [...parentsModels, curModel];
      field.__fields__.forEach((item) => {
        _getFileTypeFields(item, fileTypeList, models);
      });
    }
  } else if (!isEmpty(field.fields)) {
    field.fields.forEach((item) => {
      _getFileTypeFields(item, fileTypeList, [...parentsModels]);
    });
  } else {
    if (["file", "file[]"].includes(field.type)) {
      fileTypeList.push(field);
    }
  }
}

export function getFileTypeFields(field: Field): Field[] {
  const fileTypeList: Field[] = [];
  const parentsModels: string[] = [];
  try {
    if (!field) return fileTypeList;

    _getFileTypeFields(field, fileTypeList, parentsModels);

    return fileTypeList;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return fileTypeList;
  }
}

getRuntime().registerCustomProcessor(
  "flowBuilder.getFileTypeFields",
  getFileTypeFields
);
