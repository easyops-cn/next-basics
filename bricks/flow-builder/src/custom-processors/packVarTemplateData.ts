import { getRuntime } from "@next-core/brick-kit";
import { replacePlaceholder } from "./replacePlaceholder";

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
  const processFields = (fieldData: Operate): Operate => {
    const data = fieldData ?? {};
    return {
      dataSource: data.dataSource,
      dataSourceType: data.dataSourceType,
      ...["parameter", "iterator", "transform", "condition"].reduce(
        (obj: Operate, key) => {
          const value = data[key as keyof Operate];
          obj[key as keyof Operate] = replacePlaceholder(
            formData.params,
            value,
            placeholderFn
          );
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
