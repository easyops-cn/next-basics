import { buildStoryboardV2 } from "./buildStoryboardV2";
import {
  StoryboardAssemblyParams,
  StoryboardAssemblyResult,
} from "./interfaces";
import { safeLoad, JSON_SCHEMA } from "js-yaml";
import { get } from "lodash";
import { preStoryboardAssembly } from "./preStoryboardAssembly";
import { simpleHash } from "../../data-providers/utils/simpleHash";
import {
  ScanBricksAndTemplates,
  DependContract,
  DependContractOfApi,
} from "../../data-providers/ScanBricksAndTemplates";

/**
 * Assemble a full storyboard.
 */
export async function StoryboardAssembly({
  projectId,
  storyboardType,
  useTheme,
  options,
}: StoryboardAssemblyParams): Promise<StoryboardAssemblyResult> {
  const { minimalBuildInfo, projectInfo } = await preStoryboardAssembly({
    projectId,
    storyboardType,
    useTheme,
  });

  const { contractData: contractStr } = ScanBricksAndTemplates({
    storyboard: projectInfo.storyboardJson
      ? JSON.parse(projectInfo.storyboardJson)
      : {},
    version: "workspace",
    dependencies: projectInfo.dependencies,
  });

  const deps: DependContract[] = get(
    safeLoad(contractStr, { schema: JSON_SCHEMA, json: true }),
    "contracts[0].deps"
  );

  return {
    projectId: projectInfo.projectId,
    storyboard: buildStoryboardV2({
      ...minimalBuildInfo,
      menus: projectInfo.menus,
      i18n: projectInfo.i18n,
      functions: projectInfo.functions,
      mocks: projectInfo.mockRule && {
        mockId: simpleHash(`${projectId}.${new Date().getTime()}`),
        mockList: projectInfo.mockRule
          .filter((item: { isEnable: boolean }) => item.isEnable)
          ?.map((item: { url: string; provider: string }) => ({
            uri: item.url,
            provider: item.provider,
          })),
      },
      contracts: deps?.filter(
        (item) => item.type === "contract"
      ) as DependContractOfApi[],
      dependsAll: projectInfo.dependsAll,
      options: {
        keepIds: options?.keepIds,
      },
    }),
  };
}
