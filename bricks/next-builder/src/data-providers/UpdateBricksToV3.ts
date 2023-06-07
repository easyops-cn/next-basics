import { InstanceApi_mixUpdateInstance } from "@next-sdk/cmdb-sdk";
import { BackupBricks } from "./BackupBricks";
import { NodeDetail, UpdateRouteOrTemplate } from "./UpdateBricks";
import { createProviderClass } from "@next-core/brick-utils";

export async function UpdateBrickToV3({
  appId,
  rootId,
}: {
  appId: string;
  rootId: string;
}): Promise<boolean> {
  const result = await BackupBricks({
    appId,
    rootId,
  });

  if (result) {
    const { rootNode, newWrapperBrick } = result;

    const list = await UpdateRouteOrTemplate(
      rootNode as NodeDetail,
      newWrapperBrick.id,
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

    return true;
  }

  return false;
}

customElements.define(
  "next-builder.provider-update-brick-to-v3",
  createProviderClass(UpdateBrickToV3)
);
