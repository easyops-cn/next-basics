import {
  InstanceApi_createInstance,
  InstanceApi_getDetail,
} from "@next-sdk/cmdb-sdk";
import { StoryboardApi_cloneBricks } from "@next-sdk/next-builder-sdk";
import { CreateThemePage, LayoutEnums } from "./CreateThemePage";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-sdk/next-builder-sdk");

(InstanceApi_createInstance as jest.Mock).mockImplementation((objectId) => {
  switch (objectId) {
    case "STORYBOARD_TEMPLATE":
      return {
        instanceId: "tpl-a",
        id: "T-1",
      };
    case "STORYBOARD_SNIPPET":
      return {
        instanceId: "snippet-a",
        id: "S-1",
      };
    case "STORYBOARD_THEME_PAGE":
      return {
        instanceId: "page-a",
        id: "TT-1",
      };
  }
});

(InstanceApi_getDetail as jest.Mock).mockImplementation((objectId) => {
  switch (objectId) {
    case "STORYBOARD_TEMPLATE":
      return {
        proxy: "proxy",
        state: "state",
        children: [
          {
            id: "T-001",
          },
          {
            id: "T-002",
          },
        ],
      };
    case "STORYBOARD_SNIPPET":
      return {
        context: "context",
        children: [
          {
            id: "S-001",
          },
          {
            id: "S-002",
          },
        ],
      };
  }
});

(StoryboardApi_cloneBricks as jest.Mock).mockImplementation(() => ({}));

