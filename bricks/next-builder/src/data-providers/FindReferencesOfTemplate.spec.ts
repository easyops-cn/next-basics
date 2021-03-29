import {
  FindReferencesOfTemplate,
  FindReferencesOfTemplateParams,
  TemplateReference,
} from "./FindReferencesOfTemplate";
import {
  symbolForNodeId,
  symbolForNodeInstanceId,
} from "../shared/storyboard/buildStoryboard";
import { minimalStoryboardAssembly } from "../shared/storyboard/minimalStoryboardAssembly";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

jest.mock("../shared/storyboard/minimalStoryboardAssembly");

(minimalStoryboardAssembly as jest.MockedFunction<
  typeof minimalStoryboardAssembly
>).mockImplementation(({ appId }) =>
  Promise.resolve(
    appId === "test-app"
      ? ({
          routes: [
            {
              [symbolForNodeId]: "R-01",
              path: "/a",
              type: "bricks",
              bricks: [
                {
                  [symbolForNodeId]: "B-01",
                  [symbolForNodeInstanceId]: "instance-b01",
                  brick: "tpl-01",
                  slots: {
                    m1: {
                      type: "bricks",
                      bricks: [
                        {
                          [symbolForNodeId]: "B-04",
                          [symbolForNodeInstanceId]: "instance-b04",
                          brick: "tpl-00",
                        },
                        {
                          [symbolForNodeId]: "B-05",
                          [symbolForNodeInstanceId]: "instance-b05",
                          brick: "tpl-02",
                        },
                      ],
                    },
                    m2: {
                      type: "routes",
                      routes: [
                        {
                          [symbolForNodeId]: "R-04",
                          path: "/a/d",
                          type: "bricks",
                          bricks: [],
                        },
                        {
                          [symbolForNodeId]: "R-05",
                          path: "/a/e",
                          type: "bricks",
                          bricks: null,
                        },
                      ],
                    },
                    m3: {
                      type: "routes",
                      routes: null,
                    },
                  },
                },
                { [symbolForNodeId]: "B-02", brick: "n" },
              ],
            },
            {
              [symbolForNodeId]: "R-02",
              path: "/b",
              type: "routes",
              routes: [
                {
                  [symbolForNodeId]: "R-03",
                  path: "/b/c",
                  type: "bricks",
                  bricks: [
                    {
                      [symbolForNodeId]: "B-03",
                      [symbolForNodeInstanceId]: "instance-b03",
                      brick: "tpl-02",
                    },
                  ],
                },
              ],
            },
          ],
          meta: {
            customTemplates: [
              {
                [symbolForNodeId]: "B-T-01",
                name: "tpl-01",
                bricks: [
                  {
                    [symbolForNodeId]: "T-B-01",
                    [symbolForNodeInstanceId]: "instance-t-b01",
                    brick: "z",
                    slots: {
                      m5: {
                        type: "bricks",
                        bricks: [
                          {
                            [symbolForNodeId]: "T-B-02",
                            [symbolForNodeInstanceId]: "instance-t-b02",
                            brick: "tpl-03",
                          },
                        ],
                      },
                    },
                  },
                ],
              },
              {
                [symbolForNodeId]: "B-T-02",
                name: "tpl-02",
                bricks: [],
              },
              {
                [symbolForNodeId]: "B-T-03",
                name: "tpl-03",
                bricks: [],
              },
            ],
          },
        } as any)
      : {
          routes: [],
          meta: {},
        }
  )
);

describe("FindReferencesOfTemplate", () => {
  it.each<[FindReferencesOfTemplateParams, TemplateReference[]]>([
    [
      {
        templateId: "tpl-01",
        templateList: [
          {
            templateId: "tpl-01",
            project: [
              {
                appId: "test-app",
                instanceId: "test-project",
                name: "Test App",
              },
              {
                appId: "another-app",
                instanceId: "another-project",
                name: "Another App",
              },
            ],
          },
        ],
        projectInstanceId: "test-project",
      },
      [
        {
          project: {
            appId: "test-app",
            instanceId: "test-project",
            name: "Test App",
          },
          brickDisplayName: "tpl-01",
          brickInstanceId: "instance-b01",
          parentDisplayName: "/a",
          parentId: "R-01",
          parentType: "route",
        },
      ],
    ],
    [
      {
        templateId: "tpl-02",
        templateList: [
          {
            templateId: "tpl-02",
            project: [
              {
                appId: "test-app",
                instanceId: "test-project",
                name: "Test App",
              },
              {
                appId: "another-app",
                instanceId: "another-project",
                name: "Another App",
              },
            ],
          },
        ],
        projectInstanceId: "test-project",
      },
      [
        {
          project: {
            appId: "test-app",
            instanceId: "test-project",
            name: "Test App",
          },
          brickDisplayName: "tpl-02",
          brickInstanceId: "instance-b05",
          parentDisplayName: "/a",
          parentId: "R-01",
          parentType: "route",
        },
        {
          project: {
            appId: "test-app",
            instanceId: "test-project",
            name: "Test App",
          },
          brickDisplayName: "tpl-02",
          brickInstanceId: "instance-b03",
          parentDisplayName: "/b/c",
          parentId: "R-03",
          parentType: "route",
        },
      ],
    ],
    [
      {
        templateId: "tpl-03",
        templateList: [
          {
            templateId: "tpl-03",
            project: [
              {
                appId: "test-app",
                instanceId: "test-project",
                name: "Test App",
              },
              {
                appId: "another-app",
                instanceId: "another-project",
                name: "Another App",
              },
            ],
          },
        ],
        projectInstanceId: "test-project",
      },
      [
        {
          project: {
            appId: "test-app",
            instanceId: "test-project",
            name: "Test App",
          },
          brickDisplayName: "tpl-03",
          brickInstanceId: "instance-t-b02",
          parentDisplayName: "tpl-01",
          parentId: "B-T-01",
          parentType: "customTemplate",
        },
      ],
    ],
    [
      {
        templateId: "tpl-00",
        templateList: [],
        projectInstanceId: "test-project",
      },
      [],
    ],
  ])("FindReferencesOfTemplates(...) should work", async (params, result) => {
    expect(await FindReferencesOfTemplate(params)).toEqual(result);
  });
});
