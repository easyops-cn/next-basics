import { createProviderClass } from "@next-core/brick-utils";

export interface GenerateTemplateProxyParams {
  brickType: "table" | "forms" | "descriptions";
}

export function GenerateTemplateProxy(
  params: GenerateTemplateProxyParams
): string {
  let proxy;
  if (params.brickType === "forms") {
    proxy = {
      properties: {
        values: {
          ref: "general-form",
          refProperty: "values",
        },
        staticValues: {
          ref: "general-form",
          refProperty: "staticValues",
        },
        name: {
          ref: "general-form",
          refProperty: "name",
        },
      },
      methods: {
        setInitValue: {
          ref: "general-form",
          refMethod: "setInitValue",
        },
        resetFields: {
          ref: "general-form",
          refMethod: "resetFields",
        },
      },
      events: {
        "validate.success": {
          ref: "general-form",
          refEvent: "validate.success",
        },
        "validate.error": {
          ref: "general-form",
          refEvent: "validate.error",
        },
      },
    };
  } else if (params.brickType === "table") {
    proxy = {
      properties: {
        dataSource: {
          ref: "brick-table",
          refProperty: "dataSource",
        },
      },
    };
  } else if (params.brickType === "descriptions") {
    proxy = {
      properties: {
        dataSource: {
          ref: "brick-descriptions",
          refProperty: "dataSource",
        },
      },
    };
  }
  return JSON.stringify(proxy, null, 2);
}

customElements.define(
  "next-builder.provider-generate-template-proxy",
  createProviderClass(GenerateTemplateProxy)
);
