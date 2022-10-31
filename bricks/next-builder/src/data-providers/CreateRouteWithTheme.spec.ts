import { CreateRouteWithTheme } from "./CreateRouteWithTheme";
import {
  InstanceApi_getDetail,
  InstanceApi_updateInstanceV2,
  InstanceApi_createInstance,
} from "@next-sdk/cmdb-sdk";
import { appendBricksFactory } from "./utils/appendBricksFactory";
import { getBrickNodeAttrs } from "./utils/getBrickNodeAttrs";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("./utils/getBrickNodeAttrs");
jest.mock("./utils/appendBricksFactory");

(getBrickNodeAttrs as jest.Mock).mockResolvedValue(["type", "brick"]);

(InstanceApi_getDetail as jest.Mock).mockImplementation((objectId) =>
  objectId === "PROJECT_MICRO_APP"
    ? {
        templates: [
          {
            templateId: "tpl-already-defined",
          },
        ],
      }
    : {
        themeId: "my-theme",
        pageTemplates: [
          {
            pageTypeId: "list",
            templateId: "tpl-page-list",
            snippetId: "page-list",
          },
          {
            pageTypeId: "home",
            templateId: "tpl-page-home",
            snippetId: "page-home",
          },
        ],
        templates: [
          {
            templateId: "tpl-page-list",
            children: [
              {
                type: "brick",
                brick: "tpl-basic-layout",
              },
            ],
          },
          {
            templateId: "tpl-basic-layout",
            children: [
              {
                type: "brick",
                brick: "basic-bricks.easy-view",
              },
            ],
          },
        ],
        snippets: [
          {
            snippetId: "page-list",
            children: [
              {
                type: "brick",
                brick: "tpl-page-list",
                children: [
                  {
                    type: "brick",
                    brick: "my.other-brick",
                  },
                ],
              },
            ],
          },
          {
            snippetId: "page-home",
            context: [
              {
                name: "quality",
                value: "good",
              },
            ],
            children: [
              {
                type: "brick",
                brick: "tpl-already-defined",
              },
              {
                type: "brick",
                brick: "tpl-basic-layout",
              },
            ],
          },
        ],
      }
);

(InstanceApi_updateInstanceV2 as jest.Mock).mockResolvedValue({});
(InstanceApi_createInstance as jest.Mock).mockImplementation(
  (objectId, { templateId }) => ({
    instanceId: `template:${templateId}`,
  })
);

const appendBricks = jest.fn();
(appendBricksFactory as jest.Mock).mockReturnValue(appendBricks);

describe("CreateRouteWithTheme", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work for page-list", async () => {
    const result = await CreateRouteWithTheme({
      projectId: "my-project",
      appId: "my-app",
      routeId: "route:list",
      themeInstanceId: "theme-a",
      pageTypeId: "list",
    });

    expect(result).toEqual({
      appId: "my-app",
      projectId: "my-project",
      routeId: "route:list",
    });

    expect(InstanceApi_updateInstanceV2).toBeCalledTimes(1);
    expect(InstanceApi_updateInstanceV2).toHaveBeenNthCalledWith(
      1,
      "PROJECT_MICRO_APP",
      "my-project",
      {
        useThemeId: "my-theme",
      }
    );

    expect(InstanceApi_createInstance).toBeCalledTimes(2);
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      1,
      "STORYBOARD_TEMPLATE",
      expect.objectContaining({
        templateId: "tpl-page-list",
      })
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      2,
      "STORYBOARD_TEMPLATE",
      expect.objectContaining({
        templateId: "tpl-basic-layout",
      })
    );

    expect(appendBricks).toBeCalledTimes(3);
    expect(appendBricks).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      "route:list"
    );
    expect(appendBricks).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      "template:tpl-page-list"
    );
    expect(appendBricks).toHaveBeenNthCalledWith(
      3,
      expect.anything(),
      "template:tpl-basic-layout"
    );
  });

  it("should work for page-home", async () => {
    const result = await CreateRouteWithTheme({
      projectId: "my-project",
      appId: "my-app",
      routeId: "route:home",
      themeInstanceId: "theme-a",
      pageTypeId: "home",
    });

    expect(result).toEqual({
      appId: "my-app",
      projectId: "my-project",
      routeId: "route:home",
    });

    expect(InstanceApi_updateInstanceV2).toBeCalledTimes(2);
    expect(InstanceApi_updateInstanceV2).toHaveBeenNthCalledWith(
      1,
      "PROJECT_MICRO_APP",
      "my-project",
      {
        useThemeId: "my-theme",
      }
    );
    expect(InstanceApi_updateInstanceV2).toHaveBeenNthCalledWith(
      2,
      "STORYBOARD_ROUTE",
      "route:home",
      {
        context: [{ name: "quality", value: "good" }],
      }
    );

    expect(InstanceApi_createInstance).toBeCalledTimes(1);
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      1,
      "STORYBOARD_TEMPLATE",
      expect.objectContaining({
        templateId: "tpl-basic-layout",
      })
    );

    expect(appendBricks).toBeCalledTimes(2);
    expect(appendBricks).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      "route:home"
    );
    expect(appendBricks).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      "template:tpl-basic-layout"
    );
  });
});
