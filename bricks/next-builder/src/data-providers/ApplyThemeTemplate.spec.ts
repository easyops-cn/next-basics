import {
  InstanceApi_createInstance,
  InstanceApi_getDetail,
  InstanceApi_postSearchV3,
  InstanceApi_updateInstanceV2,
} from "@next-sdk/cmdb-sdk";
import { ApplyThemeTemplate } from "./ApplyThemeTemplate";
import { appendBricksFactory } from "./utils/appendBricksFactory";
import { getBrickNodeAttrs } from "./utils/getBrickNodeAttrs";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("./utils/getBrickNodeAttrs");
jest.mock("./utils/appendBricksFactory");

(getBrickNodeAttrs as jest.Mock).mockResolvedValue(["type", "brick"]);

(InstanceApi_getDetail as jest.Mock).mockResolvedValue({
  appSetting: {
    homepage: "/my-app",
  },
  dependencies: [
    {
      name: "brick_next",
      constraint: "^2.3.0",
    },
    {
      name: "forms-NB",
      constraint: "^4.0.0",
    },
  ],
});

(InstanceApi_postSearchV3 as jest.Mock).mockResolvedValue({
  list: [
    {
      pageTemplates: [
        {
          pageTypeId: "home",
          name: "Home",
          thumbnail: "home.png",
          templateId: "tpl-page-home",
          snippetId: "page-home",
          type: "wrapper",
        },
        {
          pageTypeId: "list",
          name: "List",
          locales: {
            en: {
              name: "List",
            },
            zh: {
              name: "List",
            },
          },
          templateId: "tpl-page-list",
          snippetId: "page-list",
        },
      ],
      templates: [
        {
          templateId: "tpl-page-home",
          proxy: "{}",
          state: "[]",
          layerType: "layout",
          children: [
            {
              brick: "brick-in-tpl-page-home",
            },
          ],
        },
        {
          templateId: "tpl-page-basic-view",
        },
        {
          templateId: "tpl-page-list",
        },
      ],
      snippets: [
        {
          snippetId: "page-home",
          text: { en: "Home" },
          layerType: "layout",
          children: [
            {
              brick: "brick-in-page-home",
            },
          ],
          context: JSON.stringify([
            {
              name: "test",
              value: "1",
            },
          ]),
        },
        {
          snippetId: "page-list",
        },
      ],
      layoutType: "business",
      dependencies: [
        {
          name: "brick_next",
          constraint: "^2.0.0",
        },
        {
          name: "basic-bricks-NB",
          constraint: "^3.0.0",
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
});

let instanceIdCursor = 1;
(InstanceApi_createInstance as jest.Mock).mockImplementation(() =>
  Promise.resolve({
    instanceId: `instance:${instanceIdCursor++}`,
  })
);

const appendBricks = jest.fn();
(appendBricksFactory as jest.Mock).mockReturnValue(appendBricks);

describe("ApplyThemeTemplate", () => {
  it("should work", async () => {
    const result = await ApplyThemeTemplate({
      projectId: "my-project",
      appId: "my-app",
      themeId: "my-theme",
    });

    expect(result).toEqual({
      projectId: "my-project",
      appId: "my-app",
    });

    expect(InstanceApi_createInstance).toBeCalledTimes(13);
    expect(appendBricks).toBeCalledTimes(5);

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      1,
      "STORYBOARD_TEMPLATE",
      {
        project: "my-project",
        appId: "my-app",
        templateId: "tpl-page-home",
        type: "custom-template",
        proxy: "{}",
        state: "[]",
        layerType: "layout",
        isFromTheme: true,
      }
    );
    expect(appendBricks).toHaveBeenNthCalledWith(
      1,
      [{ brick: "brick-in-tpl-page-home" }],
      "instance:1"
    );

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      2,
      "STORYBOARD_TEMPLATE",
      {
        project: "my-project",
        appId: "my-app",
        templateId: "tpl-page-basic-view",
        type: "custom-template",
        isFromTheme: true,
      }
    );
    expect(appendBricks).toHaveBeenNthCalledWith(2, undefined, "instance:2");

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      3,
      "STORYBOARD_TEMPLATE",
      {
        project: "my-project",
        appId: "my-app",
        templateId: "tpl-page-list",
        type: "custom-template",
        isFromTheme: true,
      }
    );
    expect(appendBricks).toHaveBeenNthCalledWith(3, undefined, "instance:3");

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      4,
      "STORYBOARD_SNIPPET",
      {
        project: "my-project",
        appId: "my-app",
        snippetId: "page-home",
        type: "snippet",
        text: { en: "Home" },
        layerType: "layout",
        isFromTheme: true,
        context: JSON.stringify([
          {
            name: "test",
            value: "1",
          },
        ]),
      }
    );
    expect(appendBricks).toHaveBeenNthCalledWith(
      4,
      [{ brick: "brick-in-page-home" }],
      "instance:4"
    );

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      5,
      "STORYBOARD_SNIPPET",
      {
        project: "my-project",
        appId: "my-app",
        snippetId: "page-list",
        type: "snippet",
        isFromTheme: true,
      }
    );
    expect(appendBricks).toHaveBeenNthCalledWith(5, undefined, "instance:5");

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      6,
      "STORYBOARD_THEME_PAGE",
      {
        project: "my-project",
        pageTypeId: "home",
        name: "Home",
        thumbnail: "home.png",
        template: "instance:1",
        snippet: "instance:4",
        type: "wrapper",
      }
    );

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      7,
      "STORYBOARD_THEME_PAGE",
      {
        project: "my-project",
        pageTypeId: "list",
        name: "List",
        locales: {
          en: {
            name: "List",
          },
          zh: {
            name: "List",
          },
        },
        template: "instance:3",
        snippet: "instance:5",
      }
    );

    expect(InstanceApi_updateInstanceV2).toBeCalledWith(
      "PROJECT_MICRO_APP",
      "my-project",
      {
        pageTemplates: ["instance:6", "instance:7"],
        appSetting: {
          homepage: "/my-app",
          layoutType: "business",
        },
        dependencies: [
          {
            name: "brick_next",
            constraint: "^2.3.0",
          },
          {
            name: "forms-NB",
            constraint: "^4.0.0",
          },
          {
            name: "basic-bricks-NB",
            constraint: "^3.0.0",
          },
        ],
      }
    );

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      8,
      "STORYBOARD_I18N",
      {
        project: "my-project",
        id: "my-project-HELLO",
        name: "HELLO",
        zh: "你好",
        en: "Hello",
      }
    );

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      9,
      "STORYBOARD_I18N",
      {
        project: "my-project",
        id: "my-project-WORLD",
        name: "WORLD",
        zh: "世界",
        en: "World",
      }
    );

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      10,
      "MICRO_APP_RESOURCE_IMAGE",
      {
        project: "my-project",
        from: "theme-builder",
        name: "one.png",
        url: "/any/one.png",
      }
    );

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      11,
      "MICRO_APP_RESOURCE_IMAGE",
      {
        project: "my-project",
        from: "theme-builder",
        name: "two.png",
        url: "/any/two.png",
      }
    );

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      12,
      "STORYBOARD_FUNCTION",
      {
        project: "my-project",
        name: "sayHello",
        source: `function sayHello() {}`,
        tests: [
          {
            input: "[]",
            output: "undefined",
          },
        ],
      }
    );

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      13,
      "STORYBOARD_FUNCTION",
      {
        project: "my-project",
        name: "sayGoodbye",
        source: `function sayGoodbye(): void {}`,
        typescript: true,
      }
    );
  });
});
