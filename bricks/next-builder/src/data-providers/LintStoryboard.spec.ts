import type { StoryboardError } from "./chunks/doLintStoryboard";
import { LintStoryboard, LintStoryboardParams } from "./LintStoryboard";

describe("LintStoryboard", () => {
  it.each<[LintStoryboardParams, StoryboardError[]]>([
    [
      {
        storyboard: {
          app: null as any,
          routes: [
            {
              path: "/hello",
              alias: "hello",
              iid: "r-1",
              bricks: [
                {
                  brick: "my.any-brick",
                  iid: "b-1",
                  events: {
                    click: {
                      target: "basic-bricks\\.general-modal",
                      method: "open",
                    },
                    dbl: {
                      target: "forms\\.general-modal",
                      method: "close",
                    },
                    enter: {
                      action: "context.assign",
                      args: ["good"],
                    },
                  },
                },
                {
                  brick: "providers-of-any.any-brick",
                  iid: "b-2",
                  properties: {
                    textContent: "<% INSTALLED_APPS.has(CTX.a ? 'a' : 'b') %>",
                  },
                },
              ],
            },
          ],
          meta: {
            customTemplates: [
              {
                name: "tpl-bad",
                bricks: [
                  {
                    brick: "any-brick",
                    iid: "b-3",
                    properties: {
                      test: "<% CTX.abc %>",
                      another: "<% CTX['xyz'] %>",
                      dynamic: "<% CTX[fly] %>",
                      more: "<% CTX.more %>",
                      using: "<% TPL.abc %>",
                    },
                  },
                  {
                    brick: "my.provider-get-something",
                    iid: "b-4",
                    bg: true,
                  },
                ],
              },
              {
                name: "tpl-bad-2",
                bricks: [
                  {
                    brick: "any-brick",
                    events: {
                      click: [
                        {
                          action: "context.replace",
                        },
                        {
                          action: "context.assign",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
      },
      [
        expect.objectContaining({
          code: "TAG_NAME_AS_TARGET",
          list: ["basic-bricks\\.general-modal", "forms\\.general-modal"],
          details: [
            {
              message: "basic-bricks\\.general-modal",
              meta: {
                root: {
                  type: "route",
                  alias: "hello",
                  instanceId: "r-1",
                },
                brick: {
                  instanceId: "b-1",
                },
              },
            },
            {
              message: "forms\\.general-modal",
              meta: {
                root: {
                  type: "route",
                  alias: "hello",
                  instanceId: "r-1",
                },
                brick: {
                  instanceId: "b-1",
                },
              },
            },
          ],
        }),
        expect.objectContaining({
          code: "USING_CTX_IN_TPL",
          list: [
            "tpl-bad: CTX.abc, CTX['xyz'], CTX[...], ...",
            "tpl-bad-2: context.replace, context.assign",
          ],
          details: [
            {
              message: "tpl-bad",
              messageSuffix: ": CTX.abc, CTX['xyz'], CTX[...], ...",
              meta: {
                root: {
                  type: "template",
                  templateId: "tpl-bad",
                },
              },
            },
            {
              message: "tpl-bad-2",
              messageSuffix: ": context.replace, context.assign",
              meta: {
                root: {
                  type: "template",
                  templateId: "tpl-bad-2",
                },
              },
            },
          ],
        }),
        expect.objectContaining({
          code: "USING_TPL_VAR_IN_TPL",
          list: ["tpl-bad: TPL.abc"],
          details: [
            {
              message: "tpl-bad",
              messageSuffix: ": TPL.abc",
              meta: {
                root: {
                  type: "template",
                  templateId: "tpl-bad",
                },
              },
            },
          ],
        }),
        expect.objectContaining({
          code: "PROVIDER_AS_BRICK",
          list: ["providers-of-any.any-brick", "my.provider-get-something"],
          details: [
            {
              message: "providers-of-any.any-brick",
              meta: {
                root: {
                  type: "route",
                  alias: "hello",
                  instanceId: "r-1",
                },
                brick: {
                  instanceId: "b-2",
                },
              },
            },
            {
              message: "my.provider-get-something",
              meta: {
                root: {
                  type: "template",
                  templateId: "tpl-bad",
                },
                brick: {
                  instanceId: "b-4",
                },
              },
            },
          ],
        }),
        expect.objectContaining({
          code: "INSTALLED_APPS_USE_DYNAMIC_ARG",
          type: "error",
          message: {
            zh: "您在项目中使用了 INSTALLED_APPS.has 表达式, 并且使用了动态参数, 这将可能引起错误; 请将入参修改为静态参数, 例如: INSTALLED_APPS.has('xxx')",
            en: "You're using INSTALLED_APPS.has in project with dynamic arguments, it could be get the error result. Please use INSTALLED_APPS.has with static arguments, for example: INSTALLED_APPS.has('xxx')",
          },
        }),
      ],
    ],
    [
      {
        storyboard: {
          app: null as any,
          routes: [
            {
              path: "/hello",
              alias: "hello",
              iid: "r-1",
              bricks: [
                {
                  brick: "basic-bricks.script-brick",
                  iid: "b-1",
                  events: {
                    click: {
                      target: "_self",
                      method: "open",
                    },
                  },
                },
                {
                  brick: "basic-bricks.script-brick",
                  iid: "b-2",
                },
                {
                  brick: "my.any-brick",
                  iid: "b-3",
                  events: {
                    click: {
                      action: "oops" as any,
                    },
                    dblclick: [
                      {
                        useProvider: "my.any-provider",
                      },
                      {
                        target: "#my-target",
                      },
                      {
                        act: "handleHttpError",
                      },
                    ] as any[],
                  },
                },
              ],
            },
          ],
        },
      },
      [
        expect.objectContaining({
          code: "UNKNOWN_EVENT_ACTION",
          details: [
            {
              message: "action: oops",
              meta: {
                root: {
                  type: "route",
                  alias: "hello",
                  instanceId: "r-1",
                },
                brick: {
                  instanceId: "b-3",
                },
              },
            },
          ],
        }),
        expect.objectContaining({
          code: "UNKNOWN_EVENT_HANDLER",
          details: [
            {
              message:
                'Missing `method` or `properties`: {"target":"#my-target"}',
              meta: {
                root: {
                  type: "route",
                  alias: "hello",
                  instanceId: "r-1",
                },
                brick: {
                  instanceId: "b-3",
                },
              },
            },
            {
              message: '{"act":"handleHttpError"}',
              meta: {
                root: {
                  type: "route",
                  alias: "hello",
                  instanceId: "r-1",
                },
                brick: {
                  instanceId: "b-3",
                },
              },
            },
          ],
        }),
        expect.objectContaining({
          code: "SCRIPT_BRICK",
          details: [
            {
              message: "hello",
              meta: {
                root: {
                  type: "route",
                  alias: "hello",
                  instanceId: "r-1",
                },
                brick: {
                  instanceId: "b-1",
                },
              },
            },
            {
              message: "hello",
              meta: {
                root: {
                  type: "route",
                  alias: "hello",
                  instanceId: "r-1",
                },
                brick: {
                  instanceId: "b-2",
                },
              },
            },
          ],
        }),
      ],
    ],
  ])("LintStoryboard(%j) should work", async (params, result) => {
    expect(await LintStoryboard(params)).toEqual(result);
  });
});
