import { getRuntime } from "@next-core/brick-kit";
import { isEmpty } from "lodash";
import { calcModelDefinition } from "../schema-editor/processor/schemaEditor";
import { Field } from "./interfaces";

function _calcExampleField(
  field: Field,
  result: any,
  parentModels: string[]
): void {
  const isArrayType = field.type?.endsWith("[]");

  if (field.__fields__) {
    const curModel = calcModelDefinition(field);

    if (!parentModels.includes(curModel)) {
      const models = [...parentModels, curModel];

      if (field.ref) {
        field.__fields__.forEach((item) => {
          _calcExampleField(item, result, models);
        });
      } else {
        const curData = {};
        result[field.name] = isArrayType ? [curData] : curData;

        field.__fields__.forEach((item) => {
          _calcExampleField(item, curData, models);
        });
      }
    } else {
      result[field.name] = isArrayType ? [curModel] : curModel;
    }
  } else if (!isEmpty(field.fields)) {
    const curData = {};
    result[field.name] = isArrayType ? [curData] : curData;
    field.fields.forEach((item) => {
      _calcExampleField(item, curData, [...parentModels]);
    });
  } else {
    const type = field.type?.replace("[]", "");
    result[field.name] = isArrayType ? [type] : field.type;
  }
}

export function calcExampleFields(field: Field): any {
  const result = {};
  const parentModels: string[] = [];

  const childrenFields = field.__fields__ || field.fields;

  if (!isEmpty(childrenFields)) {
    childrenFields.forEach((item) => {
      _calcExampleField(item, result, [...parentModels]);
    });
  }

  return result;
}

getRuntime().registerCustomProcessor(
  "flowBuilder.calcExampleFields",
  calcExampleFields
);
