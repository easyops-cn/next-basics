import { i18nText } from "@next-core/brick-kit";
import { I18nData } from "@next-core/brick-types";

/** 文档正文：可能是纯字符串（单语言），也可能是 `{ zh, en }` 双语对象。 */
export type LocalizedDoc = string | I18nData | null | undefined;

/**
 * 双语说明/文档按当前语言取值；纯字符串原样返回。
 *
 * 构件文档的正文存在三种形态：
 * - 由 TSX 的 JSDoc 生成的结构化 description（`{ zh, en }`）
 * - 由 Markdown 转换得到的正文（`{ zh, en }` 或纯字符串）
 * - 历史遗留的纯中文字符串
 * 统一用本函数取值，避免各处重复判断。
 */
export const localized = (value: LocalizedDoc): string => {
  if (value && typeof value === "object") {
    return i18nText(value);
  }
  return value as string;
};
