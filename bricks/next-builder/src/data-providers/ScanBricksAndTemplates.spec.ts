import {
  ScanBricksAndTemplates,
  ScanBricksAndTemplatesParams,
} from "./ScanBricksAndTemplates";

describe("ScanBricksAndTemplates", () => {
  it.each<
    [ScanBricksAndTemplatesParams, ReturnType<typeof ScanBricksAndTemplates>]
  >([
    [
      {
        storyboard: {
          routes: [
            {
              path: "/x",
              type: "bricks",
              bricks: [
                {
                  brick: "brick-a",
                  lifeCycle: {
                    useResolves: [
                      {
                        useProvider: "easyops.custom_api@CustomApiA",
                      },
                    ],
                  },
                },
                {
                  template: "tpl-test",
                },
              ],
            },
            {
              path: "/xx",
              type: "routes",
              routes: [
                {
                  path: "/xxx",
                  type: "bricks",
                  bricks: [
                    {
                      brick: "brick-b",
                      properties: {
                        given: "<% PROCESSORS.hardWork.input() %>",
                        quality: "<% PROCESSORS.hardWork.output() %>",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        apis: [
          {
            name: "CustomApiA",
            namespace: "easyops.custom_api",
          },
        ],
        bricks: ["brick-a", "brick-b"],
        templates: ["tpl-test"],
        processors: ["hardWork.input", "hardWork.output"],
        processorPackages: ["hard-work"],
      },
    ],
  ])("ScanBricksAndTemplates(%j) should work", async (params, result) => {
    expect(await ScanBricksAndTemplates(params)).toEqual(result);
  });
});
