import {
  InstanceGraphApi_traverseGraphV2,
  InstanceApi_getDetail,
} from "@next-sdk/cmdb-sdk";
import {
  BuildInfoForProjectOfTemplates,
  BuildProjectOfTemplates,
  BuildProjectOfTemplatesParams,
  safeJSONParse,
  getSuffix,
  getDeepDependencies,
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
              thumbnail: "www.xxx.com/url/abc.png",
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
                  },
                  "c": {
                    "ref": "c-ref",
                    "refProperty": "c-property",
                    "type": "cProps"
                  },
                  "d": {
                    "asVariable": true,
                    "type": "dProps"
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
                },
                "interface": {
                  "cProps": {
                    "a": {
                      "type": "string",
                      "description": "this is a",
                      "required": "false"
                    },
                    "b": "boolean",
                    "c": "Record<string, any>",
                    "d": "Array<cProps-childProps>"
                  },
                  "cProps-childProps": {
                    "e": "any"
                  }
                },
                "examples": [
                  {
                    "brick": "test.template-u",
                    "properties": {
                      "a": "test"
                    }
                  }
                ]
              }`,
            },
            {
              appId: "test",
              id: "T-03",
              instanceId: "v",
              templateId: "template-v",
              creator: "abc",
              thumbnail: null,
              proxy: `{
                "properties": null,
                "events": {},
                "methods": 1
              }`,
            },
            {
              appId: "test",
              id: "T-04",
              instanceId: "w",
              templateId: "template-w",
              creator: "abc",
              proxy: `{
                "properties": {
                  "FProps": {
                    "ref": "f-ref",
                    "refProperty": "f",
                    "type": "fProps"
                  }
                },
                "interface": {
                  "fProps": {
                    "a": "string"
                  }
                },
                "examples": {
                  "brick": "test.template-w",
                  "properties": {
                    "a": "test"
                  }
                }
              }`,
            },
          ],
          vertices: [
            {
              instanceId: "t-1",
              type: "brick",
              brick: "easy-view",
              properties: `{"gap":"<% PROCESSORS.myPkg.myFunc(FN.abc()) %>"}`,
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
              appId: "test-app",
              instanceId: "u-1",
              type: "brick",
              brick: "template-t",
              properties:
                '{"gridTemplateAreas":[["left","right"]],"url":"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png"}',
            },
            // {
            //   instanceId: "w-1",
            //   appId: "test-app",
            //   type: "brick",
            //   brick: "template-w",
            //   properties: {}
            // }
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
            // {
            //   in: "w-1",
            //   out: "u",
            //   out_name: "children"
            // }
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
              thumbnail: "www.xxx.com/url/abc.jpeg",
            },
            {
              id: "S-02",
              instanceId: "y",
              snippetId: "hosted-snippet-y",
              category: "hosted",
              thumbnail: null,
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
      name: "viewpoint.png",
      url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png",
    },
    {
      name: "blue-bg.png",
      url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/blue-bg1632809958790451533.png",
    },
  ],
  functions: [
    {
      name: "abc",
      source: "function abc() {}",
      tests: [],
    },
    {
      name: "xyz",
      source: "function xyz() {}",
      typescript: true,
    },
  ],
}));

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
    "app-1.template-v",
    "app-1.template-w"
  ]
}`,
          },
          {
            path: "dist/index.1ac2dc8c.js",
            content: expect.stringContaining(`
Object(n.getRuntime)().registerCustomTemplate("app-1.template-t", {
  "bricks": [
    {
      "brick": "easy-view",
      "properties": {
        "gap": "<% PROCESSORS.myPkg.myFunc(__WIDGET_FN__[\\"app-1\\"].abc()) %>"
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
      },
      "c": {
        "ref": "c-ref",
        "refProperty": "c-property",
        "type": "cProps"
      },
      "d": {
        "asVariable": true,
        "type": "dProps"
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
    },
    "interface": {
      "cProps": {
        "a": {
          "type": "string",
          "description": "this is a",
          "required": "false"
        },
        "b": "boolean",
        "c": "Record<string, any>",
        "d": "Array<cProps-childProps>"
      },
      "cProps-childProps": {
        "e": "any"
      }
    },
    "examples": [
      {
        "brick": "test.template-u",
        "properties": {
          "a": "test"
        }
      }
    ]
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
})`),
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
          "properties": "{\\"gap\\":\\"<% PROCESSORS.myPkg.myFunc(FN.abc()) %>\\"}",
          "children": [
            {
              "instanceId": "t-1-1",
              "type": "brick",
              "brick": "general-button",
              "mountPoint": "a",
              "events": "{\\"click\\":{\\"action\\":\\"console.log\\"}}"
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
    },
    "useWidget": []
  },
  {
    "storyId": "test.template-u",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "thumbnail": "bricks/app-1/dist/assets/15858a13.png",
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
        },
        {
          "name": "c",
          "type": "cProps",
          "required": "-",
          "default": "-",
          "description": "-"
        },
        {
          "name": "d",
          "type": "dProps",
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
      ],
      "interface": [
        {
          "kind": "interface",
          "name": "cProps",
          "typeParameter": null,
          "children": [
            {
              "description": "this is a",
              "name": "a",
              "required": "false",
              "type": "string"
            },
            {
              "description": "",
              "name": "b",
              "required": "",
              "type": "boolean"
            },
            {
              "description": "",
              "name": "c",
              "required": "",
              "type": "Record<string, any>"
            },
            {
              "description": "",
              "name": "d",
              "required": "",
              "type": "Array<cProps-childProps>"
            }
          ]
        },
        {
          "kind": "interface",
          "name": "cProps-childProps",
          "typeParameter": null,
          "children": [
            {
              "description": "",
              "name": "e",
              "required": "",
              "type": "any"
            }
          ]
        }
      ]
    },
    "conf": [
      {
        "brick": "test.template-u",
        "properties": {
          "a": "test"
        }
      }
    ],
    "originData": {
      "appId": "test",
      "id": "T-02",
      "instanceId": "u",
      "templateId": "template-u",
      "creator": "abc",
      "proxy": "{\\n                \\"properties\\": {\\n                  \\"a\\": {\\n                    \\"ref\\":\\"b\\",\\n                    \\"refProperty\\":\\"c\\",\\n                    \\"description\\": \\"properties介绍\\",\\n                    \\"type\\": \\"string\\",\\n                    \\"default\\": \\"hello\\",\\n                    \\"required\\": \\"false\\"\\n                  },\\n                  \\"b\\": {\\n                    \\"ref\\": \\"b-ref\\",\\n                    \\"refProperty\\": \\"b-property\\"\\n                  },\\n                  \\"c\\": {\\n                    \\"ref\\": \\"c-ref\\",\\n                    \\"refProperty\\": \\"c-property\\",\\n                    \\"type\\": \\"cProps\\"\\n                  },\\n                  \\"d\\": {\\n                    \\"asVariable\\": true,\\n                    \\"type\\": \\"dProps\\"\\n                  }\\n                },\\n                \\"events\\": {\\n                  \\"a.click\\": {\\n                    \\"ref\\": \\"d\\",\\n                    \\"refEvent\\": \\"general.a.click\\",\\n                    \\"detail\\": \\"{data:Record<string,any>[]}\\",\\n                    \\"description\\": \\"events介绍\\"\\n                  }\\n                },\\n                \\"methods\\": {\\n                  \\"sayHello\\": {\\n                    \\"ref\\": \\"e\\",\\n                    \\"refMethod\\": \\"a.say\\",\\n                    \\"params\\": \\"{ id: string | number, name: string }\\",\\n                    \\"description\\": \\"methods介绍\\"\\n                  }\\n                },\\n                \\"slots\\": {\\n                  \\"toolbar\\": {\\n                    \\"ref\\": \\"f\\",\\n                    \\"refSlot\\": \\"f-toobar\\",\\n                    \\"description\\": \\"slots介绍\\"\\n                  }\\n                },\\n                \\"interface\\": {\\n                  \\"cProps\\": {\\n                    \\"a\\": {\\n                      \\"type\\": \\"string\\",\\n                      \\"description\\": \\"this is a\\",\\n                      \\"required\\": \\"false\\"\\n                    },\\n                    \\"b\\": \\"boolean\\",\\n                    \\"c\\": \\"Record<string, any>\\",\\n                    \\"d\\": \\"Array<cProps-childProps>\\"\\n                  },\\n                  \\"cProps-childProps\\": {\\n                    \\"e\\": \\"any\\"\\n                  }\\n                },\\n                \\"examples\\": [\\n                  {\\n                    \\"brick\\": \\"test.template-u\\",\\n                    \\"properties\\": {\\n                      \\"a\\": \\"test\\"\\n                    }\\n                  }\\n                ]\\n              }",
      "children": [
        {
          "appId": "test-app",
          "instanceId": "u-1",
          "type": "brick",
          "brick": "test-app.template-t",
          "properties": "{\\"gridTemplateAreas\\":[[\\"left\\",\\"right\\"]],\\"url\\":\\"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png\\"}"
        }
      ]
    },
    "useWidget": [
      "test-app.template-t"
    ]
  },
  {
    "storyId": "test.template-v",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "thumbnail": null,
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
    },
    "useWidget": []
  },
  {
    "storyId": "test.template-w",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "doc": {
      "id": "test.template-w",
      "name": "test.template-w",
      "dockind": "brick",
      "properties": [
        {
          "name": "FProps",
          "type": "fProps",
          "required": "-",
          "default": "-",
          "description": "-"
        }
      ],
      "author": "abc",
      "history": null,
      "interface": [
        {
          "kind": "interface",
          "name": "fProps",
          "typeParameter": null,
          "children": [
            {
              "description": "",
              "name": "a",
              "required": "",
              "type": "string"
            }
          ]
        }
      ]
    },
    "conf": [
      {
        "brick": "test.template-w",
        "properties": {
          "a": "test"
        }
      }
    ],
    "originData": {
      "appId": "test",
      "id": "T-04",
      "instanceId": "w",
      "templateId": "template-w",
      "creator": "abc",
      "proxy": "{\\n                \\"properties\\": {\\n                  \\"FProps\\": {\\n                    \\"ref\\": \\"f-ref\\",\\n                    \\"refProperty\\": \\"f\\",\\n                    \\"type\\": \\"fProps\\"\\n                  }\\n                },\\n                \\"interface\\": {\\n                  \\"fProps\\": {\\n                    \\"a\\": \\"string\\"\\n                  }\\n                },\\n                \\"examples\\": {\\n                  \\"brick\\": \\"test.template-w\\",\\n                  \\"properties\\": {\\n                    \\"a\\": \\"test\\"\\n                  }\\n                }\\n              }"
    },
    "useWidget": []
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
      "thumbnail": "bricks/app-1/dist/assets/10ea16c7.jpeg",
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
      "thumbnail": null,
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
        images: {
          imagesDir: "dist/assets",
          imagesPath: [
            {
              fileName: "15858a13.png",
              imageOssPath: "www.xxx.com/url/abc.png",
            },
            {
              fileName: "10ea16c7.jpeg",
              imageOssPath: "www.xxx.com/url/abc.jpeg",
            },
            {
              fileName: "6659b229.png",
              imageOssPath:
                "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png",
            },
            {
              fileName: "6c079b14.png",
              imageOssPath:
                "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/blue-bg1632809958790451533.png",
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
    "app-2.template-v",
    "app-2.template-w"
  ]
}`,
          },
          {
            path: "dist/index.1a229581.js",
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
          "properties": "{\\"gap\\":\\"<% PROCESSORS.myPkg.myFunc(FN.abc()) %>\\"}",
          "children": [
            {
              "instanceId": "t-1-1",
              "type": "brick",
              "brick": "general-button",
              "mountPoint": "a",
              "events": "{\\"click\\":{\\"action\\":\\"console.log\\"}}"
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
    },
    "useWidget": []
  },
  {
    "storyId": "test.template-u",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "thumbnail": "bricks/app-2/dist/assets/15858a13.png",
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
        },
        {
          "name": "c",
          "type": "cProps",
          "required": "-",
          "default": "-",
          "description": "-"
        },
        {
          "name": "d",
          "type": "dProps",
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
      ],
      "interface": [
        {
          "kind": "interface",
          "name": "cProps",
          "typeParameter": null,
          "children": [
            {
              "description": "this is a",
              "name": "a",
              "required": "false",
              "type": "string"
            },
            {
              "description": "",
              "name": "b",
              "required": "",
              "type": "boolean"
            },
            {
              "description": "",
              "name": "c",
              "required": "",
              "type": "Record<string, any>"
            },
            {
              "description": "",
              "name": "d",
              "required": "",
              "type": "Array<cProps-childProps>"
            }
          ]
        },
        {
          "kind": "interface",
          "name": "cProps-childProps",
          "typeParameter": null,
          "children": [
            {
              "description": "",
              "name": "e",
              "required": "",
              "type": "any"
            }
          ]
        }
      ]
    },
    "conf": [
      {
        "brick": "test.template-u",
        "properties": {
          "a": "test"
        }
      }
    ],
    "originData": {
      "appId": "test",
      "id": "T-02",
      "instanceId": "u",
      "templateId": "template-u",
      "creator": "abc",
      "proxy": "{\\n                \\"properties\\": {\\n                  \\"a\\": {\\n                    \\"ref\\":\\"b\\",\\n                    \\"refProperty\\":\\"c\\",\\n                    \\"description\\": \\"properties介绍\\",\\n                    \\"type\\": \\"string\\",\\n                    \\"default\\": \\"hello\\",\\n                    \\"required\\": \\"false\\"\\n                  },\\n                  \\"b\\": {\\n                    \\"ref\\": \\"b-ref\\",\\n                    \\"refProperty\\": \\"b-property\\"\\n                  },\\n                  \\"c\\": {\\n                    \\"ref\\": \\"c-ref\\",\\n                    \\"refProperty\\": \\"c-property\\",\\n                    \\"type\\": \\"cProps\\"\\n                  },\\n                  \\"d\\": {\\n                    \\"asVariable\\": true,\\n                    \\"type\\": \\"dProps\\"\\n                  }\\n                },\\n                \\"events\\": {\\n                  \\"a.click\\": {\\n                    \\"ref\\": \\"d\\",\\n                    \\"refEvent\\": \\"general.a.click\\",\\n                    \\"detail\\": \\"{data:Record<string,any>[]}\\",\\n                    \\"description\\": \\"events介绍\\"\\n                  }\\n                },\\n                \\"methods\\": {\\n                  \\"sayHello\\": {\\n                    \\"ref\\": \\"e\\",\\n                    \\"refMethod\\": \\"a.say\\",\\n                    \\"params\\": \\"{ id: string | number, name: string }\\",\\n                    \\"description\\": \\"methods介绍\\"\\n                  }\\n                },\\n                \\"slots\\": {\\n                  \\"toolbar\\": {\\n                    \\"ref\\": \\"f\\",\\n                    \\"refSlot\\": \\"f-toobar\\",\\n                    \\"description\\": \\"slots介绍\\"\\n                  }\\n                },\\n                \\"interface\\": {\\n                  \\"cProps\\": {\\n                    \\"a\\": {\\n                      \\"type\\": \\"string\\",\\n                      \\"description\\": \\"this is a\\",\\n                      \\"required\\": \\"false\\"\\n                    },\\n                    \\"b\\": \\"boolean\\",\\n                    \\"c\\": \\"Record<string, any>\\",\\n                    \\"d\\": \\"Array<cProps-childProps>\\"\\n                  },\\n                  \\"cProps-childProps\\": {\\n                    \\"e\\": \\"any\\"\\n                  }\\n                },\\n                \\"examples\\": [\\n                  {\\n                    \\"brick\\": \\"test.template-u\\",\\n                    \\"properties\\": {\\n                      \\"a\\": \\"test\\"\\n                    }\\n                  }\\n                ]\\n              }",
      "children": [
        {
          "appId": "test-app",
          "instanceId": "u-1",
          "type": "brick",
          "brick": "test-app.template-t",
          "properties": "{\\"gridTemplateAreas\\":[[\\"left\\",\\"right\\"]],\\"url\\":\\"/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png\\"}"
        }
      ]
    },
    "useWidget": [
      "test-app.template-t"
    ]
  },
  {
    "storyId": "test.template-v",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "thumbnail": null,
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
    },
    "useWidget": []
  },
  {
    "storyId": "test.template-w",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "isCustomTemplate": true,
    "doc": {
      "id": "test.template-w",
      "name": "test.template-w",
      "dockind": "brick",
      "properties": [
        {
          "name": "FProps",
          "type": "fProps",
          "required": "-",
          "default": "-",
          "description": "-"
        }
      ],
      "author": "abc",
      "history": null,
      "interface": [
        {
          "kind": "interface",
          "name": "fProps",
          "typeParameter": null,
          "children": [
            {
              "description": "",
              "name": "a",
              "required": "",
              "type": "string"
            }
          ]
        }
      ]
    },
    "conf": [
      {
        "brick": "test.template-w",
        "properties": {
          "a": "test"
        }
      }
    ],
    "originData": {
      "appId": "test",
      "id": "T-04",
      "instanceId": "w",
      "templateId": "template-w",
      "creator": "abc",
      "proxy": "{\\n                \\"properties\\": {\\n                  \\"FProps\\": {\\n                    \\"ref\\": \\"f-ref\\",\\n                    \\"refProperty\\": \\"f\\",\\n                    \\"type\\": \\"fProps\\"\\n                  }\\n                },\\n                \\"interface\\": {\\n                  \\"fProps\\": {\\n                    \\"a\\": \\"string\\"\\n                  }\\n                },\\n                \\"examples\\": {\\n                  \\"brick\\": \\"test.template-w\\",\\n                  \\"properties\\": {\\n                    \\"a\\": \\"test\\"\\n                  }\\n                }\\n              }"
    },
    "useWidget": []
  }
]`,
          },
        ],
        dependBricks: ["easy-view", "general-button", "test-provider"],
        dependProcessorPackages: ["my-pkg"],
        images: {
          imagesDir: "dist/assets",
          imagesPath: [
            {
              fileName: "15858a13.png",
              imageOssPath: "www.xxx.com/url/abc.png",
            },
            {
              fileName: "6659b229.png",
              imageOssPath:
                "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png",
            },
            {
              fileName: "6c079b14.png",
              imageOssPath:
                "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/blue-bg1632809958790451533.png",
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

  it.each<[string, string | undefined]>([
    ["abc.png", "png"],
    ["abc.20211014.jpeg", "jpeg"],
    ["abc", "abc"],
    [undefined, undefined],
  ])("getSuffix should work", (data, result) => {
    const suffix = getSuffix(data);
    expect(suffix).toEqual(result);
  });

  it("getDeepDependencies should work", () => {
    const dep = [
      {
        id: "A",
        useWidget: ["widgetA", "widgetB"],
      },
      {
        id: "B",
        useWidget: ["widgetF"],
      },
      {
        id: "C",
        useWidget: [],
      },
    ];
    const depMap = new Map([
      ["A", ["widgetA", "widgetB"]],
      ["widgetA", []],
      ["widgetB", ["widgetC", "widgetD"]],
      ["widgetC", ["widgetD", "widgetE"]],
      ["widgetF", ["widgetG"]],
    ]);

    dep.forEach((item) => {
      item.useWidget = item.useWidget.concat(
        getDeepDependencies(item.useWidget, depMap)
      );
    });

    expect(dep).toEqual([
      {
        id: "A",
        useWidget: ["widgetA", "widgetB", "widgetC", "widgetD", "widgetE"],
      },
      { id: "B", useWidget: ["widgetF", "widgetG"] },
      { id: "C", useWidget: [] },
    ]);
  });
});
