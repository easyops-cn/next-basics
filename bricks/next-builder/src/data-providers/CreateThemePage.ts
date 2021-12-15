import { createProviderClass } from "@next-core/brick-utils";
import { InstanceApi_createInstance } from "@next-sdk/cmdb-sdk";

export interface CreateThemePageParams {
  // Project instance ID.
  projectId: string;
  appId: string;
  pageTypeId: string;
  name: string;
  thumbnail?: string;
  locales?: unknown;
}

export async function CreateThemePage({
  projectId,
  appId,
  pageTypeId,
  name,
  thumbnail,
  locales,
}: CreateThemePageParams): Promise<unknown> {
  const templateId = `tpl-page-${pageTypeId}`;
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
    snippetId: `page-${pageTypeId}`,
    type: "snippet",
    text: {
      en: name,
      zh: name,
    },
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
    InstanceApi_createInstance("STORYBOARD_THEME_PAGE", {
      project: projectId,
      pageTypeId,
      name,
      thumbnail,
      locales,
      template: tpl.instanceId,
      snippet: snippet.instanceId,
    }),
  ]);
  return layout;
}

customElements.define(
  "next-builder.provider-create-theme-page",
  createProviderClass(CreateThemePage)
);
