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
  {
    type: "warn",
    code: "USING_OLD_TEMPLATE",
    message: {
      zh: "您正在使用已废弃的老模板，该方式在 v3 中已经被移除，建议使用 widget 、自定义模板或控制节点代替：",
      en: "You are using deprecated legacy templates, which will be dropped in v3. Please use widgets, custom templates, or control nodes instead:",
    },
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
    code: "USING_PROVIDER_IN_ROUTE",
    message: {
      zh: "您在路由上面定义了 provider, 建议在 context 中使用 useProvider 替代:",
      en: "You have defined Provider on the route, and this feature will be dropped in v3, Please use useProvider in route instead: ",
    },
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
    code: "USING_DEFINE_RESOLVES_IN_ROUTE",
    message: {
      zh: "您在路由上面定义了 defineResolves, 建议在 context 中使用 useProvider 替代: ",
      en: "You have defined defineResolves on the route, and this feature will be dropped in v3, Please use useProvider in route instead: ",
    },
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
    code: "USING_DIRECT_IN_ROUTE",
    message: {
      zh: "您在路由上面定义了 redirect, 但路由类型非 redirect, 这将导致 redirect 不生效: ",
      en: "You have defined redirect on the route, but the route type is not redirect, which will cause redirect to not take effect: ",
    },
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
    code: "USING_CONTEXT_IN_BRICK",
    message: {
      zh: "您在构件上定义了 context, 建议将其迁移至路由上: ",
      en: "You have defined the context on the component, Please migrate it to the route: ",
    },
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
    code: "USING_EXPORTS_IN_BRICK",
    message: {
      zh: "您在构件上使用了已废弃的 exports 字段，该特性将在 v3 移除，建议使用 context 或 state 替代：",
      en: "You have used the obsolete exports field on the component, which will be removed in v3. It is recommended to use context or state instead:",
    },
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
    message: {
      zh: "您正在使用动态访问的 CTX/STATE, 这种编写方式是不推荐的、并且已在 v3 中移除支持，建议使用静态访问写法替代，例如：`CTX.a ? CTX.b : CTX.c`",
      en: "You are using dynamic access CTX/STATE, which is not recommended and has been removed from v3. It is recommended to use static access writing instead, such as' CTX. a '? CTX.b : CTX.c`",
    },
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
];

describe("doLintStoryboard", () => {
  it("should work", () => {
    expect(doLintStoryboard(storyboard as unknown as Storyboard)).toEqual(
      result
    );
  });
});
