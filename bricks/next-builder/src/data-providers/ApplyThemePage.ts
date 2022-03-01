import { createProviderClass, pipes } from "@next-core/brick-utils";
import {
  InstanceApi_getDetail,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import { getBaseGraphParams } from "../shared/storyboard/getBaseGraphParams";
import { appendBricksFactory } from "./utils/appendBricksFactory";
import { getBrickNodeAttrs } from "./utils/getBrickNodeAttrs";

export interface ApplyThemePageParams {
  projectId: string;
  appId: string;
  routeId: string;
  pageTypeId: string;
}

interface PartialProject {
  pageTemplates: {
    pageTypeId: string;
    snippet: {
      instanceId: string;
    }[];
  }[];
}

export async function ApplyThemePage({
  projectId,
  appId,
  routeId,
  pageTypeId,
}: ApplyThemePageParams): Promise<unknown> {
  const [projectDetail, brickAttrs] = await Promise.all([
    InstanceApi_getDetail("PROJECT_MICRO_APP", projectId, {
      fields:
        "pageTemplates.pageTypeId,pageTemplates.snippet.instanceId,pageTemplates.type",
    }) as Promise<PartialProject>,
    getBrickNodeAttrs(),
  ]);

  const themePageId = projectDetail.pageTemplates.find(
    (layout) => layout.pageTypeId === pageTypeId
  ).snippet[0].instanceId;

  const snippetsGraph = await InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams({
      projectId,
      objectId: "STORYBOARD_SNIPPET",
      extraQuery: {
        instanceId: themePageId,
      },
    })
  );
  const snippet = pipes.graphTree(snippetsGraph as pipes.GraphData, {
    sort: {
      key: "sort",
      order: 1,
    },
  })[0];

  const appendBricks = appendBricksFactory(appId, brickAttrs);
  await appendBricks(snippet.children, routeId);

  return {
    projectId,
    appId,
    routeId,
  };
}

customElements.define(
  "next-builder.provider-apply-theme-page",
  createProviderClass(ApplyThemePage)
);
