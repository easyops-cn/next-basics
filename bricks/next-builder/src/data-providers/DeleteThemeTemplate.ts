import { createProviderClass } from "@next-core/brick-utils";
import { InstanceApi_deleteInstance } from "@next-sdk/cmdb-sdk";
import { StoryboardApi_deleteStoryboardNode } from "@next-sdk/next-builder-sdk";

export interface DeleteThemeTemplateParams {
  layoutInstanceId: string;
  templateId?: string;
  snippetId?: string;
}

export async function DeleteThemeTemplate({
  layoutInstanceId,
  templateId,
  snippetId,
}: DeleteThemeTemplateParams): Promise<unknown> {
  // Delete its associated template and snippet first.
  await Promise.all(
    [
      templateId && StoryboardApi_deleteStoryboardNode(templateId),
      snippetId && StoryboardApi_deleteStoryboardNode(snippetId),
    ].filter(Boolean)
  );
  return InstanceApi_deleteInstance(
    "STORYBOARD_THEME_LAYOUT",
    layoutInstanceId,
    {}
  );
}

customElements.define(
  "next-builder.provider-delete-theme-template",
  createProviderClass(DeleteThemeTemplate)
);
