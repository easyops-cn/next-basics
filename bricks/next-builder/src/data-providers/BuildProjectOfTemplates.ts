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
import {
  InstanceGraphApi_traverseGraphV2,
  InstanceApi_postSearch,
} from "@next-sdk/cmdb-sdk";
import { ObjectStoreApi_putObject } from "@next-sdk/object-store-sdk";
import { paramCase } from "change-case";
import { uniq } from "lodash";
import { buildBricks } from "../shared/storyboard/buildStoryboard";
import { getBrickPackageIndexJs } from "./utils/getBrickPackageIndexJs";
import { simpleHash } from "./utils/simpleHash";
import { isObject } from "@next-core/brick-utils";
import { isEmpty } from "lodash";
import { imgUrlToFile } from "./utils/imgUrlToFile";
// import { message } from 'antd';

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

  const imagesReq = InstanceApi_postSearch("MICRO_APP_RESOURCE_IMAGE", {
    fields: {
      form: true,
      name: true,
      url: true,
    },
    page_size: 3000,
    query: {
      "project.instanceId": projectId,
      name: {
        $like: "%%",
      },
    },
  });

  // Make parallel requests.
  const [templatesResponse, snippetsResponse, imagesResponse] =
    await Promise.all([templatesGraphReq, snippetsGraphReq, imagesReq]);

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
      type: "brick",
      layerType: "widget",
      author: templateItem.creator,
      text: templateItem.text,
      description: templateItem.description,
      isCustomTemplate: true,
      doc: {
        id: `${templateItem.appId}.${templateItem.templateId}`,
        name: `${templateItem.appId}.${templateItem.templateId}`,
        dockind: "brick",
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

  let indexJsContent = getBrickPackageIndexJs(templates);

  if (imagesResponse.list.length) {
    const imagesTransformList: Array<Promise<File>> = [];

    imagesResponse.list.forEach((file) =>
      imagesTransformList.push(imgUrlToFile(file.url, file.name))
    );

    const imagesFileList = await Promise.all(imagesTransformList);

    const uploadFileList: Array<Promise<any>> = [];

    imagesFileList.forEach((file) => {
      const [name, suffix] = file.name.split(".");
      const reg = new RegExp(
        /*eslint-disable no-useless-escape*/
        `\/next\/api\/gateway\/object_store\.object_store\.GetObject\/[\\w|.|\\/|-]+${name}[\\w]+.${suffix}`,
        "g"
      );
      indexJsContent = indexJsContent.replace(reg, `xxx/${file.name}`);
      uploadFileList.push(
        ObjectStoreApi_putObject(projectId, {
          objectName: file.name,
          file,
        })
      );
    });

    // try {
    //   const uploadResponse = await Promise.all(uploadFileList);
    //   console.log('上传成功');
    // } catch {
    //   // 上传失败
    //   message.error("上传失败")
    // }
  }

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

  // if (imagesFileList.length) {
  //   imagesFileList.forEach((file) => files.push({
  //     path: `dist/assets/${file.name}`,
  //     content: file,
  //   }))
  // }

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

// var str = '[{"url":"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png"},{"url":"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/blue-bg1632809958790451533.png"},{"url":"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/birthday_yellow1632810302868180195.png"},{"url":"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/thinking1632810308992778245.png"},{"url":"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/birthday_blue1632814315046955753.png"},{"url":"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/birthday_orange1632814329504090958.png"}]'

// var fileList = ['viewpoint.png', 'blue-bg.png', 'birthday_yellow.png', 'birthday_blue.png', 'birthday_orange.png', 'thinking.png']

// function change(str) {
//   fileList.forEach(file => {
//       const [name, suffix] = file.split('.');
//       const reg = new RegExp(`\/next\/api\/gateway\/object_store\.object_store\.GetObject\/[\\w|.|\\/|-]+${name}[\\d]+.${suffix}`);
//       str = str.replace(reg, file);
//   })
//   return str;
// }

// change(str)
