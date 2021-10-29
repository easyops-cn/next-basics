import { createProviderClass } from "@next-core/brick-utils";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import { StoriesCache } from "./utils/StoriesCache";

interface installInfo {
  list?: string[];
  fields?: string[];
  dataSource?: BuilderRuntimeNode[];
}

const getInstallList = (root: BuilderRuntimeNode) => {
  const installList: Array<string> = [];
  const walkNode = (node: BuilderRuntimeNode) => {
    if (Array.isArray(node.children)) {
      node.children.forEach((child) => walkNode(child));
    }
    node.brick && installList.push(node.brick as string);
  };
  walkNode(root);
  return [...new Set(installList)];
};

export async function getStoriesJSON(info?: installInfo) {
  const stories = StoriesCache.getInstance();
  const list = stories.getStoryList();
  if (list.length === 0) {
    // 加载基础信息
    await stories.install({
      fields: [
        "id",
        "category",
        "subCategory",
        "description",
        "text",
        "useWidget",
        "layerType",
        "type",
      ],
    });
  }
  if (info?.dataSource) {
    // 解析当前画布使用的brick, 并加载对应的拓展信息
    const list = getInstallList(info.dataSource[0]);
    await stories.install(
      {
        list,
        fields: ["id", "doc", "examples", "originData"],
      },
      true
    );
  }
  return stories.getStoryList();
}

// providers-of-next-builder.build-api-get-stories-json
customElements.define(
  "next-builder.provider-get-stories-json-with-cache",
  createProviderClass(getStoriesJSON)
);
