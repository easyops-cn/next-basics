import { SnippetRuntimeContext } from "@next-types/preview";
import { processWithParamsSnippet } from "./processDynamicSnippet";
describe("processDynamicSnippet processor", () => {
  it.each([
    [
      {
        brick: "presentational-bricks.brick-table[normal]",
        params: {
          test: {
            type: "string",
            defaultValue: "come from snippetParams",
          },
        },
        data: [
          {
            name: "testGood",
            value: "<%! SNIPPET_PARAMS.test %>",
          },
          {
            name: "dataSourceList",
            resolve: {
              useProvider: "providers-of-cmdb.instance-api-post-search",
              args: [
                "APP",
                {
                  fields: {
                    "*": true,
                  },
                },
              ],
            },
          },
        ],
        bricks: [
          {
            brick: "presentational-bricks.brick-table",
            properties: {
              columns: [
                {
                  title: "Name",
                  dataIndex: "name",
                },
                {
                  title: "ctime",
                  dataIndex: "ctime",
                  useBrick: [
                    {
                      brick: "span",
                      properties: {
                        textContent: "<% DATA.cellData %>",
                      },
                    },
                  ],
                },
                {
                  title: "test",
                  dataIndex: "test",
                  useBrick: [
                    {
                      brick: "span",
                      properties: {
                        textContent: "<%! SNIPPET_PARAMS.test %>",
                      },
                    },
                  ],
                },
              ],

              dataSource: "<%@ `${CTX_OR_STATE}.dataSourceList` %>",
            },
          },
        ],
      } as any,
      {
        rootType: "route",
        rootInstanceId: "abc",
        inputParams: {
          test: "hello",
        },
      },
      {
        brick: "presentational-bricks.brick-table[normal]",
        bricks: [
          {
            brick: "presentational-bricks.brick-table",
            properties: {
              columns: [
                { dataIndex: "name", title: "Name" },
                {
                  dataIndex: "ctime",
                  title: "ctime",
                  useBrick: [
                    {
                      brick: "span",
                      properties: { textContent: "<% DATA.cellData %>" },
                    },
                  ],
                },
                {
                  dataIndex: "test",
                  title: "test",
                  useBrick: [
                    { brick: "span", properties: { textContent: "hello" } },
                  ],
                },
              ],
              dataSource: "<% `${CTX}.dataSourceList` %>",
            },
          },
        ],
        data: [
          { name: "testGood", value: "hello" },
          {
            name: "dataSourceList",
            resolve: {
              args: ["APP", { fields: { "*": true } }],
              useProvider: "providers-of-cmdb.instance-api-post-search",
            },
          },
        ],
      },
    ],
    [
      {
        brick: "presentational-bricks.brick-table[normal]",
        params: {
          test: {
            type: "string",
            defaultValue: "come from snippetParams",
          },
        },
        bricks: [
          {
            brick: "presentational-bricks.brick-table",
            properties: {
              columns: [
                {
                  title: "Name",
                  dataIndex: "name",
                },
                {
                  title: "ctime",
                  dataIndex: "ctime",
                  useBrick: [
                    {
                      brick: "span",
                      properties: {
                        textContent: "<% DATA.cellData %>",
                      },
                    },
                  ],
                },
                {
                  title: "test",
                  dataIndex: "test",
                  useBrick: [
                    {
                      brick: "span",
                      properties: {
                        textContent: "<%! SNIPPET_PARAMS.test %>",
                      },
                    },
                  ],
                },
              ],
            },
          },
        ],
      } as any,
      {
        rootType: "route",
        rootInstanceId: "abc",
      },
      {
        brick: "presentational-bricks.brick-table[normal]",
        bricks: [
          {
            brick: "presentational-bricks.brick-table",
            properties: {
              columns: [
                { dataIndex: "name", title: "Name" },
                {
                  dataIndex: "ctime",
                  title: "ctime",
                  useBrick: [
                    {
                      brick: "span",
                      properties: { textContent: "<% DATA.cellData %>" },
                    },
                  ],
                },
                {
                  dataIndex: "test",
                  title: "test",
                  useBrick: [
                    {
                      brick: "span",
                      properties: { textContent: "come from snippetParams" },
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
        brick: "presentational-bricks.brick-table[normal]",
        bricks: [
          {
            brick: "presentational-bricks.brick-table",
            properties: {
              columns: [
                {
                  title: "Name",
                  dataIndex: "name",
                },
                {
                  title: "ctime",
                  dataIndex: "ctime",
                },
                {
                  title: "test",
                  dataIndex: "test",
                },
              ],
              dataSource: { list: [], total: 0 },
            },
          },
        ],
      },
      {} as SnippetRuntimeContext,
      {
        brick: "presentational-bricks.brick-table[normal]",
        bricks: [
          {
            brick: "presentational-bricks.brick-table",
            properties: {
              columns: [
                { dataIndex: "name", title: "Name" },
                { dataIndex: "ctime", title: "ctime" },
                { dataIndex: "test", title: "test" },
              ],
              dataSource: { list: [], total: 0 },
            },
          },
        ],
      },
    ],
  ])("should work", (snippetNode, snippetContext, result) => {
    expect(processWithParamsSnippet(snippetNode, snippetContext)).toEqual(
      result
    );
  });
});
