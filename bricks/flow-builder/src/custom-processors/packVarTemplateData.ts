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

  const replaceContent = (str: string): string => {
    for (const [key, value] of Object.entries(params)) {
      if (!isNil(value)) {
        str = str.replace(new RegExp(placeholderFn(key), "g"), value);
      }
    }

    return str;
  };

  const processFields = (data: Operate = {}): Operate => {
    const isInvalid = (value: unknown): boolean =>
      [undefined, "", null].includes(value as string);

    return {
      dataSource: data.dataSource,
      ...["parameter", "iterator", "transform"].reduce((obj: Operate, key) => {
        const value = data[key as keyof Operate];
        obj[key as keyof Operate] = isInvalid(value)
          ? value
          : JSON.parse(replaceContent(JSON.stringify(value)));
        return obj;
      }, {}),
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
