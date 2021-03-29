import { buildStoryboard } from "./buildStoryboard";
import { StoryboardAssemblyResult } from "./interfaces";
import { preStoryboardAssembly } from "./preStoryboardAssembly";

export interface StoryboardAssemblyParams {
  // The human-readable id of an app.
  appId: string;

  // The instanceId of a project.
  projectId: string;

  options?: StoryboardAssemblyOptions;
}

export interface StoryboardAssemblyOptions {
  /**
   * When `keepIds` is true, keep node ids as `Symbol.for("nodeId")`,
   * and node instance ids as `Symbol.for("nodeInstanceId")` in result.
   *
   * This is useful to let developers do something with node id
   * after found specific nodes in an assembled storyboard.
   */
  keepIds?: boolean;
}

/**
 * Assemble a full storyboard.
 */
export async function StoryboardAssembly({
  appId,
  projectId,
  options,
}: StoryboardAssemblyParams): Promise<StoryboardAssemblyResult> {
  const { minimalBuildInfo, projectInfo } = await preStoryboardAssembly({
    appId,
    projectId,
  });

  return {
    projectId: projectInfo.projectId,
    storyboard: buildStoryboard({
      ...minimalBuildInfo,
      menus: projectInfo.menus,
      i18n: projectInfo.i18n,
      dependsAll: projectInfo.dependsAll,
      options: {
        keepIds: options?.keepIds,
      },
    }),
  };
}
