import { developHelper, getRuntime, i18nText } from "@next-core/brick-kit";
import {
  InstanceApi_postSearchV3,
  InstanceGraphApi_traverseGraphV2,
} from "@next-sdk/cmdb-sdk";

jest.mock("@next-core/brick-kit");
jest.mock("@next-sdk/cmdb-sdk");

jest.spyOn(window.customElements, "define").mockImplementation(() => void 0);

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

(i18nText as jest.Mock).mockImplementation((data) => data?.zh);

// Given a graph:
//      x        y
//      ↓        ↓
//     x-1      y-1
//      ↓
//    ↙   ↘
// x-1-1 x-1-2
(InstanceGraphApi_traverseGraphV2 as jest.Mock).mockResolvedValue({
  topic_vertices: [
    {
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
});

const mockGetFeatureFlags = jest.fn();
(getRuntime as jest.Mock).mockReturnValue({
  getFeatureFlags: mockGetFeatureFlags,
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GetBrickLibrary } = require("./GetBrickLibrary");

describe("GetBrickLibrary", () => {
  beforeEach(() => {
    (InstanceApi_postSearchV3 as jest.Mock)
      .mockResolvedValueOnce({
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
      })
      .mockResolvedValueOnce({
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
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", async () => {
    mockGetFeatureFlags.mockReturnValueOnce({
      "next-builder-installed-snippets": true,
      "next-builder-hosted-snippets": true,
    });
    expect(await GetBrickLibrary({ projectId: "test-project" }))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "basic-bricks.micro-view",
          "title": "micro-view",
          "type": "brick",
        },
        Object {
          "id": "basic-bricks.general-button",
          "title": "general-button",
          "type": "brick",
        },
        Object {
          "id": "next-builder.builder-container",
          "title": "builder-container",
          "type": "brick",
        },
        Object {
          "id": "next-builder.provider-get-all-providers",
          "title": "provider-get-all-providers",
          "type": "provider",
        },
        Object {
          "id": "providers-of-cmdb.get-instance-list",
          "title": "get-instance-list",
          "type": "provider",
        },
        Object {
          "id": "providers-of-cmdb.get-instance-detail",
          "title": "get-instance-detail",
          "type": "provider",
        },
        Object {
          "id": "P-01",
          "layerType": undefined,
          "title": "tpl-a",
          "type": "customTemplate",
        },
        Object {
          "id": "P-02",
          "layerType": undefined,
          "title": "tpl-b",
          "type": "customTemplate",
        },
        Object {
          "bricks": Array [],
          "category": "layout",
          "id": "installed-snippet-a",
          "layerType": undefined,
          "thumbnail": "url-1",
          "title": "片段 A",
          "type": "snippet",
        },
        Object {
          "bricks": Array [],
          "category": "layout",
          "id": "installed-snippet-b",
          "layerType": undefined,
          "thumbnail": "url-2",
          "title": "installed-snippet-b",
          "type": "snippet",
        },
        Object {
          "bricks": Array [
            Object {
              "brick": "easy-view",
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
                    },
                  ],
                  "type": "bricks",
                },
                "b": Object {
                  "bricks": Array [
                    Object {
                      "bg": true,
                      "brick": "test-provider",
                    },
                  ],
                  "type": "bricks",
                },
              },
            },
          ],
          "category": "hosted",
          "id": undefined,
          "isHostedSnippets": true,
          "layerType": undefined,
          "thumbnail": "url-x",
          "title": "片段 X",
          "type": "snippet",
        },
        Object {
          "bricks": Array [
            Object {
              "brick": "easy-view",
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
          "id": undefined,
          "isHostedSnippets": true,
          "layerType": undefined,
          "thumbnail": "url-y",
          "title": "hosted-snippet-y",
          "type": "snippet",
        },
        Object {
          "id": "test-a.template-a1",
          "title": "template-a1",
          "type": "template",
        },
        Object {
          "id": "test-a.template-a2",
          "title": "template-a2",
          "type": "template",
        },
        Object {
          "id": "test-b.template-b1",
          "title": "template-b1",
          "type": "template",
        },
        Object {
          "id": "test-b.template-b2",
          "title": "template-b2",
          "type": "template",
        },
      ]
    `);
  });

  it("should ignore snippets", async () => {
    mockGetFeatureFlags.mockReturnValueOnce({});
    expect(
      (await GetBrickLibrary({ projectId: "test-project" })).some(
        (brick) => brick.type === "snippet"
      )
    ).toBe(false);
    expect(InstanceApi_postSearchV3).toBeCalledTimes(1);
    expect(InstanceGraphApi_traverseGraphV2).not.toBeCalled();
  });
});
