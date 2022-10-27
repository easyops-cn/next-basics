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
              bricks: [
                {
                  brick: "my.any-brick",
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
                    properties: {
                      test: "<% CTX.abc %>",
                      another: "<% CTX['xyz'] %>",
                      dynamic: "<% CTX[fly] %>",
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
        }),
        expect.objectContaining({
          code: "PROVIDER_AS_BRICK",
          list: ["providers-of-any.any-brick"],
        }),
        expect.objectContaining({
          code: "USING_CTX_IN_TPL",
          list: ["tpl-bad: CTX.abc, CTX['xyz'], CTX[...]"],
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
              bricks: [
                {
                  brick: "basic-bricks.script-brick",
                  events: {
                    click: {
                      target: "_self",
                      method: "open",
                    },
                  },
                },
              ],
            },
          ],
        },
      },
      [
        expect.objectContaining({
          code: "SCRIPT_BRICK",
        }),
      ],
    ],
  ])("LintStoryboard(%j) should work", async (params, result) => {
    expect(await LintStoryboard(params)).toEqual(result);
  });
});
