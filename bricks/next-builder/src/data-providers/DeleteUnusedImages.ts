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
import { createProviderClass } from "@next-core/brick-utils";
import {
  findUsedImagesInStoryboard,
  findUsedImagesInString,
} from "./utils/findUsedImages";
import { escapeRegExp } from "lodash";

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

export async function DeleteUnusedImages({
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

  const regexString = `${escapeRegExp(
    `/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/${bucketName}/object/`
  )}(.+?\\.(?:png|jpe?g|gif))`;
  const regexSingleMatch = new RegExp(regexString);
  const regexMultipleMatch = new RegExp(regexSingleMatch, "g");

  const allImagesMap = new Map<string, string>();
  allImageResponse.list.forEach((item) => {
    const matches = item.url.match(regexSingleMatch);
    if (!matches) {
      throw new Error(`Unexpected image url: ${item.url}`);
    }
    allImagesMap.set(matches[1], item.instanceId);
  });
  const getDocDetailReq = allDocResponse.documentsTree.map((item) =>
    DocumentApi_getDocumentsDetails(item.documentId)
  );
  const allDocContentList = (await Promise.all(getDocDetailReq)).map(
    (item) => item.content
  );

  const usedImages = new Set<string>();
  findUsedImagesInStoryboard(storyboard, regexMultipleMatch, usedImages);
  findUsedImagesInString(
    allDocContentList.join("\n"),
    regexMultipleMatch,
    usedImages
  );

  const unusedImages: string[] = [];
  const unusedImageInstanceIds: string[] = [];

  for (const [imageName, instanceId] of allImagesMap.entries()) {
    if (!usedImages.has(imageName)) {
      unusedImages.push(imageName);
      unusedImageInstanceIds.push(instanceId);
    }
  }

  if (unusedImages.length > 0) {
    const deleteImageBucketReq = ObjectStoreApi_removeObjects(bucketName, {
      objectNames: unusedImages,
    });
    const deleteImageInstanceReq = InstanceApi_deleteInstanceBatch(
      "MICRO_APP_RESOURCE_IMAGE",
      {
        instanceIds: unusedImageInstanceIds.join(";"),
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
  "next-builder.provider-delete-unused-images",
  createProviderClass(DeleteUnusedImages)
);
