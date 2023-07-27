import { createProviderClass, scanStoryboard } from "@next-core/brick-utils";
import { Storyboard } from "@next-core/brick-types";

export interface GetProviderOfStoryboardParams {
  /** 微应用数据 */
  storyboard: Storyboard;
}

export function GetProviderOfStoryboard(
  params: GetProviderOfStoryboardParams
): string[] {
  const { storyboard } = params;

  const { bricks, customApis } = scanStoryboard(storyboard, true);

  return customApis.concat(
    bricks.filter((item) => item.startsWith("providers-of-"))
  );
}

customElements.define(
  "next-builder.provider-get-providers-of-storyboard",
  createProviderClass(GetProviderOfStoryboard)
);
