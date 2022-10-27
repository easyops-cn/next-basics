import { CreateRouteWithTheme } from "./CreateRouteWithTheme";
import {
  InstanceApi_getDetail,
  InstanceGraphApi_traverseGraphV2,
  InstanceApi_updateInstanceV2,
  InstanceRelationApi_append,
} from "@next-sdk/cmdb-sdk";
import { appendBricksFactory } from "./utils/appendBricksFactory";
import { getBrickNodeAttrs } from "./utils/getBrickNodeAttrs";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("./utils/getBrickNodeAttrs");
jest.mock("./utils/appendBricksFactory");

(getBrickNodeAttrs as jest.Mock).mockResolvedValue(["type", "brick"]);

(InstanceRelationApi_append as jest.Mock).mockResolvedValue({});

(InstanceApi_getDetail as jest.Mock).mockResolvedValue({
  pageTemplates: [
    {
      pageTypeId: "list",
      snippet: [{ instanceId: "snippet:list" }],
    },
    {
      pageTypeId: "home",
      snippet: [{ instanceId: "snippet:home" }],
    },
  ],
});

(InstanceApi_updateInstanceV2 as jest.Mock).mockResolvedValue({});

(InstanceGraphApi_traverseGraphV2 as jest.Mock).mockResolvedValue({
  topic_vertices: [
    {
      instanceId: "snippet:home",
      context: JSON.stringify([
        {
          name: "test",
          value: 1,
        },
      ]),
    },
  ],
  vertices: [
    {
      instanceId: "x",
    },
    {
      instanceId: "y",
    },
    {
      instanceId: "z",
    },
  ],
  edges: [
    {
      in: "x",
      out: "snippet:home",
      out_name: "children",
    },
    {
      in: "y",
      out: "snippet:home",
      out_name: "children",
    },
    {
      in: "z",
      out: "y",
      out_name: "children",
    },
  ],
});

const appendBricks = jest.fn();
(appendBricksFactory as jest.Mock).mockReturnValue(appendBricks);

describe("CreateRouteWithTheme", () => {
  it("should work", async () => {
    const result = await CreateRouteWithTheme({
      projectId: "my-project",
      appId: "my-app",
      routeId: "B-001",
      routeInstanceId: "route-abc",
      themeProjectId: "origin-project",
      snippet: [
        {
          instanceId: "snippet-abc",
        },
      ],
      template: [
        {
          instanceId: "template-abc",
        },
      ],
    });

    expect(result).toEqual({
      appId: "my-app",
      projectId: "my-project",
      routeId: "B-001",
      routeInstanceId: "route-abc",
    });
  });
});
