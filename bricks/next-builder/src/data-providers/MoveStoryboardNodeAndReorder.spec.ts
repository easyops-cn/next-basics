import { BuilderRouteOrBrickNode } from "@next-core/brick-types";
import { NodeInstance } from "@next-core/editor-bricks-helper";
import { InstanceApi_updateInstanceV2 } from "@next-sdk/cmdb-sdk";
import { StoryboardApi_sortStoryboardNodes } from "@next-sdk/next-builder-sdk";
import {
  MoveStoryboardNodeAndReorder,
  MoveStoryboardNodeAndReorderParams,
  MoveStoryboardNodeAndReorderResult,
} from "./MoveStoryboardNodeAndReorder";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-sdk/next-builder-sdk");

const mockUpdateInstanceV2 = (InstanceApi_updateInstanceV2 as jest.MockedFunction<
  typeof InstanceApi_updateInstanceV2
>).mockResolvedValue({
  id: "B-001",
  mountPoint: "toolbar",
});

const mockSortStoryboardNodes = (StoryboardApi_sortStoryboardNodes as jest.MockedFunction<
  typeof StoryboardApi_sortStoryboardNodes
>).mockResolvedValue();

describe("MoveStoryboardNodeAndReorder", () => {
  it("should work", async () => {
    const params: MoveStoryboardNodeAndReorderParams = {
      nodeInstanceId: "instance-id-1",
      nodeData: ({
        parent: "any-parent",
        mountPoint: "toolbar",
      } as Partial<NodeInstance>) as NodeInstance,
      nodeIds: ["B-001", "B-002"],
      nodeUid: 1,
    };

    const result: MoveStoryboardNodeAndReorderResult = {
      nodeUid: 1,
      nodeData: ({
        id: "B-001",
        mountPoint: "toolbar",
      } as Partial<BuilderRouteOrBrickNode>) as BuilderRouteOrBrickNode,
    };

    expect(await MoveStoryboardNodeAndReorder(params)).toEqual(result);
    expect(mockUpdateInstanceV2).toBeCalledWith(
      "STORYBOARD_BRICK",
      "instance-id-1",
      {
        parent: "any-parent",
        mountPoint: "toolbar",
      }
    );

    expect(mockSortStoryboardNodes).toBeCalledWith({
      nodeIds: ["B-001", "B-002"],
    });
  });
});
