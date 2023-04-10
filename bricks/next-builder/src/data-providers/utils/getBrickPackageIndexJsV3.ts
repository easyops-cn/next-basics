import type { CustomTemplate } from "@next-core/brick-types";
import widgetIndexTemplate from "../templates/widget-index.txt";

export const getBrickPackageIndexJsV3 = ({
  appId,
  chunkVar,
  templates,
  bootstrapJsHash,
}: {
  appId: string;
  chunkVar: string;
  templates: CustomTemplate[];
  bootstrapJsHash: string;
}): string =>
  widgetIndexTemplate
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
