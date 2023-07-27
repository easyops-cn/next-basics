import { createProviderClass } from "@next-core/brick-utils";
import { illustrationsByCategory } from "@next-core/illustrations";

export function GetIllustrationsCategories(): string[] {
  const illustrations = illustrationsByCategory as Record<string, string[]>;
  return ["all", ...Object.keys(illustrations)];
}

customElements.define(
  "developers.provider-get-illustrations-categories",
  createProviderClass(GetIllustrationsCategories)
);
