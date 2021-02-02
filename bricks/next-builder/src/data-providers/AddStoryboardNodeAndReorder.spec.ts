import { BuilderRouteOrBrickNode } from "@next-core/brick-types";
import {
  NodeInstance,
  EventDetailOfNodeAddStored,
} from "@next-core/editor-bricks-helper";
import { InstanceApi } from "@next-sdk/cmdb-sdk";
import { StoryboardApi } from "@next-sdk/next-builder-sdk";
import {
  AddStoryboardNodeAndReorder,
  AddStoryboardNodeAndReorderParams,
} from "./AddStoryboardNodeAndReorder";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-sdk/next-builder-sdk");

const mockCreateInstance = (InstanceApi.createInstance as jest.MockedFunction<
  typeof InstanceApi.createInstance
>).mockResolvedValue({
  id: "B-007",
  brick: "brick-a",
});
const mockSortStoryboardNodes = (StoryboardApi.sortStoryboardNodes as jest.MockedFunction<
  typeof StoryboardApi.sortStoryboardNodes
>).mockResolvedValue();

describe("AddStoryboardNodeAndReorder", () => {
  it("should work", async () => {
    const params: AddStoryboardNodeAndReorderParams = {
      nodeData: ({
        brick: "brick-a",
      } as Partial<NodeInstance>) as NodeInstance,
      nodeIds: ["B-001", null, "B-002"],
      nodeUid: 1,
      nodeAlias: "A",
    };
    const result: EventDetailOfNodeAddStored = {
      nodeData: ({
        id: "B-007",
        brick: "brick-a",
      } as Partial<BuilderRouteOrBrickNode>) as BuilderRouteOrBrickNode,
      nodeUid: 1,
      nodeAlias: "A",
    };
    expect(await AddStoryboardNodeAndReorder(params)).toEqual(result);
    expect(mockCreateInstance).toBeCalledWith("STORYBOARD_BRICK", {
      brick: "brick-a",
    });
    expect(mockSortStoryboardNodes).toBeCalledWith({
      nodeIds: ["B-001", "B-007", "B-002"],
    });
  });
});
