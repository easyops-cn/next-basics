import { buildStoryboardV2 } from "./buildStoryboardV2";
import {
  StoryboardAssemblyParams,
  StoryboardAssemblyResult,
  WorkflowField,
  UserGroup,
} from "./interfaces";
import {
  preStoryboardAssembly,
  workflowFields,
  userGroupFields,
} from "./preStoryboardAssembly";
import { simpleHash } from "../../data-providers/utils/simpleHash";
import { removeDeadConditions } from "@next-core/brick-utils";
import { RuntimeStoryboard } from "@next-core/brick-types";
import { pick } from "lodash";

/**
 * Assemble a full storyboard.
 */
export async function StoryboardAssembly({
  projectId,
  storyboardType,
  useTheme,
  keepDeadConditions,
  options,
  ignoreContract,
}: StoryboardAssemblyParams): Promise<StoryboardAssemblyResult> {
  const { minimalBuildInfo, projectInfo } = await preStoryboardAssembly({
    projectId,
    storyboardType,
    useTheme,
  });

  const storyboard = await buildStoryboardV2({
    ...minimalBuildInfo,
    menus: projectInfo.menus,
    i18n: projectInfo.i18n,
    functions: projectInfo.functions,
    workflows: projectInfo.workflows?.map((item: WorkflowField) =>
      pick(item, workflowFields)
    ),
    userGroups: projectInfo.userGroups?.map((item: UserGroup[]) =>
      pick(item, userGroupFields)
    ),
    mocks: projectInfo.mockRule && {
      mockId: simpleHash(`${projectId}.${new Date().getTime()}`),
      mockList: projectInfo.mockRule
        .filter((item: { isEnable: boolean }) => item.isEnable)
        ?.map((item: { url: string; provider: string }) => ({
          uri: item.url,
          provider: item.provider,
          method: item.method,
        })),
    },
    dependencies: projectInfo.dependencies,
    app: {
      id: projectInfo.appId,
      name: projectInfo.appSetting?.name,
      homepage: projectInfo.appSetting?.homepage,
    },
    dependsAll: projectInfo.dependsAll,
    options: {
      keepIds: options?.keepIds,
    },
    ignoreContract,
  });

  if (!keepDeadConditions) {
    removeDeadConditions(storyboard as unknown as RuntimeStoryboard);
    delete (storyboard as unknown as RuntimeStoryboard).$$deadConditionsRemoved;
  }

  return {
    projectId: projectInfo.projectId,
    storyboard,
  };
}
