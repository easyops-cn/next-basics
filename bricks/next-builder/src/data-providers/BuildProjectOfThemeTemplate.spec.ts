import {
  InstanceApi_getDetail,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import {
  BuildProjectOfThemeTemplate,
  BuildProjectOfThemeTemplateParams,
} from "./BuildProjectOfThemeTemplate";

jest.mock("@next-sdk/cmdb-sdk");

(InstanceApi_getDetail as jest.Mock).mockResolvedValue({
  appId: "my-theme",
  appSetting: {
    layoutType: "business",
    locales: {
      en: {
        name: "My Theme",
      },
      zh: {
        name: "我的主题",
      },
    },
  },
  dependencies: [
    {
      name: "brick_next",
      constraint: "*",
    },
  ],
  layouts: [
    {
      layoutId: "home",
      name: {
        en: "Home",
        zh: "首页",
      },
      customTemplate: [
        {
          templateId: "tpl-layout-home",
        },
      ],
      snippet: [
        {
          snippetId: "layout-home",
        },
      ],
    },
    {
      layoutId: "list",
      name: {
        en: "List",
        zh: "列表",
      },
      customTemplate: [
        {
          templateId: "tpl-layout-list",
        },
      ],
      snippet: [
        {
          snippetId: "layout-list",
        },
      ],
    },
  ],
});

(
  InstanceGraphApi_traverseGraphV2 as jest.MockedFunction<
    typeof InstanceGraphApi_traverseGraphV2
  >
).mockImplementation((params) =>
  Promise.resolve(
    params.object_id === "STORYBOARD_TEMPLATE"
      ? {
          topic_vertices: [
            {
              instanceId: "a",
              templateId: "tpl-layout-home",
            },
            {
              instanceId: "b",
              templateId: "tpl-layout-list",
            },
            {
              instanceId: "v",
              templateId: "tpl-basic-view",
            },
          ],
          vertices: [
            {
              instanceId: "c",
              brick: "brick-c",
            },
            {
              instanceId: "d",
              brick: "brick-d",
            },
            {
              instanceId: "w",
              brick: "brick-w",
            },
          ],
          edges: [
            {
              in: "c",
              out: "a",
              out_name: "children",
            },
            {
              in: "d",
              out: "b",
              out_name: "children",
            },
            {
              in: "w",
              out: "v",
              out_name: "children",
            },
          ],
        }
      : {
          topic_vertices: [
            {
              instanceId: "x",
              snippetId: "layout-home",
            },
            {
              instanceId: "y",
              snippetId: "layout-list",
            },
          ],
          vertices: [
            {
              instanceId: "x-1",
              brick: "brick-x",
            },
            {
              instanceId: "y-1",
              brick: "brick-y",
            },
          ],
          edges: [
            {
              in: "x-1",
              out: "x",
              out_name: "children",
            },
            {
              in: "y-1",
              out: "y",
              out_name: "children",
            },
          ],
        }
  )
);

describe("BuildProjectOfThemeTemplate", () => {
  it.each<[BuildProjectOfThemeTemplateParams, any]>([
    [
      {
        projectId: "my-project",
      },
      {
        themeId: "my-theme",
        name: {
          en: "My Theme",
          zh: "我的主题",
        },
        layoutType: "business",
        dependencies: [
          {
            name: "brick_next",
            constraint: "*",
          },
        ],
        layouts: [
          {
            layoutId: "home",
            name: {
              en: "Home",
              zh: "首页",
            },
            templateId: "tpl-layout-home",
            snippetId: "layout-home",
          },
          {
            layoutId: "list",
            name: {
              en: "List",
              zh: "列表",
            },
            templateId: "tpl-layout-list",
            snippetId: "layout-list",
          },
        ],
        templates: [
          {
            children: [
              {
                brick: "brick-c",
                instanceId: "c",
              },
            ],
            instanceId: "a",
            templateId: "tpl-layout-home",
          },
          {
            children: [
              {
                brick: "brick-d",
                instanceId: "d",
              },
            ],
            instanceId: "b",
            templateId: "tpl-layout-list",
          },
          {
            children: [
              {
                brick: "brick-w",
                instanceId: "w",
              },
            ],
            instanceId: "v",
            templateId: "tpl-basic-view",
          },
        ],
        snippets: [
          {
            children: [
              {
                brick: "brick-x",
                instanceId: "x-1",
              },
            ],
            instanceId: "x",
            snippetId: "layout-home",
          },
          {
            children: [
              {
                brick: "brick-y",
                instanceId: "y-1",
              },
            ],
            instanceId: "y",
            snippetId: "layout-list",
          },
        ],
      },
    ],
  ])("BuildProjectOfThemeTemplate(%j) should work", async (params, result) => {
    expect(await BuildProjectOfThemeTemplate(params)).toEqual(result);
  });
});
