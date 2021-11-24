import { BootstrapV2Api_brickPackageInfo } from "@next-sdk/api-gateway-sdk";
import { redirectTo, providersSubMenu, serviceData } from "./processors";

jest.mock("@next-sdk/api-gateway-sdk");

(BootstrapV2Api_brickPackageInfo as jest.Mock).mockResolvedValue({
  bricks: [
    "providers-of-cmdb.cmdb-object-api-get-detail",
    "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
    "providers-of-cmdb.post-search-V2",
    "basic-bricks.micro-app",
  ],
});

describe("redirectTo", () => {
  it("should work when service not found", async () => {
    (BootstrapV2Api_brickPackageInfo as jest.Mock).mockReturnValueOnce({
      bricks: [],
      templates: [],
    });
    expect(await redirectTo()).toBe("/developers/providers/");
  });
  it("should work", async () => {
    expect(await redirectTo()).toBe("/developers/providers/cmdb");
  });
});

describe("providersSubMenu", () => {
  it("should work", async () => {
    expect(await providersSubMenu()).toEqual({
      title: "服务列表",
      menuItems: [
        {
          text: "cmdb",
          to: "/developers/providers/cmdb",
        },
        {
          text: "micro-app",
          to: "/developers/providers/micro-app",
        },
      ],
    });
  });
});

describe("serviceData", () => {
  it("should work", async () => {
    expect(await serviceData("micro-app")).toEqual({
      bricks: [
        "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
      ],
      id: "micro-app",
    });
  });
});
