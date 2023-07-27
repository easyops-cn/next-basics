import { GetProvidersList } from "./GetProvidersList";
import { BootstrapV2Api_brickPackageInfo } from "@next-sdk/api-gateway-sdk";

jest.mock("@next-sdk/api-gateway-sdk");

(BootstrapV2Api_brickPackageInfo as jest.Mock).mockResolvedValue({
  bricks: [
    "providers-of-cmdb.cmdb-object-api-get-detail",
    "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
    "basic-bricks.micro-app",
  ],
  templates: [],
  providers: [],
});

describe("GetProvidersList", () => {
  it.each<[any]>([
    [
      {
        list: [
          {
            service: "cmdb",
            name: "providers-of-cmdb.cmdb-object-api-get-detail",
            type: "provider",
          },
          {
            service: "micro-app",
            name: "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
            type: "provider",
          },
        ],
      },
    ],
  ])("GetProvidersList() should work", async (result) => {
    expect(await GetProvidersList()).toEqual(result);
  });
});
