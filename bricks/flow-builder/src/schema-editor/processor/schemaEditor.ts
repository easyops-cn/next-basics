import { isNil, omit } from "lodash";
import {
  processValidatorInitValue,
  formatValidatorData,
} from "./filedValidatorItem";
import {
  EditorTitleProps,
  SchemaItemProperty,
  AddedSchemaFormItem,
  SchemaRootNodeProperty,
} from "../interfaces";
import { numberTypeList, modelRefCache } from "../constants";

export function getGridTemplateColumns(titleList: EditorTitleProps[]): string {
  return titleList.map((item) => item.width ?? "1fr").join(" ");
}

export function calcItemPosition(traceId: string): string[] {
  const arr = traceId.split("-");
  const path: string[] = [];

  arr?.forEach((item) => {
    path.push(item);
    path.push("fields");
  });

  return path.slice(1, -1);
}

export function isTypeChange(
  current: SchemaItemProperty,
  prev: SchemaItemProperty
): boolean {
  if (current.type) {
    if (prev.ref || (prev.type && current.type !== prev.type)) return true;
  }

  if (current.ref) {
    if (prev.type || (prev.ref && prev.ref !== current.ref)) return true;
  }

  return false;
}

export function processItemInitValue(
  data = {} as SchemaItemProperty
): AddedSchemaFormItem {
  return {
    ...data,
    origin: data.ref ? "reference" : "normal",
    ...([...numberTypeList, "string"].includes(data.type)
      ? { validate: processValidatorInitValue(data.validate) }
      : {}),
  };
}

export function processItemData(
  data = {} as AddedSchemaFormItem
): SchemaItemProperty {
  return {
    ...omit(data, "origin", "validate"),
    ...(data.validate ? { validate: formatValidatorData(data.validate) } : {}),
  };
}

export function processFields(
  list: SchemaItemProperty[],
  {
    requiredList,
    defaultData,
    importList,
  }: {
    requiredList: string[];
    defaultData: Record<string, unknown>;
    importList: string[];
  },
  result: SchemaItemProperty[]
): void {
  list?.forEach((item) => {
    const property = {
      ...omit(item, "fields"),
      ...(requiredList.includes(item.name) || requiredList.includes(item.ref)
        ? { required: true }
        : {}),
      ...(!isNil(defaultData[item.name])
        ? { default: defaultData[item.name] }
        : {}),
    } as SchemaItemProperty;

    result.push(property);

    extractModelRef(item, importList);
    if (item.fields) {
      property.fields = [];
      processFields(
        item.fields,
        { requiredList, defaultData, importList },
        property.fields
      );
    }
  });
}

export function processFormInitvalue(
  data: SchemaRootNodeProperty
): SchemaItemProperty {
  const result: SchemaItemProperty = omit(data, [
    "fields",
    "required",
    "default",
  ]);

  const requiredList = data.required || [];
  const defaultData = data.default || {};
  result.fields = [];
  if (requiredList.includes(data.name) || requiredList.includes(data.ref)) {
    result.required = true;
  }

  processFields(
    data.fields,
    { requiredList, defaultData, importList: data.import },
    result.fields
  );

  return result;
}

export function collectFields(
  list: SchemaItemProperty[],
  {
    requiredList,
    defaultData,
    importSet,
  }: {
    requiredList: string[];
    defaultData: Record<string, unknown>;
    importSet: Set<string>;
  },
  result: SchemaItemProperty[]
): void {
  list?.forEach((item) => {
    if (item.required) {
      requiredList.push(item.name || item.ref);
    }

    if (!isNil(item.default)) {
      defaultData[item.name] = item.default;
    }

    const modelRef = modelRefCache.get(item.type || item.ref);
    if (modelRef) {
      importSet.add(modelRef);
    }

    const property = {
      ...omit(item, ["fields", "required", "default"]),
    } as SchemaItemProperty;

    result.push(property);

    if (item.fields) {
      property.fields = [];
      collectFields(
        item.fields,
        { requiredList, defaultData, importSet },
        property.fields
      );
    }
  });
}

export function processFormData(
  data: SchemaItemProperty
): SchemaRootNodeProperty {
  const result: SchemaItemProperty = omit(data, ["fields", "import"]);
  const requiredList: string[] = [];
  const defaultData: Record<string, unknown> = {};
  const importSet = new Set<string>();
  result.fields = [];

  if (data.required) {
    requiredList.push(data.name);
  }

  if (!isNil(data.default)) {
    defaultData[data.name] = data.default;
  }

  collectFields(
    data.fields,
    { requiredList, defaultData, importSet },
    result.fields
  );

  return {
    ...result,
    required: requiredList,
    default: defaultData,
    ...(importSet.size !== 0 ? { import: Array.from(importSet) } : {}),
  };
}

export function extractModelRef(
  item: SchemaItemProperty,
  importList: string[] = []
): void {
  const importMap: Map<string, string> = importList.reduce((map, item) => {
    map.set(item.split(".")?.pop(), item);
    return map;
  }, new Map());

  if (item.name && item.type) {
    const modelName = item.type.replace(/\[\]$/, "");
    importMap.has(modelName) &&
      modelRefCache.set(modelName, importMap.get(modelName));
  }

  if (item.ref) {
    const modelName = item.ref.split(".")[0];
    importMap.has(modelName) &&
      modelRefCache.set(modelName, importMap.get(modelName));
  }
}
