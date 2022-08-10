import { developHelper, getRuntime, i18nText } from "@next-core/brick-kit";
import { BootstrapV2Api_brickPackageInfo } from "@next-sdk/api-gateway-sdk";
import {
  InstanceApi_postSearchV3,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";

jest.mock("@next-core/brick-kit");
jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-sdk/api-gateway-sdk");

jest.spyOn(window.customElements, "define").mockImplementation(() => void 0);

(BootstrapV2Api_brickPackageInfo as jest.Mock).mockResolvedValue({
  bricks: [
    "basic-bricks.micro-view",
    "basic-bricks.general-button",
    "basic-bricks.any-brick",
    "next-builder.builder-container",
    "next-builder.provider-get-all-providers",
    "providers-of-cmdb.get-instance-list",
    "providers-of-cmdb.get-instance-detail",
  ],
  providers: ["next-builder.provider-get-all-providers"],
  templates: [
    "test-a.template-a1",
    "test-a.template-a2",
    "test-b.template-b1",
    "test-b.template-b2",
  ],
});

(i18nText as jest.Mock).mockImplementation((data) => data?.zh);

// Given a graph:
//      x        y
//      ↓        ↓
//     x-1      y-1
//      ↓
//    ↙   ↘
// x-1-1 x-1-2
(InstanceGraphApi_traverseGraphV2 as jest.Mock).mockImplementation(() => ({
  topic_vertices: [
    {
      id: "S-01",
      instanceId: "x",
      snippetId: "hosted-snippet-x",
      text: {
        zh: "片段 X",
        en: "Snippet X",
      },
      category: "hosted",
      thumbnail: "url-x",
    },
    {
      id: "S-02",
      instanceId: "y",
      snippetId: "hosted-snippet-y",
      category: "hosted",
      thumbnail: "url-y",
    },
  ],
  vertices: [
    {
      instanceId: "x-1",
      type: "brick",
      brick: "easy-view",
      properties: '{"gap":10}',
    },
    {
      instanceId: "x-1-1",
      type: "brick",
      brick: "general-button",
      mountPoint: "a",
      events: '{"click":{"action":"console.log"}}',
    },
    {
      instanceId: "x-1-2",
      type: "provider",
      brick: "test-provider",
      mountPoint: "b",
      bg: true,
    },
    {
      instanceId: "y-1",
      type: "brick",
      brick: "easy-view",
      properties: '{"gridTemplateAreas":[["left","right"]]}',
    },
  ],
  edges: [
    {
      in: "x-1",
      out: "x",
      out_name: "children",
    },
    {
      in: "x-1-1",
      out: "x-1",
      out_name: "children",
    },
    {
      in: "x-1-2",
      out: "x-1",
      out_name: "children",
    },
    {
      in: "y-1",
      out: "y",
      out_name: "children",
    },
  ],
}));

(InstanceApi_postSearchV3 as jest.Mock).mockImplementation(
  (objectId: string) => {
    switch (objectId) {
      case "STORYBOARD_TEMPLATE":
        return {
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
        };
      case "INSTALLED_BRICK_ATOM@EASYOPS":
        return {
          list: [
            {
              id: "basic-bricks.general-button",
              text: {
                zh: "普通按钮",
                en: "General Button",
              },
              category: "button",
              description: {
                zh: "一个普通的按钮",
                en: "A general button",
              },
              icon: { lib: "antd", type: "box" },
            },
            {
              id: "basic-bricks.any-brick",
              layerType: "widget",
              thumbnail: "base64.png",
            },
          ],
        };
      case "INSTALLED_BRICK_SNIPPET@EASYOPS":
        return {
          list: [
            {
              id: "installed-snippet-a",
              text: {
                zh: "片段 A",
                en: "Snippet A",
              },
              category: "layout",
              thumbnail: "url-1",
              bricks: [],
            },
            {
              id: "installed-snippet-b",
              category: "layout",
              thumbnail: "url-2",
              bricks: [],
            },
          ],
        };
    }
  }
);

const mockGetFeatureFlags = jest.fn();
(getRuntime as jest.Mock).mockReturnValue({
  getFeatureFlags: mockGetFeatureFlags,
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GetBrickLibrary } = require("./GetBrickLibrary");

describe("GetBrickLibrary", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", async () => {
    mockGetFeatureFlags.mockReturnValueOnce({
      "next-builder-installed-bricks": true,
    });
    expect(await GetBrickLibrary({ projectId: "test-project" }))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "$searchTextPool": Array [
            "basic-bricks.micro-view",
          ],
          "id": "basic-bricks.micro-view",
          "title": "micro-view",
          "type": "brick",
        },
        Object {
          "$searchTextPool": Array [
            "普通按钮",
            "general button",
            "basic-bricks.general-button",
          ],
          "category": "button",
          "description": "一个普通的按钮",
          "editor": undefined,
          "editorProps": undefined,
          "icon": Object {
            "lib": "antd",
            "type": "box",
          },
          "id": "basic-bricks.general-button",
          "layerType": "brick",
          "thumbnail": undefined,
          "title": "普通按钮",
          "type": "brick",
        },
        Object {
          "$searchTextPool": Array [
            "basic-bricks.any-brick",
          ],
          "category": undefined,
          "description": undefined,
          "editor": undefined,
          "editorProps": undefined,
          "icon": undefined,
          "id": "basic-bricks.any-brick",
          "layerType": "widget",
          "thumbnail": "base64.png",
          "title": "any-brick",
          "type": "brick",
        },
        Object {
          "$searchTextPool": Array [
            "next-builder.builder-container",
          ],
          "id": "next-builder.builder-container",
          "title": "builder-container",
          "type": "brick",
        },
        Object {
          "$searchTextPool": Array [
            "next-builder.provider-get-all-providers",
          ],
          "id": "next-builder.provider-get-all-providers",
          "title": "provider-get-all-providers",
          "type": "provider",
        },
        Object {
          "$searchTextPool": Array [
            "providers-of-cmdb.get-instance-list",
          ],
          "id": "providers-of-cmdb.get-instance-list",
          "title": "get-instance-list",
          "type": "provider",
        },
        Object {
          "$searchTextPool": Array [
            "providers-of-cmdb.get-instance-detail",
          ],
          "id": "providers-of-cmdb.get-instance-detail",
          "title": "get-instance-detail",
          "type": "provider",
        },
        Object {
          "$searchTextPool": Array [
            "tpl-a",
          ],
          "id": "tpl-a",
          "instanceId": "a",
          "layerType": undefined,
          "nodeId": "P-01",
          "title": "tpl-a",
          "type": "customTemplate",
        },
        Object {
          "$searchTextPool": Array [
            "tpl-b",
          ],
          "id": "tpl-b",
          "instanceId": "b",
          "layerType": undefined,
          "nodeId": "P-02",
          "title": "tpl-b",
          "type": "customTemplate",
        },
        Object {
          "$searchTextPool": Array [
            "片段 a",
            "snippet a",
            "installed-snippet-a",
          ],
          "bricks": Array [],
          "category": "layout",
          "description": undefined,
          "id": "installed-snippet-a",
          "layerType": undefined,
          "thumbnail": "url-1",
          "title": "片段 A",
          "type": "snippet",
        },
        Object {
          "$searchTextPool": Array [
            "installed-snippet-b",
          ],
          "bricks": Array [],
          "category": "layout",
          "description": undefined,
          "id": "installed-snippet-b",
          "layerType": undefined,
          "thumbnail": "url-2",
          "title": "installed-snippet-b",
          "type": "snippet",
        },
        Object {
          "$searchTextPool": Array [
            "片段 x",
            "snippet x",
            "hosted-snippet-x",
          ],
          "bricks": Array [
            Object {
              "brick": "easy-view",
              "iid": "x-1",
              "properties": Object {
                "gap": 10,
              },
              "slots": Object {
                "a": Object {
                  "bricks": Array [
                    Object {
                      "brick": "general-button",
                      "events": Object {
                        "click": Object {
                          "action": "console.log",
                        },
                      },
                      "iid": "x-1-1",
                    },
                  ],
                  "type": "bricks",
                },
                "b": Object {
                  "bricks": Array [
                    Object {
                      "bg": true,
                      "brick": "test-provider",
                      "iid": "x-1-2",
                    },
                  ],
                  "type": "bricks",
                },
              },
            },
          ],
          "category": "hosted",
          "description": undefined,
          "id": "hosted-snippet-x",
          "isHostedSnippet": true,
          "layerType": undefined,
          "nodeId": "S-01",
          "thumbnail": "url-x",
          "title": "片段 X",
          "type": "snippet",
        },
        Object {
          "$searchTextPool": Array [
            "hosted-snippet-y",
          ],
          "bricks": Array [
            Object {
              "brick": "easy-view",
              "iid": "y-1",
              "properties": Object {
                "gridTemplateAreas": Array [
                  Array [
                    "left",
                    "right",
                  ],
                ],
              },
            },
          ],
          "category": "hosted",
          "description": undefined,
          "id": "hosted-snippet-y",
          "isHostedSnippet": true,
          "layerType": undefined,
          "nodeId": "S-02",
          "thumbnail": "url-y",
          "title": "hosted-snippet-y",
          "type": "snippet",
        },
        Object {
          "$searchTextPool": Array [
            "test-a.template-a1",
          ],
          "id": "test-a.template-a1",
          "title": "template-a1",
          "type": "template",
        },
        Object {
          "$searchTextPool": Array [
            "test-a.template-a2",
          ],
          "id": "test-a.template-a2",
          "title": "template-a2",
          "type": "template",
        },
        Object {
          "$searchTextPool": Array [
            "test-b.template-b1",
          ],
          "id": "test-b.template-b1",
          "title": "template-b1",
          "type": "template",
        },
        Object {
          "$searchTextPool": Array [
            "test-b.template-b2",
          ],
          "id": "test-b.template-b2",
          "title": "template-b2",
          "type": "template",
        },
      ]
    `);
  });

  it("should ignore snippets if relevant feature flags are not enabled", async () => {
    mockGetFeatureFlags.mockReturnValueOnce({});
    expect(
      (await GetBrickLibrary({ projectId: "test-project" })).some(
        (brick) => brick.type === "snippet"
      )
    ).toBe(false);
    expect(InstanceApi_postSearchV3).toBeCalledTimes(1);
    expect((InstanceApi_postSearchV3 as jest.Mock).mock.calls[0][0]).toBe(
      "STORYBOARD_TEMPLATE"
    );
    expect(InstanceGraphApi_traverseGraphV2).not.toBeCalled();
  });

  it("should ignore snippets if relevant feature flags are enabled but `ignoreSnippets` is `true`", async () => {
    mockGetFeatureFlags.mockReturnValueOnce({
      "next-builder-installed-bricks": true,
    });
    expect(
      (
        await GetBrickLibrary({
          projectId: "test-project",
          ignoreSnippets: true,
        })
      ).some((brick) => brick.type === "snippet")
    ).toBe(false);
    expect(InstanceApi_postSearchV3).toBeCalledTimes(2);
    expect((InstanceApi_postSearchV3 as jest.Mock).mock.calls[0][0]).toBe(
      "STORYBOARD_TEMPLATE"
    );
    expect((InstanceApi_postSearchV3 as jest.Mock).mock.calls[1][0]).toBe(
      "INSTALLED_BRICK_ATOM@EASYOPS"
    );
    expect(InstanceGraphApi_traverseGraphV2).not.toBeCalled();
  });
});
