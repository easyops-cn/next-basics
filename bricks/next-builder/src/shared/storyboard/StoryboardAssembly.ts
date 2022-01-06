import { buildStoryboardV2 } from "./buildStoryboardV2";
import {
  StoryboardAssemblyParams,
  StoryboardAssemblyResult,
} from "./interfaces";
import { preStoryboardAssembly } from "./preStoryboardAssembly";
import { simpleHash } from "../../data-providers/utils/simpleHash";

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
          ?.map((item: { url: string }) => ({
            uri: item.url,
          })),
      },
      dependsAll: projectInfo.dependsAll,
      options: {
        keepIds: options?.keepIds,
      },
    }),
  };
}
