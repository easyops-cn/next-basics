import type { CustomTemplate } from "@next-core/brick-types";

export const getBrickPackageIndexJsV3 = async ({
  appId,
  chunkVar,
  templates,
  bootstrapJsHash,
}: {
  appId: string;
  chunkVar: string;
  templates: CustomTemplate[];
  bootstrapJsHash: string;
}): Promise<string> =>
  // `require("crypto").createHash("sha1").update(packageName).digest("hex").substr(0, 4)`
  // returns "2a2a" when `packageName` is "next-builder".
  (
    await import(
      /* webpackChunkName: "chunks/widget-index.2a2a" */ "../templates/widget-index.txt"
    )
  ).default
    .replace("__PLACEHOLDER_HASH__", bootstrapJsHash)
    .replace("__PLACEHOLDER_LIB_NAME__", `bricks/${appId}`)
    .replace(/__PLACEHOLDER_PKG_NAME__/g, `@widgets/${appId}`)
    .replace(/__PLACEHOLDER_CHUNK_VAR__/g, chunkVar)
    .replace(
      "__PLACEHOLDER__",
      `{${templates
        .map(
          (tpl) =>
            `${JSON.stringify(
              `./${tpl.name.split(".")[1]}`
            )}:()=>r.e(672).then((()=>()=>r(7872)))`
        )
        .join(",")}}`
    );
