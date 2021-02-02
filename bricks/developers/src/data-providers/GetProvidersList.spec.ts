import { GetProvidersList } from "./GetProvidersList";
import * as kit from "@next-core/brick-kit";

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
  ]);

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
            name:
              "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app",
            type: "provider",
          },
        ],
      },
    ],
  ])("GetProvidersList() should work", async (result) => {
    expect(await GetProvidersList()).toEqual(result);
  });
});
