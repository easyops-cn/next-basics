import {
  LintStoryboard,
  LintStoryboardParams,
  StoryboardError,
} from "./LintStoryboard";

describe("LintStoryboard", () => {
  it.each<[LintStoryboardParams, StoryboardError[]]>([
    [
      {
        storyboard: {
          app: null,
          routes: [
            {
              path: "/hello",
              bricks: [
                {
                  brick: "my.any-brick",
                },
              ],
            },
          ],
        },
      },
      [],
    ],
    [
      {
        storyboard: {
          app: null,
          routes: [
            {
              path: "/hello",
              bricks: [
                {
                  brick: "basic-bricks.script-brick",
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
