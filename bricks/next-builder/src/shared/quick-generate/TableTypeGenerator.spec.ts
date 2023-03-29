import { TableTypeGenerator } from "./TableTypeGenerator";

describe("TableTypeGenerator", () => {
  it("should work", () => {
    const useBrickList = [
      {
        brick: "presentational-bricks.brick-link",
        label: "链接",
        propertyGenerator: () => ({
          label: "查看",
        }),
      },
      {
        brick: "presentational-bricks.brick-tag",
        label: "标签",
        propertyGenerator: () => ({
          color: "green",
        }),
      },
    ];

    const brickData = {
      brick: "presentational-bricks.brick-tag",
      instanceId: "abc123",
      properties:
        '{"showCard":false,"columns":[{"dataIndex":"name","title":"name","useBrick":[{"brick":"presentational-bricks.brick-link"}]}]}',
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
      id: "HOST-brick-table-abc123",
      sourceType: "cmdb",
      fields: [],
      brick: [
        {
          brick: "presentational-bricks.brick-tag",
          properties:
            '{"showCard":false,"columns":[{"dataIndex":"name","title":"name","useBrick":[{"brick":"presentational-bricks.brick-link"}]}]}',
          instanceId: "abc123",
        },
      ],
    };

    const generatorProviderName = ({ dataName }): string =>
      `<% CTX.${dataName} %>`;

    const instance = new TableTypeGenerator({
      generatorProviderName,
    });

    instance.setData({
      useBrickList,
      brickData,
      attrMap,
      dataType,
      contextModel,
      appId: "test-app",
    });

    expect(instance.getBrickProperties()).toEqual({
      showCard: false,
      columns: [
        {
          dataIndex: "name",
          title: "name",
          useBrick: [{ brick: "presentational-bricks.brick-link" }],
        },
      ],
    });

    expect(
      instance.getCreateData({
        fields: [
          {
            name: "age",
            id: "age",
            type: "int",
            brick: "presentational-bricks.brick-tag",
          },
        ],
        dataName: "tableData",
      })
    ).toEqual({
      update: [
        {
          instanceId: "abc123",
          objectId: "STORYBOARD_BRICK",
          property: {
            brick: "presentational-bricks.brick-tag",
            properties:
              '{"showCard":false,"columns":[{"dataIndex":"age","key":"age","title":"age","useBrick":[{"brick":"presentational-bricks.brick-tag","properties":{"color":"green"}}]}],"dataSource":"<% CTX.tableData %>"}',
          },
        },
      ],
    });

    expect(instance.calcPrevFields()).toEqual([
      {
        brick: "presentational-bricks.brick-link",
        id: "name",
        name: "名称",
        type: "string",
      },
    ]);

    expect(instance.getDefaultMergeValue()).toEqual([
      {
        dataIndex: "name",
        title: "name",
        useBrick: [{ brick: "presentational-bricks.brick-link" }],
      },
    ]);

    const insert = [];
    instance.handleInsert(
      {
        name: "name",
        id: "name",
        type: "string",
        brick: "presentational-bricks.brick-link",
      },
      insert
    );
    expect(insert).toEqual([
      {
        dataIndex: "name",
        key: "name",
        title: "name",
        useBrick: [
          {
            brick: "presentational-bricks.brick-link",
            properties: { label: "查看" },
          },
        ],
      },
    ]);

    const update = [
      {
        dataIndex: "name",
        key: "name",
        title: "name",
        useBrick: [
          {
            brick: "presentational-bricks.brick-link",
          },
        ],
      },
    ];
    instance.handleUpdate(
      {
        name: "name",
        id: "name",
        type: "string",
        brick: "presentational-bricks.brick-tag",
      },
      update
    );
    expect(update).toEqual([
      {
        dataIndex: "name",
        key: "name",
        title: "name",
        useBrick: [
          {
            brick: "presentational-bricks.brick-tag",
            properties: { color: "green" },
          },
        ],
      },
    ]);

    const remove = [
      {
        dataIndex: "name",
        key: "name",
        title: "name",
        useBrick: [
          {
            brick: "presentational-bricks.brick-link",
          },
        ],
      },
    ];

    instance.handleDelete(
      {
        name: "name",
        id: "name",
        type: "string",
      },
      remove
    );

    expect(remove).toEqual([]);

    expect(
      instance.processFinalMergeValue(
        [
          {
            dataIndex: "name",
            key: "name",
            title: "name",
            useBrick: [
              {
                brick: "presentational-bricks.brick-link",
              },
            ],
          },
        ],
        {
          dataName: "tableData",
        }
      )
    ).toEqual({
      update: [
        {
          instanceId: "abc123",
          objectId: "STORYBOARD_BRICK",
          property: {
            brick: "presentational-bricks.brick-tag",
            properties:
              '{"showCard":false,"columns":[{"dataIndex":"name","key":"name","title":"name","useBrick":[{"brick":"presentational-bricks.brick-link"}]}],"dataSource":"<% CTX.tableData %>"}',
          },
        },
      ],
    });
  });
});
