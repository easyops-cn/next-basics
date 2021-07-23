import { safeDump, JSON_SCHEMA, safeLoad } from "js-yaml";
import { forEach } from "lodash";
import { ContextConf } from "@next-core/brick-types";

export interface OptionType {
  value: string;
  label: string;
}

export enum ContextType {
  RESOLVE = "resolve",
  SELECTOR_RESOLVE = "selector-resolve",
  VALUE = "value",
}

interface contextItemBaseConf {
  name?: string;
  value?: string;
  if?: string;
  onChange?: string;
}

interface contextItemValueConf extends contextItemBaseConf {
  type: ContextType.VALUE;
}

interface contextResolveBaseConf extends contextItemBaseConf {
  resolveIf?: string;
  args?: string;
  transform?: string;
}

interface contextItemResolveConf extends contextResolveBaseConf {
  type: ContextType.RESOLVE;
  useProvider: string;
  onReject?: string;
}

interface contextItemSelectorProviderResolveConf
  extends contextResolveBaseConf {
  type: ContextType.SELECTOR_RESOLVE;
  provider: string;
}

export type ContextItemFormValue =
  | contextItemValueConf
  | contextItemResolveConf
  | contextItemSelectorProviderResolveConf;

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
  const isValue = contextValue.type === ContextType.VALUE;
  if (isValue) {
    return {
      name: contextValue.name,
      ...safeLoadFields({
        value: (contextValue as contextItemValueConf).value,
        if: contextValue.if,
        onChange: contextValue.onChange,
      }),
    };
  } else {
    const computedFields = safeLoadFields({
      value: (contextValue as contextItemResolveConf).value,
      if: (contextValue as contextItemResolveConf).if,
      resolveIf: (contextValue as contextItemResolveConf).resolveIf,
      args: (contextValue as contextItemResolveConf).args,
      transform: (contextValue as contextItemResolveConf).transform,
      onChange: (contextValue as contextItemResolveConf).onChange,
      onReject: (contextValue as contextItemResolveConf).onReject,
    });
    return {
      name: contextValue.name,
      resolve: {
        ...(contextValue.type === ContextType.SELECTOR_RESOLVE
          ? {
              provider: (contextValue as contextItemSelectorProviderResolveConf)
                .provider,
            }
          : {
              useProvider: (contextValue as contextItemResolveConf).useProvider,
            }),
        if: computedFields.resolveIf,
        args: computedFields.args,
        transform: computedFields.transform,
        onReject: computedFields.onReject,
      },
      value: computedFields.value,
      if: computedFields.if,
      onChange: computedFields.onChange,
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
  onChange: {
    schemaRef: "#/definitions/ContextConf/properties/onChange",
  },
  onReject: {
    schemaRef: "#/definitions/UseProviderResolveConf/properties/onReject",
  },
};
