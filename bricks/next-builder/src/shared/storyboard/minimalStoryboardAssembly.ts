import { buildStoryboardV2 } from "./buildStoryboardV2";
import { StoryboardAssemblyParams, StoryboardToBuild } from "./interfaces";
import { preStoryboardAssembly } from "./preStoryboardAssembly";

/**
 * Assemble a minimal storyboard, in which menus and i18n is ignored.
 */
export async function minimalStoryboardAssembly({
  appId,
  projectId,
  options,
}: StoryboardAssemblyParams): Promise<StoryboardToBuild> {
  return buildStoryboardV2({
    ...(
      await preStoryboardAssembly({
        appId,
        projectId,
        options: { minimal: true },
      })
    ).minimalBuildInfo,
    options,
  });
}
