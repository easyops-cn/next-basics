import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";
import { CreateThemePage } from "./CreateThemePage";

jest.mock("@next-sdk/cmdb-sdk");

(InstanceApi_createInstance as jest.Mock).mockImplementation((objectId) => {
  switch (objectId) {
    case "STORYBOARD_TEMPLATE":
      return {
        instanceId: "tpl-a",
      };
    case "STORYBOARD_SNIPPET":
      return {
        instanceId: "snippet-a",
      };
    case "STORYBOARD_THEME_PAGE":
      return {
        instanceId: "page-a",
      };
  }
});

describe("CreateThemePage", () => {
  it("should work", async () => {
    expect(
      await CreateThemePage({
        projectId: "project-a",
        appId: "app-a",
        pageTypeId: "home",
        name: "My Layout",
        thumbnail: "fun.png",
        locales: {
          en: {
            name: "Home",
          },
          zh: {
            name: "首页",
          },
        },
        layoutList: "header,sider",
        layoutType: "UI8.0",
      })
    ).toEqual({
      instanceId: "page-a",
    });
    expect(InstanceApi_createInstance).toBeCalledTimes(4);
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      1,
      "STORYBOARD_TEMPLATE",
      {
        project: "project-a",
        appId: "app-a",
        templateId: `tpl-page-home`,
        type: "custom-template",
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      2,
      "STORYBOARD_SNIPPET",
      {
        project: "project-a",
        appId: "app-a",
        snippetId: `page-home`,
        type: "snippet",
        text: {
          en: "My Layout",
          zh: "My Layout",
        },
        layerType: "layout",
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      3,
      "STORYBOARD_BRICK",
      {
        appId: "app-a",
        brick: `basic-bricks.easy-view`,
        properties: JSON.stringify({
          gridAreas: {
            header: [1, 1, 2, 3],
            sider: [2, 1, 3, 2],
            content: [2, 2, 3, 3],
          },
          gridTemplateColumns: ["var(--sub-menu-bar-width)", "auto"],
          gridTemplateRows: ["var(--app-bar-height)", "auto"],
        }),
        type: "brick",
        mountPoint: "bricks",
        parent: "snippet-a",
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      4,
      "STORYBOARD_THEME_PAGE",
      {
        project: "project-a",
        pageTypeId: "home",
        name: "My Layout",
        thumbnail: "fun.png",
        locales: {
          en: {
            name: "Home",
          },
          zh: {
            name: "首页",
          },
        },
        template: "tpl-a",
        snippet: "snippet-a",
        layoutList: "header,sider",
        layoutType: "UI8.0",
      }
    );
  });

  it.each<[string, number, unknown]>([
    [
      "header,sider",
      5,
      {
        appId: "app-a",
        brick: `basic-bricks.easy-view`,
        properties: JSON.stringify({
          gridAreas: {
            header: [1, 2, 2, 3],
            sider: [1, 1, 3, 2],
            content: [2, 2, 3, 3],
          },
          gridTemplateColumns: ["var(--sub-menu-bar-width)", "auto"],
          gridTemplateRows: ["var(--app-bar-height)", "auto"],
        }),
        type: "brick",
        mountPoint: "bricks",
        parent: "snippet-a",
      },
    ],
    [
      "header",
      5,
      {
        appId: "app-a",
        brick: `basic-bricks.easy-view`,
        properties: JSON.stringify({
          gridAreas: {
            header: [1, 1, 2, 3],
            content: [2, 1, 3, 3],
          },
          gridTemplateColumns: ["var(--sub-menu-bar-width)", "auto"],
          gridTemplateRows: ["var(--app-bar-height)", "auto"],
        }),
        type: "brick",
        mountPoint: "bricks",
        parent: "snippet-a",
      },
    ],
    [
      "sider",
      8,
      {
        appId: "app-a",
        brick: `basic-bricks.easy-view`,
        properties: JSON.stringify({
          gridAreas: {
            sider: [1, 1, 3, 2],
            content: [1, 2, 3, 3],
          },
          gridTemplateColumns: ["var(--sub-menu-bar-width)", "auto"],
          gridTemplateRows: ["var(--app-bar-height)", "auto"],
        }),
        type: "brick",
        mountPoint: "bricks",
        parent: "snippet-a",
      },
    ],
  ])(
    "should work when layoutList or layoutType",
    async (layoutList, layoytType, result) => {
      await CreateThemePage({
        projectId: "project-a",
        appId: "app-a",
        pageTypeId: "home",
        name: "My Layout",
        thumbnail: "fun.png",
        locales: {
          en: {
            name: "Home",
          },
          zh: {
            name: "首页",
          },
        },
        layoutList,
        layoutType: layoytType === 5 ? "UI5.0" : "UI8.0",
      });

      expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
        3,
        "STORYBOARD_BRICK",
        result
      );
    }
  );
});
