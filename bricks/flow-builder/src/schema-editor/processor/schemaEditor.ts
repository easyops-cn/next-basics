import { isNil, omit, uniq } from "lodash";
import i18next from "i18next";
import {
  processValidatorInitValue,
  formatValidatorData,
} from "./filedValidatorItem";
import { extractType } from "./typeItem";
import { extractRefType } from "./refItem";
import {
  EditorTitleProps,
  SchemaItemProperty,
  AddedSchemaFormItem,
  SchemaRootNodeProperty,
  ModelDefinition,
} from "../interfaces";
import { numberTypeList, modelRefCache } from "../constants";
import { K, NS_FLOW_BUILDER } from "../../i18n/constants";
import { innerTypeList } from "../constants";
import { ContractContext } from "../ContractContext";

export function filterTitleList(
  titleList: EditorTitleProps[],
  readonly: boolean
): EditorTitleProps[] {
  return readonly
    ? titleList.filter(
        (item) =>
          item.title !== i18next.t(`${NS_FLOW_BUILDER}:${K.SETTING_LABEL}`)
      )
    : titleList;
}

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
      ...(item.ref && item.ref.endsWith(".*")
        ? { refRequired: getRefRequiredFields(item.ref, requiredList) }
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
    modelDefinitionSet,
  }: {
    requiredList: string[];
    defaultData: Record<string, unknown>;
    importSet: Set<string>;
    modelDefinitionSet: Map<string, ModelDefinition>;
  },
  result: SchemaItemProperty[]
): void {
  list?.forEach((item) => {
    if (item.required) {
      requiredList.push(item.name || item.ref);
    }

    if (item.refRequired) {
      requiredList.push(...item.refRequired);
    }

    if (!isNil(item.default)) {
      defaultData[item.name] = item.default;
    }

    const modelRef = modelRefCache.get(extractType(item.type) || item.ref);
    if (modelRef) {
      importSet.add(modelRef);
    }

    const modelDefinitions =
      ContractContext.getInstance().getChildrenModelDefinition(
        calcModelDefinition(item)
      );

    modelDefinitions.forEach((item) => {
      modelDefinitionSet.set(item.name, item);
    });

    const property = {
      ...omit(item, ["fields", "required", "refRequired", "default"]),
    } as SchemaItemProperty;

    result.push(property);

    if (item.fields && item.type?.includes("object")) {
      // 只有 object/object[] 类型的 fields 才需要提交, 其他 fields 仅为前台引用模型展示用
      property.fields = [];
      collectFields(
        item.fields,
        { requiredList, defaultData, importSet, modelDefinitionSet },
        property.fields
      );
    }
  });
}

export function processFormData(
  data: SchemaItemProperty
): SchemaRootNodeProperty {
  const result: SchemaItemProperty = omit(data, [
    "fields",
    "import",
    "importModelDefinition",
  ]);
  const requiredList: string[] = [];
  const defaultData: Record<string, unknown> = {};
  const importSet = new Set<string>();
  const modelDefinitionSet = new Map<string, ModelDefinition>();
  result.fields = [];

  if (data.required) {
    requiredList.push(data.name);
  }

  if (!isNil(data.default)) {
    defaultData[data.name] = data.default;
  }

  const modelDefinitions =
    ContractContext.getInstance().getChildrenModelDefinition(
      extractType(data.type) || extractRefType(data.ref)
    );

  modelDefinitions.forEach((item) => {
    modelDefinitionSet.set(item.name, item);
  });

  collectFields(
    data.fields,
    { requiredList, defaultData, importSet, modelDefinitionSet },
    result.fields
  );

  return {
    ...result,
    required: uniq(requiredList),
    default: defaultData,
    ...(importSet.size !== 0 ? { import: Array.from(importSet) } : {}),
    importModelDefinition: Array.from(modelDefinitionSet.values()),
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
    const modelName = extractType(item.type);
    importMap.has(modelName) &&
      modelRefCache.set(modelName, importMap.get(modelName));
  }

  if (item.ref) {
    const modelName = item.ref.split(".")[0];
    importMap.has(modelName) &&
      modelRefCache.set(item.ref, importMap.get(modelName));
  }
}

export function getRefRequiredFields(
  ref = "",
  requiredList: string[]
): string[] {
  const model = ref.split(".")[0];

  return requiredList?.filter((item) => item.includes(model));
}

export function isModelDefinition(item: SchemaItemProperty): boolean {
  if (item.ref) return true;

  return !innerTypeList.includes(extractType(item.type));
}

export function calcModelDefinition(item: SchemaItemProperty): string {
  if (item.ref) return extractRefType(item.ref);

  return extractType(item.type);
}
