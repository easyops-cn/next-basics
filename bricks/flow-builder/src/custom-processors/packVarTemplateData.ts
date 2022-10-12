import { getRuntime } from "@next-core/brick-kit";
import { isNil } from "lodash";

interface FormData {
  id: string;
  name: string;
  templateId: string;
  params: Record<string, any>;
  templateData: Template;
}

interface Template {
  id: string;
  name: string;
  isStream: boolean;
  instantiateConfig?: any[];
  read?: Operate;
  write?: Operate;
}

interface Operate {
  dataSource?: string;
  dataSourceType?: string;
  condition?: string;
  parameter?: any;
  iterator?: any;
  transform?: any;
}

type PlaceholderFn = (str: string) => string;

export function packVarTemplateData(
  formData: FormData,
  placeholderFn: PlaceholderFn
): Template {
  const params = formData.params || {};

  const replaceString = (str: string): string => {
    const reg = new RegExp(`^${placeholderFn("([^{}]+)")}$`);
    const match = str.trim().match(reg);

    if (match) {
      const [, key] = match;
      return params[key] ?? str;
    }

    for (const [key, value] of Object.entries(params)) {
      if (!isNil(value)) {
        str = str.replace(new RegExp(placeholderFn(key), "g"), value);
      }
    }

    return str;
  };

  const replaceObject = (
    obj: Record<string, any>,
    targetObj?: Record<string, any>
  ): Record<string, any> => {
    const c = targetObj || {};
    Object.keys(obj).forEach((key) => {
      const v = obj[key];
      if (typeof v === "object" && v !== null) {
        c[key] = Array.isArray(v) ? [] : {};
        replaceObject(v, c[key]);
      } else {
        c[key] = typeof v === "string" ? replaceString(v) : v;
      }
    });

    return c;
  };

  const replaceContent = (value: unknown): unknown => {
    if (isNil(value) || value === "") return value;

    if (typeof value === "string") {
      return replaceString(value);
    }

    if (typeof value === "object") {
      return replaceObject(value);
    }

    return value;
  };

  const processFields = (data: Operate = {}): Operate => {
    return {
      dataSource: data.dataSource,
      dataSourceType: data.dataSourceType,
      ...["parameter", "iterator", "transform", "condition"].reduce(
        (obj: Operate, key) => {
          const value = data[key as keyof Operate];
          obj[key as keyof Operate] = replaceContent(value);
          return obj;
        },
        {}
      ),
    };
  };

  return {
    id: formData.id,
    name: formData.name,
    isStream: formData.templateData?.isStream,
    read: processFields(formData.templateData?.read),
    write: processFields(formData.templateData?.write),
  };
}

getRuntime().registerCustomProcessor(
  "flowBuilder.packVarTemplateData",
  packVarTemplateData
);
