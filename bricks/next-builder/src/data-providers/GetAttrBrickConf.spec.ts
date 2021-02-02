import { GetAttrBrickConf, GetAttrBrickConfParams } from "./GetAttrBrickConf";

describe("GetAttrBrickConf", () => {
  it.each<[GetAttrBrickConfParams, any]>([
    [
      {
        type: "forms",
        attrList: [
          {
            name: "name",
            id: "name",
            instanceId: "123",
            required: true,
            value: {
              type: "str",
            },
          },
        ],
      },
      {
        type: "forms",
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
        ],
      },
    ],
    [
      {
        type: "table",
        attrList: [
          {
            name: "name",
            id: "name",
            instanceId: "123",
            required: true,
            value: {
              type: "str",
            },
          },
        ],
      },
      {
        type: "table",
        attrBrickConfList: [
          {
            name: "name",
            id: "name",
            instanceId: "123",
            required: true,
            value: {
              type: "str",
            },
            rowKey: "123-table",
            attrBrickConf: {
              text: "字符型",
              options: [
                {
                  id: "123-display2",
                  brickConf: [
                    {
                      brick: "text",
                    },
                  ],
                },
                {
                  id: "123-display3",
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
                  id: "123-display4",
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
        ],
      },
    ],
    [
      {
        type: "descriptions",
      },
      {
        type: "descriptions",
        attrBrickConfList: [],
      },
    ],
  ])("GetAttrBrickConf(%j) should work", async (params, result) => {
    expect(await GetAttrBrickConf(params)).toEqual(result);
  });
});
