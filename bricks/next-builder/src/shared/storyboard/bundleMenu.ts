import { MetaI18n } from "@next-core/brick-types";
import { scanI18NInAny } from "@next-core/brick-utils";
import { I18nNode } from "./interfaces";

export function bundleMenu(
  menu: Record<string, unknown>,
  i18n: I18nNode[]
): void {
  const menuI18n: MetaI18n = {};
  if (i18n?.length) {
    const i18nKeys = Array.from(scanI18NInAny(menu).keys());
    if (i18nKeys.length > 0) {
      menuI18n.en = {};
      menuI18n.zh = {};
      for (const item of i18n) {
        const index = i18nKeys.indexOf(item.name);
        if (index !== -1) {
          menuI18n.en[item.name] = item.en;
          menuI18n.zh[item.name] = item.zh;
          i18nKeys.splice(index, 1);
          if (i18nKeys.length === 0) {
            break;
          }
        }
      }
    }
  }
  menu.i18n = menuI18n;
}
