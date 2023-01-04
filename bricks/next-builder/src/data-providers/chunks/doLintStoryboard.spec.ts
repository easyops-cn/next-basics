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
          portal: false,
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
              buttonName: "to new",
              buttonType: "link",
              buttonUrl: "<% PATH %>",
              dataset: {
                testid: "new link",
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
    type: "warn",
    code: "USING_ONCHANGE_IN_CTX",
    message: {
      zh: "您在 Context 或 State 的 onChange 中使用了 context.replace 或 set brick properties 等事件处理器, 请使用 track context 或 track state 代替:",
      en: "You are using an event handler such as context.replace or set brick properties in onChange of context or state. Please use track Context or track State instead:",
    },
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
    type: "warn",
    code: "USING_USERESOLVE_IN_BRICK_LIFECYCLE",
    message: {
      zh: "您在 lifeCycle 中使用了 useResolve 获取数据, 建议您使用 context 或 state 代替:",
      en: "You are using useResolve in lifeCycle. Please use context or state instead:",
    },
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
    message: {
      zh: "您正在模板中使用 QUERY 和 PATH 等变量，建议修改为从外部传入相关数据:",
      en: "You are using QUERY, PATH and other variables in the custom-template. Please pass in parameters from outside instead:",
    },
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
    code: "USING_OLD_PROVODERS_IN_USEPROVIDER",
    message: {
      zh: "您在 useProvider 中调用了旧版的 Providers-of-xxx, 建议修改为直接调用契约:",
      en: "You are calling the old provider-of-xxx in useProvider. Please call the contract directly instead:",
    },
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
    type: "warn",
    code: "USING_INJECT",
    message: {
      zh: "您正在使用参数注入写法, 如 ${xxx} 或 @{xxx}, 建议修改为表达式:",
      en: "You are using the parameter injection method, such as ${xxx} or @{xxx}. Please use the expression instead:",
    },
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
