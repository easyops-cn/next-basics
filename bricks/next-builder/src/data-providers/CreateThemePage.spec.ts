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
        brick: `tpl-page-home`,
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
        template: "tpl-a",
        snippet: "snippet-a",
      }
    );
  });
});
