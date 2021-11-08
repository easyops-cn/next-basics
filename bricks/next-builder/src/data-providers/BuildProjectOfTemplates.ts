import { isEmpty, uniq } from "lodash";
import {
  BrickConfInTemplate,
  CustomTemplate,
  SnippetDefinition,
  Story,
  Storyboard,
  StoryboardFunction,
} from "@next-core/brick-types";
import {
  createProviderClass,
  pipes,
  scanBricksInStoryboard,
  scanProcessorsInStoryboard,
  isObject,
} from "@next-core/brick-utils";
import {
  InstanceGraphApi_traverseGraphV2,
  InstanceApi_getDetail,
} from "@next-sdk/cmdb-sdk";
import { paramCase } from "change-case";
import { buildBricks } from "../shared/storyboard/buildStoryboardV2";
import { getBrickPackageIndexJs } from "./utils/getBrickPackageIndexJs";
import { simpleHash } from "./utils/simpleHash";
import { replaceWidgetFunctions } from "./utils/replaceWidgetFunctions";
import { PlainObject } from "../search-tree/utils";

const MODEL_STORYBOARD_TEMPLATE = "STORYBOARD_TEMPLATE";
const MODEL_STORYBOARD_SNIPPET = "STORYBOARD_SNIPPET";
const IMAGE_SAVE_FILE_PATH = "dist/assets";

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

export const getSuffix = (fileName: string): string => {
  if (typeof fileName !== "string") return;
  return fileName.substring(fileName.lastIndexOf(".") + 1);
};

export const getDeepDependencies = (
  list: string[],
  depMap: Map<string, string[]>,
  arr: string[] = []
): string[] => {
  if (Array.isArray(list)) {
    list.forEach((id) => {
      const dep = depMap.get(id);
      if (dep) {
        arr = getDeepDependencies(dep, depMap, arr.concat(dep));
      }
    });
  }
  return [...new Set(arr)];
};

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

interface imagesFile {
  imagesDir: string;
  imagesPath: Array<{
    imageOssPath: string;
    fileName: string;
  }>;
}
export interface BuildInfoForProjectOfTemplates {
  files: BrickPackageFile[];
  images?: imagesFile;
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

  const imagesAndFunctionsReq = InstanceApi_getDetail(
    "PROJECT_MICRO_APP",
    projectId,
    {
      fields:
        "imgs.url,imgs.name,functions.name,functions.source,functions.typescript",
    }
  );

  // Make parallel requests.
  const [templatesResponse, snippetsResponse, imagesAndFunctionsResponse] =
    await Promise.all([
      templatesGraphReq,
      snippetsGraphReq,
      imagesAndFunctionsReq,
    ]);

  const getThumbnailList = () => {
    return []
      .concat(
        templatesResponse.topic_vertices?.map((item) => item.thumbnail),
        snippetsResponse.topic_vertices?.map((item) => item.thumbnail)
      )
      .filter((item) => item)
      .map((thumbnailUrl: string) => ({
        imageOssPath: thumbnailUrl,
        fileName: `${simpleHash(thumbnailUrl)}.${getSuffix(thumbnailUrl)}`,
      }));
  };

  const getTransformFilePath = (fileName: string): string => {
    return `bricks/${appId}/${IMAGE_SAVE_FILE_PATH}/${fileName}`;
  };

