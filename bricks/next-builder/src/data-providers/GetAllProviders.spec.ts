import { developHelper } from "@next-core/brick-kit";
import { GetAllProviders } from "./GetAllProviders";

jest.mock("@next-core/brick-kit");

jest.spyOn(developHelper, "getBrickPackages").mockReturnValue([
  {
    filePath: "bricks/basic-bricks/dist/index.js",
    bricks: ["basic-bricks.micro-view", "basic-bricks.general-button"],
  },
  {
    filePath: "bricks/next-builder/dist/index.js",
    bricks: [
      "next-builder.builder-container",
      "next-builder.provider-get-all-providers",
    ],
    providers: ["next-builder.provider-get-all-providers"],
  },
  {
    filePath: "bricks/providers-of-cmdb/dist/index.js",
    bricks: [
      "providers-of-cmdb.get-instance-list",
      "providers-of-cmdb.get-instance-detail",
    ],
    providers: [],
  },
]);

describe("GetAllProviders", () => {
  it("should work", () => {
    expect(GetAllProviders()).toEqual([
      "next-builder.provider-get-all-providers",
      "providers-of-cmdb.get-instance-list",
      "providers-of-cmdb.get-instance-detail",
    ]);
  });
});
