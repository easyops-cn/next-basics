import { AppLocales, I18nData } from "@next-core/brick-types";
import { createProviderClass, pipes } from "@next-core/brick-utils";
import {
  InstanceApi_getDetail,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import { getBaseGraphParams } from "../shared/storyboard/getBaseGraphParams";

export interface BuildProjectOfThemeTemplateParams {
  projectId: string;
}

export interface BuildProjectOfThemeTemplateResult {
  themeId: string;
  name: I18nData;
  layoutType: string;
  layouts: LayoutItem[];
  templates: unknown[];
  snippets: unknown[];
  dependencies: unknown[];
}

interface LayoutItem {
  layoutId: string;
  name: I18nData;
  templateId: string;
  snippetId: string;
}

interface RawLayoutItem {
  layoutId: string;
  name: I18nData;
  customTemplate: [
    {
      templateId: string;
    }
  ];
  snippet: [
    {
      snippetId: string;
    }
  ];
}

export async function BuildProjectOfThemeTemplate({
  projectId,
}: BuildProjectOfThemeTemplateParams): Promise<BuildProjectOfThemeTemplateResult> {
  const projectDetailReq = InstanceApi_getDetail(
    "PROJECT_MICRO_APP",
    projectId,
    {
      fields: [
        "appId",
        "appSetting.layoutType",
        "appSetting.locales",
        "dependencies",
        "layouts.layoutId",
        "layouts.name",
        "layouts.customTemplate.templateId",
        "layouts.snippet.snippetId",
      ].join(","),
    }
  );
  const templatesGraphReq = InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams({
      projectId,
      objectId: "STORYBOARD_TEMPLATE",
    })
  );
  const snippetsGraphReq = InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams({
      projectId,
      objectId: "STORYBOARD_SNIPPET",
    })
  );
  const [projectDetail, templatesGraph, snippetsGraph] = await Promise.all([
    projectDetailReq,
    templatesGraphReq,
    snippetsGraphReq,
  ]);

  const templates = pipes.graphTree(templatesGraph as pipes.GraphData, {
    sort: {
      key: "sort",
      order: 1,
    },
  });
  const snippets = pipes.graphTree(snippetsGraph as pipes.GraphData, {
    sort: {
      key: "sort",
      order: 1,
    },
  });

  return {
    themeId: projectDetail.appId,
    name: getLocaleName(projectDetail.appSetting.locales),
    layoutType: projectDetail.appSetting.layoutType,
    layouts: (projectDetail.layouts as RawLayoutItem[]).map((item) => ({
      layoutId: item.layoutId,
      name: item.name,
      templateId: item.customTemplate[0].templateId,
      snippetId: item.snippet[0].snippetId,
    })),
    templates,
    snippets,
    dependencies: projectDetail.dependencies,
  };
}

function getLocaleName(locales: AppLocales): I18nData {
  return Object.fromEntries(
    Object.entries(locales)
      .map(([lang, locale]) => [lang, locale.name])
      .filter((entry) => entry[1])
  );
}

customElements.define(
  "next-builder.provider-build-project-of-theme-template",
  createProviderClass(BuildProjectOfThemeTemplate)
);
