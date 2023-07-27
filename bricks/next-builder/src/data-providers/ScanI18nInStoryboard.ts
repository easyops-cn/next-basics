import { Storyboard } from "@next-core/brick-types";
import {
  createProviderClass,
  scanI18NInStoryboard,
} from "@next-core/brick-utils";

export interface ScanI18nInStoryboardParams {
  storyboard: Storyboard;
}

export type I18NItem = [key: string, values: string[]];

export function ScanI18nInStoryboard({
  storyboard,
}: ScanI18nInStoryboardParams): I18NItem[] {
  return Array.from(
    scanI18NInStoryboard(storyboard).entries()
  ).map(([key, valueSet]) => [key, Array.from(valueSet)]);
}

customElements.define(
  "next-builder.provider-scan-i18n-in-storyboard",
  createProviderClass(ScanI18nInStoryboard)
);
