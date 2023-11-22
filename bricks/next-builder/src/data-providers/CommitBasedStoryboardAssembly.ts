import { createProviderClass } from "@next-core/brick-utils";
import { buildStoryboardV2 } from "../shared/storyboard/buildStoryboardV2";
import {
  StoryboardAssemblyParams,
  StoryboardAssemblyResult,
  WorkflowField,
  UserGroup,
} from "../shared/storyboard/interfaces";
import { simpleHash } from "./utils/simpleHash";
import {
  graphTree,
  processFlattenDataWithDiff,
  processGraphDataWithDiff,
} from "./utils/processDataWithDiff";
import { getBaseGraphParams } from "../shared/storyboard/getBaseGraphParams";
import { removeDeadConditions, pipes } from "@next-core/brick-utils";
import { BuilderRouteNode, RuntimeStoryboard } from "@next-core/brick-types";
import {
  InstanceApi_getDetail,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import { GitApi_CodeDiffResponseBody_diffs_item } from "@next-sdk/next-builder-sdk";
import { pick } from "lodash";
import {
  MODEL_STORYBOARD_ROUTE,
  MODEL_STORYBOARD_TEMPLATE,
  MODEL_STORYBOARD_SNIPPET,
  MODEL_PROJECT_MICRO_APP,
  MODEL_MICRO_APP_RESOURCE_MENU,
  workflowFields,
  userGroupFields,
} from "../shared/storyboard/preStoryboardAssembly";

export interface CommitBasedStoryboardAssemblyParams
  extends StoryboardAssemblyParams {
  diffs: GitApi_CodeDiffResponseBody_diffs_item[];
  selectedDiffs: string[];
}

export async function CommitBasedStoryboardAssembly({
  projectId,
  storyboardType,
  useTheme,
  keepDeadConditions,
  options,
  diffs,
  selectedDiffs,
}: CommitBasedStoryboardAssemblyParams): Promise<StoryboardAssemblyResult> {
  const selectedDiffSet = new Set(selectedDiffs);

  const routeGraphReq = InstanceGraphApi_traverseGraphV2(
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

  const templateGraphReq = InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams({
      projectId,
      objectId: MODEL_STORYBOARD_TEMPLATE,
    })
  );

  const menuGraphReq = InstanceGraphApi_traverseGraphV2({
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

  const projectInfoReq = InstanceApi_getDetail(
    MODEL_PROJECT_MICRO_APP,
    projectId,
    {
      fields: [
        "*",
        "i18n.*",
        "functions.name",
        "functions.source",
        "functions.typescript",
        "functions.uuid",
        "mockRule.url",
        "mockRule.isEnable",
        "mockRule.provider",
        "mockRule.method",
        ...workflowFields.concat("uuid").map((field) => `workflows.${field}`),
        ...userGroupFields.concat("uuid").map((field) => `userGroups.${field}`),
      ].join(","),
    }
  );

  const [
    routeGraphResponse,
    templateGraphResponse,
    menuGraphResponse,
    projectInfoResponse,
  ] = await Promise.all([
    routeGraphReq,
    templateGraphReq,
    menuGraphReq,
    projectInfoReq,
  ]);

  const routesDiffItem = diffs.find((v) => v.category === "routes");
  const processedRoutesGraphData = processGraphDataWithDiff(
    routeGraphResponse as pipes.GraphData,
    routesDiffItem,
    selectedDiffSet
  );
  const routes = graphTree(processedRoutesGraphData, {
    sort: [
      {
        key: "sort",
        order: 1,
      },
      {
        key: "ctime",
        order: 1,
      },
    ],
  }) as BuilderRouteNode[];

  const templatesDiffItem = diffs.find((v) => v.category === "templates");
  const processedTemplatesGraphData = processGraphDataWithDiff(
    templateGraphResponse as pipes.GraphData,
    templatesDiffItem,
    selectedDiffSet
  );
  const templates = graphTree(processedTemplatesGraphData, {
    sort: [
      {
        key: "sort",
        order: 1,
      },
      {
        key: "ctime",
        order: 1,
      },
    ],
  }).map((template) => ({
    id: template.id,
    templateId: template.templateId,
    children: template.children,
    proxy: template.proxy ? JSON.parse(template.proxy) : undefined,
    state: template.state ? JSON.parse(template.state) : undefined,
  }));

  const menusDiffItem = diffs.find((v) => v.category === "menus");
  const processedMenusGraphData = processGraphDataWithDiff(
    menuGraphResponse as pipes.GraphData,
    menusDiffItem,
    selectedDiffSet
  );
  const menus = graphTree(processedMenusGraphData);

  const {
    functions: functionsResponse,
    i18n: i18nResponse,
    workflows: workflowsResponse,
    userGroups: userGroupsResponse,
    ...basicProjectInfoResponse
  } = projectInfoResponse;

  const functionsDiffItem = diffs.find((v) => v.category === "functions");
  const functions = processFlattenDataWithDiff(
    functionsResponse,
    functionsDiffItem,
    selectedDiffSet
  );

  const i18nDiffItem = diffs.find((v) => v.category === "i18n");
  const i18n = processFlattenDataWithDiff(
    i18nResponse,
    i18nDiffItem,
    selectedDiffSet
  );

  const workflowsDiffItem = diffs.find((v) => v.category === "workflows");
  const workflows = processFlattenDataWithDiff(
    workflowsResponse,
    workflowsDiffItem,
    selectedDiffSet
  );

  const userGroupsDiffItem = diffs.find((v) => v.category === "user_group");
  const userGroups = processFlattenDataWithDiff(
    userGroupsResponse,
    userGroupsDiffItem,
    selectedDiffSet
  );

  const basicInfoDiffItem = diffs.find((v) => v.category === "basic_info");
  const basicProjectInfo = processFlattenDataWithDiff(
    [basicProjectInfoResponse],
    basicInfoDiffItem,
    selectedDiffSet
  )[0];

  const storyboard = await buildStoryboardV2({
    routeList: routes,
    templateList: templates,
    menus: menus,
    i18n: i18n as any,
    functions: functions as any,
    workflows: (workflows as any)?.map((item: WorkflowField) =>
      pick(item, workflowFields)
    ),
    userGroups: (userGroups as any)?.map((item: UserGroup[]) =>
      pick(item, userGroupFields)
    ),
    mocks: basicProjectInfoResponse.mockRule && {
      mockId: simpleHash(`${projectId}.${new Date().getTime()}`),
      mockList: basicProjectInfoResponse.mockRule
        .filter((item: { isEnable: boolean }) => item.isEnable)
        ?.map((item: { url: string; provider: string }) => ({
          uri: item.url,
          provider: item.provider,
          method: item.method,
        })),
    },
    dependencies: basicProjectInfo.dependencies,
    app: {
      id: basicProjectInfo.appId,
      name: basicProjectInfo.appSetting?.name,
      homepage: basicProjectInfo.appSetting?.homepage,
    },
    dependsAll: basicProjectInfo.dependsAll,
    options: {
      keepIds: options?.keepIds,
    },
  });

  if (!keepDeadConditions) {
    removeDeadConditions(storyboard as unknown as RuntimeStoryboard);
    delete (storyboard as unknown as RuntimeStoryboard).$$deadConditionsRemoved;
  }

  return {
    projectId: basicProjectInfoResponse.projectId,
    storyboard,
  };
}

customElements.define(
  "next-builder.provider-commit-based-storyboard-assembly",
  createProviderClass(CommitBasedStoryboardAssembly)
);
