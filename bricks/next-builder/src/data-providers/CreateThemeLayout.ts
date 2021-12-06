import { I18nData } from "@next-core/brick-types";
import { createProviderClass } from "@next-core/brick-utils";
import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";

export interface CreateThemeLayoutParams {
  // Project instance ID.
  projectId: string;
  appId: string;
  layoutId: string;
  name: I18nData;
}

export async function CreateThemeLayout({
  projectId,
  appId,
  layoutId,
  name,
}: CreateThemeLayoutParams): Promise<unknown> {
  const templateId = `tpl-layout-${layoutId}`;
  // Currently, There is a bug when creating multiple instances of
  // sub-models which have the same parent which has an auto-increment field.
  // So we create the template and snippet in sequence.
  const tpl = await InstanceApi_createInstance("STORYBOARD_TEMPLATE", {
    project: projectId,
    appId,
    templateId: templateId,
    type: "custom-template",
  });
  const snippet = await InstanceApi_createInstance("STORYBOARD_SNIPPET", {
    project: projectId,
    appId,
    snippetId: `layout-${layoutId}`,
    type: "snippet",
    text: name,
    layerType: "layout",
  });
  const [, layout] = await Promise.all([
    InstanceApi_createInstance("STORYBOARD_BRICK", {
      appId,
      brick: templateId,
      type: "brick",
      mountPoint: "bricks",
      parent: snippet.instanceId,
    }),
    InstanceApi_createInstance("STORYBOARD_THEME_LAYOUT", {
      project: projectId,
      layoutId,
      name,
      customTemplate: tpl.instanceId,
      snippet: snippet.instanceId,
    }),
  ]);
  return layout;
}

customElements.define(
  "next-builder.provider-create-theme-layout",
  createProviderClass(CreateThemeLayout)
);
