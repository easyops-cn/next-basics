// istanbul ignore file
import { createProviderClass } from "@next-core/brick-utils";
import { getTypeDeclarations } from "@next-core/storyboard-function-types";

export function GetTypeDeclarations(
  libs: Parameters<typeof getTypeDeclarations>[0]
): ReturnType<typeof getTypeDeclarations> {
  return getTypeDeclarations(libs);
}

customElements.define(
  "next-builder.provider-get-type-declarations",
  createProviderClass(GetTypeDeclarations)
);
