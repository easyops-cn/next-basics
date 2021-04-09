import { Storyboard } from "@next-core/brick-types";
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
        storyboard: ({
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
                      {
                        useProvider:
                          "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
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
        } as Partial<Storyboard>) as Storyboard,
      },
      {
        apis: [
          {
            name: "CustomApiA",
            namespace: "easyops.custom_api",
          },
        ],
        bricks: [
          "brick-a",
          "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
          "brick-b",
        ],
        templates: ["tpl-test"],
        processors: ["hardWork.input", "hardWork.output"],
        processorPackages: ["hard-work"],
        contracts: [
          {
            contract:
              "easyops.api.micro_app.installed_micro_app.GetInstalledMicroApp",
            version: "*",
          },
        ],
      },
    ],
  ])("ScanBricksAndTemplates(...) should work", async (params, result) => {
    expect(await ScanBricksAndTemplates(params)).toEqual(result);
  });
});
