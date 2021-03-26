import { BuilderBrickNode, BuilderRouteNode } from "@next-core/brick-types";
import { pipes } from "@next-core/brick-utils";
import { InstanceApi, InstanceGraphApi } from "@next-sdk/cmdb-sdk";
import {
  PreStoryboardAssemblyParams,
  PreStoryboardAssemblyResult,
} from "./interfaces";

const MODEL_STORYBOARD_ROUTE = "STORYBOARD_ROUTE";
const MODEL_STORYBOARD_BRICK = "STORYBOARD_BRICK";
const MODEL_STORYBOARD_TEMPLATE = "STORYBOARD_TEMPLATE";
const MODEL_PROJECT_MICRO_APP = "PROJECT_MICRO_APP";

/**
 * Do pre-requests before storyboard assembly.
 */
export async function preStoryboardAssembly({
  appId,
  projectId,
  options,
}: PreStoryboardAssemblyParams): Promise<PreStoryboardAssemblyResult> {
  const routeListReq = InstanceApi.postSearch(MODEL_STORYBOARD_ROUTE, {
    fields: {
      "*": 1,
      parent: 1,
    },
    page: 1,
    page_size: 3000,
    query: {
      appId,
    },
    sort: {
      sort: 1,
    },
  });

  const brickListReq = InstanceApi.postSearch(MODEL_STORYBOARD_BRICK, {
    fields: {
      "*": 1,
      parent: 1,
    },
    page: 1,
    page_size: 3000,
    query: {
      appId,
    },
    sort: {
      sort: 1,
    },
  });

  const templateGraphReq = InstanceGraphApi.traverseGraphV2({
    object_id: MODEL_STORYBOARD_TEMPLATE,
    query: {
      "project.instanceId": projectId,
    },
    select_fields: ["*", "parent"],
    child: [
      {
        child: [
          {
            depth: -1,
            parentOut: "children",
            select_fields: ["*", "parent"],
          },
        ],
        depth: -1,
        parentOut: "children",
        select_fields: ["*", "parent"],
      },
    ],
  });

  const requests = [
    routeListReq,
    brickListReq,
    templateGraphReq,
  ] as Promise<unknown>[];

  if (!options?.minimal) {
    requests.push(
      InstanceApi.getDetail(MODEL_PROJECT_MICRO_APP, projectId, {
        fields: "*,menus.*,menus.items,menus.items.children,i18n.*",
      })
    );
  }

  const [
    routeListResponse,
    brickListResponse,
    templateGraphResponse,
    projectInfoResponse,
  ] = await Promise.all<
    InstanceApi.PostSearchResponseBody,
    InstanceApi.PostSearchResponseBody,
    InstanceGraphApi.TraverseGraphV2ResponseBody,
    InstanceApi.GetDetailResponseBody
  >(requests as any);

  return {
    minimalBuildInfo: {
      routeList: routeListResponse.list as BuilderRouteNode[],
      brickList: brickListResponse.list as BuilderBrickNode[],
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
          proxy: pipes.yaml(template.proxy),
        })),
    },
    projectInfo: projectInfoResponse,
  };
}
