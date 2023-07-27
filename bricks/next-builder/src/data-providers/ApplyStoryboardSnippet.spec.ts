import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";
import { StoryboardApi_sortStoryboardNodes } from "@next-sdk/next-builder-sdk";
import { EventDetailOfSnippetApply } from "@next-core/editor-bricks-helper";
import { ApplyStoryBoardSnippet } from "./ApplyStoryboardSnippet";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-sdk/next-builder-sdk");

const mockCreateInstance = (
  InstanceApi_createInstance as jest.MockedFunction<
    typeof InstanceApi_createInstance
  >
).mockImplementation((objectId, data) =>
  Promise.resolve({
    ...data,
    instanceId: `instance:${data.brick}`,
    id: `id:${data.brick}`,
  })
);

const mockSortStoryboardNodes =
  StoryboardApi_sortStoryboardNodes as jest.MockedFunction<
    typeof StoryboardApi_sortStoryboardNodes
  >;

describe("ApplyStoryboardSnippet", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", async () => {
    const params = {
      nodeDetails: [
        {
          nodeUid: 200,
          parentUid: 100,
          nodeData: {
            parent: "instance-a",
            brick: "basic-bricks.easy-view",
          },
          children: [
            {
              nodeUid: 201,
              parentUid: 200,
              nodeData: {
                brick: "basic-bricks.general-button",
              },
            },
          ],
        },
      ],
      nodeIds: ["root", null],
    } as Partial<EventDetailOfSnippetApply> as EventDetailOfSnippetApply;

    const result = await ApplyStoryBoardSnippet(params);

    expect(mockCreateInstance).toHaveBeenNthCalledWith(1, "STORYBOARD_BRICK", {
      parent: "instance-a",
      brick: "basic-bricks.easy-view",
    });

    expect(mockCreateInstance).toHaveBeenNthCalledWith(2, "STORYBOARD_BRICK", {
      parent: "instance:basic-bricks.easy-view",
      brick: "basic-bricks.general-button",
    });

    expect(mockSortStoryboardNodes).toBeCalledWith({
      nodeIds: ["root", "id:basic-bricks.easy-view"],
    });

    expect(result).toEqual({
      flattenNodeDetails: [
        {
          nodeUid: 200,
          nodeData: {
            parent: "instance-a",
            brick: "basic-bricks.easy-view",
            instanceId: "instance:basic-bricks.easy-view",
            id: "id:basic-bricks.easy-view",
          },
        },
        {
          nodeUid: 201,
          nodeData: {
            parent: "instance:basic-bricks.easy-view",
            brick: "basic-bricks.general-button",
            instanceId: "instance:basic-bricks.general-button",
            id: "id:basic-bricks.general-button",
          },
        },
      ],
    });
  });

  it("should ignore sort", async () => {
    const params = {
      nodeDetails: [],
      nodeIds: [],
    } as Partial<EventDetailOfSnippetApply> as EventDetailOfSnippetApply;

    const result = await ApplyStoryBoardSnippet(params);

    expect(mockCreateInstance).not.toBeCalled();
    expect(mockSortStoryboardNodes).not.toBeCalled();

    expect(result).toEqual({
      flattenNodeDetails: [],
    });
  });
});
