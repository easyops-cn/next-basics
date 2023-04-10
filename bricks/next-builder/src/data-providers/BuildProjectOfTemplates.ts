import { isEmpty, omit, uniq } from "lodash";
import { getRuntime } from "@next-core/brick-kit";
import { collectBricksByCustomTemplates } from "@next-core/brick-utils";
import {
  BrickConfInTemplate,
  BuilderCustomTemplateNode,
  CustomTemplate,
  CustomTemplateState,
  SnippetDefinition,
  Story,
  Storyboard,
  StoryboardFunction,
  StoryDoc,
  StoryDocProperty,
} from "@next-core/brick-types";
import {
  createProviderClass,
  pipes,
  scanBricksInStoryboard,
  scanProcessorsInStoryboard,
  isObject,
} from "@next-core/brick-utils";

import {
  ContractCenterApi_batchSearchContract,
  ContractCenterApi_BatchSearchContractRequestBody_contract_item,
  ContractCenterApi_BatchSearchContractResponseBody_list_item,
} from "@next-sdk/next-builder-sdk";
import {
  InstanceGraphApi_traverseGraphV2,
  InstanceApi_getDetail,
} from "@next-sdk/cmdb-sdk";
import { paramCase } from "change-case";
import { buildBricks } from "../shared/storyboard/buildStoryboardV2";
import { getBrickPackageIndexJs } from "./utils/getBrickPackageIndexJs";
import { getBrickPackageIndexJsV3 } from "./utils/getBrickPackageIndexJsV3";
import { getBrickPackageBootstrapJs } from "./utils/getBrickPackageBootstrapJs";
import { simpleHash } from "./utils/simpleHash";
import { replaceWidgetFunctions } from "./utils/replaceWidgetFunctions";
import { PlainObject } from "../search-tree/utils";
import { getBaseGraphParams } from "../shared/storyboard/getBaseGraphParams";
import { I18nNode } from "../shared/storyboard/interfaces";

const MODEL_STORYBOARD_TEMPLATE = "STORYBOARD_TEMPLATE";
const MODEL_STORYBOARD_SNIPPET = "STORYBOARD_SNIPPET";
const IMAGE_SAVE_FILE_PATH = "dist/assets";

export function safeJSONParse(str: string): unknown {
  let result;
  try {
    result = JSON.parse(str);
  } catch {
    // eslint-disable-next-line no-console
    console.error(`JSON parse error: ${str}`);
  }
  return result;
}

export function getBaseName(filePath: string): string {
  if (typeof filePath !== "string") return;
  return filePath.substring(filePath.lastIndexOf("/") + 1);
}

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

function getCleanProxy(proxy: string): unknown {
  if (proxy) {
    const { examples, interfaces, ...rest } =
      (safeJSONParse(proxy) as Record<string, unknown>) ?? {};
    return rest;
  }
}

function getCleanState(state: string): unknown[] {
  const states = safeJSONParse(state) as Record<string, unknown>[];

  return states?.map((item) => omit(item, "doc"));
}

export interface BuildProjectOfTemplatesParams {
  // The human-readable id of an app.
  appId: string;

  // The instanceId of a project.
  projectId: string;

  // When used in standalone app, the assets public path may include version.
  version?: string;
}

export enum DocType {
  properties,
  events,
  methods,
  slots,
}

interface ImageFiles {
  imagesDir: string;
  imagesPath: Array<{
    imageOssPath: string;
    fileName: string;
  }>;
}
export interface BuildInfoForProjectOfTemplates {
  files: BrickPackageFile[];
  images?: ImageFiles;
  dependBricks: string[];
  dependProcessorPackages: string[];
}

export interface BrickPackageFile {
  path: string;
  content: string;
}

export interface ProcessedCustomTemplateState extends CustomTemplateState {
  doc?: {
    type?: string;
    required?: boolean;
    default?: unknown;
    description?: string;
  };
}

