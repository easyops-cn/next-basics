import {
  InstanceApi_mixUpdateInstance,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import { BackupBricks } from "./BackupBricks";
import { NodeDetail, UpdateBricksArrange } from "./UpdateBricksArrange";
import { createProviderClass, pipes } from "@next-core/brick-utils";
import { UpdateBricksToV3 } from "./UpdateBricksToV3";

export async function UpgradeBricks({
  appId,
  rootId,
  options,
}: {
  appId: string;
  rootId: string;
  options?: {
    arrange: boolean;
    toV3: boolean;
  };
}): Promise<boolean> {
  const result = await BackupBricks({
    appId,
    rootId,
  });

  if (result) {
    const { rootNode, newWrapperBrick } = result;

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
        id: newWrapperBrick.id,
      },
      select_fields: ["*"],
    });

    if (options.arrange) {
      const list = await UpdateBricksArrange(
        rootNode as NodeDetail,
        graphData as pipes.GraphData,
        {
          updateProxy: true,
          updateUseResolves: true,
          updateUseBrickTransform: true,
          updateChildContext: true,
        }
      );

      list.length &&
        (await InstanceApi_mixUpdateInstance({
          data: list,
        }));
    }

    if (options.toV3) {
      const list = await UpdateBricksToV3(graphData as pipes.GraphData);

      list.length &&
        (await InstanceApi_mixUpdateInstance({
          data: list,
        }));
    }

    return true;
  }

  return false;
}

customElements.define(
  "next-builder.provider-upgrade-bricks",
  createProviderClass(UpgradeBricks)
);
