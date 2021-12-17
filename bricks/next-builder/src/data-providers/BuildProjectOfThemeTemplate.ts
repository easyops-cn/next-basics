import { createProviderClass, pipes } from "@next-core/brick-utils";
import {
  InstanceApi_getDetail,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";
import { getBaseGraphParams } from "../shared/storyboard/getBaseGraphParams";
import {
  FunctionNode,
  I18nNode,
  ImageNode,
} from "../shared/storyboard/interfaces";
import { arrayPick } from "./utils/arrayPick";

export interface BuildProjectOfThemeTemplateParams {
  projectId: string;
}

export interface BuildProjectOfThemeTemplateResult {
  themeId: string;
  name: string;
  locales?: unknown;
  layoutType: string;
  pageTemplates: PageTemplateItem[];
  templates: unknown[];
  snippets: unknown[];
  dependencies: unknown[];
  i18n: I18nNode[];
  imgs: ImageNode[];
  functions: FunctionNode[];
}

interface PageTemplateItem {
  pageTypeId: string;
  name: string;
  thumbnail?: string;
  locales?: unknown;
  templateId: string;
  snippetId: string;
}

interface RawLayoutItem {
  pageTypeId: string;
  name: string;
  thumbnail?: string;
  locales?: unknown;
  template: [
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
        "name",
        "appSetting.layoutType",
        "appSetting.locales",
        "dependencies",
        "i18n.name",
        "i18n.zh",
        "i18n.en",
        "imgs.name",
        "imgs.url",
        "functions.name",
        "functions.typescript",
        "functions.source",
        "pageTemplates.pageTypeId",
        "pageTemplates.name",
        "pageTemplates.thumbnail",
        "pageTemplates.locales",
        "pageTemplates.template.templateId",
        "pageTemplates.snippet.snippetId",
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
    name: projectDetail.name,
    locales: projectDetail.appSetting?.locales,
    layoutType: projectDetail.appSetting?.layoutType,
    pageTemplates: (projectDetail.pageTemplates as RawLayoutItem[]).map(
      (item) => ({
        pageTypeId: item.pageTypeId,
        name: item.name,
        thumbnail: item.thumbnail,
        locales: item.locales,
        templateId: item.template[0].templateId,
        snippetId: item.snippet[0].snippetId,
      })
    ),
    templates,
    snippets,
    dependencies: projectDetail.dependencies,
    i18n: arrayPick(projectDetail.i18n, ["name", "zh", "en"]),
    imgs: arrayPick(projectDetail.imgs, ["name", "url"]),
    functions: arrayPick(projectDetail.functions, [
      "name",
      "typescript",
      "source",
      "tests",
    ]),
  };
}

customElements.define(
  "next-builder.provider-build-project-of-theme-template",
  createProviderClass(BuildProjectOfThemeTemplate)
);