export async function BuildProjectOfTemplates({
  appId,
  projectId,
  version,
}: BuildProjectOfTemplatesParams): Promise<BuildInfoForProjectOfTemplates> {
  const templatesGraphReq = InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams({
      projectId,
      objectId: MODEL_STORYBOARD_TEMPLATE,
    })
  );

  const snippetsGraphReq = InstanceGraphApi_traverseGraphV2(
    getBaseGraphParams({
      projectId,
      objectId: MODEL_STORYBOARD_SNIPPET,
    })
  );

  const imagesAndFunctionsReq = InstanceApi_getDetail(
    "PROJECT_MICRO_APP",
    projectId,
    {
      fields:
        "imgs.url,imgs.name,functions.name,functions.source,functions.typescript,i18n.name,i18n.zh,i18n.en",
    }
  );

  // Make parallel requests.
  const [templatesResponse, snippetsResponse, projectDetailResponse] =
    await Promise.all([
      templatesGraphReq,
      snippetsGraphReq,
      imagesAndFunctionsReq,
    ]);

  const getThumbnailList = (): ImageFiles["imagesPath"] => {
    return []
      .concat(
        templatesResponse.topic_vertices?.map((item) => item.thumbnail),
        snippetsResponse.topic_vertices?.map((item) => item.thumbnail)
      )
      .filter((item) => item)
      .map((thumbnailUrl: string) => ({
        imageOssPath: thumbnailUrl,
        fileName: getBaseName(thumbnailUrl),
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
      proxy: getCleanProxy(item.proxy),
      ...replaceWidgetFunctions(
        {
          state: item.state
            ? (getCleanState(item.state) as CustomTemplateState[])
            : undefined,
          bricks: buildBricks(item.children, {
            appId,
            internalTemplateNames,
          }) as BrickConfInTemplate[],
        },
        appId,
        version
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
    const getDocContent = (obj: PlainObject, type: DocType): unknown => {
      if (!isObject(obj) || isEmpty(obj)) return;
      const getDefaultValue = (v: unknown): unknown => {
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
    const getInterface = (
      interfaceObj: Record<string, PlainObject>
    ): unknown => {
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
    const walkChildren = (data: pipes.GraphVertex, isParent = true): void => {
      if (!data) return;
      if (Array.isArray(data.children)) {
        data.children.forEach((child: pipes.GraphVertex) =>
          walkChildren(child, false)
        );
      }
      if (
        typeof data.brick === "string" &&
        data.brick.includes("-") &&
        !data.brick.includes(".") &&
        internalTemplateNames &&
        internalTemplateNames.has(data.brick)
      ) {
        data.brick = `${appId}.${data.brick}`;
        if (!isParent) {
          useWidget.push(data.brick);
        }
      }
    };
    walkChildren(templateItem);
    const { thumbnail, ...restTemplateData } = templateItem;
    const storyId = `${appId}.${templateItem.templateId}`;
    const stories = {
      // 基础信息存放
      storyId: storyId,
      category: templateItem.category,
      type: "brick",
      layerType: "widget",
      author: templateItem.creator,
      text: templateItem.text,
      description: templateItem.description,
      isExport: templateItem.isExport,
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
      originData: restTemplateData as BuilderCustomTemplateNode,
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
      } = JSON.parse(templateItem.proxy);
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
      // Allow examples to use `<% IMG.get(...) %>`
      stories.conf = replaceWidgetFunctions(stories.conf, appId);
    }

    if (templateItem.state) {
      const properties = (
        safeJSONParse(templateItem.state) as ProcessedCustomTemplateState[]
      )
        ?.filter((item) => item.doc)
        .map((item) => ({
          ...item.doc,
          name: item.name,
        })) as StoryDocProperty[];

      if (properties?.length) {
        const doc = stories.doc as StoryDoc;
        doc.properties = doc.properties ?? [];

        doc.properties.push(...properties);
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

  const collectionByTpl = collectBricksByCustomTemplates(templates);

  const contractParams: ContractCenterApi_BatchSearchContractRequestBody_contract_item[] =
    [];
  const providerByTplMap = new Map();
  for (const [tplName, bricks] of collectionByTpl.entries()) {
    const contractApis = bricks.filter((brick: string) => brick.includes("@"));

    providerByTplMap.set(tplName, contractApis);
    contractParams.push(
      ...contractApis.map((api: string) => ({
        fullContractName: api.split(":")[0],
        version: api.split(":")[1],
      }))
    );
  }

  let contracts: ContractCenterApi_BatchSearchContractResponseBody_list_item[];
  if (contractParams.length > 0) {
    contracts = (
      await ContractCenterApi_batchSearchContract({
        contract: contractParams,
      })
    ).list;
  }

  const processedTemplates = templates.map((tpl) => ({
    ...tpl,
    ...(!isEmpty(providerByTplMap.get(tpl.name))
      ? {
          contracts: providerByTplMap
            .get(tpl.name)
            .map((provider: string) =>
              contracts?.find(
                (contract) =>
                  `${contract.namespaceId}@${contract.name}` ===
                  provider.split(":")[0]
              )
            )
            .filter(Boolean),
        }
      : {}),
  }));

  const storiesJSONContent = JSON.stringify(stories, null, 2);

  const images: ImageFiles = {
    imagesDir: IMAGE_SAVE_FILE_PATH,
    imagesPath: thumbnailList,
  };

  if (Array.isArray(projectDetailResponse.imgs)) {
    projectDetailResponse.imgs.forEach((file) => {
      images.imagesPath.push({
        imageOssPath: file.url,
        fileName: getBaseName(file.url),
      });
    });
  }

  /** deprecated */
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
      path: "dist/stories.json",
      content: replaceImageUrl(storiesJSONContent),
    },
  ];

  // Todo(steve): use project config instead of a temporary feature flag
  const widgetsV3 =
    getRuntime().getFeatureFlags()["visual-builder-experimental-widgets-v3"];
  if (widgetsV3) {
    const chunkVar = `webpackChunk_widgets_${appId.replace(/-/g, "_")}`;
    const rawBootstrapJsContent = getBrickPackageBootstrapJs({
      appId,
      version,
      chunkVar,
      templates: processedTemplates,
      functions: projectDetailResponse.functions as StoryboardFunction[],
      i18n: projectDetailResponse.i18n as I18nNode[],
    });
    const bootstrapJsContent = replaceImageUrl(rawBootstrapJsContent);
    const bootstrapJsHash = simpleHash(bootstrapJsContent);
    const indexJsContent = await getBrickPackageIndexJsV3({
      appId,
      chunkVar,
      templates: processedTemplates,
      bootstrapJsHash,
    });
    const indexJsPath = `dist/index.${simpleHash(indexJsContent)}.js`;
    files.push(
      {
        path: "dist/bricks.json",
        content: JSON.stringify(
          {
            id: `bricks/${appId}`,
            bricks: templates.map((tpl) => tpl.name),
            filePath: `bricks/${appId}/${indexJsPath}`,
          },
          null,
          2
        ),
      },
      {
        path: indexJsPath,
        content: indexJsContent,
      },
      {
        path: `dist/chunks/bootstrap.${bootstrapJsHash}.js`,
        content: bootstrapJsContent,
      }
    );
  } else {
    const indexJsContent = getBrickPackageIndexJs({
      appId,
      templates: processedTemplates,
      functions: projectDetailResponse.functions as StoryboardFunction[],
      i18n: projectDetailResponse.i18n as I18nNode[],
    });
    const indexJsPath = `dist/index.${simpleHash(indexJsContent)}.js`;
    files.push(
      {
        path: "dist/bricks.json",
        content: JSON.stringify(
          {
            bricks: templates.map((tpl) => tpl.name),
            filePath: `bricks/${appId}/${indexJsPath}`,
          },
          null,
          2
        ),
      },
      {
        path: indexJsPath,
        content: indexJsContent,
      }
    );
  }

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
