import {
  BrickConfInTemplate,
  CustomTemplate,
  SnippetDefinition,
  Storyboard,
} from "@next-core/brick-types";
import {
  createProviderClass,
  pipes,
  scanBricksInStoryboard,
  scanProcessorsInStoryboard,
} from "@next-core/brick-utils";
import { InstanceGraphApi_traverseGraphV2 } from "@next-sdk/cmdb-sdk";
import { paramCase } from "change-case";
import { uniq } from "lodash";
import { buildBricks } from "../shared/storyboard/buildStoryboard";
import { getBrickPackageIndexJs } from "./utils/getBrickPackageIndexJs";
import { simpleHash } from "./utils/simpleHash";
import { isObject } from "@next-core/brick-utils";
import { isEmpty } from "lodash";

const MODEL_STORYBOARD_TEMPLATE = "STORYBOARD_TEMPLATE";
const MODEL_STORYBOARD_SNIPPET = "STORYBOARD_SNIPPET";

export function safeJSONParse(str: string): Record<string, unknown> {
  let result: Record<string, unknown> = {};
  try {
    result = JSON.parse(str);
  } catch {
    // eslint-disable-next-line no-console
    console.error(`JSON parse error: ${str}`);
  }
  return result;
}

export interface BuildProjectOfTemplatesParams {
  // The human-readable id of an app.
  appId: string;

  // The instanceId of a project.
  projectId: string;
}

export enum DocType {
  properties,
  events,
  methods,
  slots,
}

export interface BuildInfoForProjectOfTemplates {
  files: BrickPackageFile[];
  dependBricks: string[];
  dependProcessorPackages: string[];
}

export interface BrickPackageFile {
  path: string;
  content: string;
}

export async function BuildProjectOfTemplates({
  appId,
  projectId,
}: BuildProjectOfTemplatesParams): Promise<BuildInfoForProjectOfTemplates> {
  const templatesGraphReq = InstanceGraphApi_traverseGraphV2({
    object_id: MODEL_STORYBOARD_TEMPLATE,
    query: {
      "project.instanceId": projectId,
    },

    select_fields: ["*", "parent"],
    child: [
      {
        child: [
          {
            depth: -1,
            parentOut: "children",
            select_fields: ["*", "parent"],
          },
        ],

        depth: -1,
        parentOut: "children",
        select_fields: ["*", "parent"],
      },
    ],
  });

  const snippetsGraphReq = InstanceGraphApi_traverseGraphV2({
    child: [
      {
        child: [
          {
            depth: -1,
            parentOut: "children",
            select_fields: ["*"],
          },
        ],
        depth: -1,
        parentOut: "children",
        select_fields: ["*"],
      },
    ],
    object_id: MODEL_STORYBOARD_SNIPPET,
    query: {
      "project.instanceId": projectId,
    },
    select_fields: ["*"],
  });

  // Make parallel requests.
  const [templatesResponse, snippetsResponse] = await Promise.all([
    templatesGraphReq,
    snippetsGraphReq,
  ]);

  const templateTreeList = pipes.graphTree(
    templatesResponse as pipes.GraphData,
    {
      sort: {
        key: "sort",
        order: 1,
      },
    }
  );

  const internalTemplateNames = new Set(
    templateTreeList.map((item) => item.templateId) as string[]
  );

  const templates: CustomTemplate[] = templateTreeList.map<CustomTemplate>(
    (item) => ({
      name: `${appId}.${item.templateId}`,
      proxy: item.proxy ? JSON.parse(item.proxy) : undefined,
      bricks: buildBricks(item.children, {
        nodeToConf: new WeakMap(),
        appId,
        internalTemplateNames,
      }) as BrickConfInTemplate[],
    })
  );

  const snippets: SnippetDefinition[] = pipes
    .graphTree(snippetsResponse as pipes.GraphData, {
      sort: {
        key: "sort",
        order: 1,
      },
    })
    .map((item) => ({
      id: `${appId}.${item.snippetId}`,
      category: item.category,
      subCategory: item.subCategory,
      layerType: item.layerType,
      text: item.text,
      description: item.description,
      thumbnail: item.thumbnail,
      bricks: buildBricks(item.children, {
        nodeToConf: new WeakMap(),
        appId,
        internalTemplateNames,
      }),
    }));

  const createStories = (
    templateItem: pipes.GraphVertex
  ): Record<string, unknown> => {
    const getDocContent = (obj: Record<string, any>, type: DocType) => {
      if (!isObject(obj) || isEmpty(obj)) return;
      const getDefaultValue = (v: any) => {
        return v ? v : "-";
      };
      return Object.entries(obj).map(([key, value]) => {
        switch (type) {
          case DocType.properties:
            return {
              name: key,
              type: getDefaultValue(value.type),
              required: getDefaultValue(value.required),
              default: getDefaultValue(value.default),
              description: getDefaultValue(value.description),
            };
          case DocType.events:
            return {
              type: key,
              detail: getDefaultValue(value.detail),
              description: getDefaultValue(value.description),
            };
          case DocType.methods:
            return {
              name: key,
              params: getDefaultValue(value.params),
              description: getDefaultValue(value.description),
            };
          case DocType.slots:
            return {
              name: key,
              description: getDefaultValue(value.description),
            };
        }
      });
    };
    const stories: Record<string, any> = {
      // 基础信息存放
      storyId: `${templateItem.appId}.${templateItem.templateId}`,
      category: templateItem.category,
      type: "custom-template",
      layerType: "widget",
      author: templateItem.creator,
      text: templateItem.text,
      description: templateItem.description,
      doc: {
        id: `${templateItem.appId}.${templateItem.templateId}`,
        name: `${templateItem.appId}.${templateItem.templateId}`,
        dockind: "custom-template",
        author: templateItem.creator,
        slots: null,
        history: null,
      },
    };
    if (templateItem.proxy) {
      // 如果有代理属性
      const { properties, events, methods, slots } = safeJSONParse(
        templateItem.proxy
      );
      stories.doc = Object.assign(stories.doc, {
        properties: getDocContent(properties, DocType.properties),
        events: getDocContent(events, DocType.events),
        methods: getDocContent(methods, DocType.methods),
        slots: getDocContent(slots, DocType.slots),
      });
    }

    return stories;
  };

  const stories = templateTreeList.map((templateItem) =>
    createStories(templateItem)
  );

  const indexJsContent = getBrickPackageIndexJs(templates);

  const files = [
    {
      path: "dist/bricks.json",
      content: JSON.stringify(
        {
          bricks: templates.map((tpl) => tpl.name),
        },
        null,
        2
      ),
    },
    {
      path: `dist/index.${simpleHash(indexJsContent)}.js`,
      content: indexJsContent,
    },
    {
      path: "dist/stories.json",
      content: JSON.stringify(stories, null, 2),
    },
  ];

  if (snippets.length > 0) {
    files.push({
      path: "dist/snippets.json",
      content: JSON.stringify({ snippets }, null, 2),
    });
  }

  const storyboard = {
    meta: {
      customTemplates: templates,
    },
  } as Partial<Storyboard> as Storyboard;

  const dependBricks = scanBricksInStoryboard(storyboard);
  const processors = scanProcessorsInStoryboard(storyboard);
  const dependProcessorPackages = uniq(
    // The package name should always be the param-case of processor's namespace.
    processors.map((item) => paramCase(item.split(".")[0]))
  );

  return {
    files,
    dependBricks,
    dependProcessorPackages,
  };
}

customElements.define(
  "next-builder.provider-build-project-of-templates",
  createProviderClass(BuildProjectOfTemplates)
);
