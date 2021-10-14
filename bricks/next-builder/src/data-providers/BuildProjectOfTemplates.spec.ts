import { InstanceGraphApi_traverseGraphV2, InstanceApi_getDetail } from "@next-sdk/cmdb-sdk";
import {
  BuildInfoForProjectOfTemplates,
  BuildProjectOfTemplates,
  BuildProjectOfTemplatesParams,
  safeJSONParse,
  getSuffix,
} from "./BuildProjectOfTemplates";

jest.mock("@next-sdk/cmdb-sdk");
const consoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => void 0);

// And given a graph of templates:
//      t        u
//      ↓        ↓
//     t-1      u-1
//      ↓
//    ↙   ↘
// t-1-1 t-1-2
//
// Given a graph of snippets:
//      x        y
//      ↓        ↓
//     x-1      y-1
//      ↓
//    ↙   ↘
// x-1-1 x-1-2
(InstanceGraphApi_traverseGraphV2 as jest.Mock).mockImplementation(
  (graphParams) =>
    graphParams.object_id === "STORYBOARD_TEMPLATE"
      ? {
          topic_vertices: [
            {
              appId: "test",
              id: "T-01",
              instanceId: "t",
              templateId: "template-t",
              creator: "abc",
              proxy: null,
            },
            {
              appId: "test",
              id: "T-02",
              instanceId: "u",
              templateId: "template-u",
              creator: "abc",
              thumbnail: "data:image/jpeg;base64, xxx",
              proxy: `{
                "properties": {
                  "a": {
                    "ref":"b",
                    "refProperty":"c",
                    "description": "properties介绍",
                    "type": "string",
                    "default": "hello",
                    "required": "false"
                  },
                  "b": {
                    "ref": "b-ref",
                    "refProperty": "b-property"
                  }
                },
                "events": {
                  "a.click": {
                    "ref": "d",
                    "refEvent": "general.a.click",
                    "detail": "{data:Record<string,any>[]}",
                    "description": "events介绍"
                  }
                },
                "methods": {
                  "sayHello": {
                    "ref": "e",
                    "refMethod": "a.say",
                    "params": "{ id: string | number, name: string }",
                    "description": "methods介绍"
                  }
                },
                "slots": {
                  "toolbar": {
                    "ref": "f",
                    "refSlot": "f-toobar",
                    "description": "slots介绍"
                  }
                }
              }`,
            },
            {
              appId: "test",
              id: "T-03",
              instanceId: "v",
              templateId: "template-v",
              creator: "abc",
              proxy: `{
                "properties": null,
                "events": {},
                "methods": 1
              }`,
            },
          ],
          vertices: [
            {
              instanceId: "t-1",
              type: "brick",
              brick: "easy-view",
              properties: `{"gap":"<% PROCESSORS.myPkg.myFunc() %>"}`,
            },
            {
              instanceId: "t-1-1",
              type: "brick",
              brick: "general-button",
              mountPoint: "a",
              events: '{"click":{"action":"console.log"}}',
            },
            {
              instanceId: "t-1-2",
              type: "provider",
              brick: "test-provider",
              mountPoint: "b",
              bg: true,
            },
            {
              appId: 'test-app',
              instanceId: "u-1",
              type: "brick",
              brick: "template-t",
              properties: '{"gridTemplateAreas":[["left","right"]],"url":"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png"}',
            },
          ],
          edges: [
            {
              in: "t-1",
              out: "t",
              out_name: "children",
            },
            {
              in: "t-1-1",
              out: "t-1",
              out_name: "children",
            },
            {
              in: "t-1-2",
              out: "t-1",
              out_name: "children",
            },
            {
              in: "u-1",
              out: "u",
              out_name: "children",
            },
          ],
        }
      : graphParams.query["project.instanceId"] === "project-1"
      ? {
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
              properties: `{"gap":10}`,
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
        }
      : {}
);

