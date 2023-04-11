import type {
  CustomTemplate,
  StoryboardFunction,
} from "@next-core/brick-types";
import type { I18nNode } from "../../shared/storyboard/interfaces";
import widgetBootstrapTemplate from "../templates/widget-bootstrap.txt";

export const getBrickPackageBootstrapJs = ({
  appId,
  version,
  chunkVar,
  templates,
  functions,
  i18n,
}: {
  appId: string;
  version: string;
  chunkVar: string;
  templates: CustomTemplate[];
  functions: StoryboardFunction[];
  i18n: I18nNode[];
}): string =>
  widgetBootstrapTemplate
    .replace(/__PLACEHOLDER_CHUNK_VAR__/g, chunkVar)
    .replace(
      "__PLACEHOLDER__",
      `{${templates
        .map(
          (tpl) =>
            `i.customTemplates.define(${JSON.stringify(
              tpl.name
            )},${JSON.stringify({
              proxy: tpl.proxy,
              state: tpl.state,
              bricks: tpl.bricks,
              contracts: tpl.contracts,
            })})`
        )
        .concat(
          Array.isArray(functions) && functions.length > 0
            ? `(0,i.registerWidgetFunctions)(${JSON.stringify(
                appId
              )},${JSON.stringify(
                functions.map(({ name, source, typescript }) => ({
                  name,
                  source,
                  typescript,
                }))
              )},${JSON.stringify(version)})`
            : []
        )
        .concat(
          Array.isArray(i18n) && i18n.length > 0
            ? `(0,i.registerWidgetI18n)(${JSON.stringify(
                appId
              )},${JSON.stringify(
                i18n.reduce(
                  (acc, { name, zh, en }) => {
                    acc.en[name] = en;
                    acc.zh[name] = zh;
                    return acc;
                  },
                  { en: {}, zh: {} } as Record<string, Record<string, string>>
                )
              )})`
            : []
        )
        .join(",")}}`
    );
