import { clone } from "lodash";
import { ContractCenterApi_batchSearchContract } from "@next-sdk/next-builder-sdk";
import { ContextConf, Contract } from "@next-core/brick-types";
import {
  buildStoryboardV2,
  symbolForNodeId,
  symbolForNodeInstanceId,
} from "./buildStoryboardV2";

import { BuildInfoV2, StoryboardToBuild } from "./interfaces";
import * as dataProvider from "../../data-providers/ScanBricksAndTemplates";

(ContractCenterApi_batchSearchContract as jest.Mock).mockReturnValue({
  list: [
    {
      namespaceId: "easyops.api.cmdb.instance.PostSearch",
      name: "PostSearch",
      version: "1.1.0",
      serviceName: "logic.cmdb.service",
      request: {
        type: "object",
        fields: [],
      },
      response: {
        type: "object",
        wrapper: true,
        fields: [],
      },
    },
  ],
});

jest.mock("@next-sdk/next-builder-sdk");

const consoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => void 0);

describe("buildStoryboardV2", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each<[string, BuildInfoV2, StoryboardToBuild]>([
    [
      "",
      // Input
      {
        routeList: [
          {
            id: "R-01",
            instanceId: "instance-r01",
            path: "/a",
            type: "bricks",
            parent: [], // Empty parent also works.
            providers: '["p1"]',
            segues: null as unknown as string,
            children: [
              {
                id: "B-01",
                instanceId: "instance-b01",
                type: "brick",
                brick: "m",
                parent: [{ id: "R-01" }],
                if: "false",
                lifeCycle: undefined,
                children: [
                  {
                    id: "R-04",
                    instanceId: "instance-r04",
                    path: "/a/d",
                    type: "bricks",
                    mountPoint: "m2",
                  },
                  {
                    id: "R-05",
                    instanceId: "instance-r05",
                    path: "/a/e",
                    type: "bricks",
                    mountPoint: "m2",
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
                ],
              },
              {
                id: "B-02",
                instanceId: "instance-b02",
                type: "brick",
                brick: "n",
              },
            ],
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
            children: [
              {
                id: "R-03",
                instanceId: "instance-r03",
                path: "/b/c",
                type: "bricks",
                children: [
                  {
                    id: "B-03",
                    instanceId: "instance-b03",
                    type: "brick",
                    brick: "o",
                  },
                ],
              },
            ],
          },
        ],
        templateList: [
          {
            templateId: "tpl-01",
            id: "B-T-01",
            proxy: {
              properties: {
                one: {
                  ref: "ref-01",
                  refProperty: "two",
                },
              },
            },
            state: [
              {
                name: "myState",
                value: "any data",
                dataDefinition: [],
              } as ContextConf,
            ],
            children: [
              {
                id: "T-B-01",
                instanceId: "instance-t-b01",
                type: "brick",
                brick: "z",
                children: [
                  {
                    id: "T-B-02",
                    instanceId: "instance-t-b02",
                    type: "brick",
                    brick: "y",
                    ref: "two",
                    mountPoint: "m5",
                    children: [
                      {
                        id: "T-B-03",
                        instanceId: "instance-t-b03",
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
                if: null,
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
            i18n: {},
          },
          {
            menuId: "menu-b",
            dynamicItems: true,
            itemsResolve: {
              useProvider: "my.menu-provider",
            },
            i18n: {},
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
        functions: [
          {
            name: "sayHello",
            source: "function sayHello() {}",
            description: "Say hello",
          },
          {
            name: "sayExclamation",
            source: "function sayExclamation() {}",
            description: "Say exclamation",
            typescript: true,
          },
          {
            name: "useFn",
            source: `function useFn() {
              FN.a();
              FN.b();
              FN.a();
              FN.useFn();
              FN;
            }`,
          },
          {
            name: "usePerm",
            source: `function usePerm() {
              PERMISSIONS.check();
              PERMISSIONS;
            }`,
          },
          {
            name: "nativeMode",
            source: `function nativeMode() {
              "native mode";
              return a ?? 1;
            }`,
          },
        ],
        workflows: [
          {
            appId: "test-app",
            name: "test-workflow",
            id: "test-worfkow",
            triggerMethod: "manual",
            variables: [],
          },
        ],
        userGroups: [
          {
            name: "开发小组",
            description: "研发",
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
            iid: "instance-r01",
            providers: ["p1"],
            bricks: [
              {
                iid: "instance-b01",
                brick: "m",
                if: false,
                slots: {
                  m1: {
                    type: "bricks",
                    bricks: [
                      { iid: "instance-b04", brick: "p" },
                      { iid: "instance-b05", template: "q" },
                    ],
                  },
                  m2: {
                    type: "routes",
                    routes: [
                      {
                        path: "/a/d",
                        type: "bricks",
                        iid: "instance-r04",
                        bricks: [],
                      },
                      {
                        path: "/a/e",
                        type: "bricks",
                        iid: "instance-r05",
                        bricks: [],
                      },
                    ],
                  },
                },
              },
              { iid: "instance-b02", brick: "n" },
            ],
          },
          {
            path: "/b",
            type: "routes",
            iid: "instance-r02",
            permissionsPreCheck: [
              "<% `cmdb:${QUERY.objectId}_instance_create` %>",
            ],
            routes: [
              {
                path: "/b/c",
                type: "bricks",
                iid: "instance-r03",
                bricks: [{ iid: "instance-b03", brick: "o" }],
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
              state: [
                {
                  name: "myState",
                  value: "any data",
                },
              ],
              bricks: [
                {
                  iid: "instance-t-b01",
                  brick: "z",
                  slots: {
                    m5: {
                      type: "bricks",
                      bricks: [
                        {
                          iid: "instance-t-b02",
                          brick: "y",
                          ref: "two",
                          slots: {
                            m6: {
                              type: "bricks",
                              bricks: [{ iid: "instance-t-b03", brick: "x" }],
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
              i18n: {},
            },
            {
              menuId: "menu-b",
              dynamicItems: true,
              itemsResolve: {
                useProvider: "my.menu-provider",
              },
              i18n: {},
            },
          ],
          workflows: [
            {
              appId: "test-app",
              name: "test-workflow",
              id: "test-worfkow",
              triggerMethod: "manual",
              variables: [],
            },
          ],
          userGroups: [
            {
              name: "开发小组",
              description: "研发",
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
          functions: [
            {
              name: "sayHello",
              source: "function sayHello() {}",
              deps: [],
              perm: false,
            },
            {
              name: "sayExclamation",
              source: "function sayExclamation() {}",
              typescript: true,
              deps: [],
              perm: false,
            },
            {
              name: "useFn",
              source: `function useFn() {
              FN.a();
              FN.b();
              FN.a();
              FN.useFn();
              FN;
            }`,
              deps: ["a", "b"],
              perm: false,
            },
            {
              name: "usePerm",
              source: `function usePerm() {
              PERMISSIONS.check();
              PERMISSIONS;
            }`,
              deps: [],
              perm: true,
            },
            {
              name: "nativeMode",
              source: `function nativeMode() {
              "native mode";
              return a ?? 1;
            }`,
              deps: [],
              perm: false,
              transformed: {
                globals: ["a"],
                source: `function nativeMode() {
  "native mode";

  var _a;
  return (_a = a) !== null && _a !== void 0 ? _a : 1;
}`,
              },
            },
          ],
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
            instanceId: "instance-r01",
            permissionsPreCheck:
              '["<% `cmdb:${QUERY.objectId}_instance_create` %>"]',
            children: [
              {
                id: "B-01",
                type: "brick",
                brick: "n",
                permissionsPreCheck: '["<% CTX.action %>"]',
              },
            ],
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
            iid: "instance-r01",
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
    [
      "test keepIds",
      // Input
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            instanceId: "instance-r01",
            parent: [], // Empty parent also works.
            providers: '["p1"]',
            segues: null as unknown as string,
            children: [
              {
                id: "B-01",
                instanceId: "instance-b01",
                type: "brick",
                brick: "m",
                if: "false",
                lifeCycle: undefined,
              },
            ],
          },
        ],
        templateList: [
          {
            templateId: "menu-a",
            id: "B-T-01",
            children: [
              {
                id: "T-B-01",
                instanceId: "instance-t-b01",
                type: "brick",
                brick: "z",
              },
            ],
          },
        ],
        menus: [],
        i18n: [],
        dependsAll: false,
        options: {
          keepIds: true,
        },
      },
      // Output,
      {
        routes: [
          {
            [symbolForNodeId]: "R-01",
            path: "/a",
            type: "bricks",
            iid: "instance-r01",
            providers: ["p1"],
            bricks: [
              {
                [symbolForNodeId]: "B-01",
                [symbolForNodeInstanceId]: "instance-b01",
                iid: "instance-b01",
                brick: "m",
                if: false,
              },
            ],
          },
        ],
        meta: {
          customTemplates: [
            {
              [symbolForNodeId]: "B-T-01",
              name: "menu-a",
              bricks: [
                {
                  [symbolForNodeId]: "T-B-01",
                  [symbolForNodeInstanceId]: "instance-t-b01",
                  iid: "instance-t-b01",
                  brick: "z",
                },
              ],
            },
          ],
          menus: [],
          i18n: {
            en: {},
            zh: {},
          },
        },
        dependsAll: false,
      } as any,
    ],
    [
      "useChildren single",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            instanceId: "instance-r01",
            providers: '["p1"]',
            children: [
              {
                brick: "presentational-bricks.brick-table",
                id: "B-45235",
                instanceId: "5c4de59f26f55",
                mountPoint: "content",
                properties: '{"useChildren": "[state]","otherFields":["yes"]} ',
                type: "brick",
                [symbolForNodeId]: "B-45235",
                [symbolForNodeInstanceId]: "5c4de59f26f55",
                children: [
                  {
                    brick: "presentational-bricks.brick-value-mapping",
                    id: "B-02",
                    instanceId: "instance-b02",
                    mountPoint: "[state]",
                    type: "brick",
                    properties: '{\n  "fields": "state"}',
                    if: "false",
                    lifeCycle: undefined,
                  },
                ],
              } as any,
            ],
          },
        ],
        templateList: [],
        menus: [],
        i18n: [],
        dependsAll: false,
        options: {
          keepIds: true,
        },
      },
      {
        dependsAll: false,
        meta: {
          customTemplates: [],
          i18n: {
            en: {},
            zh: {},
          },
          menus: [],
        },
        routes: [
          {
            [symbolForNodeId]: "R-01",
            path: "/a",
            providers: ["p1"],
            type: "bricks",
            iid: "instance-r01",
            bricks: [
              {
                iid: "5c4de59f26f55",
                brick: "presentational-bricks.brick-table",
                properties: {
                  otherFields: ["yes"],
                  useBrick: {
                    iid: "instance-b02",
                    brick: "presentational-bricks.brick-value-mapping",
                    if: false,
                    lifeCycle: undefined,
                    properties: {
                      fields: "state",
                    },
                    [symbolForNodeId]: "B-02",
                    [symbolForNodeInstanceId]: "instance-b02",
                  },
                },
                slots: {},
                [symbolForNodeId]: "B-45235",
                [symbolForNodeInstanceId]: "5c4de59f26f55",
              },
            ],
          },
        ],
      } as any,
    ],
    [
      "useChildren is array",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            instanceId: "instance-r01",
            providers: '["p1"]',
            children: [
              {
                brick: "presentational-bricks.brick-table",
                id: "B-45235",
                instanceId: "5c4de59f26f55",
                mountPoint: "content",
                properties: '{\n  "useChildren": "[state]"} ',
                type: "brick",
                children: [
                  {
                    brick: "presentational-bricks.brick-value-mapping",
                    id: "B-02",
                    instanceId: "instance-b02",
                    mountPoint: "[state]",
                    type: "brick",
                    properties: '{\n  "fields": "state"}',
                    if: "false",
                    lifeCycle: undefined,
                  },
                  {
                    brick: "presentational-bricks.icon-select",
                    id: "B-03",
                    instanceId: "instance-b03",
                    mountPoint: "[state]",
                    type: "brick",
                    properties: '{\n  "fields": "select"}',
                    if: "false",
                    lifeCycle: undefined,
                  },
                  {
                    brick: "presentational-bricks.more-select",
                    id: "B-04",
                    instanceId: "instance-b04",
                    mountPoint: "[state]",
                    type: "brick",
                    properties: '{\n  "fields": "more"}',
                    if: "false",
                    lifeCycle: undefined,
                  },
                ],
              },
            ],
          },
        ],
        templateList: [],
        menus: [],
        i18n: [],
        dependsAll: false,
        options: {
          keepIds: true,
        },
      },
      {
        dependsAll: false,
        meta: {
          customTemplates: [],
          i18n: {
            en: {},
            zh: {},
          },
          menus: [],
        },
        routes: [
          {
            bricks: [
              {
                iid: "5c4de59f26f55",
                brick: "presentational-bricks.brick-table",
                properties: {
                  useBrick: [
                    {
                      iid: "instance-b02",
                      brick: "presentational-bricks.brick-value-mapping",
                      if: false,
                      lifeCycle: undefined,
                      properties: {
                        fields: "state",
                      },
                      [symbolForNodeId]: "B-02",
                      [symbolForNodeInstanceId]: "instance-b02",
                    },
                    {
                      iid: "instance-b03",
                      brick: "presentational-bricks.icon-select",
                      if: false,
                      lifeCycle: undefined,
                      properties: {
                        fields: "select",
                      },
                      [symbolForNodeId]: "B-03",
                      [symbolForNodeInstanceId]: "instance-b03",
                    },
                    {
                      iid: "instance-b04",
                      brick: "presentational-bricks.more-select",
                      if: false,
                      lifeCycle: undefined,
                      properties: {
                        fields: "more",
                      },
                      [symbolForNodeId]: "B-04",
                      [symbolForNodeInstanceId]: "instance-b04",
                    },
                  ],
                },
                slots: {},
                [symbolForNodeId]: "B-45235",
                [symbolForNodeInstanceId]: "5c4de59f26f55",
              },
            ],
            path: "/a",
            providers: ["p1"],
            type: "bricks",
            iid: "instance-r01",
            [symbolForNodeId]: "R-01",
          },
        ],
      } as any,
    ],
    [
      "useChildren not found children",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            instanceId: "instance-r01",
            providers: '["p1"]',
            children: [
              {
                brick: "presentational-bricks.brick-table",
                id: "B-45235",
                instanceId: "5c4de59f26f55",
                mountPoint: "content",
                properties: '{\n  "useChildren": "state"} ',
                type: "brick",
                children: [
                  {
                    brick: "presentational-bricks.brick-value-mapping",
                    id: "B-02",
                    instanceId: "instance-b02",
                    mountPoint: "[state]",
                    type: "brick",
                    properties: '{\n  "fields": "state"}',
                    if: "false",
                    lifeCycle: undefined,
                  },
                ],
              },
            ],
          },
        ],
        templateList: [],
        menus: [],
        i18n: [],
        dependsAll: false,
        options: {
          keepIds: true,
        },
      },
      {
        dependsAll: false,
        meta: {
          customTemplates: [],
          i18n: {
            en: {},
            zh: {},
          },
          menus: [],
        },
        routes: [
          {
            bricks: [
              {
                [symbolForNodeId]: "B-45235",
                [symbolForNodeInstanceId]: "5c4de59f26f55",
                iid: "5c4de59f26f55",
                brick: "presentational-bricks.brick-table",
                properties: {
                  useChildren: "state",
                },
                slots: {},
              },
            ],
            path: "/a",
            providers: ["p1"],
            type: "bricks",
            iid: "instance-r01",
            [symbolForNodeId]: "R-01",
          },
        ],
      } as any,
    ],
    [
      "collect contracts",
      {
        app: {
          id: "test-app",
          name: "test-app",
          homepage: "/test-app",
        },
        routeList: [
          {
            id: "R-01",
            instanceId: "instance-r01",
            path: "/a",
            type: "bricks",
            parent: [], // Empty parent also works.
            providers: '["p1"]',
            segues: null as unknown as string,
            context: [
              {
                name: "ttttt",
                resolve: {
                  useProvider: "easyops.api.cmdb.instance@PostSearch:1.1.0",
                  args: ["APP"],
                },
                dataDefinition: [],
              } as ContextConf,
            ],
            // Fields should be removed.
            _ts: 123,
            org: 1,
          },
        ],
        templateList: [],
        menus: [],
        i18n: [],
        functions: [
          {
            name: "sayHello",
            source: "function sayHello() {}",
            description: "Say hello",
          },
          {
            name: "sayExclamation",
            source: "function sayExclamation() {}",
            description: "Say exclamation",
            typescript: true,
          },
        ],
        dependsAll: false,
      },
      // Output
      {
        dependsAll: false,
        meta: {
          contracts: [
            {
              namespaceId: "easyops.api.cmdb.instance.PostSearch",
              name: "PostSearch",
              version: "1.1.0",
              serviceName: "logic.cmdb.service",
              request: {
                type: "object",
              },
              response: {
                type: "object",
                wrapper: true,
              },
            } as Partial<Contract> as Contract,
          ],
          customTemplates: [],
          functions: [
            {
              name: "sayHello",
              source: "function sayHello() {}",
              typescript: undefined,
              deps: [],
              perm: false,
            },
            {
              name: "sayExclamation",
              source: "function sayExclamation() {}",
              typescript: true,
              deps: [],
              perm: false,
            },
          ],
          i18n: {
            en: {},
            zh: {},
          },
          menus: [],
        },
        routes: [
          {
            bricks: [],
            context: [
              {
                name: "ttttt",
                resolve: {
                  args: ["APP"],
                  useProvider: "easyops.api.cmdb.instance@PostSearch:1.1.0",
                },
              },
            ],
            path: "/a",
            providers: ["p1"],
            type: "bricks",
            iid: "instance-r01",
          },
        ],
      },
    ],
  ])("buildStoryboardV2 should work %s", async (condition, input, output) => {
    const cloneOfInput = clone(input);
    expect(await buildStoryboardV2(input)).toEqual(output);
    // `input` should never be mutated.
    expect(input).toEqual(cloneOfInput);
    expect(consoleError).not.toBeCalled();
  });

  it.each<[string, string, Parameters<typeof buildStoryboardV2>[0]]>([
    [
      "Slot type error",
      "mix bricks in routes mount point",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            children: [
              {
                id: "B-01",
                type: "brick",
                brick: "x",
                children: [
                  {
                    id: "R-02",
                    type: "routes",
                    path: "/b",
                  },
                  {
                    id: "B-02",
                    type: "brick",
                    brick: "y",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  ])(
    "buildStoryboardV2 should warn `%s` if %s",
    async (message, condition, input) => {
      jest
        .spyOn(dataProvider, "ScanBricksAndTemplates")
        .mockReturnValue({ contractData: "" } as any);
      await buildStoryboardV2(input);
      expect(consoleError).toBeCalledTimes(1);
      expect(consoleError.mock.calls[0][0]).toBe(message);
    }
  );
});
