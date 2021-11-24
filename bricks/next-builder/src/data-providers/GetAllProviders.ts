import { BootstrapV2Api_brickPackageInfo } from "@next-sdk/api-gateway-sdk";
import { createProviderClass } from "@next-core/brick-utils";

// Get all providers including auto-generated ones and custom ones.
export async function GetAllProviders(): Promise<string[]> {
  const brickPackages = await BootstrapV2Api_brickPackageInfo();
  return brickPackages.bricks
    .filter((name) => name.startsWith("providers-of-"))
    .concat(brickPackages.providers ?? []);
}

customElements.define(
  "next-builder.provider-get-all-providers",
  createProviderClass(GetAllProviders)
);
