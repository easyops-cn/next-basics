import {
  InstanceApi_deleteInstanceBatch,
  InstanceApi_postSearch,
} from "@next-sdk/cmdb-sdk";
import {
  DocumentApi_getDocumentsDetails,
  DocumentApi_getDocumentsTreeByAppId,
} from "@next-sdk/next-builder-sdk";
import { ObjectStoreApi_removeObjects } from "@next-sdk/object-store-sdk";
import { Storyboard } from "@next-core/brick-types";
import { createProviderClass, isObject } from "@next-core/brick-utils";
import { PlainObject } from "../search-tree/utils";

export interface BuildProjectOfTemplatesParams {
  // The human-readable id of an app.
  appId: string;

  // The instanceId of a project.
  projectId: string;

  // storyboard data
  storyboard: Storyboard;

  // bucketName name
  bucketName: string;
}

export const getFileName = (url: string): string => {
  if (typeof url !== "string") return;
  return url.substring(url.lastIndexOf("/") + 1);
};

export async function DeleteUnUseImages({
  appId,
  projectId,
  storyboard,
  bucketName,
}: BuildProjectOfTemplatesParams) {
  // 获取所有图片
  const allImageReq = InstanceApi_postSearch("MICRO_APP_RESOURCE_IMAGE", {
    fields: { from: true, name: true, url: true },
    page_size: 3000,
    query: { "project.instanceId": projectId, name: { $like: "%%" } },
  });
  const allDocListReq = DocumentApi_getDocumentsTreeByAppId(appId);

  const [allImageResponse, allDocResponse] = await Promise.all([
    allImageReq,
    allDocListReq,
  ]);

  const allImagesMap = new Map<string, string>();
  allImageResponse.list.forEach((item) => {
    allImagesMap.set(getFileName(item.url), item.instanceId);
  });
  const getDocDetailReq = allDocResponse.documentsTree.map((item) =>
    DocumentApi_getDocumentsDetails(item.documentId)
  );
  const allDocContentList = (await Promise.all(getDocDetailReq)).map(
    (item) => item.content
  );

  const createRegRule = () => new RegExp([...allImagesMap.keys()].join("|"));
  const compareString = (str: string) => {
    const match = str.match(createRegRule());
    if (match) {
      allImagesMap.delete(match[0]);
    }
  };

  // 遍历
  const walk = (tree: PlainObject) => {
    if (!tree) return;
    Object.values(tree).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => {
          if (isObject(item)) {
            walk(item);
          } else if (typeof item === "string") {
            compareString(item);
          }
        });
      } else if (isObject(child)) {
        walk(child);
      } else if (typeof child === "string") {
        compareString(child);
      }
    });
  };

  const findImageInDocContent = () => {
    const allDocContent = allDocContentList.join("\n");
    const hadMap = () => [...allImagesMap.values()].length > 0;
    if (hadMap()) {
      let imageRule = createRegRule();
      let match;
      while ((match = imageRule.exec(allDocContent)) !== null) {
        allImagesMap.delete(match[0]);
        if (hadMap()) {
          imageRule = createRegRule();
        } else {
          break;
        }
      }
    }
  };

  walk(storyboard);
  findImageInDocContent();

  const needDeleteImages = [...allImagesMap.keys()];
  if (needDeleteImages.length > 0) {
    const deleteImageBucketReq = ObjectStoreApi_removeObjects(bucketName, {
      objectNames: needDeleteImages,
    });
    const deleteImageInstanceReq = InstanceApi_deleteInstanceBatch(
      "MICRO_APP_RESOURCE_IMAGE",
      {
        instanceIds: [...allImagesMap.values()].join(";"),
      }
    );
    await Promise.all([deleteImageBucketReq, deleteImageInstanceReq]);

    return {
      result: true,
      message: "delete images success",
      needReload: true,
    };
  } else {
    return {
      result: true,
      message: "nothing to delete",
    };
  }
}

customElements.define(
  "next-builder.provider-delete-unuse-images",
  createProviderClass(DeleteUnUseImages)
);
