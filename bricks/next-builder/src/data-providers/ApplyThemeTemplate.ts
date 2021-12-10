import { I18nData } from "@next-core/brick-types";
import { createProviderClass } from "@next-core/brick-utils";
import {
  InstanceApi_createInstance,
  InstanceApi_getDetail,
  InstanceApi_postSearchV3,
  InstanceApi_updateInstanceV2,
} from "@next-sdk/cmdb-sdk";
import { appendBricksFactory, TreeNode } from "./utils/appendBricksFactory";
import { getBrickNodeAttrs } from "./utils/getBrickNodeAttrs";

export interface ApplyThemeTemplateParams {
  projectId: string;
  appId: string;
  themeId: string;
}

interface ThemeData {
  pageTemplates: PageTemplateItem[];
  templates: CustomTemplate[];
  snippets: Snippet[];
  layoutType: unknown;
  dependencies: DependencyItem[];
}

interface PageTemplateItem {
  pageTypeId: string;
  name: I18nData;
  templateId: string;
  snippetId: string;
}

interface CustomTemplate {
  templateId: string;
  proxy?: string;
  layerType?: string;
  children?: TreeNode[];
}

interface Snippet {
  snippetId: string;
  text?: I18nData;
  layerType?: string;
  children?: TreeNode[];
}

interface PartialProject {
  appSetting?: Record<string, unknown>;
  dependencies?: DependencyItem[];
}

interface DependencyItem {
  name: string;
}

export async function ApplyThemeTemplate({
  projectId,
  appId,
  themeId,
}: ApplyThemeTemplateParams): Promise<unknown> {
  const [projectDetail, themes, brickAttrs] = await Promise.all([
    InstanceApi_getDetail("PROJECT_MICRO_APP", projectId, {
      fields: "appSetting,dependencies",
    }) as Promise<PartialProject>,
    InstanceApi_postSearchV3("INSTALLED_THEME_TEMPLATE@EASYOPS", {
      query: {
        themeId: {
          $eq: themeId,
        },
      },
      fields: [
        "pageTemplates",
        "templates",
        "snippets",
        "layoutType",
        "dependencies",
      ],
    }),
    getBrickNodeAttrs(),
  ]);

  const [{ pageTemplates, templates, snippets, layoutType, dependencies }] =
    themes.list as ThemeData[];

  const appendBricks = appendBricksFactory(appId, brickAttrs);

  // Currently, There is a bug when creating multiple instances of
  // sub-models which have the same parent which has an auto-increment field.
  // So we create the template and snippet in sequence.
  const templateMap = new Map<string, string>();
  for (const tpl of templates) {
    const instance = await InstanceApi_createInstance("STORYBOARD_TEMPLATE", {
      project: projectId,
      appId,
      templateId: tpl.templateId,
      type: "custom-template",
      proxy: tpl.proxy,
      layerType: tpl.layerType,
      isFromTheme: true,
    });
    templateMap.set(tpl.templateId, instance.instanceId);
    await appendBricks(tpl.children, instance.instanceId);
  }

  const snippetMap = new Map<string, string>();
  for (const snippet of snippets) {
    const instance = await InstanceApi_createInstance("STORYBOARD_SNIPPET", {
      project: projectId,
      appId,
      snippetId: snippet.snippetId,
      type: "snippet",
      text: snippet.text,
      layerType: snippet.layerType,
      isFromTheme: true,
    });
    snippetMap.set(snippet.snippetId, instance.instanceId);
    await appendBricks(snippet.children, instance.instanceId);
  }

  const instantiatedPages: string[] = [];
  for (const page of pageTemplates) {
    const instance = await InstanceApi_createInstance("STORYBOARD_THEME_PAGE", {
      project: projectId,
      pageTypeId: page.pageTypeId,
      name: page.name,
      template: templateMap.get(page.templateId),
      snippet: snippetMap.get(page.snippetId),
    });
    instantiatedPages.push(instance.instanceId);
  }

  await InstanceApi_updateInstanceV2("PROJECT_MICRO_APP", projectId, {
    pageTemplates: instantiatedPages,
    appSetting: {
      ...projectDetail.appSetting,
      layoutType,
    },
    dependencies: projectDetail.dependencies?.length
      ? [
          ...projectDetail.dependencies,
          // Currently ignore updating duplicated dependencies.
          // Todo(steve): choose the intersection version range for duplicated dependencies.
          ...dependencies.filter(
            (dep) =>
              !projectDetail.dependencies.some((d) => d.name === dep.name)
          ),
        ]
      : dependencies,
  });

  return {
    projectId,
    appId,
  };
}

customElements.define(
  "next-builder.provider-apply-theme-template",
  createProviderClass(ApplyThemeTemplate)
);