(InstanceApi_getDetail as jest.Mock).mockImplementation(() => ({
  imgs: [
    {
      "name": "viewpoint.png",
      "url": "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png"
    },
    {
      "name": "blue-bg.png",
      "url": "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/blue-bg1632809958790451533.png"
    },
  ]
}))

describe("BuildProjectOfTemplates", () => {
  it.each<[BuildProjectOfTemplatesParams, BuildInfoForProjectOfTemplates]>([
    [
      {
        appId: "app-1",
        projectId: "project-1",
      },
      {
        files: [
          {
            path: "dist/bricks.json",
            content: `{
  "bricks": [
    "app-1.template-t",
    "app-1.template-u",
    "app-1.template-v"
  ]
}`,
          },
          {
            path: "dist/index.dec40b57.js",
            content: expect.stringContaining(`
Object(n.getRuntime)().registerCustomTemplate("app-1.template-t", {
  "bricks": [
    {
      "brick": "easy-view",
      "properties": {
        "gap": "<% PROCESSORS.myPkg.myFunc() %>"
      },
      "slots": {
        "a": {
          "type": "bricks",
          "bricks": [
            {
              "brick": "general-button",
              "events": {
                "click": {
                  "action": "console.log"
                }
              }
            }
          ]
        },
        "b": {
          "type": "bricks",
          "bricks": [
            {
              "brick": "test-provider",
              "bg": true
            }
          ]
        }
      }
    }
  ]
}),
Object(n.getRuntime)().registerCustomTemplate("app-1.template-u", {
  "proxy": {
    "properties": {
      "a": {
        "ref": "b",
        "refProperty": "c",
        "description": "properties介绍",
        "type": "string",
        "default": "hello",
        "required": "false"
      },
      "b": {
        "ref": "b-ref",
        "refProperty": "b-property"
      }
    },
    "events": {
      "a.click": {
        "ref": "d",
        "refEvent": "general.a.click",
        "detail": "{data:Record<string,any>[]}",
        "description": "events介绍"
      }
    },
    "methods": {
      "sayHello": {
        "ref": "e",
        "refMethod": "a.say",
        "params": "{ id: string | number, name: string }",
        "description": "methods介绍"
      }
    },
    "slots": {
      "toolbar": {
        "ref": "f",
        "refSlot": "f-toobar",
        "description": "slots介绍"
      }
    }
  },
  "bricks": [
    {
      "brick": "app-1.template-t",
      "properties": {
        "gridTemplateAreas": [
          [
            "left",
            "right"
          ]
        ],
        "url": "bricks/app-1/dist/assets/6659b229.png"
      }
    }
  ]
}),
Object(n.getRuntime)().registerCustomTemplate("app-1.template-v", {
  "proxy": {
    "properties": null,
    "events": {},
    "methods": 1
  },
  "bricks": []
})
`),
          },
          {
            path: "dist/stories.json",
            content: `[
  {
    "storyId": "test.template-t",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "doc": {
      "id": "test.template-t",
      "name": "test.template-t",
      "dockind": "brick",
      "properties": null,
      "author": "abc",
      "slots": null,
      "history": null
    },
    "conf": [],
    "originData": {
      "appId": "test",
      "id": "T-01",
      "instanceId": "t",
      "templateId": "template-t",
      "creator": "abc",
      "proxy": null,
      "children": [
        {
          "instanceId": "t-1",
          "type": "brick",
          "brick": "easy-view",
          "properties": "{\\\"gap\\\":\\\"<% PROCESSORS.myPkg.myFunc() %>\\\"}",
          "children": [
            {
              "instanceId": "t-1-1",
              "type": "brick",
              "brick": "general-button",
              "mountPoint": "a",
              "events": "{\\\"click\\\":{\\\"action\\\":\\\"console.log\\\"}}"
            },
            {
              "instanceId": "t-1-2",
              "type": "provider",
              "brick": "test-provider",
              "mountPoint": "b",
              "bg": true
            }
          ]
        }
      ]
    }
  },
  {
    "storyId": "test.template-u",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "thumbnail": "data:image/jpeg;base64, xxx",
    "doc": {
      "id": "test.template-u",
      "name": "test.template-u",
      "dockind": "brick",
      "properties": [
        {
          "name": "a",
          "type": "string",
          "required": "false",
          "default": "hello",
          "description": "properties介绍"
        },
        {
          "name": "b",
          "type": "-",
          "required": "-",
          "default": "-",
          "description": "-"
        }
      ],
      "author": "abc",
      "slots": [
        {
          "name": "toolbar",
          "description": "slots介绍"
        }
      ],
      "history": null,
      "events": [
        {
          "type": "a.click",
          "detail": "{data:Record<string,any>[]}",
          "description": "events介绍"
        }
      ],
      "methods": [
        {
          "name": "sayHello",
          "params": "{ id: string | number, name: string }",
          "description": "methods介绍"
        }
      ]
    },
    "conf": [],
    "originData": {
      "appId": "test",
      "id": "T-02",
      "instanceId": "u",
      "templateId": "template-u",
      "creator": "abc",
      "proxy": "{\\n                \\"properties\\": {\\n                  \\"a\\": {\\n                    \\"ref\\":\\"b\\",\\n                    \\"refProperty\\":\\"c\\",\\n                    \\"description\\": \\"properties介绍\\",\\n                    \\"type\\": \\"string\\",\\n                    \\"default\\": \\"hello\\",\\n                    \\"required\\": \\"false\\"\\n                  },\\n                  \\"b\\": {\\n                    \\"ref\\": \\"b-ref\\",\\n                    \\"refProperty\\": \\"b-property\\"\\n                  }\\n                },\\n                \\"events\\": {\\n                  \\"a.click\\": {\\n                    \\"ref\\": \\"d\\",\\n                    \\"refEvent\\": \\"general.a.click\\",\\n                    \\"detail\\": \\"{data:Record<string,any>[]}\\",\\n                    \\"description\\": \\"events介绍\\"\\n                  }\\n                },\\n                \\"methods\\": {\\n                  \\"sayHello\\": {\\n                    \\"ref\\": \\"e\\",\\n                    \\"refMethod\\": \\"a.say\\",\\n                    \\"params\\": \\"{ id: string | number, name: string }\\",\\n                    \\"description\\": \\"methods介绍\\"\\n                  }\\n                },\\n                \\"slots\\": {\\n                  \\"toolbar\\": {\\n                    \\"ref\\": \\"f\\",\\n                    \\"refSlot\\": \\"f-toobar\\",\\n                    \\"description\\": \\"slots介绍\\"\\n                  }\\n                }\\n              }",
      "children": [
        {
          "appId": "test-app",
          "instanceId": "u-1",
          "type": "brick",
          "brick": "test-app.template-t",
          "properties": "{\\\"gridTemplateAreas\\\":[[\\\"left\\\",\\\"right\\\"]],\\\"url\\\":\\\"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png\\\"}"
        }
      ]
    }
  },
  {
    "storyId": "test.template-v",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "doc": {
      "id": "test.template-v",
      "name": "test.template-v",
      "dockind": "brick",
      "author": "abc",
      "history": null
    },
    "conf": [],
    "originData": {
      "appId": "test",
      "id": "T-03",
      "instanceId": "v",
      "templateId": "template-v",
      "creator": "abc",
      "proxy": "{\\n                \\"properties\\": null,\\n                \\"events\\": {},\\n                \\"methods\\": 1\\n              }"
    }
  }
]`,
          },
          {
            path: "dist/snippets.json",
            content: `{
  "snippets": [
    {
      "id": "app-1.hosted-snippet-x",
      "category": "hosted",
      "text": {
        "zh": "片段 X",
        "en": "Snippet X"
      },
      "thumbnail": "url-x",
      "bricks": [
        {
          "brick": "easy-view",
          "properties": {
            "gap": 10
          },
          "slots": {
            "a": {
              "type": "bricks",
              "bricks": [
                {
                  "brick": "general-button",
                  "events": {
                    "click": {
                      "action": "console.log"
                    }
                  }
                }
              ]
            },
            "b": {
              "type": "bricks",
              "bricks": [
                {
                  "brick": "test-provider",
                  "bg": true
                }
              ]
            }
          }
        }
      ]
    },
    {
      "id": "app-1.hosted-snippet-y",
      "category": "hosted",
      "thumbnail": "url-y",
      "bricks": [
        {
          "brick": "easy-view",
          "properties": {
            "gridTemplateAreas": [
              [
                "left",
                "right"
              ]
            ]
          }
        }
      ]
    }
  ]
}`,
          },
        ],
        dependBricks: ["easy-view", "general-button", "test-provider"],
        dependProcessorPackages: ["my-pkg"],
        images:  {
          imagesDir: "dist/assets",
          imagesPath:  [
              {
              fileName: "6659b229.png",
              imageOssPath: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png",
            },
              {
              fileName: "6c079b14.png",
              imageOssPath: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/blue-bg1632809958790451533.png",
            },
          ],
        },
      },
    ],
    [
      {
        appId: "app-2",
        projectId: "project-2",
      },
      {
        files: [
          {
            path: "dist/bricks.json",
            content: `{
  "bricks": [
    "app-2.template-t",
    "app-2.template-u",
    "app-2.template-v"
  ]
}`,
          },
          {
            path: "dist/index.1f72542c.js",
            content: expect.stringContaining(
              'registerCustomTemplate("app-2.template-t",'
            ),
          },
          {
            path: "dist/stories.json",
            content: `[
  {
    "storyId": "test.template-t",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "doc": {
      "id": "test.template-t",
      "name": "test.template-t",
      "dockind": "brick",
      "properties": null,
      "author": "abc",
      "slots": null,
      "history": null
    },
    "conf": [],
    "originData": {
      "appId": "test",
      "id": "T-01",
      "instanceId": "t",
      "templateId": "template-t",
      "creator": "abc",
      "proxy": null,
      "children": [
        {
          "instanceId": "t-1",
          "type": "brick",
          "brick": "easy-view",
          "properties": "{\\\"gap\\\":\\\"<% PROCESSORS.myPkg.myFunc() %>\\\"}",
          "children": [
            {
              "instanceId": "t-1-1",
              "type": "brick",
              "brick": "general-button",
              "mountPoint": "a",
              "events": "{\\\"click\\\":{\\\"action\\\":\\\"console.log\\\"}}"
            },
            {
              "instanceId": "t-1-2",
              "type": "provider",
              "brick": "test-provider",
              "mountPoint": "b",
              "bg": true
            }
          ]
        }
      ]
    }
  },
  {
    "storyId": "test.template-u",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "thumbnail": "data:image/jpeg;base64, xxx",
    "doc": {
      "id": "test.template-u",
      "name": "test.template-u",
      "dockind": "brick",
      "properties": [
        {
          "name": "a",
          "type": "string",
          "required": "false",
          "default": "hello",
          "description": "properties介绍"
        },
        {
          "name": "b",
          "type": "-",
          "required": "-",
          "default": "-",
          "description": "-"
        }
      ],
      "author": "abc",
      "slots": [
        {
          "name": "toolbar",
          "description": "slots介绍"
        }
      ],
      "history": null,
      "events": [
        {
          "type": "a.click",
          "detail": "{data:Record<string,any>[]}",
          "description": "events介绍"
        }
      ],
      "methods": [
        {
          "name": "sayHello",
          "params": "{ id: string | number, name: string }",
          "description": "methods介绍"
        }
      ]
    },
    "conf": [],
    "originData": {
      "appId": "test",
      "id": "T-02",
      "instanceId": "u",
      "templateId": "template-u",
      "creator": "abc",
      "proxy": "{\\n                \\\"properties\\\": {\\n                  \\\"a\\\": {\\n                    \\\"ref\\\":\\\"b\\\",\\n                    \\\"refProperty\\\":\\\"c\\\",\\n                    \\\"description\\\": \\\"properties介绍\\\",\\n                    \\\"type\\\": \\\"string\\\",\\n                    \\\"default\\\": \\\"hello\\\",\\n                    \\\"required\\\": \\\"false\\\"\\n                  },\\n                  \\\"b\\\": {\\n                    \\\"ref\\\": \\\"b-ref\\\",\\n                    \\\"refProperty\\\": \\\"b-property\\\"\\n                  }\\n                },\\n                \\\"events\\\": {\\n                  \\\"a.click\\\": {\\n                    \\\"ref\\\": \\\"d\\\",\\n                    \\\"refEvent\\\": \\\"general.a.click\\\",\\n                    \\\"detail\\\": \\\"{data:Record<string,any>[]}\\\",\\n                    \\\"description\\\": \\\"events介绍\\\"\\n                  }\\n                },\\n                \\\"methods\\\": {\\n                  \\\"sayHello\\\": {\\n                    \\\"ref\\\": \\\"e\\\",\\n                    \\\"refMethod\\\": \\\"a.say\\\",\\n                    \\\"params\\\": \\\"{ id: string | number, name: string }\\\",\\n                    \\\"description\\\": \\\"methods介绍\\\"\\n                  }\\n                },\\n                \\\"slots\\\": {\\n                  \\\"toolbar\\\": {\\n                    \\\"ref\\\": \\\"f\\\",\\n                    \\\"refSlot\\\": \\\"f-toobar\\\",\\n                    \\\"description\\\": \\\"slots介绍\\\"\\n                  }\\n                }\\n              }",
      "children": [
        {
          "appId": "test-app",
          "instanceId": "u-1",
          "type": "brick",
          "brick": "test-app.template-t",
          "properties": "{\\\"gridTemplateAreas\\\":[[\\\"left\\\",\\\"right\\\"]],\\\"url\\\":\\\"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png\\\"}"
        }
      ]
    }
  },
  {
    "storyId": "test.template-v",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "doc": {
      "id": "test.template-v",
      "name": "test.template-v",
      "dockind": "brick",
      "author": "abc",
      "history": null
    },
    "conf": [],
    "originData": {
      "appId": "test",
      "id": "T-03",
      "instanceId": "v",
      "templateId": "template-v",
      "creator": "abc",
      "proxy": "{\\n                \\"properties\\": null,\\n                \\"events\\": {},\\n                \\"methods\\": 1\\n              }"
    }
  }
]`,
          },
        ],
        dependBricks: ["easy-view", "general-button", "test-provider"],
        dependProcessorPackages: ["my-pkg"],
        images:  {
          imagesDir: "dist/assets",
          imagesPath:  [
              {
              fileName: "6659b229.png",
              imageOssPath: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png",
            },
              {
              fileName: "6c079b14.png",
              imageOssPath: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/blue-bg1632809958790451533.png",
            },
          ],
        },
      },
    ],
  ])("BuildProjectOfTemplates(%j) should work", async (params, result) => {
    const buildResult = await BuildProjectOfTemplates(params);
    expect(buildResult).toEqual(result);
  });

  it("safe JSON parse, test", () => {
    const rightJSON = `{
      "name": "abc",
      "age": 18
    }`;
    const errorJSON = `{
      "name": "abc",
      "age": 18,
    }`;
    expect(safeJSONParse(rightJSON)).toEqual({
      name: "abc",
      age: 18,
    });
    safeJSONParse(errorJSON);
    expect(consoleError).toBeCalledTimes(1);
  });

  it.each<[string, string | undefined]>(
    [
      [
        'abc.png',
        'png',
      ],
      [
        'abc.20211014.jpeg',
        'jpeg',
      ],
      [
        'abc',
        'abc'
      ],
      [
        undefined,
        undefined
      ]
    ]
  )("getSuffix should work", (data, result) => {
    const suffix = getSuffix(data);
    expect(suffix).toEqual(result);
  })
});
