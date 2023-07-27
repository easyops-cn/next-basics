import { CmdbObjectApi_getDetail } from "@next-sdk/cmdb-sdk";

export async function getBrickNodeAttrs(): Promise<string[]> {
  const brickModel = await CmdbObjectApi_getDetail("STORYBOARD_BRICK", {});
  return brickModel.attrList
    .map((attr) => attr.id)
    .filter((id) => id !== "id" && id !== "appId");
}
