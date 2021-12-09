import {
  InstanceApi_getDetail,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import { ApplyThemePage } from "./ApplyThemePage";
import { appendBricksFactory } from "./utils/appendBricksFactory";
import { getBrickNodeAttrs } from "./utils/getBrickNodeAttrs";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("./utils/getBrickNodeAttrs");
jest.mock("./utils/appendBricksFactory");

(getBrickNodeAttrs as jest.Mock).mockResolvedValue(["type", "brick"]);

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

(InstanceGraphApi_traverseGraphV2 as jest.Mock).mockResolvedValue({
  topic_vertices: [
    {
      instanceId: "snippet:home",
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

describe("ApplyThemePage", () => {
  it("should work", async () => {
    const result = await ApplyThemePage({
      projectId: "my-project",
      appId: "my-app",
      routeId: "my-route",
      pageTypeId: "home",
    });

    expect(result).toEqual({
      projectId: "my-project",
      appId: "my-app",
      routeId: "my-route",
    });

    expect(InstanceGraphApi_traverseGraphV2).toBeCalledWith(
      expect.objectContaining({
        query: {
          "project.instanceId": "my-project",
          instanceId: "snippet:home",
        },
      })
    );

    expect(appendBricks).toBeCalledWith(
      [
        {
          instanceId: "x",
        },
        {
          instanceId: "y",
          children: [{ instanceId: "z" }],
        },
      ],
      "my-route"
    );
  });
});
