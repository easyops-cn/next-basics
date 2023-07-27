import {
  GenerateBricksBasedOnModel,
  GenerateBricksBasedOnModelParams,
} from "./GenerateBricksBasedOnModel";

describe("GenerateBricksBasedOnModel", () => {
  it.each<[GenerateBricksBasedOnModelParams, any]>([
    [
      {
        brickType: "forms",
        attrBrickConfList: [
          {
            name: "name",
            id: "name",
            instanceId: "123",
            required: true,
            value: {
              type: "str",
            },
            rowKey: "123-forms",
            attrBrickConf: {
              text: "字符型",
              options: [
                {
                  id: "123-str1",
                  brickConf: [
                    {
                      brick: "forms.general-input",
                      properties: {
                        name: "name",
                        label: "name",
                        required: true,
                      },
                      mountPoint: "items",
                    },
                  ],
                },
              ],
            },
          },
          {
            name: "isDefault",
            id: "isDefault",
            instanceId: "456",
            required: false,
            value: {
              type: "bool",
            },
            rowKey: "456-forms",
            attrBrickConf: {
              text: "字符型",
              options: [
                {
                  id: "456-bool1",
                  brickConf: [
                    {
                      brick: "forms.general-radio",
                      properties: {
                        name: "isDefault",
                        label: "isDefault",
                        required: false,
                        options: [
                          {
                            label: "True",
                            value: true,
                          },
                          {
                            label: "False",
                            value: false,
                          },
                        ],
                      },
                      mountPoint: "items",
                    },
                  ],
                },
                {
                  id: "456-bool2",
                  brickConf: [
                    {
                      brick: "forms.general-switch",
                      properties: {
                        name: "isDefault",
                        label: "isDefault",
                        required: false,
                      },
                      mountPoint: "items",
                    },
                  ],
                },
              ],
            },
          },
        ],
        attrCustomBrickConfMap: {
          "456": {
            brickConfId: "456-bool2",
          },
        },
        parentId: "instanceId",
      },
      [
        {
          id: "0",
          parentId: "instanceId",
          type: "brick",
          brick: {
            brick: "forms.general-form",
            ref: "general-form",
          },
        },
        {
          id: "1",
          parentId: "0",
          mountPoint: "items",
          type: "brick",
          brick: {
            brick: "forms.general-input",
            properties: JSON.stringify(
              {
                name: "name",
                label: "name",
                required: true,
              },
              null,
              2
            ),
          },
        },
        {
          id: "2",
          parentId: "0",
          mountPoint: "items",
          type: "brick",
          brick: {
            brick: "forms.general-switch",
            properties: JSON.stringify(
              {
                name: "isDefault",
                label: "isDefault",
                required: false,
              },
              null,
              2
            ),
          },
        },
        {
          id: "3",
          parentId: "0",
          mountPoint: "items",
          type: "brick",
          brick: {
            brick: "forms.general-buttons",
            properties: JSON.stringify(
              {
                showCancelButton: true,
                submitText: "提交",
                cancelText: "取消",
              },
              null,
              2
            ),
          },
        },
      ],
    ],
    [
      {
        brickType: "table",
        attrBrickConfList: [
          {
            name: "name",
            id: "name",
            unique: true,
            instanceId: "123",
            required: true,
            value: {
              type: "str",
            },
            rowKey: "123-forms",
            attrBrickConf: {
              text: "字符型",
              options: [
                {
                  id: "123-display19",
                  brickConf: [
                    {
                      brick: "presentational-bricks.general-label",
                      transform: {
                        text: "<% DATA.cellData %>",
                      },
                    },
                  ],
                },
                {
                  id: "123-display20",
                  brickConf: [
                    {
                      brick: "presentational-bricks.brick-link",
                      transform: {
                        label: "<% DATA.cellData %>",
                      },
                    },
                  ],
                },
              ],
            },
          },
          {
            name: "isDefault",
            id: "isDefault",
            instanceId: "456",
            required: false,
            value: {
              type: "bool",
            },
            rowKey: "456-forms",
            attrBrickConf: {
              text: "字符型",
              options: [
                {
                  id: "456-bool3",
                  brickConf: [
                    {
                      brick: "presentational-bricks.brick-value-mapping",
                      properties: {
                        mapping: {
                          true: {
                            text: "true",
                          },
                          false: {
                            text: "false",
                          },
                        },
                      },
                      transform: {
                        value: "<% DATA.rowData %>",
                      },
                    },
                  ],
                },
              ],
            },
          },
        ],
        attrCustomBrickConfMap: {
          "123": {
            brickConfId: "123-display20",
          },
        },
        parentId: "instanceId",
      },
      [
        {
          type: "brick",
          id: "0",
          parentId: "instanceId",
          brick: {
            brick: "basic-bricks.general-card",
          },
        },
        {
          type: "brick",
          id: "1",
          parentId: "0",
          brick: {
            brick: "container-brick.search-bar",
          },
          mountPoint: "content",
        },
        {
          type: "brick",
          id: "2",
          parentId: "1",
          mountPoint: "start",
          brick: {
            brick: "presentational-bricks.brick-general-search",
            properties: JSON.stringify(
              {
                q: "${query.q}",
                defaultArgs: [{ field: "page", value: 1 }],
              },
              null,
              2
            ),
          },
        },
        {
          type: "brick",
          mountPoint: "content",
          parentId: "0",
          id: "3",
          brick: {
            brick: "presentational-bricks.brick-table",
            ref: "brick-table",
            properties: JSON.stringify(
              {
                showCard: false,
                sort: "${query.sort}",
                order: "${query.order}",
                page: "${query.page=1|number}",
                pageSize: "${query.pageSize=10|number}",
                rowKey: "name",
                columns: [
                  {
                    title: "name",
                    dataIndex: "name",
                    useBrick: [
                      {
                        brick: "presentational-bricks.brick-link",
                        transform: {
                          label: "<% DATA.cellData %>",
                        },
                      },
                    ],
                  },
                  {
                    title: "isDefault",
                    dataIndex: "isDefault",
                    useBrick: [
                      {
                        brick: "presentational-bricks.brick-value-mapping",
                        properties: {
                          mapping: {
                            true: {
                              text: "true",
                            },
                            false: {
                              text: "false",
                            },
                          },
                        },
                        transform: {
                          value: "<% DATA.rowData %>",
                        },
                      },
                    ],
                  },
                ],
              },
              null,
              2
            ),
          },
        },
      ],
    ],
    [
      {
        brickType: "descriptions",
        attrBrickConfList: [
          {
            name: "name",
            id: "name",
            unique: true,
            instanceId: "123",
            required: true,
            value: {
              type: "str",
            },
            rowKey: "123-forms",
            attrBrickConf: {
              text: "字符型",
              options: [],
            },
          },
          {
            name: "isDefault",
            id: "isDefault",
            instanceId: "456",
            required: false,
            value: {
              type: "bool",
            },
            rowKey: "456-forms",
            attrBrickConf: {
              text: "字符型",
              options: [
                {
                  id: "456-bool3",
                  brickConf: [
                    {
                      brick: "presentational-bricks.brick-value-mapping",
                      properties: {
                        mapping: {
                          true: {
                            text: "true",
                          },
                          false: {
                            text: "false",
                          },
                        },
                      },
                      transform: {
                        value: "<% DATA?.isDefault %>",
                      },
                    },
                  ],
                },
              ],
            },
          },
        ],
        attrCustomBrickConfMap: {},
        parentId: "instanceId",
      },
      [
        {
          parentId: "instanceId",
          type: "brick",
          brick: {
            brick: "presentational-bricks.brick-descriptions",
            ref: "brick-descriptions",
            properties: JSON.stringify(
              {
                itemList: [
                  {
                    label: "name",
                    field: "name",
                  },
                  {
                    label: "isDefault",
                    field: "isDefault",
                    useBrick: [
                      {
                        brick: "presentational-bricks.brick-value-mapping",
                        properties: {
                          mapping: {
                            true: {
                              text: "true",
                            },
                            false: {
                              text: "false",
                            },
                          },
                        },
                        transform: {
                          value: "<% DATA?.isDefault %>",
                        },
                      },
                    ],
                  },
                ],
                column: 2,
              },
              null,
              2
            ),
          },
        },
      ],
    ],
  ])("GenerateBricksBasedOnModel(%j) should work", async (params, result) => {
    expect(await GenerateBricksBasedOnModel(params)).toEqual(result);
  });
});
