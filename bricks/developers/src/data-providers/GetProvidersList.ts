import { createProviderClass } from "@next-core/brick-utils";
import { BootstrapV2Api_brickPackageInfo } from "@next-sdk/api-gateway-sdk";

export async function GetProvidersList(): Promise<any> {
  const brickPackages = await BootstrapV2Api_brickPackageInfo();
  const prefix = "providers-of-";
  const providersList = brickPackages.bricks
    .filter((name) => name.startsWith(prefix))
    .map((name) => ({
      name,
      type: "provider",
      service: name.substr(prefix.length).split(".")[0],
    }));
  return { list: providersList };
}

customElements.define(
  "developers.provider-get-providers-list",
  createProviderClass(GetProvidersList)
);
