import { getBrickDataFromModel } from "./getBrickDataFromModel";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getBrickDataFromModel", () => {
  it("should work with form", () => {
    const config = {
      fields: [
        {
          name: "名称",
          id: "name",
          type: "string",
          brick: "forms.general-input",
        },
      ],
    };

    const constantMaps = {
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
    };

    const brickData = {
      brick: "forms.general-form",
      instanceId: "abc123",
      properties: '{"layout":"horizontal"}',
    };

    const modelData = {
      attrList: [
        {
          id: "name",
          name: "名称",
          value: { type: "string" },
        },
        { id: "page", name: "页数", value: { type: "int" } },
        { id: "time", name: "时间", value: { type: "date" } },
        { id: "isCreate", name: "是否创建", value: { type: "bool" } },
        { id: "instance", name: "实例数据", value: { type: "json" } },
      ],
    };

    const contextModel = {
      id: "HOST-general-form-abc123",
      sourceType: "cmdb",
      fields: [],
      brick: [
        {
          brick: "forms.general-form",
          properties: '{"layout":"horizontal"}',
          instanceId: "abc123",
          children: [
            {
              brick: "forms.general-input",
              properties: '{"name":"name","label":"名称"}',
              instanceId: "678",
            },
          ],
        },
      ],
    };

    const generatorProviderName = (): string => "<% CTX.formData %>";

    expect(
      getBrickDataFromModel(
        {
          config,
          constantMaps,
          contextModel,
          brickData,
          modelData,
          generatorProviderName,
        },
        {
          appId: "test",
          rootType: "route",
        },
        false
      )
    ).toEqual({
      insert: [
        {
          appId: "test",
          brick: "forms.general-input",
          mountPoint: "items",
          parent: "abc123",
          properties: '{"name":"input"}',
          type: "brick",
        },
      ],
      update: [],
    });
  });
});
