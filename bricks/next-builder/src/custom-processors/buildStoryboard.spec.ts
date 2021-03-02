import { clone } from "lodash";
import { buildStoryboard } from "./buildStoryboard";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

const consoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => void 0);

describe("buildStoryboard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each<
    [
      string,
      Parameters<typeof buildStoryboard>[0],
      ReturnType<typeof buildStoryboard>
    ]
  >([
    [
      "",
      // Input
      {
        routeList: [
          {
            id: "R-01",
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
            path: "/b",
            type: "routes",
            permissionsPreCheck:
              '["<% `cmdb:${QUERY.objectId}_instance_create` %>"]',
          },
          {
            id: "R-03",
            path: "/b/c",
            type: "bricks",
            parent: [{ id: "R-02" }],
          },
          {
            id: "R-04",
            path: "/a/d",
            type: "bricks",
            parent: [{ id: "B-01" }],
            mountPoint: "m2",
          },
          {
            id: "R-05",
            path: "/a/e",
            type: "bricks",
            parent: [{ id: "B-01" }],
            mountPoint: "m2",
          },
        ],
        brickList: [
          {
            id: "B-01",
            type: "brick",
            brick: "m",
            parent: [{ id: "R-01" }],
            if: "false",
            lifeCycle: undefined,
          },
          {
            id: "B-02",
            type: "brick",
            brick: "n",
            parent: [{ id: "R-01" }],
          },
          {
            id: "B-03",
            type: "brick",
            brick: "o",
            parent: [{ id: "R-03" }],
          },
          {
            id: "B-04",
            type: "brick",
            brick: "p",
            parent: [{ id: "B-01" }],
            mountPoint: "m1",
          },
          {
            id: "B-05",
            type: "template",
            brick: "q",
            parent: [{ id: "B-01" }],
            mountPoint: "m1",
          },
          {
            // This brick's parent not found.
            id: "T-01",
            type: "brick",
            brick: "t1",
            parent: [{ id: "R-00" }],
          },
          {
            // This brick's grand-parent not found.
            id: "T-02",
            type: "brick",
            brick: "t2",
            parent: [{ id: "T-01" }],
          },
        ],
        templateList: [
          {
            templateId: "tpl-01",
            proxy: {
              properties: {
                one: {
                  ref: "ref-01",
                  refProperty: "two",
                },
              },
            },
            children: [
              {
                id: "T-B-01",
                type: "brick",
                brick: "z",
                children: [
                  {
                    id: "T-B-02",
                    type: "brick",
                    brick: "y",
                    ref: "two",
                    mountPoint: "m5",
                    children: [
                      {
                        id: "T-B-03",
                        type: "brick",
                        brick: "x",
                        mountPoint: "m6",
                      },
                    ],
                  },
                ],
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
      },
      // Output
      {
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
    ],
    [
      "test permissionPreCheck",
      // Input
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            permissionsPreCheck:
              '["<% `cmdb:${QUERY.objectId}_instance_create` %>"]',
          },
        ],
        brickList: [
          {
            id: "B-01",
            type: "brick",
            brick: "n",
            parent: [{ id: "R-01" }],
            permissionsPreCheck: '["<% CTX.action %>"]',
          },
        ],
        templateList: [
          {
            templateId: "tpl-01",
            children: [
              {
                id: "T-B-01",
                type: "brick",
                brick: "z",
                permissionsPreCheck: "",
                children: [
                  {
                    id: "T-B-02",
                    type: "brick",
                    brick: "y",
                    ref: "two",
                    permissionsPreCheck: '["<% CTX.action %>"]',
                    mountPoint: "m5",
                  },
                ],
              },
            ],
          },
        ],
      },
      // Output
      {
        routes: [
          {
            path: "/a",
            type: "bricks",
            permissionsPreCheck: [
              "<% `cmdb:${QUERY.objectId}_instance_create` %>",
            ],
            bricks: [
              {
                brick: "n",
                permissionsPreCheck: ["<% CTX.action %>"],
              },
            ],
          },
        ],
        meta: {
          customTemplates: [
            {
              name: "tpl-01",
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
                          permissionsPreCheck: ["<% CTX.action %>"],
                        },
                      ],
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    ],
    [
      "when a custom template has no bricks",
      // Input
      {
        routeList: [],
        brickList: [],
        templateList: [
          {
            templateId: "menu-a",
          },
        ],
      },
      // Output
      {
        routes: [],
        meta: {
          customTemplates: [
            {
              name: "menu-a",
              bricks: [],
            },
          ],
        },
      },
    ],
    [
      "when it's all empty",
      // Input
      {
        routeList: [],
        brickList: [],
        templateList: [],
        menus: [],
        i18n: [],
        dependsAll: false,
      },
      // Output
      {
        routes: [],
        meta: {
          customTemplates: [],
          menus: [],
          i18n: {
            en: {},
            zh: {},
          },
        },
        dependsAll: false,
      },
    ],
  ])("buildStoryboard should work %s", (condition, input, output) => {
    const cloneOfInput = clone(input);
    expect(buildStoryboard(input)).toEqual(output);
    // `input` should never be mutated.
    expect(input).toEqual(cloneOfInput);
    expect(consoleError).not.toBeCalled();
  });

  it.each<[string, string, Parameters<typeof buildStoryboard>[0]]>([
    [
      "Parent error",
      "parent not found",
      {
        routeList: [
          // Ignored if missing `path`.
          {
            id: "R-00",
            type: "bricks",
          } as any,
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            parent: [{ id: "R-00" }],
          },
        ],
        brickList: [],
      },
    ],
    [
      "Mount type error",
      "parent invalid",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "redirect",
            redirect: '"/a/b"',
          },
          {
            id: "R-02",
            path: "/a/b",
            type: "bricks",
            parent: [{ id: "R-01" }],
          },
        ],
        brickList: [],
      },
    ],
    [
      "Mount type error",
      "child route missing path",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "routes",
          },
          {
            // Missing path.
            id: "R-02",
            type: "bricks",
            parent: [{ id: "R-01" }],
          },
        ],
        brickList: [],
      },
    ],
    [
      "Mount type error",
      "child brick missing brick",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
          },
        ],
        brickList: [
          {
            // Missing brick.
            id: "B-01",
            type: "brick",
            parent: [{ id: "R-01" }],
          } as any,
        ],
      },
    ],
    [
      "Slot type error",
      "child brick mount on route slot",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
          },
          {
            id: "R-02",
            path: "/a/b",
            type: "bricks",
            parent: [{ id: "B-01" }],
            mountPoint: "m1",
          },
        ],
        brickList: [
          {
            id: "B-01",
            type: "brick",
            brick: "a",
            parent: [{ id: "R-01" }],
          },
          {
            id: "B-02",
            type: "brick",
            brick: "b",
            parent: [{ id: "B-01" }],
            mountPoint: "m1",
          },
        ],
      },
    ],
    [
      "JSON.parse() failed",
      "json field invalid",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            providers: "p1",
          },
        ],
        brickList: [],
      },
    ],
    [
      "Failed to parse yaml string",
      "yaml field invalid",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            permissionsPreCheck: "['a]",
          },
        ],
        brickList: [],
      },
    ],
    [
      "Mount type error",
      "child of a brick missing both path and brick",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
          },
        ],
        brickList: [
          {
            id: "B-01",
            type: "brick",
            brick: "a",
            parent: [{ id: "R-01" }],
          },
          {
            // Missing brick.
            id: "B-02",
            type: "brick",
            parent: [{ id: "B-01" }],
            mountPoint: "m1",
          } as any,
        ],
      },
    ],
  ])("buildStoryboard should warn `%s` if %s", (message, condition, input) => {
    buildStoryboard(input);
    expect(consoleError).toBeCalledTimes(1);
    expect(consoleError.mock.calls[0][0]).toBe(message);
  });

  it("should throw if direct circular nodes found", () => {
    expect(() => {
      buildStoryboard({
        brickList: [
          {
            id: "B-01",
            type: "brick",
            brick: "a",
            parent: [{ id: "B-01" }],
          },
        ],
        routeList: [],
      });
    }).toThrowError("Circular nodes found: B-01,B-01");
  });

  it("should throw if indirect circular nodes found", () => {
    expect(() => {
      buildStoryboard({
        brickList: [
          {
            id: "B-01",
            type: "brick",
            brick: "a",
            parent: [{ id: "B-02" }],
          },
          {
            id: "B-02",
            type: "brick",
            brick: "b",
            parent: [{ id: "B-01" }],
          },
        ],
        routeList: [],
      });
    }).toThrowError("Circular nodes found: B-01,B-02,B-01");
  });
});