  const thumbnailList = getThumbnailList();

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
      bricks: replaceWidgetFunctions(
        buildBricks(item.children, {
          appId,
          internalTemplateNames,
        }) as BrickConfInTemplate[],
        appId
      ),
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
      thumbnail:
        item.thumbnail &&
        getTransformFilePath(
          thumbnailList.find(
            (thumbnailItem) => thumbnailItem.imageOssPath === item.thumbnail
          ).fileName
        ),
      bricks: buildBricks(item.children, {
        appId,
        internalTemplateNames,
      }),
    }));

  const depMap = new Map<string, string[]>();
  const createStories = (templateItem: pipes.GraphVertex): Story => {
    const getDocContent = (obj: PlainObject, type: DocType) => {
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
    const getInterface = (interfaceObj: Record<string, PlainObject>) => {
      if (!interfaceObj) return;
      return Object.entries(interfaceObj).map(([name, interfaceBody]) => ({
        kind: "interface",
        name: name,
        typeParameter: null,
        children: Object.entries(interfaceBody).map(([k, v]) => {
          if (typeof v === "string") {
            return {
              description: "",
              name: k,
              required: false,
              type: v,
            };
          }
          return {
            description: v?.description,
            name: k,
            required: v?.required,
            type: v?.type,
          };
        }),
      }));
    };
    const useWidget: Array<string> = [];
    const walkChilren = (data: pipes.GraphVertex, isParent = true) => {
      if (!data) return;
      if (Array.isArray(data.children)) {
        data.children.forEach((child: pipes.GraphVertex) =>
          walkChilren(child, false)
        );
      }
      if (
        typeof data.brick === "string" &&
        data.brick.includes("-") &&
        !data.brick.includes(".") &&
        internalTemplateNames &&
        internalTemplateNames.has(data.brick)
      ) {
        data.brick = `${data.appId}.${data.brick}`;
        if (!isParent) {
          useWidget.push(data.brick);
        }
      }
    };
    walkChilren(templateItem);
    const { thumbnail, ...restTemplateData } = templateItem;
    const storyId = `${templateItem.appId}.${templateItem.templateId}`;
    const stories = {
      // 基础信息存放
      storyId: storyId,
      category: templateItem.category,
      type: "brick",
      layerType: "widget",
      author: templateItem.creator,
      text: templateItem.text,
      description: templateItem.description,
      isCustomTemplate: true,
      thumbnail:
        thumbnail &&
        getTransformFilePath(
          thumbnailList.find(
            (thumbnailItem) => thumbnailItem.imageOssPath === thumbnail
          ).fileName
        ),
      doc: {
        id: storyId,
        name: storyId,
        dockind: "brick",
        properties: null,
        author: templateItem.creator,
        slots: null,
        history: null,
      },
      conf: [],
      originData: restTemplateData as any,
      useWidget,
    } as Story;
    if (templateItem.proxy) {
      // 如果有代理属性
      const {
        properties,
        events,
        methods,
        slots,
        interfaces,
        examples: conf,
      } = safeJSONParse(templateItem.proxy);
      stories.doc = Object.assign(stories.doc, {
        properties: getDocContent(properties, DocType.properties),
        events: getDocContent(events, DocType.events),
        methods: getDocContent(methods, DocType.methods),
        slots: getDocContent(slots, DocType.slots),
        interface: getInterface(interfaces as Record<string, PlainObject>),
      });
      if (Array.isArray(conf)) {
        stories.conf = conf;
      } else if (isObject(conf)) {
        stories.conf = [conf];
      }
    }

    depMap.set(storyId, useWidget);

    return stories;
  };

  const stories = templateTreeList.map((templateItem) =>
    createStories(templateItem)
  );

  stories.forEach((storyItem) => {
    if (Array.isArray(storyItem.useWidget)) {
      storyItem.useWidget = storyItem.useWidget.concat(
        getDeepDependencies(storyItem.useWidget, depMap)
      );
    }
  });

  const functions =
    imagesAndFunctionsResponse.functions as StoryboardFunction[];
  const indexJsContent = getBrickPackageIndexJs({
    appId,
    templates,
    functions,
  });
  const storiesJSONContent = JSON.stringify(stories, null, 2);

  const images: imagesFile = {
    imagesDir: IMAGE_SAVE_FILE_PATH,
    imagesPath: thumbnailList,
  };

  if (Array.isArray(imagesAndFunctionsResponse.imgs)) {
    imagesAndFunctionsResponse.imgs.forEach((file) => {
      images.imagesPath.push({
        imageOssPath: file.url,
        fileName: `${simpleHash(file.url)}.${getSuffix(file.name)}`,
      });
    });
  }

  const replaceImageUrl = (str: string): string => {
    let newStr = str;
    images.imagesPath.forEach((imageItem) => {
      const reg = new RegExp(imageItem.imageOssPath, "g");
      newStr = newStr.replace(reg, getTransformFilePath(imageItem.fileName));
    });
    return newStr;
  };

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
      content: replaceImageUrl(indexJsContent),
    },
    {
      path: "dist/stories.json",
      content: replaceImageUrl(storiesJSONContent),
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
    images,
    dependBricks,
    dependProcessorPackages,
  };
}

customElements.define(
  "next-builder.provider-build-project-of-templates",
  createProviderClass(BuildProjectOfTemplates)
);
