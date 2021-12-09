import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";
import { appendBricksFactory } from "./appendBricksFactory";

jest.mock("@next-sdk/cmdb-sdk");

let instanceIdCursor = 1;
(InstanceApi_createInstance as jest.Mock).mockImplementation(() =>
  Promise.resolve({
    instanceId: `instance:${instanceIdCursor++}`,
  })
);

describe("appendBricksFactory", () => {
  it("should work", async () => {
    const appendBricks = appendBricksFactory("my-app", ["type", "brick"]);
    await appendBricks(
      [
        {
          id: "B-01",
          type: "brick",
          brick: "my-brick-1",
          children: [
            {
              id: "B-02",
              type: "brick",
              brick: "my-brick-2",
            },
            {
              id: "B-03",
              type: "brick",
              brick: "my-brick-3",
              children: [
                {
                  id: "B-04",
                  type: "brick",
                  brick: "my-brick-4",
                },
              ],
            },
          ],
        },
      ],
      "instance:0"
    );
    expect(InstanceApi_createInstance).toBeCalledTimes(4);
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      1,
      "STORYBOARD_BRICK",
      {
        type: "brick",
        brick: "my-brick-1",
        parent: "instance:0",
        appId: "my-app",
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      2,
      "STORYBOARD_BRICK",
      {
        type: "brick",
        brick: "my-brick-2",
        parent: "instance:1",
        appId: "my-app",
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      3,
      "STORYBOARD_BRICK",
      {
        type: "brick",
        brick: "my-brick-3",
        parent: "instance:1",
        appId: "my-app",
      }
    );
    expect(InstanceApi_createInstance).toHaveBeenNthCalledWith(
      4,
      "STORYBOARD_BRICK",
      {
        type: "brick",
        brick: "my-brick-4",
        parent: "instance:3",
        appId: "my-app",
      }
    );
  });
});
