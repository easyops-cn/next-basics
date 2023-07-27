import {
  InstanceApi_createInstance,
  InstanceApi_getDetail,
} from "@next-sdk/cmdb-sdk";
import { PasteBricks } from "./PasteBricks";
import { CreateThemePage } from "./CreateThemePage";

jest.mock("./PasteBricks");
jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-sdk/next-builder-sdk");

(InstanceApi_createInstance as jest.Mock).mockImplementation((objectId) => {
  switch (objectId) {
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
    case "STORYBOARD_SNIPPET":
      return {
        context: "context",
        children: [
          {
            id: "S-001",
            instanceId: "s-001",
          },
          {
            id: "S-002",
            instanceId: "s-002",
          },
        ],
      };
  }
});

(PasteBricks as jest.Mock).mockImplementation(() => ({}));

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
        sourceProjectId: "source-projectid",
      })
    ).toEqual(true);
    expect(InstanceApi_createInstance).toBeCalledTimes(2);
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      1,
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
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      2,
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
        snippet: "snippet-a",
      }
    );
  });

  it("should work then use theme snippet create", async () => {
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
          snippet: [
            {
              id: "B-001",
              instanceId: "abc",
            },
          ],
        },
        sourceProjectId: "source-projectid",
      })
    ).toBe(true);

    expect(InstanceApi_getDetail).toBeCalledTimes(1);

    expect(InstanceApi_createInstance).toBeCalledTimes(2);

    expect(PasteBricks).toBeCalledTimes(2);

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      1,
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
        context: "context",
      }
    );

    expect(PasteBricks).toHaveBeenNthCalledWith(1, {
      newAppId: "app-a",
      newParentBrickId: "S-1",
      sourceBrickId: "S-001",
      newProjectInstanceId: "project-a",
      sourceBrickInstanceId: "s-001",
      sourceProjectInstanceId: "source-projectid",
    });
    expect(PasteBricks).toHaveBeenNthCalledWith(2, {
      newAppId: "app-a",
      newParentBrickId: "S-1",
      sourceBrickId: "S-002",
      newProjectInstanceId: "project-a",
      sourceBrickInstanceId: "s-002",
      sourceProjectInstanceId: "source-projectid",
    });

    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      2,
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
          snippet: [],
        },
      })
    ).toBe(true);

    expect(InstanceApi_getDetail).toBeCalledTimes(0);

    expect(InstanceApi_createInstance).toBeCalledTimes(2);

    expect(PasteBricks).toBeCalledTimes(0);
  });
});
