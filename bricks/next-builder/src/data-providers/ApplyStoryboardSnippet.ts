import { createProviderClass } from "@next-core/brick-utils";
import { NodeInstance } from "@next-core/editor-bricks-helper";
import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";
import { omit } from "lodash";

export type NodeChildInstance = Omit<NodeInstanceWithChildren, "parent">;

export interface NodeInstanceWithChildren extends NodeInstance {
  appId?: string;
  children?: NodeChildInstance[];
}

export interface ApplyStoryBoardSnippetParams {
  nodeList: NodeInstanceWithChildren[];
}

export async function handleNodes(
  nodeList: NodeInstanceWithChildren[],
  dataList?: unknown[]
): Promise<void> {
  for (const node of nodeList) {
    await handleNode(node, dataList);
  }
}

export async function handleNode(
  node: NodeInstanceWithChildren,
  dataList: unknown[]
): Promise<void> {
  const instanedData = await InstanceApi_createInstance(
    "STORYBOARD_BRICK",
    omit(node, ["children"])
  );

  dataList.push({
    ...instanedData,
    children: [],
  });

  if (node.children) {
    await handleNodes(
      node.children.map((item) => ({
        ...item,
        parent: instanedData.instanceId,
      })),
      dataList[dataList.length - 1].children
    );
  }
}

export async function ApplyStoryBoardSnippet(
  params: ApplyStoryBoardSnippetParams
): Promise<unknown[]> {
  const { nodeList } = params;
  const dataList: unknown[] = [];
  await handleNodes(nodeList, dataList);

  return dataList;
}

customElements.define(
  "next-builder.provider-apply-storyboard-snippet",
  createProviderClass(ApplyStoryBoardSnippet)
);
