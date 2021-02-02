import { createProviderClass } from "@next-core/brick-utils";
import { developHelper } from "@next-core/brick-kit";
import { map, flatten } from "lodash";

export function GetProvidersList(): Promise<any> {
  const brickPackages = developHelper.getBrickPackages();
  const prefix = "bricks/providers-of-";
  const filteredPkg = brickPackages
    .filter((pkg) => pkg.filePath.startsWith(prefix))
    .map((pkg) => ({
      id: pkg.filePath.substr(prefix.length).split("/")[0],
      bricks: pkg.bricks,
    }));
  const providersList = flatten(
    map(filteredPkg, (item) => {
      return item.bricks.map((brick) => ({
        service: item.id,
        name: brick,
        type: "provider",
      }));
    })
  );
  return { list: providersList };
}

customElements.define(
  "developers.provider-get-providers-list",
  createProviderClass(GetProvidersList)
);
