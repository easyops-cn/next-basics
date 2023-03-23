import { CommonTypeGenerator, getSingleInstance } from "./CommTypeGenerator";
import { Field } from "./interface";

class TestTypeGenerator extends CommonTypeGenerator {
  calcPrevFields(): Field[] {
    return [
      {
        id: "name",
        name: "名称",
        type: "string",
        brick: "forms.general-input",
      },
      {
        id: "page",
        name: "页数",
        type: "int",
        brick: "forms.general-input-number",
      },
    ];
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getCreateData() {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getDefaultMergeValue() {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  processFinalMergeValue() {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleInsert(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleDelete(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleUpdate(): void {}
}

describe("CommonTypeGenerator", () => {
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
    ["isCreate", { id: "isCreate", name: "是否创建", value: { type: "bool" } }],
    ["instance", { id: "instance", name: "实例数据", value: { type: "json" } }],
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
      },
    ],
  };

  it("should work", () => {
    const instance = new TestTypeGenerator({});

    const spyOnHandleInsert = jest.spyOn(instance, "handleInsert");
    const spyOnHandleUpdate = jest.spyOn(instance, "handleUpdate");
    const spyOnHandleDelete = jest.spyOn(instance, "handleDelete");

    const spyOnProcessFinalMergeValue = jest.spyOn(
      instance,
      "processFinalMergeValue"
    );

    instance.setData({
      useBrickList,
      brickData,
      attrMap,
      dataType,
      contextModel,
    });

    instance.getMergeData({
      fields: [
        {
          name: "page",
          id: "page",
          type: "int",
          brick: "forms.general-input",
        },
        {
          name: "isCreate",
          id: "是否创建",
          type: "int",
          brick: "forms.general-radio",
        },
      ],
    });

    expect(spyOnHandleInsert).toHaveBeenCalledWith(
      {
        brick: "forms.general-radio",
        id: "是否创建",
        name: "isCreate",
        type: "int",
      },
      {}
    );

    expect(spyOnHandleDelete).toHaveBeenCalledWith(
      {
        brick: "forms.general-input",
        id: "name",
        name: "名称",
        type: "string",
      },
      {}
    );

    expect(spyOnHandleUpdate).toHaveBeenCalledWith(
      {
        brick: "forms.general-input",
        brickInstanceId: undefined,
        id: "page",
        name: "page",
        type: "int",
      },
      {}
    );

    instance.needCustomProcessor = true;

    instance.getMergeData({});

    expect(spyOnProcessFinalMergeValue).toHaveBeenCalledWith({});
  });

  it("should get single instance", () => {
    const createInstance = getSingleInstance(CommonTypeGenerator);

    const instance = createInstance({ useBrickList });

    const instance2 = createInstance({ useBrickList });

    expect(instance).toEqual(instance2);
  });
});
