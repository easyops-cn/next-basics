import {
  InstanceApi_postSearch,
  InstanceApi_getDetail,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import { symbolForNodeId, symbolForNodeInstanceId } from "./buildStoryboard";
import {
  StoryboardAssemblyParams,
  StoryboardAssemblyResult,
} from "./interfaces";
import { StoryboardAssembly } from "./StoryboardAssembly";

jest.mock("@next-sdk/cmdb-sdk");

(InstanceApi_postSearch as jest.MockedFunction<
  typeof InstanceApi_postSearch
>).mockImplementation((modelId) => {
  switch (modelId) {
    case "STORYBOARD_ROUTE":
      return Promise.resolve({
        list: [
          {
            id: "R-01",
            instanceId: "instance-r01",
            path: "/a",
            type: "bricks",
            parent: [], // Empty parent also works.
            providers: '["p1"]',
            segues: null,
            // Fields should be removed.
            _ts: 123,
            org: 1,
          },

          {
            id: "R-02",
            instanceId: "instance-r02",
            path: "/b",
            type: "routes",
            permissionsPreCheck:
              '["<% `cmdb:${QUERY.objectId}_instance_create` %>"]',
          },

          {
            id: "R-03",
            instanceId: "instance-r03",
            path: "/b/c",
            type: "bricks",
            parent: [{ id: "R-02" }],
          },

          {
            id: "R-04",
            instanceId: "instance-r04",
            path: "/a/d",
            type: "bricks",
            parent: [{ id: "B-01" }],
            mountPoint: "m2",
          },

          {
            id: "R-05",
            instanceId: "instance-r05",
            path: "/a/e",
            type: "bricks",
            parent: [{ id: "B-01" }],
            mountPoint: "m2",
          },
        ],
      });

    case "STORYBOARD_BRICK":
      return Promise.resolve({
        list: [
          {
            id: "B-01",
            instanceId: "instance-b01",
            type: "brick",
            brick: "m",
            parent: [{ id: "R-01" }],
            if: "false",
            lifeCycle: undefined,
          },

          {
            id: "B-02",
            instanceId: "instance-b02",
            type: "brick",
            brick: "n",
            parent: [{ id: "R-01" }],
          },

          {
            id: "B-03",
            instanceId: "instance-b03",
            type: "brick",
            brick: "o",
            parent: [{ id: "R-03" }],
          },

          {
            id: "B-04",
            instanceId: "instance-b04",
            type: "brick",
            brick: "p",
            parent: [{ id: "B-01" }],
            mountPoint: "m1",
          },

          {
            id: "B-05",
            instanceId: "instance-b05",
            type: "template",
            brick: "q",
            parent: [{ id: "B-01" }],
            mountPoint: "m1",
          },

          {
            // This brick's parent not found.
            id: "T-01",
            instanceId: "instance-x01",
            type: "brick",
            brick: "t1",
            parent: [{ id: "R-00" }],
          },

          {
            // This brick's grand-parent not found.
            id: "T-02",
            instanceId: "instance-x02",
            type: "brick",
            brick: "t2",
            parent: [{ id: "T-01" }],
          },
        ],
      });
  }
});

(InstanceGraphApi_traverseGraphV2 as jest.MockedFunction<
  typeof InstanceGraphApi_traverseGraphV2
>).mockImplementation(() =>
  Promise.resolve({
    topic_vertices: [
      {
        id: "B-T-01",
        instanceId: "a",
        templateId: "tpl-01",
        proxy: JSON.stringify(
          {
            properties: {
              one: {
                ref: "ref-01",
                refProperty: "two",
              },
            },
          },

          null,
          2
        ),
      },
    ],

    vertices: [
      {
        instanceId: "b",
        id: "T-B-01",
        type: "brick",
        brick: "z",
      },

      {
        instanceId: "c",
        id: "T-B-02",
        type: "brick",
        brick: "y",
        ref: "two",
        mountPoint: "m5",
      },

      {
        instanceId: "d",
        id: "T-B-03",
        type: "brick",
        brick: "x",
        mountPoint: "m6",
      },
    ],

    edges: [
      {
        in: "b",
        out: "a",
        out_name: "children",
      },

      {
        in: "c",
        out: "b",
        out_name: "children",
      },

      {
        in: "d",
        out: "c",
        out_name: "children",
      },
    ],
  })
);

const mockGetDetail = (InstanceApi_getDetail as jest.MockedFunction<
  typeof InstanceApi_getDetail
>).mockImplementation(() =>
  Promise.resolve({
    projectId: "P-239",
    menus: [
      {
        menuId: "menu-a",
        items: [
          {
            text: "Menu Item 1",
          },

          {
            text: "Menu Item 2",
            children: [
              {
                text: "Menu Item 2-1",
                children: [{ text: "Menu Item 2-1-1" }],
              },
            ],
          },
        ],
      },

      {
        menuId: "menu-b",
        dynamicItems: true,
        itemsResolve: {
          useProvider: "my.menu-provider",
        },
      },
    ],

    i18n: [
      {
        name: "FILES",
        en: "Files",
        zh: "文件",
      },

      {
        name: "SETTINGS",
        en: "Settings",
        zh: "设置",
      },
    ],

    dependsAll: false,
  })
);

describe("StoryboardAssembly", () => {
  it.each<[StoryboardAssemblyParams, StoryboardAssemblyResult]>([
    [
      { appId: "test-app", projectId: "test-project" },
      {
        projectId: "P-239",
        storyboard: {
          routes: [
            {
              path: "/a",
              type: "bricks",
              providers: ["p1"],
              bricks: [
                {
                  brick: "m",
                  if: false,
                  slots: {
                    m1: {
                      type: "bricks",
                      bricks: [{ brick: "p" }, { template: "q" }],
                    },

                    m2: {
                      type: "routes",
                      routes: [
                        {
                          path: "/a/d",
                          type: "bricks",
                          bricks: [],
                        },

                        {
                          path: "/a/e",
                          type: "bricks",
                          bricks: [],
                        },
                      ],
                    },
                  },
                },

                { brick: "n" },
              ],
            },

            {
              path: "/b",
              type: "routes",
              permissionsPreCheck: [
                "<% `cmdb:${QUERY.objectId}_instance_create` %>",
              ],

              routes: [
                {
                  path: "/b/c",
                  type: "bricks",
                  bricks: [{ brick: "o" }],
                },
              ],
            },
          ],

          meta: {
            customTemplates: [
              {
                name: "tpl-01",
                proxy: {
                  properties: {
                    one: {
                      ref: "ref-01",
                      refProperty: "two",
                    },
                  },
                },

                bricks: [
                  {
                    brick: "z",
                    slots: {
                      m5: {
                        type: "bricks",
                        bricks: [
                          {
                            brick: "y",
                            ref: "two",
                            slots: {
                              m6: {
                                type: "bricks",
                                bricks: [{ brick: "x" }],
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],

            menus: [
              {
                menuId: "menu-a",
                items: [
                  {
                    text: "Menu Item 1",
                  },

                  {
                    text: "Menu Item 2",
                    children: [
                      {
                        text: "Menu Item 2-1",
                        children: [
                          {
                            text: "Menu Item 2-1-1",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              {
                menuId: "menu-b",
                dynamicItems: true,
                itemsResolve: {
                  useProvider: "my.menu-provider",
                },
              },
            ],

            i18n: {
              en: {
                FILES: "Files",
                SETTINGS: "Settings",
              },

              zh: {
                FILES: "文件",
                SETTINGS: "设置",
              },
            },
          },

          dependsAll: false,
        },
      },
    ],

    [
      {
        appId: "test-app",
        projectId: "test-project",
        options: { keepIds: true },
      },
      {
        projectId: "P-239",
        storyboard: {
          routes: [
            {
              [symbolForNodeId]: "R-01",
              path: "/a",
              type: "bricks",
              providers: ["p1"],
              bricks: [
                {
                  [symbolForNodeId]: "B-01",
                  [symbolForNodeInstanceId]: "instance-b01",
                  brick: "m",
                  if: false,
                  slots: {
                    m1: {
                      type: "bricks",
                      bricks: [
                        {
                          [symbolForNodeId]: "B-04",
                          [symbolForNodeInstanceId]: "instance-b04",
                          brick: "p",
                        },

                        {
                          [symbolForNodeId]: "B-05",
                          [symbolForNodeInstanceId]: "instance-b05",
                          template: "q",
                        },
                      ],
                    },

                    m2: {
                      type: "routes",
                      routes: [
                        {
                          [symbolForNodeId]: "R-04",
                          path: "/a/d",
                          type: "bricks",
                          bricks: [],
                        },

                        {
                          [symbolForNodeId]: "R-05",
                          path: "/a/e",
                          type: "bricks",
                          bricks: [],
                        },
                      ],
                    },
                  },
                },

                {
                  [symbolForNodeId]: "B-02",
                  [symbolForNodeInstanceId]: "instance-b02",
                  brick: "n",
                },
              ],
            },

            {
              [symbolForNodeId]: "R-02",
              path: "/b",
              type: "routes",
              permissionsPreCheck: [
                "<% `cmdb:${QUERY.objectId}_instance_create` %>",
              ],

              routes: [
                {
                  [symbolForNodeId]: "R-03",
                  path: "/b/c",
                  type: "bricks",
                  bricks: [
                    {
                      [symbolForNodeId]: "B-03",
                      [symbolForNodeInstanceId]: "instance-b03",
                      brick: "o",
                    },
                  ],
                },
              ],
            },
          ],

          meta: {
            customTemplates: [
              {
                [symbolForNodeId]: "B-T-01",
                name: "tpl-01",
                proxy: {
                  properties: {
                    one: {
                      ref: "ref-01",
                      refProperty: "two",
                    },
                  },
                },

                bricks: [
                  {
                    [symbolForNodeId]: "T-B-01",
                    [symbolForNodeInstanceId]: "b",
                    brick: "z",
                    slots: {
                      m5: {
                        type: "bricks",
                        bricks: [
                          {
                            [symbolForNodeId]: "T-B-02",
                            [symbolForNodeInstanceId]: "c",
                            brick: "y",
                            ref: "two",
                            slots: {
                              m6: {
                                type: "bricks",
                                bricks: [
                                  {
                                    [symbolForNodeId]: "T-B-03",
                                    [symbolForNodeInstanceId]: "d",
                                    brick: "x",
                                  },
                                ],
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],

            menus: [
              {
                menuId: "menu-a",
                items: [
                  {
                    text: "Menu Item 1",
                  },

                  {
                    text: "Menu Item 2",
                    children: [
                      {
                        text: "Menu Item 2-1",
                        children: [
                          {
                            text: "Menu Item 2-1-1",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              {
                menuId: "menu-b",
                dynamicItems: true,
                itemsResolve: {
                  useProvider: "my.menu-provider",
                },
              },
            ],

            i18n: {
              en: {
                FILES: "Files",
                SETTINGS: "Settings",
              },

              zh: {
                FILES: "文件",
                SETTINGS: "设置",
              },
            },
          },

          dependsAll: false,
        },
      } as any,
    ],
  ])("StoryboardAssembly(%j) should work", async (params, result) => {
    expect(await StoryboardAssembly(params)).toEqual(result);
  });

  it("should throw error if some of requests failed", () => {
    mockGetDetail.mockRejectedValueOnce("oops");
    expect(
      StoryboardAssembly({
        appId: "test-app",
        projectId: "test-project",
      })
    ).rejects.toBe("oops");
  });
});
