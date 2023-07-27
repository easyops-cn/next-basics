import {
  GenerateTemplateProxy,
  GenerateTemplateProxyParams,
} from "./GenerateTemplateProxy";

describe("GenerateTemplateProxy", () => {
  it.each<[GenerateTemplateProxyParams, any]>([
    [
      {
        brickType: "forms",
      },
      JSON.stringify(
        {
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
        },
        null,
        2
      ),
    ],
    [
      {
        brickType: "table",
      },
      JSON.stringify(
        {
          properties: {
            dataSource: {
              ref: "brick-table",
              refProperty: "dataSource",
            },
          },
        },
        null,
        2
      ),
    ],
    [
      {
        brickType: "descriptions",
      },
      JSON.stringify(
        {
          properties: {
            dataSource: {
              ref: "brick-descriptions",
              refProperty: "dataSource",
            },
          },
        },
        null,
        2
      ),
    ],
  ])("GenerateTemplateProxy(%j) should work", async (params, result) => {
    expect(await GenerateTemplateProxy(params)).toEqual(result);
  });
});
