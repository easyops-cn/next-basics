import { BuilderRouteNode, BuilderSnippetNode } from "@next-core/brick-types";
import { pipes } from "@next-core/brick-utils";
import {
  InstanceApi_getDetail,
  InstanceApi_GetDetailResponseBody,
  InstanceGraphApi_traverseGraphV2,
  InstanceGraphApi_TraverseGraphV2ResponseBody,
} from "@next-sdk/cmdb-sdk";
import { sortBy } from "lodash";
import { buildPreviewRoutesForTheme } from "./buildPreviewRoutesForTheme";
import { getBaseGraphParams } from "./getBaseGraphParams";
import {
  PreStoryboardAssemblyParams,
  PreStoryboardAssemblyResult,
} from "./interfaces";

const MODEL_STORYBOARD_ROUTE = "STORYBOARD_ROUTE";
const MODEL_STORYBOARD_TEMPLATE = "STORYBOARD_TEMPLATE";
const MODEL_STORYBOARD_SNIPPET = "STORYBOARD_SNIPPET";
const MODEL_PROJECT_MICRO_APP = "PROJECT_MICRO_APP";

/**
 * Do pre-requests before storyboard assembly.
 */
export async function preStoryboardAssembly({
  projectId,
  storyboardType,
  options,
}: PreStoryboardAssemblyParams): Promise<PreStoryboardAssemblyResult> {
  const isTheme = storyboardType === "theme-template";
  const routeOrSnippetGraphReq = InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams(
      isTheme
        ? {
            projectId,
            objectId: MODEL_STORYBOARD_SNIPPET,
            extraQuery: {
              themePage: {
                $exists: true,
              },
            },
          }
        : {
            projectId,
            objectId: MODEL_STORYBOARD_ROUTE,
            extraQuery: {
              // Find first-level routes as topic vertices.
              parent: {
                $exists: false,
              },
            },
          }
    )
  );

  const templateGraphReq = InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams({
      projectId,
      objectId: MODEL_STORYBOARD_TEMPLATE,
    })
  );

  const requests = [
    routeOrSnippetGraphReq,
    templateGraphReq,
  ] as Promise<unknown>[];

  if (!options?.minimal) {
    requests.push(
      InstanceApi_getDetail(MODEL_PROJECT_MICRO_APP, projectId, {
        fields: [
          "*",
          "i18n.*",
          "functions.name",
          "functions.source",
          "functions.typescript",
          ...(isTheme
            ? ["pageTemplates.pageTypeId", "pageTemplates.snippet.instanceId"]
            : ["menus.*", "menus.items", "menus.items.children"]),
        ].join(","),
      })
    );
  }

  const [
    routeOrSnippetGraphResponse,
    templateGraphResponse,
    projectInfoResponse,
  ] = await Promise.all<
    InstanceGraphApi_TraverseGraphV2ResponseBody,
    InstanceGraphApi_TraverseGraphV2ResponseBody,
    InstanceApi_GetDetailResponseBody
  >(requests as any);

  const routeOrSnippetTree = pipes.graphTree(
    routeOrSnippetGraphResponse as pipes.GraphData,
    {
      sort: {
        key: "sort",
        order: 1,
      },
    }
  );

  const routes: BuilderRouteNode[] = isTheme
    ? buildPreviewRoutesForTheme(
        projectInfoResponse.appSetting.homepage,
        projectInfoResponse.pageTemplates,
        routeOrSnippetTree as BuilderSnippetNode[]
      )
    : (routeOrSnippetTree as BuilderRouteNode[]);

  return {
    minimalBuildInfo: {
      routeList: sortBy(routes, (item) => item.sort ?? -Infinity),
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
