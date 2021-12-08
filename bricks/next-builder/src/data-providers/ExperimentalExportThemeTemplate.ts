// istanbul ignore file
// !!! WARNING !!!
// This is for experimental only and will be implemented at backend.
import { createProviderClass } from "@next-core/brick-utils";
import {
  InstanceApi_createInstance,
  InstanceApi_postSearchV3,
  InstanceApi_updateInstance,
} from "@next-sdk/cmdb-sdk";
import { BuildProjectOfThemeTemplate } from "./BuildProjectOfThemeTemplate";

const MODEL_INSTALLED_THEME_TEMPLATE = "INSTALLED_THEME_TEMPLATE@EASYOPS";

export interface ExperimentalExportThemeTemplateParams {
  projectId: string;
}

export async function ExperimentalExportThemeTemplate({
  projectId,
}: ExperimentalExportThemeTemplateParams): Promise<unknown> {
  const buildResult = await BuildProjectOfThemeTemplate({ projectId });
  const { themeId, ...restBuildResult } = buildResult;

  // Find if there is existed theme template.
  const existedThemes = await InstanceApi_postSearchV3(
    MODEL_INSTALLED_THEME_TEMPLATE,
    {
      query: {
        themeId: {
          $eq: themeId,
        },
      },
      fields: ["instanceId"],
      page_size: 1,
    }
  );

  if (existedThemes.list.length === 0) {
    // Create a new theme template.
    return InstanceApi_createInstance(
      MODEL_INSTALLED_THEME_TEMPLATE,
      buildResult
    );
  }

  // Update the existed theme template.
  return InstanceApi_updateInstance(
    MODEL_INSTALLED_THEME_TEMPLATE,
    existedThemes.list[0].instanceId,
    restBuildResult
  );
}

customElements.define(
  "next-builder.provider-experimental-export-theme-template",
  createProviderClass(ExperimentalExportThemeTemplate)
);
