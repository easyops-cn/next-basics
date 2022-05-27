import { getRuntime } from "@next-core/brick-kit";
import { cloneDeep, isEmpty } from "lodash";
import { ModelDefinition, Field } from "./interfaces";

function processModel(
  model: ModelDefinition,
  definitionList: ModelDefinition[],
  parentModels: string[]
): void {
  model.fields?.forEach((field) => {
    processField(field, definitionList, [...parentModels]);
  });
}

function processRef(
  field: Field,
  definitionList: ModelDefinition[],
  parentModels: string[]
): void {
  const [refName, refField] = field.ref.split(".");
  const find = definitionList.find((item) => item.name === refName);

  // istanbul ignore else
  if (find && !parentModels.includes(find.name)) {
    const models = [...parentModels, refName];

    if (refField === "*") {
      field.__fields__ = find.fields;

      processModel(find, definitionList, models);
    } else {
      const childrenField = find.fields?.find((item) => item.name === refField);

      // istanbul ignore else
      if (childrenField) {
        field.__fields__ = [childrenField];
        processField(childrenField, definitionList, models);
      }
    }
  }
}

function processType(
  field: Field,
  definitionList: ModelDefinition[],
  parentModels: string[]
): void {
  const type = field.type.endsWith("[]")
    ? field.type.replace("[]", "")
    : field.type;
  const find = definitionList.find((item) => item.name === type);
  if (find) {
    field.__fields__ = find.fields;
    if (!parentModels.includes(type)) {
      const models = [...parentModels, type];
      processModel(find, definitionList, models);
    }
  }
}

export function processField(
  field: Field,
  importModelDefinition: ModelDefinition[],
  parentModels: string[]
): void {
  if (field.ref) {
    processRef(field, importModelDefinition, parentModels);
  } else if (!isEmpty(field.fields)) {
    field.fields.forEach((item) => {
      processField(item, importModelDefinition, parentModels);
    });
  } else {
    processType(field, importModelDefinition, parentModels);
  }
}

export function expandFields(
  field: Field,
  importModelDefinition: ModelDefinition[]
): Field {
  try {
    if (!field) return;
    const clonedField = cloneDeep(field);
    const clonedModelDefinition = cloneDeep(importModelDefinition);
    const parentModels: string[] = [];

    processField(clonedField, clonedModelDefinition, parentModels);

    return clonedField;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return field;
  }
}

getRuntime().registerCustomProcessor("flowBuilder.expandFields", expandFields);
