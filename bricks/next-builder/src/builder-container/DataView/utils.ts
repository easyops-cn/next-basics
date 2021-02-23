import { safeDump, JSON_SCHEMA, safeLoad } from "js-yaml";
import { forEach } from "lodash";
import { ContextConf } from "@next-core/brick-types";

export interface OptionType {
  value: string;
  label: string;
}

interface contextItemValueConf {
  type: "value";
  name?: string;
  value?: string;
}

interface contextItemResolveConf {
  type: "resolve";
  name?: string;
  useProvider: string;
  args?: string;
  transform?: string;
  if?: string;
}

export type ContextItemFormValue =
  | contextItemValueConf
  | contextItemResolveConf;

export const typeOptions = [
  { label: "Value", value: "value" },
  { label: "Provider", value: "resolve" },
];

export function filterOptions(
  value: string,
  options: OptionType[]
): OptionType[] {
  const filteredOptions: OptionType[] = [];

  options.forEach((option) => {
    if (option.label?.toLowerCase().includes(value.toLowerCase())) {
      filteredOptions.push(option);
    }
  });

  return filteredOptions;
}

const safeDumpField = (value: any, field: string): string | undefined => {
  let result;
  try {
    result = safeDump(value, {
      indent: 2,
      schema: JSON_SCHEMA,
      skipInvalid: true,
      noRefs: true,
      noCompatMode: true,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(value, `Illegal ${field}`);
  }
  return result;
};

export const safeDumpFields = (
  values: Record<string, any>
): Record<string, string> => {
  const result = { ...values };
  forEach(values, (originValue, field) => {
    result[field] = safeDumpField(originValue, field);
  });
  return result;
};

const safeLoadField = (value: string, field: string): any => {
  let result;
  try {
    result = safeLoad(value, {
      schema: JSON_SCHEMA,
      json: true,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(value, `Illegal ${field}`);
  }
  return result;
};

export const safeLoadFields = (
  values: Record<string, string>
): Record<string, any> => {
  const result = { ...values };
  forEach(values, (originValue, field) => {
    if (!originValue) {
      delete result[field];
    } else {
      result[field] = safeLoadField(originValue, field);
    }
  });
  return result;
};

export function computeItemToSubmit(
  contextValue: ContextItemFormValue
): ContextConf {
  const isValue = contextValue.type === "value";
  if (isValue) {
    return {
      name: contextValue.name,
      ...safeLoadFields({
        value: (contextValue as contextItemValueConf).value,
      }),
    };
  } else {
    return {
      name: contextValue.name,
      resolve: {
        useProvider: (contextValue as contextItemResolveConf).useProvider,
        ...safeLoadFields({
          if: (contextValue as contextItemResolveConf).if,
          args: (contextValue as contextItemResolveConf).args,
          transform: (contextValue as contextItemResolveConf).transform,
        }),
      },
    };
  }
}

export const fieldCodeEditorConfigMap: Record<string, { schemaRef: string }> = {
  value: {
    schemaRef: "#/definitions/ContextConf/properties/value",
  },
  args: {
    schemaRef: "#/definitions/UseProviderResolveConf/properties/args",
  },
  transform: {
    schemaRef: "#/definitions/UseProviderResolveConf/properties/transform",
  },
  if: {
    schemaRef: "#/definitions/UseProviderResolveConf/properties/if",
  },
};
