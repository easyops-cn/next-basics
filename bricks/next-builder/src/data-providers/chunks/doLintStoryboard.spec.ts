import { Storyboard } from "@next-core/brick-types";
import { doLintStoryboard } from "./doLintStoryboard";

const storyboard = {
  app: {
    id: "kehua-test-3",
    internal: false,
    private: false,
    legacy: "",
    name: "kehua-test-3",
    icons: null,
    storyboardJson: "",
    tags: [],
    currentVersion: "",
    installStatus: "",
    homepage: "/kehua-test-3",
    clonedFrom: null,
    owner: "",
    readme: "",
    status: "",
    ctime: "",
    mtime: "",
    pkgName: "",
    menuIcon: {
      lib: "easyops",
      type: "",
      theme: "",
      icon: "agile-solution",
      prefix: "",
      category: "default",
      color: "",
    },
    iconBackground: "",
    defaultConfig: null,
    env: null,
    locales: null,
    layoutType: "business",
    noAuthGuard: false,
    breadcrumb: null,
    theme: "",
    defaultContainer: {
      id: "",
      name: "",
      type: "",
      order: 0,
    },
  },
  dependsAll: false,
  routes: [
    {
      alias: "测试",
      bricks: [
        {
          bg: false,
          brick: "basic-bricks.easy-view",
          iid: "5eb8291903957",
          injectDeep: true,
          lifeCycle: {
            useResolves: [
              {
                transform: {
                  "a-property": "",
                },
                useProvider: "providers-of-cmdb.instance-xxx",
              },
            ],
          },
          properties: {
            textContent_work_1: "<% CTX.a %>",
            textContent_work_2: "<% CTX['a'] %>",
            textContent_error_1: "<% CTX[a] %>",
            textContent_error_2: "<% CTX[CTX.a ? CTX.b : CTX.c] %>",
          },
          events: {
            click: {
              action: "context.replace",
              args: [
                {
                  name: "test",
                },
                {
                  value: "test",
                },
              ],
            },
            focus: {
              if: "<% true %>",
              then: [
                {
                  action: "no action",
                },
              ],
              else: [
                {
                  action: "no action",
                },
              ],
            },
          },
          portal: false,
          context: [
            {
              name: "test",
              value: "value",
            },
          ],
          exports: {
            xxx: "value",
          },
        },
        {
          template: "mock-template.general-list",
        },
        {
          bg: false,
          brick: "basic-bricks.general-button",
          events: {
            "general.button.click": [
              {
                action: "message.info",
                args: ["${EVENT.detail}"],
              },
              {
                useProvider: "providers-of-cmdb.instance-api-xxx",
                callback: {
                  success: [
                    {
                      action: "message.success",
                      args: ["请求成功"],
                    },
                  ],
                  error: [
                    {
                      action: "handleHttpError",
                    },
                  ],
                },
              },
            ],
            click: {
              action: "context.replace",
              args: [
                {
                  name: "test1",
                  value: "1",
                },
                {
                  name: "test1",
                  value: "2",
                },
              ],
            },
            move: {
              if: "<% true %>",
              then: [
                {
                  action: "console.log",
                },
              ],
              else: {
                action: "console.log",
              },
            },
          },
          iid: "5ed931cf38aad",
          injectDeep: true,
          lifeCycle: {},
          portal: false,
          properties: {
            buttonName: "to new",
            buttonType: "link",
            buttonUrl: "new",
            dataset: {
              testid: "new link",
            },
          },
        },
        {
          brick: "easyops-builtin-widgets.tpl-resume-widget",
          iid: "5ed2f72c70af9",
          injectDeep: true,
          portal: false,
        },
      ],
      context: [
        {
          name: "testData",
          onChange: [
            {
              action: "context.load",
            },
          ],
          path: "",
          value: 1,
        },
        {
          name: "kakataa",
          onChange: [
            {
              properties: {
                buttomName: "test",
              },
              target: "#demo-btn",
            },
          ],
          path: "",
          value: "path",
        },
      ],
      exact: true,
      hybrid: false,
      iid: "5eb75014e908e",
      lock: false,
      path: "${APP.homepage}/test",
      public: false,
      providers: ["provider-of-cmdb\\.get-detail"],
      defineResolves: [
        {
          id: "value-1",
          provider: "test-provider",
        },
      ],
      redirect: {
        useProvider: "provider-of-cmdb.get-detail",
      },
      type: "bricks",
    },
  ],
  meta: {
    customTemplates: [
      {
        bricks: [
          {
            brick: "basic-bricks.easy-view",
            iid: "5ed9319f8f4cd",
            injectDeep: true,
            portal: false,
            ref: "view",
          },
          {
            bg: false,
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "<% STATE[a] %>",
              buttonType: "link",
              buttonUrl: "<% PATH %>",
              dataset: {
                testid: "new link",
              },
            },
            events: {
              click: {
                action: "state.update",
                args: [
                  {
                    name: "xxx",
                  },
                  {
                    value: "xxx",
                  },
                ],
              },
            },
          },
        ],
        name: "tpl-page-test",
      },
      {
        state: [
          {
            name: "tplTestData",
            path: "<% PATH[SOME_PROP] %>",
            value: "<% PATH.projectId %>",
          },
        ],
        bricks: [
          {
            bg: false,
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "to new",
              buttonType: "link",
              buttonUrl: "${PATH}",
              dataset: {
                testid: "new link",
              },
            },
          },
        ],
        name: "tpl-test-1",
      },
      {
        bricks: [],
        name: "tpl-tast-name-length-ha",
      },
      {
        bricks: [],
        name: "tpl-test-name-test-name-test-name-test-name-test-name-test-name-test-name-test-name-test-name-test-name-test-name",
      },
    ],
    functions: [],
    i18n: {
      en: {},
      zh: {},
    },
    menus: [
      {
        defaultCollapsed: false,
        i18n: {},
        items: [
          {
            activeExcludes: [],
            activeIncludes: [],
            children: [],
            defaultExpanded: false,
            groupId: "11111",
            href: "${APP.homepage}/newnew",
            target: "11111",
            text: "1111",
          },
          {
            activeExcludes: [],
            activeIncludes: [],
            children: [],
            defaultExpanded: false,
            groupId: "2222",
            target: "22222",
            text: "2222",
            to: "22222",
          },
          {
            activeExcludes: [],
            activeIncludes: [],
            children: [],
            defaultExpanded: false,
            href: "${APP.homepage}/new",
            target: "3333",
            text: "3333",
          },
        ],
        menuId: "test",
        title: "test",
        titleDataSource: {},
        type: "main",
      },
    ],
    mocks: {
      mockId: "b16cc2cb",
      mockList: [],
    },
  },
};

