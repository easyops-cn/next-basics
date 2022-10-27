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
                  },
                },
              ],
            },
          ],
        },
      },
      [
        expect.objectContaining({
          code: "TAG_NAME_AS_TARGET",
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
