import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import {
  DocumentApi_getDocumentsDetails,
  DocumentApi_getDocumentsTreeByAppId,
} from "@next-sdk/next-builder-sdk";
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

interface imageItem {
  name: string;
  instanceId: string;
}

export async function DeleteUnusedImages({
  appId,
  projectId,
  storyboard,
  bucketName,
}: DeleteUnUseImagesProps): Promise<{ unusedImages: Array<imageItem> }> {
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
      unusedImages: [],
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

  const unusedImages: Array<imageItem> = [];

  for (const [imageName, instanceId] of allImagesMap.entries()) {
    if (!usedImages.has(imageName)) {
      unusedImages.push({
        name: imageName,
        instanceId,
      });
    }
  }

  return {
    unusedImages,
  };
}

customElements.define(
  "next-builder.provider-get-unused-images",
  createProviderClass(DeleteUnusedImages)
);
