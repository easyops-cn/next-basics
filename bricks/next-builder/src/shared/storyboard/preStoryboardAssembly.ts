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

export const MODEL_STORYBOARD_ROUTE = "STORYBOARD_ROUTE";
export const MODEL_STORYBOARD_TEMPLATE = "STORYBOARD_TEMPLATE";
export const MODEL_STORYBOARD_SNIPPET = "STORYBOARD_SNIPPET";
export const MODEL_PROJECT_MICRO_APP = "PROJECT_MICRO_APP";
export const MODEL_MICRO_APP_RESOURCE_MENU = "MICRO_APP_RESOURCE_MENU";

export const workflowFields = [
  "id",
  "name",
  "appId",
  "description",
  "workflowYaml",
  "triggerMethod",
  "dataChangedConfig",
  "schedulerConfig",
  "variables",
];

export const userGroupFields = ["name", "description"];

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

  const menuGraphReq = hasTheme
    ? null
    : InstanceGraphApi_traverseGraphV2({
        object_id: MODEL_MICRO_APP_RESOURCE_MENU,
        query: {
          "project.instanceId": projectId,
        },
        select_fields: ["*"],
        child: [
          {
            child: [
              {
                depth: -1,
                parentOut: "children",
                select_fields: ["*"],
              },
            ],
            depth: -1,
            parentOut: "items",
            select_fields: ["*"],
          },
        ],
      });

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
          "mockRule.method",
          ...(hasTheme
            ? ["pageTemplates.pageTypeId", "pageTemplates.snippet.instanceId"]
            : []),
          ...workflowFields.map((field) => `workflows.${field}`),
          ...userGroupFields.map((field) => `userGroups.${field}`),
        ].join(","),
      });

  const [
    routeGraphResponse,
    themeGraphResponse,
    templateGraphResponse,
    menuGraphResponse,
    projectInfoResponse,
  ] = await Promise.all([
    routeGraphReq,
    themeGraphReq,
    templateGraphReq,
    menuGraphReq,
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
        pipes.graphTree(themeGraphResponse as pipes.GraphData, {
          sort: {
            key: "sort",
            order: 1,
          },
        }) as BuilderSnippetNode[]
      )
    : [];

  const menus = hasTheme
    ? undefined
    : pipes.graphTree(menuGraphResponse as pipes.GraphData);

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

    projectInfo: { ...projectInfoResponse, menus },
  };
}
