import { BuilderRouteOrBrickNode } from "@next-core/brick-types";
import {
  EventDetailOfNodeAddStored,
  EventDetailOfSnippetApply,
  EventDetailOfSnippetApplyStored,
  SnippetNodeDetail,
} from "@next-core/editor-bricks-helper";
import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";
import { StoryboardApi_sortStoryboardNodes } from "@next-sdk/next-builder-sdk";
import { omit } from "lodash";

async function createNodes(
  nodeDetails: SnippetNodeDetail[],
  flattenNodeDetails: EventDetailOfNodeAddStored[],
  storedNodeIds?: string[]
): Promise<EventDetailOfNodeAddStored[]> {
  for (const nodeDetail of nodeDetails) {
    const id = await createNode(nodeDetail, flattenNodeDetails);
    storedNodeIds?.push(id);
  }
  return flattenNodeDetails;
}

async function createNode(
  nodeDetail: SnippetNodeDetail,
  flattenNodeDetails: EventDetailOfNodeAddStored[]
): Promise<string> {
  const instanceData = (await InstanceApi_createInstance(
    "STORYBOARD_BRICK",
    omit(nodeDetail.nodeData, ["children"])
  )) as BuilderRouteOrBrickNode;

  flattenNodeDetails.push({
    nodeUid: nodeDetail.nodeUid,
    nodeData: instanceData,
  });

  if (nodeDetail.children) {
    await createNodes(
      nodeDetail.children.map((child) => ({
        ...child,
        nodeData: {
          ...child.nodeData,
          parent: instanceData.instanceId,
        },
      })),
      flattenNodeDetails
    );
  }

  return instanceData.id;
}

export async function ApplyStoryBoardSnippet({
  nodeDetails,
  nodeIds,
}: EventDetailOfSnippetApply): Promise<EventDetailOfSnippetApplyStored> {
  const result: EventDetailOfSnippetApplyStored = {
    flattenNodeDetails: [],
  };
  // Remember the first-level stored node ids,
  // These need to be sorted with their siblings.
  const storedNodeIds: string[] = [];

  await createNodes(nodeDetails, result.flattenNodeDetails, storedNodeIds);

  // `nodeIds` are sorted, and there are placeholders of `null` which
  // represents the newly added nodes. Replace them with the stored ids.
  if (nodeIds.length > 0) {
    const newNodeIds = nodeIds.map((id) =>
      id === null ? storedNodeIds.shift() : id
    );
    await StoryboardApi_sortStoryboardNodes({
      nodeIds: newNodeIds,
    });
  }

  return result;
}
