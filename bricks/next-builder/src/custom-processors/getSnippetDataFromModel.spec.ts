import { getSnippetDataFromModel } from "./getSnippetDataFromModel";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getSnippetDataFromModel", () => {
  it("should work", () => {
    const snippetParams = {
      brickData: {
        brick: "forms.general-form",
      },
      modelData: {
        attrList: [
          { id: "name", name: "名称", value: { type: "string" } },
          { id: "page", name: "页数", value: { type: "int" } },
          { id: "time", name: "时间", value: { type: "date" } },
          { id: "isCreate", name: "是否创建", value: { type: "bool" } },
          { id: "instance", name: "实例数据", value: { type: "json" } },
        ],
      },
      constantMaps: {
        brickMap: {
          "forms.general-form": {
            link: {
              brick: "presentational-bricks.brick-link",
              label: "链接",
              propertyGenerator: () => ({
                name: "link",
              }),
            },
            data: {
              brick: "forms.general-date-picker",
              label: "日期选择器",
              propertyGenerator: () => ({
                name: "data-input",
              }),
            },
            input: {
              brick: "forms.general-input",
              label: "输入框",
              propertyGenerator: () => ({
                name: "input",
              }),
            },
          },
        },
        updatedBrickFields: [],
      },
      generatorProviderName: () => "<% CTX.formData %>",
      config: {
        fields: [
          {
            name: "名称",
            id: "name",
            type: "string",
            brick: "forms.general-input",
          },
        ],
      },
      snippetData: {
        nodeData: {
          brick: "forms.geneal-form[quick-generation]",
          bricks: [
            {
              brick: "forms.general-form",
              slots: {
                items: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "forms.general-buttons",
                      properties: {
                        name: "提交",
                      },
                    },
                  ],
                },
              },
            },
          ],
          type: "bricks",
        },
        parentNode: {
          brick: "general-card",
          instanceId: "abc123",
        },
        dragOverInstanceId: "abc123",
        dragStatus: "inside",
        mountPoint: "content",
      },
    };
    expect(
      getSnippetDataFromModel(snippetParams, { appId: "app-test" })
    ).toEqual({
      appId: "app-test",
      brick: "forms.geneal-form[quick-generation]",
      dragOverInstanceId: "abc123",
      dragStatus: "inside",
      mountPoint: "content",
      nodeData: {
        brick: "forms.geneal-form[quick-generation]",
        bricks: [
          {
            brick: "forms.general-form",
            slots: {
              items: {
                bricks: [
                  {
                    brick: "forms.general-input",
                    properties: { name: "link" },
                  },
                  {
                    brick: "forms.general-buttons",
                    properties: { name: "提交" },
                  },
                ],
                type: "bricks",
              },
            },
          },
        ],
        type: "bricks",
      },
      parent: "abc123",
      snippetBricks: {
        brick: "forms.geneal-form[quick-generation]",
        bricks: [
          {
            brick: "forms.general-form",
            slots: {
              items: {
                bricks: [
                  {
                    brick: "forms.general-input",
                    properties: { name: "link" },
                  },
                  {
                    brick: "forms.general-buttons",
                    properties: { name: "提交" },
                  },
                ],
                type: "bricks",
              },
            },
          },
        ],
        type: "bricks",
      },
      type: "brick",
    });
  });
});
