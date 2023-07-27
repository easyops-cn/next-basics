import { createProviderClass } from "@next-core/brick-utils";
import {
  InstanceApi_createInstance,
  InstanceApi_mixUpdateInstance,
  InstanceGraphApi_TraverseGraphV2ResponseBody,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import { StoryboardApi_cloneBricks } from "@next-sdk/next-builder-sdk";

function findRootBricks(
  graphData: InstanceGraphApi_TraverseGraphV2ResponseBody
): Record<string, any>[] {
  const { topic_vertices, vertices, edges } = graphData;

  const rootInstanceId = topic_vertices[0].instanceId;
  const rootNodes = edges
    .filter((node) => node.out === rootInstanceId)
    .map((item) => item.in);

  return vertices.filter((node) => rootNodes.includes(node.instanceId));
}

export async function BackupBricks({
  appId,
  rootId,
}: {
  appId: string;
  rootId: string;
}): Promise<
  | {
      rootNode: Record<string, any>;
      newWrapperBrick: Record<string, any>;
    }
  | false
> {
  const graphData = await InstanceGraphApi_traverseGraphV2({
    child: [
      {
        depth: -1,
        parentOut: "children",
        select_fields: ["*"],
      },
    ],
    object_id: "STORYBOARD_NODE",
    query: {
      id: rootId,
    },
    select_fields: ["*"],
  });
  if (!graphData.vertices.length) return false;
  const rootBricks = findRootBricks(graphData);
  const v3BrickWrapper = rootBricks.find((instance) => instance.alias === "v3");
  if (rootBricks.find((instance) => instance.alias === "v3")) {
    return {
      rootNode: graphData.topic_vertices[0],
      newWrapperBrick: v3BrickWrapper,
    };
  }

  const backupWrapperBrick = await InstanceApi_createInstance(
    "STORYBOARD_BRICK",
    {
      brick: ":if",
      alias: "v2",
      mountPoint: "bricks",
      parent: graphData.topic_vertices[0].instanceId,
      dataSource: "false",
      type: "brick",
      if: "false",
    }
  );

  const newWrapperBrick = await InstanceApi_createInstance("STORYBOARD_BRICK", {
    brick: ":if",
    alias: "v3",
    mountPoint: "bricks",
    parent: graphData.topic_vertices[0].instanceId,
    dataSource: "true",
    type: "brick",
  });

  // move the old instance to backupBricks
  await InstanceApi_mixUpdateInstance({
    data: rootBricks.map((instance) => ({
      parent: backupWrapperBrick.instanceId,
      _object_id: instance._object_id,
      instanceId: instance.instanceId,
      mountPoint: "",
    })),
  });

  await StoryboardApi_cloneBricks({
    sourceBrickId: backupWrapperBrick.id,
    newParentBrickId: newWrapperBrick.id,
    newAppId: appId,
    exclude: true,
  });

  return {
    rootNode: graphData.topic_vertices[0],
    newWrapperBrick,
  };
}

customElements.define(
  "next-builder.provider-backup-bricks",
  createProviderClass(BackupBricks)
);
