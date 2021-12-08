import { BuilderRouteNode } from "@next-core/brick-types";
import { pipes } from "@next-core/brick-utils";
import {
  InstanceApi_getDetail,
  InstanceApi_GetDetailResponseBody,
  InstanceGraphApi_traverseGraphV2,
  InstanceGraphApi_TraverseGraphV2ResponseBody,
} from "@next-sdk/cmdb-sdk";
import { sortBy } from "lodash";
import { getBaseGraphParams } from "./getBaseGraphParams";
import {
  PreStoryboardAssemblyParams,
  PreStoryboardAssemblyResult,
} from "./interfaces";

const MODEL_STORYBOARD_ROUTE = "STORYBOARD_ROUTE";
const MODEL_STORYBOARD_TEMPLATE = "STORYBOARD_TEMPLATE";
const MODEL_PROJECT_MICRO_APP = "PROJECT_MICRO_APP";

/**
 * Do pre-requests before storyboard assembly.
 */
export async function preStoryboardAssembly({
  projectId,
  options,
}: PreStoryboardAssemblyParams): Promise<PreStoryboardAssemblyResult> {
  const routeGraphParams = getBaseGraphParams({
    projectId,
    objectId: MODEL_STORYBOARD_ROUTE,
  });

  const routeGraphReq = InstanceGraphApi_traverseGraphV2({
    ...routeGraphParams,
    object_id: MODEL_STORYBOARD_ROUTE,
    query: {
      ...routeGraphParams.query,
      // Find first-level routes as topic vertices.
      parent: {
        $exists: false,
      },
    },
  });

  const templateGraphReq = InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams({
      projectId,
      objectId: MODEL_STORYBOARD_TEMPLATE,
    })
  );

  const requests = [routeGraphReq, templateGraphReq] as Promise<unknown>[];

  if (!options?.minimal) {
    requests.push(
      InstanceApi_getDetail(MODEL_PROJECT_MICRO_APP, projectId, {
        fields:
          "*,menus.*,menus.items,menus.items.children,i18n.*,functions.name,functions.source,functions.typescript",
      })
    );
  }

  const [routeGraphResponse, templateGraphResponse, projectInfoResponse] =
    await Promise.all<
      InstanceGraphApi_TraverseGraphV2ResponseBody,
      InstanceGraphApi_TraverseGraphV2ResponseBody,
      InstanceApi_GetDetailResponseBody
    >(requests as any);

  return {
    minimalBuildInfo: {
      routeList: sortBy(
        pipes.graphTree(routeGraphResponse as pipes.GraphData, {
          sort: {
            key: "sort",
            order: 1,
          },
        }) as BuilderRouteNode[],
        (item) => item.sort ?? -Infinity
      ),
      // Warn: `pipes.graphTree()` will mutate the input.
      templateList: pipes
        .graphTree(templateGraphResponse as pipes.GraphData, {
          sort: {
            key: "sort",
            order: 1,
          },
        })
        .map((template) => ({
          id: template.id,
          templateId: template.templateId,
          children: template.children,
          proxy: template.proxy ? JSON.parse(template.proxy) : undefined,
        })),
    },

    projectInfo: projectInfoResponse,
  };
}
