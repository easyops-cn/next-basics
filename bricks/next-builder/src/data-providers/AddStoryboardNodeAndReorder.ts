import { BuilderRouteOrBrickNode } from "@next-core/brick-types";
import { createProviderClass } from "@next-core/brick-utils";
import {
  NodeInstance,
  EventDetailOfNodeAddStored,
} from "@next-core/editor-bricks-helper";
import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";
import { StoryboardApi_sortStoryboardNodes } from "@next-sdk/next-builder-sdk";

const STORYBOARD_BRICK = "STORYBOARD_BRICK";

export interface AddStoryboardNodeAndReorderParams {
  nodeData: NodeInstance;
  nodeIds: string[];
  nodeUid: number;
  nodeAlias: string;
}

export async function AddStoryboardNodeAndReorder({
  nodeData,
  nodeIds,
  nodeUid,
  nodeAlias,
}: AddStoryboardNodeAndReorderParams): Promise<EventDetailOfNodeAddStored> {
  const stored = await InstanceApi_createInstance(STORYBOARD_BRICK, nodeData);

  if (nodeIds.length > 0) {
    // `nodeIds` are sorted, and there is a placeholder of `null` which
    // represents the newly added node. Replace it with the stored id.
    const newNodeIds = nodeIds.map((id) => (id === null ? stored.id : id));
    await StoryboardApi_sortStoryboardNodes({
      nodeIds: newNodeIds,
    });
  }

  return {
    nodeData: stored as BuilderRouteOrBrickNode,
    nodeUid,
    nodeAlias,
  };
}

customElements.define(
  "next-builder.provider-add-storyboard-node-and-reorder",
  createProviderClass(AddStoryboardNodeAndReorder)
);
