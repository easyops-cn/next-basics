import { BuilderRouteNode, BuilderSnippetNode } from "@next-core/brick-types";
import { pipes } from "@next-core/brick-utils";
import {
  InstanceApi_getDetail,
  InstanceGraphApi_traverseGraphV2,
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
  useTheme,
  options,
}: PreStoryboardAssemblyParams): Promise<PreStoryboardAssemblyResult> {
  const isTheme = storyboardType === "theme-template";
  const hasTheme = isTheme || useTheme;

  const routeGraphReq = isTheme
    ? null
    : InstanceGraphApi_traverseGraphV2(
        getBaseGraphParams({
          projectId,
          objectId: MODEL_STORYBOARD_ROUTE,
          extraQuery: {
            // Find first-level routes as topic vertices.
            parent: {
              $exists: false,
            },
          },
        })
      );

  const themeGraphReq = hasTheme
    ? InstanceGraphApi_traverseGraphV2(
        getBaseGraphParams({
          projectId,
          objectId: MODEL_STORYBOARD_SNIPPET,
          extraQuery: {
            themePage: {
              $exists: true,
            },
          },
        })
      )
    : null;

  const templateGraphReq = InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams({
      projectId,
      objectId: MODEL_STORYBOARD_TEMPLATE,
    })
  );

  const projectInfoReq = options?.minimal
    ? null
    : InstanceApi_getDetail(MODEL_PROJECT_MICRO_APP, projectId, {
        fields: [
          "*",
          "i18n.*",
          "functions.name",
          "functions.source",
          "functions.typescript",
          "mockRule.url",
          "mockRule.isEnable",
          "mockRule.provider",
          ...(hasTheme
            ? ["pageTemplates.pageTypeId", "pageTemplates.snippet.instanceId"]
            : ["menus.*", "menus.items", "menus.items.children"]),
        ].join(","),
      });

  const [
    routeGraphResponse,
    themeGraphResponse,
    templateGraphResponse,
    projectInfoResponse,
  ] = await Promise.all([
    routeGraphReq,
    themeGraphReq,
    templateGraphReq,
    projectInfoReq,
  ]);

  const routes = routeGraphResponse
    ? (pipes.graphTree(routeGraphResponse as pipes.GraphData, {
        sort: {
          key: "sort",
          order: 1,
        },
      }) as BuilderRouteNode[])
    : [];

  const themPreviewRoutes = hasTheme
    ? buildPreviewRoutesForTheme(
        projectInfoResponse.appSetting.homepage,
        projectInfoResponse.pageTemplates,
        pipes.graphTree(
          themeGraphResponse as pipes.GraphData
        ) as BuilderSnippetNode[]
      )
    : [];

  return {
    minimalBuildInfo: {
      routeList: sortBy(routes, (item) => item.sort ?? -Infinity).concat(
        themPreviewRoutes
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
          state: template.state ? JSON.parse(template.state) : undefined,
        })),
    },

    projectInfo: projectInfoResponse,
  };
}
