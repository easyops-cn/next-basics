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
} from "../interfaces";
import { numberTypeList } from "../constants";
import { innerTypeList } from "../constants";
import { ContractContext } from "../ContractContext";

export function filterTitleList(
  titleList: EditorTitleProps[],
  readonly: boolean
): EditorTitleProps[] {
  return readonly
    ? titleList.filter((item) => item.key !== "setting")
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
  return calcModelDefinition(current) !== calcModelDefinition(prev);
}

export function processItemInitValue(
  data = {} as SchemaItemProperty
): AddedSchemaFormItem {
  const isNormalType = !isModelDefinition(data);
  return {
    ...data,
    origin: data.ref
      ? "reference"
      : isNormalType || !data.type
      ? "normal"
      : "model",
    ...([...numberTypeList, "string"].includes(data.type)
      ? { validateRule: processValidatorInitValue(data.validateRule) }
      : {}),
  };
}

export function processItemData(
  data = {} as AddedSchemaFormItem
): SchemaItemProperty {
  return {
    ...omit(data, "origin", "validateRule"),
    ...(data.validateRule
      ? { validateRule: formatValidatorData(data.validateRule) }
      : {}),
  };
}

export function processFields(
  list: SchemaItemProperty[],
  {
    requiredList,
    defaultData,
  }: {
    requiredList: string[];
    defaultData: Record<string, unknown>;
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

    if (item.fields) {
      property.fields = [];
      processFields(
        item.fields,
        { requiredList, defaultData },
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

  processFields(data.fields, { requiredList, defaultData }, result.fields);

  return result;
}

export function collectImport(
  item: SchemaItemProperty,
  importSet: Set<string>
): void {
  const modelName = calcModelDefinition(item);
  const contractContext = ContractContext.getInstance();

  if (contractContext.hasImportNamespace(modelName)) {
    importSet.add(contractContext.getSingleNamespace(modelName));
  }
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

    if (item.refRequired) {
      requiredList.push(...item.refRequired);
    }

    if (!isNil(item.default)) {
      defaultData[item.name] = item.default;
    }

    collectImport(item, importSet);

    const property = {
      ...omit(item, ["fields", "required", "refRequired", "default"]),
    } as SchemaItemProperty;

    result.push(property);

    if (item.fields && item.type?.includes("object")) {
      // 只有 object/object[] 类型的 fields 才需要提交, 其他 fields 仅为前台引用模型展示用
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

  collectImport(data, importSet);

  collectFields(
    data.fields,
    { requiredList, defaultData, importSet },
    result.fields
  );

  return {
    ...result,
    required: uniq(requiredList),
    default: defaultData,
    ...(importSet.size !== 0 ? { import: Array.from(importSet) } : {}),
  };
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

  const customTypeList = ContractContext.getInstance().customTypeList;

  return ![...innerTypeList, ...customTypeList].includes(
    extractType(item.type)
  );
}

export function calcModelDefinition(item: SchemaItemProperty): string {
  if (item.ref) return extractRefType(item.ref);

  return extractType(item.type);
}
