import { SchemaItemProperty, ModelDefinition } from "../interfaces";

export function getExpandDefinition(
  fields: SchemaItemProperty[],
  list: SchemaItemProperty[],
  modelDefinitionList: ModelDefinition[]
): void {
  fields?.forEach((item) => {
    if (item.ref) {
      const [modelName, field] = item.ref.split(".");
      if (field !== "*") {
        list.push(item);
      } else {
        const find = modelDefinitionList.find(
          (item) => item.name === modelName
        );
        find && getExpandDefinition(find.fields, list, modelDefinitionList);
      }
    } else {
      list.push(item);
    }
  });
}

export function getModelRefData(
  ref: string,
  curModelDefinition: ModelDefinition,
  modelDefinitionList: ModelDefinition[]
): SchemaItemProperty {
  const [, field] = ref.split(".");

  if (field === "*") {
    return curModelDefinition;
  }

  const find = curModelDefinition.fields.find((item) => item.name === field);

  if (find) {
    return {
      name: ref,
      ref: ref,
      fields: curModelDefinition.fields.filter((item) => item.name === field),
    };
  } else {
    const list: SchemaItemProperty[] = [];
    getExpandDefinition(curModelDefinition.fields, list, modelDefinitionList);

    return {
      name: ref,
      ref: ref,
      fields: list.filter((item) => item.name === field),
    };
  }
}
