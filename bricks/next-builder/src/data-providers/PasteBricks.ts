import { createProviderClass, pipes } from "@next-core/brick-utils";
import { getBaseGraphParams } from "../shared/storyboard/getBaseGraphParams";
import { PlainObject } from "../search-tree/utils";
import {
  InstanceGraphApi_traverseGraphV2,
  InstanceRelationApi_append,
  InstanceRelationApi_set,
} from "@next-sdk/cmdb-sdk";
import { StoryboardApi_cloneBricks } from "@next-sdk/next-builder-sdk";

export interface PasteBricksParams {
  /** 源构件实例id */
  sourceBrickInstanceId: string;
  /** 源项目实例id */
  sourceProjectInstanceId: string;
  /** 新项目实例id */
  newProjectInstanceId: string;
  /** 源构件id */
  sourceBrickId?: string;
  /** 新关联实例id */
  newRelatedInstanceId?: string;
  /** 新的父构件id */
  newParentBrickId?: string;
  /** 新的应用id */
  newAppId?: string;
  /** 是否导入linked sourceBrick关联的template */
  linked?: boolean;
  /** 类型: cut/copy */
  type: "cut" | "copy";
}

const MODEL_STORYBOARD_BRICK = "STORYBOARD_BRICK";
const MODEL_STORYBOARD_TEMPLATE = "STORYBOARD_TEMPLATE";
const MODEL_STORYBOARD_NODE = "STORYBOARD_NODE";

function walkTree(
  data: PlainObject[] | PlainObject,
  callback: (node: PlainObject) => void
): void {
  if (Array.isArray(data)) {
    data.forEach((item) => {
      callback(item);
      item.children && walkTree(item.children, callback);
    });
  } else {
    callback(data);
    data.children && walkTree(data.children, callback);
  }
}

export async function PasteBricks({
  sourceBrickInstanceId,
  sourceProjectInstanceId,
  sourceBrickId,
  newRelatedInstanceId,
  newProjectInstanceId,
  newParentBrickId,
  newAppId,
  linked = true,
  type,
}: PasteBricksParams): Promise<boolean> {
  const isNeedLinkTemplate =
    linked && sourceProjectInstanceId !== newProjectInstanceId;
  const brickGraphReq = await InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams({
      objectId: MODEL_STORYBOARD_BRICK,
      extraQuery: {
        instanceId: sourceBrickInstanceId,
      },
    })
  );

  const brickTree = brickGraphReq
    ? pipes.graphTree(brickGraphReq as pipes.GraphData, {
        sort: {
          key: "sort",
          order: 1,
        },
      })
    : [];

  const templateMap = new Map<string, string>();
  const templateSet = new Set<string>();
  if (isNeedLinkTemplate) {
    walkTree(brickTree, (item) => {
      if ((item.brick as string).startsWith("tpl-")) {
        templateSet.add(item.brick);
      }
    });

    const templateList: string[] = [...templateSet];
    if (templateList.length) {
      const templateGraphRep = await InstanceGraphApi_traverseGraphV2(
        getBaseGraphParams({
          projectId: sourceProjectInstanceId,
          objectId: MODEL_STORYBOARD_TEMPLATE,
        })
      );

      const templateTree = templateGraphRep
        ? pipes.graphTree(templateGraphRep as pipes.GraphData, {
            sort: {
              key: "sort",
              order: 1,
            },
          })
        : [];

      const walkDeepTree = (templateId: string): void => {
        const tree = templateTree.find(
          (item) => item.templateId === templateId
        );
        if (!tree) {
          templateMap.delete(templateId);
          return;
        }
        templateMap.set(templateId, tree.instanceId);
        tree &&
          walkTree(tree, (item) => {
            const templateId: string = item.brick ?? "";
            if (templateId.startsWith("tpl-")) {
              !templateMap.has(templateId) && walkDeepTree(templateId);
            }
          });
      };

      templateList.forEach(walkDeepTree);
    }
  }

  if (type === "copy") {
    await StoryboardApi_cloneBricks({
      sourceBrickId,
      newParentBrickId,
      newAppId,
    });
  } else if (type === "cut") {
    await InstanceRelationApi_set(MODEL_STORYBOARD_NODE, "parent", {
      instance_ids: [sourceBrickInstanceId],
      related_instance_ids: [newRelatedInstanceId],
    });
  }

  if (templateMap.size) {
    await InstanceRelationApi_append(MODEL_STORYBOARD_TEMPLATE, "project", {
      instance_ids: [...templateMap.values()],
      related_instance_ids: [newProjectInstanceId],
    });
  }

  return true;
}

customElements.define(
  "next-builder.provider-paste-bricks",
  createProviderClass(PasteBricks)
);
