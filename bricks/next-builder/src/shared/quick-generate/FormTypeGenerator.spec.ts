import { BrickConf } from "@next-core/brick-types";
import { FormTypeGenerator } from "./FormTypeGenerator";
import { DragStatus } from "./interface";

describe("FormTypeGenerator", () => {
  it("should work", () => {
    const useBrickList = [
      {
        brick: "presentational-bricks.brick-link",
        label: "链接",
        propertyGenerator: jest.fn(),
      },
      {
        brick: "forms.general-date-picker",
        label: "日期选择器",
        propertyGenerator: jest.fn(),
      },
    ];

    const brickData = {
      brick: "forms.general-form",
      instanceId: "abc123",
      properties: '{"layout":"horizontal"}',
    };

    const attrMap = new Map([
      ["name", { id: "name", name: "名称", value: { type: "string" } }],
      ["page", { id: "page", name: "页数", value: { type: "int" } }],
      ["time", { id: "time", name: "时间", value: { type: "date" } }],
      [
        "isCreate",
        { id: "isCreate", name: "是否创建", value: { type: "bool" } },
      ],
      [
        "instance",
        { id: "instance", name: "实例数据", value: { type: "json" } },
      ],
    ]);

    const dataType = "route";

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

    const instance = new FormTypeGenerator({
      generatorProviderName,
    });

    instance.setData({
      useBrickList,
      brickData,
      attrMap,
      contextModel,
      dataType,
      appId: "test-app",
    });

    expect(instance.processFormProvider({})).toEqual({
      instanceId: "abc123",
      objectId: "STORYBOARD_BRICK",
      property: {
        brick: "forms.general-form",
        properties: '{"layout":"horizontal","values":"<% CTX.formData %>"}',
      },
    });

    expect(instance.getTargetBrick("forms.general-date-picker")).toEqual(
      expect.objectContaining({
        brick: "forms.general-date-picker",
        label: "日期选择器",
      })
    );

    expect(
      instance.getCreateData({
        fields: [{ name: "名称", id: "name", type: "string" }],
      })
    ).toEqual({
      insert: [
        {
          appId: "test-app",
          brick: undefined,
          mountPoint: "items",
          parent: "abc123",
          properties: undefined,
          type: "brick",
        },
      ],
      update: [],
    });

    expect(
      instance.getCreateData({
        fields: [{ name: "名称", id: "name", type: "string" }],
        provider: "provider-of-cmdb-instance",
      })
    ).toEqual({
      insert: [
        {
          appId: "test-app",
          brick: undefined,
          mountPoint: "items",
          parent: "abc123",
          properties: undefined,
          type: "brick",
        },
      ],
      update: [
        {
          instanceId: "abc123",
          objectId: "STORYBOARD_BRICK",
          property: {
            brick: "forms.general-form",
            properties: '{"layout":"horizontal","values":"<% CTX.formData %>"}',
          },
        },
      ],
    });

    expect(instance.calcPrevFields()).toEqual([
      {
        brick: "forms.general-input",
        brickInstanceId: "678",
        id: "name",
        name: "名称",
        type: "string",
      },
    ]);

    expect(instance.getDefaultMergeValue()).toEqual({
      delete: [],
      insert: [],
      update: [],
    });

    const insertData = { insert: [] };
    instance.handleInsert(
      { name: "名称", id: "id", type: "string", brick: "forms.general-input" },
      insertData
    );
    expect(insertData).toEqual({
      insert: [
        {
          appId: "test-app",
          brick: "forms.general-input",
          mountPoint: "items",
          parent: "abc123",
          properties: undefined,
          type: "brick",
        },
      ],
    });

    const updateData = {
      update: [],
    };
    instance.handleUpdate(
      {
        name: "名称",
        id: "name",
        type: "string",
        brick: "forms.code-editor",
        brickInstanceId: "678",
      },
      updateData
    );
    expect(updateData).toEqual({
      update: [
        {
          instanceId: "678",
          objectId: "STORYBOARD_BRICK",
          property: {
            brick: "forms.code-editor",
            properties: '{"name":"name","label":"名称"}',
          },
        },
      ],
    });

    const deleteData = {
      delete: [],
    };

    instance.handleDelete(
      {
        brickInstanceId: "789",
        name: "age",
        id: "age",
        type: "int",
      },
      deleteData
    );

    expect(deleteData).toEqual({
      delete: [{ instanceId: "789", objectId: "STORYBOARD_BRICK" }],
    });
  });

  it("process Snippet data", () => {
    const useBrickList = [
      {
        brick: "forms.general-input",
        label: "输入框",
        propertyGenerator: (name, label, required) => ({
          name,
          label,
          required,
        }),
      },
      {
        brick: "presentational-bricks.brick-link",
        label: "链接",
        propertyGenerator: () => ({
          label: "查看",
        }),
      },
      {
        brick: "forms.general-date-picker",
        label: "日期选择器",
        propertyGenerator: (name, label, required) => ({
          name,
          label,
          required,
        }),
      },
    ];

    const brickData = {
      brick: "forms.general-form",
    };

    const attrMap = new Map([
      ["name", { id: "name", name: "名称", value: { type: "string" } }],
      ["page", { id: "page", name: "页数", value: { type: "int" } }],
      ["time", { id: "time", name: "时间", value: { type: "date" } }],
      [
        "isCreate",
        { id: "isCreate", name: "是否创建", value: { type: "bool" } },
      ],
      [
        "instance",
        { id: "instance", name: "实例数据", value: { type: "json" } },
      ],
    ]);

    const dataType = "route";

    const modelConfig = {
      fields: [
        {
          name: "name",
          id: "name",
          type: "string",
          brick: "forms.general-input",
        },
      ],
      provider: "providers-of-cmdb-instance-postsearch",
    };

    const snippetData = {
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
        ] as BrickConf[],
        type: "bricks",
      },
      parentNode: {
        brick: "general-card",
        instanceId: "abc123",
      },
      dragOverInstanceId: "abc123",
      dragStatus: "inside" as DragStatus,
      mountPoint: "content",
    };

    const generatorProviderName = (): string => "<% CTX.formData %>";

    const instance = new FormTypeGenerator({ generatorProviderName });

    instance.setData({
      useBrickList,
      brickData,
      attrMap,
      dataType,
      appId: "test-app",
    });

    expect(instance.processSnippetData({ modelConfig, snippetData })).toEqual({
      appId: "test-app",
      brick: "forms.geneal-form[quick-generation]",
      dragOverInstanceId: "abc123",
      dragStatus: "inside",
      mountPoint: "content",
      nodeData: {
        brick: "forms.geneal-form[quick-generation]",
        bricks: [
          {
            brick: "forms.general-form",
            properties: {
              values: "<% CTX.formData %>",
            },
            slots: {
              items: {
                bricks: [
                  {
                    brick: "forms.general-input",
                    properties: {
                      label: "名称",
                      name: "name",
                      required: false,
                    },
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
            properties: {
              values: "<% CTX.formData %>",
            },
            slots: {
              items: {
                bricks: [
                  {
                    brick: "forms.general-input",
                    properties: {
                      label: "名称",
                      name: "name",
                      required: false,
                    },
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
