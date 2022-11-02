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
                  },
                },
                {
                  brick: "providers-of-any.any-brick",
                  iid: "b-2",
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
          code: "USING_CTX_IN_TPL",
          list: ["tpl-bad: CTX.abc, CTX['xyz'], CTX[...], ..."],
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
              ],
            },
          ],
        },
      },
      [
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
