import { developHelper } from "@next-core/brick-kit";
import { createProviderClass } from "@next-core/brick-utils";

// Get all providers including auto-generated ones and custom ones.
export function GetAllProviders(): string[] {
  return developHelper
    .getBrickPackages()
    .flatMap((pkg) =>
      pkg.filePath.startsWith("bricks/providers-of-")
        ? pkg.bricks
        : pkg.providers ?? []
    );
}

customElements.define(
  "next-builder.provider-get-all-providers",
  createProviderClass(GetAllProviders)
);
