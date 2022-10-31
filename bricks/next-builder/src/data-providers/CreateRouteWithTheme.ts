import {
  collectBricksByCustomTemplates,
  createProviderClass,
  scanBricksInBrickConf,
} from "@next-core/brick-utils";
import {
  InstanceApi_createInstance,
  InstanceApi_getDetail,
  InstanceApi_updateInstanceV2,
} from "@next-sdk/cmdb-sdk";
import type { TemplateNode } from "../shared/storyboard/interfaces";
import {
  buildBricks,
  builderCustomTemplates,
} from "../shared/storyboard/buildStoryboardV2";
import {
  appendBricksFactory,
  type TreeNode,
} from "./utils/appendBricksFactory";
import { getBrickNodeAttrs } from "./utils/getBrickNodeAttrs";
import { BuilderBrickNode } from "@next-core/brick-types";

export interface CreateRouteWithThemeParams {
  appId: string;
  projectId: string;
  themeInstanceId: string;
  pageTypeId?: string;
  routeId: string;
}

interface ThemeData {
  themeId: string;
  pageTemplates: PageTemplateItem[];
  templates: CustomTemplate[];
  snippets: Snippet[];
}

interface PageTemplateItem {
  pageTypeId: string;
  name: string;
  thumbnail?: string;
  locales?: unknown;
  templateId: string;
  snippetId: string;
  type?: string;
}

interface CustomTemplate {
  templateId: string;
  proxy?: string;
  state?: string;
  layerType?: string;
  children?: TreeNode[];
}

interface Snippet {
  snippetId: string;
  text?: unknown;
  layerType?: string;
  children?: TreeNode[];
  context?: unknown[];
}

interface PartialProject {
  templates: CustomTemplate[];
}

export async function CreateRouteWithTheme({
  appId,
  projectId,
  themeInstanceId,
  routeId,
  pageTypeId,
}: CreateRouteWithThemeParams): Promise<unknown> {
  const [projectDetail, themeDetail, brickAttrs] = await Promise.all([
    InstanceApi_getDetail("PROJECT_MICRO_APP", projectId, {
      fields: "templates.templateId",
    }) as Promise<PartialProject>,
    InstanceApi_getDetail("INSTALLED_THEME_TEMPLATE@EASYOPS", themeInstanceId, {
      fields: "themeId,pageTemplates,templates,snippets",
    }) as Promise<ThemeData>,
    getBrickNodeAttrs(),
  ]);

  const { themeId, pageTemplates, templates, snippets } = themeDetail;

  // We should ignore these already defined templates.
  const definedTemplates = projectDetail.templates.map((tpl) => tpl.templateId);

  const appendBricks = appendBricksFactory(appId, brickAttrs);

  const themePageId = pageTemplates.find(
    (layout) => layout.pageTypeId === pageTypeId
  ).snippetId;

  // First, instantiate the page snippet.
  const snippet = snippets.find((snippet) => snippet.snippetId === themePageId);
  const updates = [
    InstanceApi_updateInstanceV2("PROJECT_MICRO_APP", projectId, {
      useThemeId: themeId,
    }),
  ];
  if (snippet.context?.length) {
    updates.push(
      InstanceApi_updateInstanceV2("STORYBOARD_ROUTE", routeId, {
        context: snippet.context,
      })
    );
  }
  await Promise.all(updates);
  await appendBricks(snippet.children, routeId);

  // Then, find used templates and instantiate them into the project.
  const brickConfs = buildBricks(snippet.children as BuilderBrickNode[]);
  const bricks = scanBricksInBrickConf({
    slots: {
      "": {
        type: "bricks",
        bricks: brickConfs,
      },
    },
  });

  const candidates = bricks.filter((brick) => brick.startsWith("tpl-"));
  const usedTemplates: string[] = [];

  if (candidates.length > 0) {
    const customTemplates = builderCustomTemplates(
      templates as unknown[] as TemplateNode[]
    );
    const bricksByTpl = collectBricksByCustomTemplates(customTemplates);
    while (candidates.length > 0) {
      const tpl = candidates.pop();
      if (definedTemplates.includes(tpl)) {
        continue;
      }
      const usedBricks = bricksByTpl.get(tpl);
      if (usedBricks) {
        usedTemplates.push(tpl);
        bricksByTpl.delete(tpl);
        candidates.push(
          ...usedBricks.filter((brick) => brick.startsWith("tpl-"))
        );
      }
    }
  }

  for (const tpl of templates.filter((tpl) =>
    usedTemplates.includes(tpl.templateId)
  )) {
    const instance = await InstanceApi_createInstance("STORYBOARD_TEMPLATE", {
      project: projectId,
      appId,
      templateId: tpl.templateId,
      type: "custom-template",
      proxy: tpl.proxy,
      state: tpl.state,
      layerType: tpl.layerType,
      isFromTheme: true,
    });
    await appendBricks(tpl.children, instance.instanceId);
  }

  return {
    appId,
    projectId,
    routeId,
  };
}

customElements.define(
  "next-builder.provider-create-route-with-theme",
  createProviderClass(CreateRouteWithTheme)
);
