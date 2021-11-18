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

export interface DeleteUnUseImagesProps {
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
}: DeleteUnUseImagesProps): Promise<{
  result: boolean;
  message: string;
  needReload?: boolean;
}> {
  // 获取所有图片
  const allImageReq = InstanceApi_postSearch("MICRO_APP_RESOURCE_IMAGE", {
    fields: { url: true },
    page_size: 3000,
    query: { "project.instanceId": projectId },
  });
  const allDocListReq = DocumentApi_getDocumentsTreeByAppId(appId);

  const [allImageResponse, allDocResponse] = await Promise.all([
    allImageReq,
    allDocListReq,
  ]);

  if (allImageResponse.list.length === 0) {
    return {
      result: true,
      message: "nothing to delete",
    };
  }

  const allImagesMap = new Map<string, string>();
  allImageResponse.list.forEach((item) => {
    allImagesMap.set(item.url, item.instanceId);
  });
  const getDocDetailReq = allDocResponse.documentsTree.map((item) =>
    DocumentApi_getDocumentsDetails(item.documentId)
  );
  const allDocContentList = (await Promise.all(getDocDetailReq)).map(
    (item) => item.content
  );

  const reg =
    /\/next\/api\/gateway\/object_store.object_store.GetObject\/api\/v1\/objectStore\/bucket\/next-builder\/object\/[^/](.+[png|jpg|jpeg|gif])/g;
  const compareString = (str: string): void => {
    const match = str.match(reg);
    if (match) {
      allImagesMap.delete(match[0]);
    }
  };

  // 遍历
  const walk = (tree: PlainObject): void => {
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

  const findImageInDocContent = (): void => {
    const allDocContent = allDocContentList.join("\n");
    const result = allDocContent.match(reg);
    if (result) {
      result.forEach((url) => {
        allImagesMap.delete(url);
      });
    }
  };

  walk(storyboard);
  findImageInDocContent();

  const needDeleteImages = [...allImagesMap.keys()].map((item) =>
    getFileName(item)
  );
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

[
  "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/B74A2A55-7353-4B1F-AC26-2BACE970EC6B1636714053010954356.png)\n### jpeg 测试\nwidth: 300 height: 300\n![image](/n",
  "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/test21636958706957822957.jpeg)\n\nwidth: 300 height: 300 & quality: 50\n![image](/n",
  "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/派大星16342827475056283201636963529980839049.jpg)\n\n### png 测试\nwidth: 300 height: 300\n![image](/n",
  "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/B74A2A55-7353-4B1F-AC26-2BACE970EC6B1636960665633764036.png)\n\nquailty: 20\n![image](/n",
  "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/test1636958725975716025.png)\n\nwidth: 300 height: 300 & quality: 50\n![image](/n",
  "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/B74A2A55-7353-4B1F-AC26-2BACE970EC6B1636959633444056857.png)\n\nquailty: 80\n![image](/n",
  "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/B74A2A55-7353-4B1F-AC26-2BACE970EC6B1636960971384203387.png)\n![image](/n",
  "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/test31636962323581878324.png)\n![image](/n",
];