describe("CreateThemePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should work then use layout create", async () => {
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
        layoutType: LayoutEnums.HEADER_THROUGH_SIDEBAR,
      })
    ).toEqual(true);
    expect(InstanceApi_createInstance).toBeCalledTimes(5);
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      1,
      "STORYBOARD_TEMPLATE",
      {
        project: "project-a",
        appId: "app-a",
        templateId: `tpl-page-home`,
        proxy: JSON.stringify({
          slots: {
            header: {
              ref: "view",
              refSlot: "header",
            },
            sider: {
              ref: "view",
              refSlot: "sider",
            },
            content: {
              ref: "view",
              refSlot: "content",
            },
          },
        }),
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
        brick: `tpl-page-home`,
        type: "brick",
        mountPoint: "bricks",
        parent: "snippet-a",
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      4,
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
          gridTemplateColumns: ["auto", "1fr"],
          gridTemplateRows: ["var(--app-bar-height)", "auto"],
        }),
        ref: "view",
        type: "brick",
        mountPoint: "bricks",
        parent: "tpl-a",
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      5,
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
        layoutType: LayoutEnums.HEADER_THROUGH_SIDEBAR,
      }
    );
  });

  it.each<[LayoutEnums, unknown]>([
    [
      LayoutEnums.HEADER_THROUGH_SIDEBAR,
      {
        appId: "app-a",
        brick: `basic-bricks.easy-view`,
        properties: JSON.stringify({
          gridAreas: {
            header: [1, 1, 2, 3],
            sider: [2, 1, 3, 2],
            content: [2, 2, 3, 3],
          },
          gridTemplateColumns: ["auto", "1fr"],
          gridTemplateRows: ["var(--app-bar-height)", "auto"],
        }),
        ref: "view",
        type: "brick",
        mountPoint: "bricks",
        parent: "tpl-a",
      },
    ],
    [
      LayoutEnums.SIDEBAR_THROUGH_HEADER,
      {
        appId: "app-a",
        brick: `basic-bricks.easy-view`,
        properties: JSON.stringify({
          gridAreas: {
            header: [1, 2, 2, 3],
            sider: [1, 1, 3, 2],
            content: [2, 2, 3, 3],
          },
          gridTemplateColumns: ["auto", "1fr"],
          gridTemplateRows: ["var(--app-bar-height)", "auto"],
        }),
        ref: "view",
        type: "brick",
        mountPoint: "bricks",
        parent: "tpl-a",
      },
    ],
    [
      LayoutEnums.HEADER,
      {
        appId: "app-a",
        brick: `basic-bricks.easy-view`,
        properties: JSON.stringify({
          gridAreas: {
            header: [1, 1, 2, 3],
            content: [2, 1, 3, 3],
          },
          gridTemplateRows: ["var(--app-bar-height)", "auto"],
        }),
        ref: "view",
        type: "brick",
        mountPoint: "bricks",
        parent: "tpl-a",
      },
    ],
    [
      LayoutEnums.SIDEBAR_LEFT,
      {
        appId: "app-a",
        brick: `basic-bricks.easy-view`,
        properties: JSON.stringify({
          gridAreas: {
            sider: [1, 1, 3, 1],
            content: [1, 2, 3, 3],
          },
          gridTemplateColumns: ["auto", "1fr"],
        }),
        ref: "view",
        type: "brick",
        mountPoint: "bricks",
        parent: "tpl-a",
      },
    ],
    [
      LayoutEnums.SIDEBAR_RIGHT,
      {
        appId: "app-a",
        brick: `basic-bricks.easy-view`,
        properties: JSON.stringify({
          gridAreas: {
            content: [1, 1, 3, 1],
            sider: [1, 2, 3, 3],
          },
          gridTemplateColumns: ["auto", "1fr"],
        }),
        ref: "view",
        type: "brick",
        mountPoint: "bricks",
        parent: "tpl-a",
      },
    ],
    [
      LayoutEnums.NULL,
      {
        appId: "app-a",
        brick: `basic-bricks.easy-view`,
        properties: JSON.stringify({
          gridAreas: {
            content: [1, 1, 3, 3],
          },
        }),
        ref: "view",
        type: "brick",
        mountPoint: "bricks",
        parent: "tpl-a",
      },
    ],
  ])(
    "should work when layoutList or layoutType",
    async (layoutType, result) => {
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
        layoutType: layoutType,
      });

      expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
        4,
        "STORYBOARD_BRICK",
        result
      );
    }
  );

  it("should work then use theme template create", async () => {
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
        pageTemplate: {
          template: [
            {
              id: "B-001",
              instanceId: "abc",
            },
          ],
          snippet: [
            {
              id: "B-001",
              instanceId: "abc",
            },
          ],
        },
      })
    ).toBe(true);

    expect(InstanceApi_getDetail).toBeCalledTimes(2);

    expect(InstanceApi_createInstance).toBeCalledTimes(3);

    expect(StoryboardApi_cloneBricks).toBeCalledTimes(4);

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      1,
      "STORYBOARD_TEMPLATE",
      {
        project: "project-a",
        appId: "app-a",
        templateId: `tpl-page-home`,
        proxy: "proxy",
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
        context: "context",
      }
    );

    expect(StoryboardApi_cloneBricks).toHaveBeenNthCalledWith(1, {
      newAppId: "app-a",
      newParentBrickId: "T-1",
      sourceBrickId: "T-001",
    });
    expect(StoryboardApi_cloneBricks).toHaveBeenNthCalledWith(2, {
      newAppId: "app-a",
      newParentBrickId: "T-1",
      sourceBrickId: "T-002",
    });
    expect(StoryboardApi_cloneBricks).toHaveBeenNthCalledWith(3, {
      newAppId: "app-a",
      newParentBrickId: "S-1",
      sourceBrickId: "S-001",
    });
    expect(StoryboardApi_cloneBricks).toHaveBeenNthCalledWith(4, {
      newAppId: "app-a",
      newParentBrickId: "S-1",
      sourceBrickId: "S-002",
    });

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      3,
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
      }
    );
  });

  it("should work while template was null", async () => {
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
        pageTemplate: {
          template: [],
          snippet: [],
        },
      })
    ).toBe(true);

    expect(InstanceApi_getDetail).toBeCalledTimes(0);

    expect(InstanceApi_createInstance).toBeCalledTimes(3);

    expect(StoryboardApi_cloneBricks).toBeCalledTimes(0);
  });
});
