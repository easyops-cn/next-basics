import { Storyboard } from "@next-core/brick-types";
import {
  ScanBricksAndTemplates,
  ScanBricksAndTemplatesParams,
} from "./ScanBricksAndTemplates";

describe("ScanBricksAndTemplates", () => {
  it.each<
    [
      string,
      ScanBricksAndTemplatesParams,
      ReturnType<typeof ScanBricksAndTemplates>
    ]
  >([
    [
      "work",
      {
        storyboard: {
          routes: [
            {
              path: "/x",
              type: "bricks",
              bricks: [
                {
                  brick: "brick-pkg-a.brick-a",
                  lifeCycle: {
                    useResolves: [
                      {
                        useProvider: "easyops.custom_api@CustomApiA",
                      },
                      {
                        useProvider: "easyops.flow_api@FlowApiB:1.0.0",
                      },
                      {
                        useProvider:
                          "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
                      },
                    ],
                  },
                },
                {
                  template: "tpl-pkg-a.tpl-a",
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
                      brick: "brick-pkg-a.brick-b",
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
        } as Partial<Storyboard> as Storyboard,
      },
      {
        apis: [
          {
            name: "CustomApiA",
            namespace: "easyops.custom_api",
          },
        ],
        bricks: [
          "brick-pkg-a.brick-a",
          "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
          "brick-pkg-a.brick-b",
        ],
        templates: ["tpl-pkg-a.tpl-a"],
        processors: ["hardWork.input", "hardWork.output"],
        processorPackages: ["hard-work"],
      },
    ],
    [
      "build contract data",
      {
        storyboard: {
          routes: [
            {
              path: "/x",
              type: "bricks",
              bricks: [
                {
                  brick: "brick-pkg-a.brick-a",
                  lifeCycle: {
                    useResolves: [
                      {
                        useProvider: "easyops.custom_api@CustomApiA",
                      },
                      {
                        useProvider: "easyops.flow_api@FlowApiB:1.0.0",
                      },
                      {
                        useProvider:
                          "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
                      },
                    ],
                  },
                },
                {
                  template: "tpl-pkg-a.tpl-a",
                },
                {
                  template: "tpl-pkg-b.tpl-b",
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
                      brick: "brick-pkg-a.brick-b",
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
          app: {
            homepage: "/hello",
          },
        } as Partial<Storyboard> as Storyboard,
        version: "1.0.1",
        dependencies: [
          {
            name: "brick-pkg-a-NB",
            constraint: "^1.0.2",
          },
          {
            name: "tpl-pkg-a-NT",
            constraint: "^1.0.3",
          },
        ],
      },
      {
        apis: [
          {
            name: "CustomApiA",
            namespace: "easyops.custom_api",
          },
        ],
        bricks: [
          "brick-pkg-a.brick-a",
          "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
          "brick-pkg-a.brick-b",
        ],
        templates: ["tpl-pkg-a.tpl-a", "tpl-pkg-b.tpl-b"],
        processors: ["hardWork.input", "hardWork.output"],
        processorPackages: ["hard-work"],
        contractData: `contracts:
  - type: route
    path: /hello
    version: 1.0.1
    deps:
      - type: contract
        contract: easyops.flow_api.FlowApiB
        version: 1.0.0
      - type: brick
        brick: brick-pkg-a.brick-a
        version: ^1.0.2
      - type: brick
        brick: providers-of-micro-app.installed-micro-app-api-get-installed-micro-app
        version: '*'
      - type: brick
        brick: brick-pkg-a.brick-b
        version: ^1.0.2
      - type: template
        template: tpl-pkg-a.tpl-a
        version: ^1.0.3
      - type: template
        template: tpl-pkg-b.tpl-b
        version: '*'
`,
      },
    ],
    [
      "build contract data with empty manual dependencies",
      {
        storyboard: {
          routes: [
            {
              path: "/x",
              type: "bricks",
              bricks: [
                {
                  brick: "brick-pkg-a.brick-a",
                  lifeCycle: {
                    useResolves: [
                      {
                        useProvider: "easyops.custom_api@CustomApiA",
                      },
                      {
                        useProvider: "easyops.flow_api@FlowApiB:1.0.0",
                      },
                      {
                        useProvider:
                          "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
                      },
                    ],
                  },
                },
                {
                  template: "tpl-pkg-a.tpl-a",
                },
                {
                  template: "tpl-pkg-b.tpl-b",
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
                      brick: "brick-pkg-a.brick-b",
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
          app: {
            homepage: "/hello",
          },
        } as Partial<Storyboard> as Storyboard,
        version: "1.0.1",
      },
      {
        apis: [
          {
            name: "CustomApiA",
            namespace: "easyops.custom_api",
          },
        ],
        bricks: [
          "brick-pkg-a.brick-a",
          "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
          "brick-pkg-a.brick-b",
        ],
        templates: ["tpl-pkg-a.tpl-a", "tpl-pkg-b.tpl-b"],
        processors: ["hardWork.input", "hardWork.output"],
        processorPackages: ["hard-work"],
        contractData: `contracts:
  - type: route
    path: /hello
    version: 1.0.1
    deps:
      - type: contract
        contract: easyops.flow_api.FlowApiB
        version: 1.0.0
      - type: brick
        brick: brick-pkg-a.brick-a
        version: '*'
      - type: brick
        brick: providers-of-micro-app.installed-micro-app-api-get-installed-micro-app
        version: '*'
      - type: brick
        brick: brick-pkg-a.brick-b
        version: '*'
      - type: template
        template: tpl-pkg-a.tpl-a
        version: '*'
      - type: template
        template: tpl-pkg-b.tpl-b
        version: '*'
`,
      },
    ],
  ])("ScanBricksAndTemplates(...) should %s", async (desc, params, result) => {
    expect(await ScanBricksAndTemplates(params)).toEqual(result);
  });
});
