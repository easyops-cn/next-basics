import { createProviderClass, pipes } from "@next-core/brick-utils";
import {
  InstanceApi_updateInstanceV2,
  InstanceGraphApi_traverseGraphV2,
  InstanceRelationApi_append,
} from "@next-sdk/cmdb-sdk";
import { getBaseGraphParams } from "../shared/storyboard/getBaseGraphParams";
import { appendBricksFactory } from "./utils/appendBricksFactory";
import { getBrickNodeAttrs } from "./utils/getBrickNodeAttrs";

interface NodeInstance {
  instanceId: string;
}

export interface CreateRouteWithThemeParams {
  appId: string;
  projectId: string;
  routeId: string;
  routeInstanceId: string;
  themeProjectId: string;
  template: NodeInstance[];
  snippet: NodeInstance[];
}

const STORYBOARD_TEMPLATE = "STORYBOARD_TEMPLATE";

export async function CreateRouteWithTheme({
  appId,
  projectId,
  routeId,
  routeInstanceId,
  themeProjectId,
  template,
  snippet,
}: CreateRouteWithThemeParams): Promise<unknown> {
  await InstanceRelationApi_append(STORYBOARD_TEMPLATE, "project", {
    instance_ids: template.map((item) => item.instanceId),
    related_instance_ids: [projectId],
  });

  const brickAttrs = await getBrickNodeAttrs();

  const snippetsGraph = await InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams({
      projectId: themeProjectId,
      objectId: "STORYBOARD_SNIPPET",
      extraQuery: {
        instanceId: snippet[0].instanceId,
      },
    })
  );
  const snippetData = pipes.graphTree(snippetsGraph as pipes.GraphData, {
    sort: {
      key: "sort",
      order: 1,
    },
  })[0];

  if (snippetData?.context) {
    await InstanceApi_updateInstanceV2("STORYBOARD_ROUTE", routeInstanceId, {
      context: snippetData.context,
    });
  }

  const appendBricks = appendBricksFactory(appId, brickAttrs);
  await appendBricks(snippetData?.children, routeInstanceId);

  return {
    appId,
    projectId,
    routeId,
    routeInstanceId,
  };
}

customElements.define(
  "next-builder.provider-create-route-with-theme",
  createProviderClass(CreateRouteWithTheme)
);
