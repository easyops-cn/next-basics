import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";
import { pick } from "lodash";

export interface TreeNode {
  children?: TreeNode[];
  [key: string]: unknown;
}

export function appendBricksFactory(appId: string, brickAttrs: string[]) {
  return async function appendBricks(
    children: TreeNode[],
    parentId: string
  ): Promise<void> {
    if (children?.length) {
      for (const child of children) {
        const childInstance = await InstanceApi_createInstance(
          "STORYBOARD_BRICK",
          {
            ...pick(child, brickAttrs),
            parent: parentId,
            appId,
          }
        );
        await appendBricks(child.children, childInstance.instanceId);
      }
    }
  };
}
