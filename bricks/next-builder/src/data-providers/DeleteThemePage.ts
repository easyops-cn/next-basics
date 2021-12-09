import { createProviderClass } from "@next-core/brick-utils";
import { InstanceApi_deleteInstance } from "@next-sdk/cmdb-sdk";
import { StoryboardApi_deleteStoryboardNode } from "@next-sdk/next-builder-sdk";

export interface DeleteThemePageParams {
  themePageId: string;
  templateId?: string;
  snippetId?: string;
}

export async function DeleteThemePage({
  themePageId,
  templateId,
  snippetId,
}: DeleteThemePageParams): Promise<unknown> {
  // Delete its associated template and snippet first.
  await Promise.all(
    [
      templateId && StoryboardApi_deleteStoryboardNode(templateId),
      snippetId && StoryboardApi_deleteStoryboardNode(snippetId),
    ].filter(Boolean)
  );
  return InstanceApi_deleteInstance("STORYBOARD_THEME_PAGE", themePageId, {});
}

customElements.define(
  "next-builder.provider-delete-theme-page",
  createProviderClass(DeleteThemePage)
);
