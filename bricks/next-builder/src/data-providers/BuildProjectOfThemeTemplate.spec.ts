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
  name: "My Theme",
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
  pageTemplates: [
    {
      pageTypeId: "home",
      name: "Home",
      thumbnail: "home.png",
      template: [
        {
          templateId: "tpl-page-home",
        },
      ],
      snippet: [
        {
          snippetId: "page-home",
        },
      ],
    },
    {
      pageTypeId: "list",
      name: "List",
      locales: {
        en: {
          name: "List",
        },
        zh: {
          name: "列表",
        },
      },
      template: [
        {
          templateId: "tpl-page-list",
        },
      ],
      snippet: [
        {
          snippetId: "page-list",
        },
      ],
    },
  ],
  i18n: [
    {
      name: "HELLO",
      zh: "你好",
      en: "Hello",
      instanceId: "any",
    },
    {
      name: "WORLD",
      zh: "世界",
      en: "World",
    },
  ],
  imgs: [
    {
      name: "one.png",
      url: "/any/one.png",
      instanceId: "any",
    },
    {
      name: "two.png",
      url: "/any/two.png",
    },
  ],
  functions: [
    {
      name: "sayHello",
      source: `function sayHello() {}`,
      instanceId: "any",
      tests: [
        {
          input: "[]",
          output: "undefined",
        },
      ],
    },
    {
      name: "sayGoodbye",
      source: `function sayGoodbye(): void {}`,
      typescript: true,
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
              templateId: "tpl-page-home",
            },
            {
              instanceId: "b",
              templateId: "tpl-page-list",
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
              snippetId: "page-home",
            },
            {
              instanceId: "y",
              snippetId: "page-list",
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
        name: "My Theme",
        locales: {
          en: {
            name: "My Theme",
          },
          zh: {
            name: "我的主题",
          },
        },
        layoutType: "business",
        dependencies: [
          {
            name: "brick_next",
            constraint: "*",
          },
        ],
        pageTemplates: [
          {
            pageTypeId: "home",
            name: "Home",
            thumbnail: "home.png",
            templateId: "tpl-page-home",
            snippetId: "page-home",
          },
          {
            pageTypeId: "list",
            name: "List",
            locales: {
              en: {
                name: "List",
              },
              zh: {
                name: "列表",
              },
            },
            templateId: "tpl-page-list",
            snippetId: "page-list",
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
            templateId: "tpl-page-home",
          },
          {
            children: [
              {
                brick: "brick-d",
                instanceId: "d",
              },
            ],
            instanceId: "b",
            templateId: "tpl-page-list",
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
            snippetId: "page-home",
          },
          {
            children: [
              {
                brick: "brick-y",
                instanceId: "y-1",
              },
            ],
            instanceId: "y",
            snippetId: "page-list",
          },
        ],
        i18n: [
          {
            name: "HELLO",
            zh: "你好",
            en: "Hello",
          },
          {
            name: "WORLD",
            zh: "世界",
            en: "World",
          },
        ],
        imgs: [
          {
            name: "one.png",
            url: "/any/one.png",
          },
          {
            name: "two.png",
            url: "/any/two.png",
          },
        ],
        functions: [
          {
            name: "sayHello",
            source: `function sayHello() {}`,
            tests: [
              {
                input: "[]",
                output: "undefined",
              },
            ],
          },
          {
            name: "sayGoodbye",
            source: `function sayGoodbye(): void {}`,
            typescript: true,
          },
        ],
      },
    ],
  ])("BuildProjectOfThemeTemplate(%j) should work", async (params, result) => {
    expect(await BuildProjectOfThemeTemplate(params)).toEqual(result);
  });
});
