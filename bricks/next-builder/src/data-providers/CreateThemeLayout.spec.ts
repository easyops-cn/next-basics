import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";
import {
  CreateThemeLayout,
  CreateThemeLayoutParams,
} from "./CreateThemeLayout";

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
    case "STORYBOARD_THEME_LAYOUT":
      return {
        instanceId: "layout-a",
      };
  }
});

describe("CreateThemeLayout", () => {
  it("should work", async () => {
    expect(
      await CreateThemeLayout({
        projectId: "project-a",
        appId: "app-a",
        layoutId: "home",
        name: {
          en: "My Layout",
        },
      })
    ).toEqual({
      instanceId: "layout-a",
    });
    expect(InstanceApi_createInstance).toBeCalledTimes(4);
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      1,
      "STORYBOARD_TEMPLATE",
      {
        project: "project-a",
        appId: "app-a",
        templateId: `tpl-layout-home`,
        type: "custom-template",
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      2,
      "STORYBOARD_SNIPPET",
      {
        project: "project-a",
        appId: "app-a",
        snippetId: `layout-home`,
        type: "snippet",
        text: {
          en: "My Layout",
        },
        layerType: "layout",
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      3,
      "STORYBOARD_BRICK",
      {
        appId: "app-a",
        brick: `tpl-layout-home`,
        type: "brick",
        mountPoint: "bricks",
        parent: "snippet-a",
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      4,
      "STORYBOARD_THEME_LAYOUT",
      {
        project: "project-a",
        layoutId: "home",
        name: {
          en: "My Layout",
        },
        customTemplate: "tpl-a",
        snippet: "snippet-a",
      }
    );
  });
});
