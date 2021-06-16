import {
  ApplyStoryBoardSnippet,
  NodeInstanceWithChildren,
} from "./ApplyStoryboardSnippet";
import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";
jest.mock("@next-sdk/cmdb-sdk");

const mockCreateInstance = (
  InstanceApi_createInstance as jest.MockedFunction<
    typeof InstanceApi_createInstance
  >
)
  .mockResolvedValueOnce({
    brick: "basic-bricks.general-card",
    mountPoint: "content",
    type: "brick",
    instanceId: "cbacba",
  })
  .mockResolvedValueOnce({
    brick: "forms.general-form",
    mountPoint: "content",
    type: "brick",
    instanceId: "fbcfbc",
  })
  .mockResolvedValueOnce({
    brick: "forms.general-input",
    mountPoint: "items",
    type: "brick",
    instanceId: "6bc6bc",
  })
  .mockResolvedValueOnce({
    brick: "chart-v2.bar-chart",
    mountPoint: "content",
    type: "brick",
    instanceId: "cabcab",
  });
describe("ApplyStoryboardSnippet", () => {
  it("should work", async () => {
    const nodeList: NodeInstanceWithChildren[] = [
      {
        appId: "my-app",
        parent: "abc",
        brick: "basic-bricks.general-card",
        type: "brick",
        mountPoint: "content",
        children: [
          {
            brick: "forms.general-form",
            mountPoint: "content",
            type: "brick",
            children: [
              {
                brick: "forms.general-input",
                mountPoint: "items",
                type: "brick",
              },
            ],
          },
          {
            brick: "chart-v2.bar-chart",
            mountPoint: "content",
            type: "brick",
            children: [],
          },
        ],
      },
    ];

    const result = await ApplyStoryBoardSnippet({ nodeList });

    expect(mockCreateInstance.mock.calls[0][1]).toEqual({
      appId: "my-app",
      brick: "basic-bricks.general-card",
      mountPoint: "content",
      parent: "abc",
      type: "brick",
    });
    expect(
      mockCreateInstance.mock.calls[mockCreateInstance.mock.calls.length - 1][1]
    ).toEqual({
      brick: "chart-v2.bar-chart",
      mountPoint: "content",
      parent: "cbacba",
      type: "brick",
    });

    expect(result).toEqual([
      {
        brick: "basic-bricks.general-card",
        children: [
          {
            brick: "forms.general-form",
            children: [
              {
                brick: "forms.general-input",
                children: [],
                instanceId: "6bc6bc",
                mountPoint: "items",
                type: "brick",
              },
            ],
            instanceId: "fbcfbc",
            mountPoint: "content",
            type: "brick",
          },
          {
            brick: "chart-v2.bar-chart",
            children: [],
            instanceId: "cabcab",
            mountPoint: "content",
            type: "brick",
          },
        ],
        instanceId: "cbacba",
        mountPoint: "content",
        type: "brick",
      },
    ]);
  });
});
