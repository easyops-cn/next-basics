import * as kit from "@next-core/brick-kit";
import { redirectTo, providersSubMenu, serviceData } from "./processors";

const spyOnGetBrickPackages = jest
  .spyOn(kit.developHelper, "getBrickPackages")
  .mockReturnValue([
    {
      filePath: "bricks/providers-of-cmdb/dist/index.js",
      bricks: ["providers-of-cmdb.cmdb-object-api-get-detail"],
    },
    {
      filePath: "bricks/providers-of-micro-app/dist/index.js",
      bricks: [
        "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
      ],
    },
    {
      filePath: "bricks/basic-bricks/dist/index.js",
      bricks: ["basic-bricks.micro-app"],
    },
    {
      filePath: "bricks/empty-bricks/dist/index.js",
      bricks: [],
    },
  ]);

describe("redirectTo", () => {
  it("should work", async () => {
    expect(await redirectTo()).toBe("/developers/providers/cmdb");
  });

  it("should work when service not found", async () => {
    spyOnGetBrickPackages.mockReturnValueOnce([]);
    expect(await redirectTo()).toBe("/developers/providers/");
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
