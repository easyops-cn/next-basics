import { BuilderRouteOrBrickNode } from "@next-core/brick-types";
import { createProviderClass } from "@next-core/brick-utils";
import { NodeInstance } from "@next-core/editor-bricks-helper";
import { InstanceApi_updateInstanceV2 } from "@next-sdk/cmdb-sdk";
import { StoryboardApi_sortStoryboardNodes } from "@next-sdk/next-builder-sdk";

const STORYBOARD_BRICK = "STORYBOARD_BRICK";

export interface MoveStoryboardNodeAndReorderParams {
  nodeInstanceId: string;
  nodeData: NodeInstance;
  nodeIds: string[];
  nodeUid: number;
}

export interface MoveStoryboardNodeAndReorderResult {
  nodeUid: number;
  nodeData: BuilderRouteOrBrickNode;
}

export async function MoveStoryboardNodeAndReorder({
  nodeInstanceId,
  nodeData,
  nodeIds,
  nodeUid,
}: MoveStoryboardNodeAndReorderParams): Promise<MoveStoryboardNodeAndReorderResult> {
  const stored = await InstanceApi_updateInstanceV2(
    STORYBOARD_BRICK,
    nodeInstanceId,
    nodeData
  );

  await StoryboardApi_sortStoryboardNodes({
    nodeIds,
  });

  return {
    nodeUid,
    nodeData: stored as BuilderRouteOrBrickNode,
  };
}

customElements.define(
  "next-builder.provider-move-storyboard-node-and-reorder",
  createProviderClass(MoveStoryboardNodeAndReorder)
);
