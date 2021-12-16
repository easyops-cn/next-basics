import { buildStoryboardV2 } from "./buildStoryboardV2";
import {
  StoryboardAssemblyParams,
  StoryboardAssemblyResult,
} from "./interfaces";
import { preStoryboardAssembly } from "./preStoryboardAssembly";

/**
 * Assemble a full storyboard.
 */
export async function StoryboardAssembly({
  projectId,
  storyboardType,
  options,
}: StoryboardAssemblyParams): Promise<StoryboardAssemblyResult> {
  const { minimalBuildInfo, projectInfo } = await preStoryboardAssembly({
    projectId,
    storyboardType,
  });

  return {
    projectId: projectInfo.projectId,
    storyboard: buildStoryboardV2({
      ...minimalBuildInfo,
      menus: projectInfo.menus,
      i18n: projectInfo.i18n,
      functions: projectInfo.functions,
      dependsAll: projectInfo.dependsAll,
      options: {
        keepIds: options?.keepIds,
      },
    }),
  };
}
