import { BootstrapV2Api_brickPackageInfo } from "@next-sdk/api-gateway-sdk";
import { GetAllProviders } from "./GetAllProviders";

jest.mock("@next-sdk/api-gateway-sdk");
(BootstrapV2Api_brickPackageInfo as jest.Mock).mockResolvedValue({
  bricks: [
    "basic-bricks.micro-view",
    "basic-bricks.general-button",
    "next-builder.builder-container",
    "next-builder.provider-get-all-providers",
    "providers-of-cmdb.get-instance-list",
    "providers-of-cmdb.get-instance-detail",
  ],
  providers: ["next-builder.provider-get-all-providers"],
});

describe("GetAllProviders", () => {
  it("should work", async () => {
    expect(await GetAllProviders()).toEqual([
      "providers-of-cmdb.get-instance-list",
      "providers-of-cmdb.get-instance-detail",
      "next-builder.provider-get-all-providers",
    ]);
  });

  it("should work with no provider data", async () => {
    (BootstrapV2Api_brickPackageInfo as jest.Mock).mockResolvedValue({
      bricks: [],
    });
    expect(await GetAllProviders()).toEqual([]);
  });
});