const result = [
  {
    code: "UNKNOWN_EVENT_ACTION",
    details: [
      {
        message: "action: no action",
        meta: {
          brick: { instanceId: "5eb8291903957" },
          root: { alias: "测试", instanceId: "5eb75014e908e", type: "route" },
        },
      },
    ],
    list: ["action: no action"],
    message: {
      en: "You're using unknown event actions:",
      zh: "您正在使用一些未知的事件动作：",
    },
    type: "error",
  },
  {
    code: "INVALID_BATCH_CONTEXT",
    details: [
      {
        message: "action: context.replace",
        meta: {
          brick: { instanceId: "5eb8291903957" },
          root: { alias: "测试", instanceId: "5eb75014e908e", type: "route" },
        },
      },
      {
        message: "action: state.update",
        meta: {
          root: {
            templateId: "tpl-page-test",
            type: "template",
          },
        },
      },
    ],
    list: ["action: context.replace", "action: state.update"],
    message: {
      en: "You're using batch Update Context with illegal params",
      zh: "您使用的批量变更传参非法：",
    },
    type: "error",
  },
  {
    type: "warn",
    code: "USING_USE_RESOLVES_IN_BRICK_LIFECYCLE",
    message: expect.any(Object),
    list: ["providers-of-cmdb.instance-xxx"],
    details: [
      {
        message: "providers-of-cmdb.instance-xxx",
        meta: {
          brick: {
            instanceId: "5eb8291903957",
          },
          root: {
            type: "route",
            alias: "测试",
            instanceId: "5eb75014e908e",
          },
        },
      },
    ],
  },
  {
    type: "warn",
    code: "USING_WARNED_EXPRESSION_IN_TEMPLATE",
    message: expect.any(Object),
    list: ["tpl-page-test: PATH", "tpl-test-1: PATH[...], PATH.projectId"],
    details: [
      {
        message: "tpl-page-test",
        messageSuffix: ": PATH",
        meta: {
          root: {
            type: "template",
            templateId: "tpl-page-test",
          },
        },
      },
      {
        message: "tpl-test-1",
        messageSuffix: ": PATH[...], PATH.projectId",
        meta: {
          root: {
            templateId: "tpl-test-1",
            type: "template",
          },
        },
      },
    ],
  },
  {
    type: "warn",
    code: "USING_LEGACY_TEMPLATES",
    message: expect.any(Object),
    list: ["mock-template.general-list"],
    details: [
      {
        message: "mock-template.general-list",
        meta: {
          root: { type: "route", alias: "测试", instanceId: "5eb75014e908e" },
        },
      },
    ],
  },
  {
    type: "warn",
    code: "DEFINING_PROVIDERS_ON_ROUTE",
    message: expect.any(Object),
    list: ["provider-of-cmdb\\.get-detail"],
    details: [
      {
        message: "provider-of-cmdb\\.get-detail",
        meta: {
          root: { type: "route", alias: "测试", instanceId: "5eb75014e908e" },
        },
      },
    ],
  },
  {
    type: "warn",
    code: "DEFINING_DEFINE_RESOLVES_ON_ROUTE",
    message: expect.any(Object),
    list: ["value-1"],
    details: [
      {
        message: "value-1",
        meta: {
          root: { type: "route", alias: "测试", instanceId: "5eb75014e908e" },
        },
      },
    ],
  },
  {
    type: "warn",
    code: "DEFINING_REDIRECT_ON_ROUTE",
    message: expect.any(Object),
    list: ["${APP.homepage}/test"],
    details: [
      {
        message: "${APP.homepage}/test",
        meta: {
          root: { type: "route", alias: "测试", instanceId: "5eb75014e908e" },
        },
      },
    ],
  },
  {
    type: "warn",
    code: "DEFINING_CONTEXT_ON_BRICK",
    message: expect.any(Object),
    list: ["test"],
    details: [
      {
        message: "test",
        meta: {
          brick: { instanceId: "5eb8291903957" },
          root: { type: "route", alias: "测试", instanceId: "5eb75014e908e" },
        },
      },
    ],
  },
  {
    type: "warn",
    code: "DEFINING_EXPORTS_ON_BRICK",
    message: expect.any(Object),
    list: ["basic-bricks.easy-view"],
    details: [
      {
        message: "basic-bricks.easy-view",
        meta: {
          brick: { instanceId: "5eb8291903957" },
          root: { type: "route", alias: "测试", instanceId: "5eb75014e908e" },
        },
      },
    ],
  },
  {
    type: "warn",
    code: "USING_DYNAMIC_ARGUMENTS_IN_CTX_OR_STATE",
    message: expect.any(Object),
    list: ["测试: CTX[...]", "tpl-page-test: STATE[...]"],
    details: [
      {
        message: "测试",
        messageSuffix: ": CTX[...]",
        meta: { root: { type: "route", instanceId: "5eb75014e908e" } },
      },
      {
        message: "tpl-page-test",
        messageSuffix: ": STATE[...]",
        meta: { root: { type: "template", templateId: "tpl-page-test" } },
      },
    ],
  },
  {
    type: "info",
    code: "USING_ONCHANGE_IN_CTX",
    message: expect.any(Object),
    list: ["kakataa"],
    details: [
      {
        message: "kakataa",
        meta: {
          root: {
            type: "route",
            alias: "测试",
            instanceId: "5eb75014e908e",
          },
        },
      },
    ],
  },
  {
    type: "info",
    code: "USING_PROVIDER_BRICKS",
    message: expect.any(Object),
    list: [
      "providers-of-cmdb.instance-xxx",
      "providers-of-cmdb.instance-api-xxx",
    ],
    details: [
      {
        message: "providers-of-cmdb.instance-xxx",
        meta: {
          brick: {
            instanceId: "5eb8291903957",
          },
          root: {
            instanceId: "5eb75014e908e",
            type: "route",
            alias: "测试",
          },
        },
      },
      {
        message: "providers-of-cmdb.instance-api-xxx",
        meta: {
          brick: {
            instanceId: "5ed931cf38aad",
          },
          root: {
            instanceId: "5eb75014e908e",
            type: "route",
            alias: "测试",
          },
        },
      },
    ],
  },
  {
    type: "info",
    code: "USING_INJECT",
    message: expect.any(Object),
    list: ["测试: ${EVENT.detail}", "tpl-test-1: ${PATH}"],
    details: [
      {
        message: "测试",
        messageSuffix: ": ${EVENT.detail}",
        meta: {
          root: {
            instanceId: "5eb75014e908e",
            type: "route",
          },
        },
      },
      {
        message: "tpl-test-1",
        messageSuffix: ": ${PATH}",
        meta: {
          root: {
            templateId: "tpl-test-1",
            type: "template",
          },
        },
      },
    ],
  },
];

describe("doLintStoryboard", () => {
  it("should work", () => {
    expect(doLintStoryboard(storyboard as unknown as Storyboard)).toEqual(
      result
    );
  });
});
