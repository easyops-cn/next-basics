import { developHelper } from "@next-core/brick-kit";
import { InstanceApi } from "@next-sdk/cmdb-sdk";
import { GetBrickLibrary } from "./GetBrickLibrary";

jest.mock("@next-core/brick-kit");
jest.mock("@next-sdk/cmdb-sdk");

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

jest.spyOn(developHelper, "getTemplatePackages").mockReturnValue([
  {
    filePath: "templates/test-a/dist/index.js",
    templates: ["test-a.template-a1", "test-a.template-a2"],
  },
  {
    filePath: "templates/test-b/dist/index.js",
    templates: ["test-b.template-b1", "test-b.template-b2"],
  },
]);

jest.spyOn(InstanceApi, "postSearch").mockResolvedValue({
  list: [
    {
      instanceId: "a",
      templateId: "tpl-a",
      id: "P-01",
    },
    {
      instanceId: "b",
      templateId: "tpl-b",
      id: "P-02",
    },
  ],
});

describe("GetBrickLibrary", () => {
  it("should work", async () => {
    expect(await GetBrickLibrary({ projectId: "test-project" }))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "name": "basic-bricks.micro-view",
          "type": "brick",
        },
        Object {
          "name": "basic-bricks.general-button",
          "type": "brick",
        },
        Object {
          "name": "next-builder.builder-container",
          "type": "brick",
        },
        Object {
          "name": "next-builder.provider-get-all-providers",
          "type": "provider",
        },
        Object {
          "name": "providers-of-cmdb.get-instance-list",
          "type": "provider",
        },
        Object {
          "name": "providers-of-cmdb.get-instance-detail",
          "type": "provider",
        },
        Object {
          "id": "P-01",
          "name": "tpl-a",
          "type": "customTemplate",
        },
        Object {
          "id": "P-02",
          "name": "tpl-b",
          "type": "customTemplate",
        },
        Object {
          "name": "test-a.template-a1",
          "type": "template",
        },
        Object {
          "name": "test-a.template-a2",
          "type": "template",
        },
        Object {
          "name": "test-b.template-b1",
          "type": "template",
        },
        Object {
          "name": "test-b.template-b2",
          "type": "template",
        },
      ]
    `);
  });
});
