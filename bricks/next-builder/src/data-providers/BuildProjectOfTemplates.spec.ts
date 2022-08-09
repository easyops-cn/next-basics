import {
  InstanceGraphApi_traverseGraphV2,
  InstanceApi_getDetail,
} from "@next-sdk/cmdb-sdk";
import {
  BuildInfoForProjectOfTemplates,
  BuildProjectOfTemplates,
  BuildProjectOfTemplatesParams,
  safeJSONParse,
  getBaseName,
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
              id: "T-01",
              instanceId: "t",
              templateId: "template-t",
              creator: "abc",
              proxy: null,
              state: null,
            },
            {
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
                    "required": false
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
                    "refSlot": "f-toolbar",
                    "description": "slots介绍"
                  }
                },
                "interfaces": {
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
                    "brick": "${graphParams.query["project.instanceId"].replace(
                      "project",
                      "app"
                    )}.template-u",
                    "properties": {
                      "a": "test"
                    }
                  }
                ]
              }`,
              state: `[
                {
                  "name": "myState",
                  "value": "any data"
                },
                {
                  "name": "instanceId",
                  "value": "abc",
                  "doc": {
                    "type": "string",
                    "required": false,
                    "description": "实例 id"
                  }
                }
              ]`,
            },
            {
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
              state: "",
            },
            {
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
                "interfaces": {
                  "fProps": {
                    "a": "string"
                  }
                },
                "examples": {
                  "brick": "${graphParams.query["project.instanceId"].replace(
                    "project",
                    "app"
                  )}.template-w",
                  "properties": {
                    "a": "test",
                    "background": "url('bricks/${graphParams.query[
                      "project.instanceId"
                    ].replace("project", "app")}/dist/assets/6659b229.png')",
                    "src": "<% IMG.get('my.png') %>"
                  }
                }
              }`,
              state: `[
                {
                  "name": "age",
                  "value": "18"
                }
              ]`,
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
              instanceId: "u-1",
              type: "brick",
              brick: "template-t",
              properties:
                '{"gridTemplateAreas":[["left","right"]],"url":"<% IMG.get(\'6659b229.png\') %>"}',
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

(InstanceApi_getDetail as jest.Mock).mockImplementation(
  (objectId, instanceId) => ({
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
    i18n:
      instanceId === "project-1"
        ? [
            {
              name: "HELLO",
              zh: "你好",
              en: "Hello",
            },
            {
              name: "WORLD",
              zh: "世界",
              en: "World",
            },
          ]
        : [],
  })
);

describe("BuildProjectOfTemplates", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
            path: "dist/index.f91919f5.js",
            content: expect.stringContaining(`
Object(n.getRuntime)().registerCustomTemplate("app-1.template-t", {
  "bricks": [
    {
      "iid": "t-1",
      "brick": "easy-view",
      "properties": {
        "gap": "<% PROCESSORS.myPkg.myFunc(__WIDGET_FN__[\\"app-1\\"].abc()) %>"
      },
      "slots": {
        "a": {
          "type": "bricks",
          "bricks": [
            {
              "iid": "t-1-1",
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
              "iid": "t-1-2",
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
        "required": false
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
        "refSlot": "f-toolbar",
        "description": "slots介绍"
      }
    }
  },
  "state": [
    {
      "name": "myState",
      "value": "any data"
    },
    {
      "name": "instanceId",
      "value": "abc"
    }
  ],
  "bricks": [
    {
      "iid": "u-1",
      "brick": "app-1.template-t",
      "properties": {
        "gridTemplateAreas": [
          [
            "left",
            "right"
          ]
        ],
        "url": "<% __WIDGET_IMG__(\\"app-1\\").get('6659b229.png') %>"
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
}),
Object(n.getRuntime)().registerCustomTemplate("app-1.template-w", {
  "proxy": {
    "properties": {
      "FProps": {
        "ref": "f-ref",
        "refProperty": "f",
        "type": "fProps"
      }
    }
  },
  "state": [
    {
      "name": "age",
      "value": "18"
    }
  ],
  "bricks": []
}),
Object(n.getRuntime)().registerWidgetFunctions("app-1", [
  {
    "name": "abc",
    "source": "function abc() {}"
  },
  {
    "name": "xyz",
    "source": "function xyz() {}",
    "typescript": true
  }
]),
Object(n.getRuntime)().registerWidgetI18n("app-1", {
  "en": {
    "HELLO": "Hello",
    "WORLD": "World"
  },
  "zh": {
    "HELLO": "你好",
    "WORLD": "世界"
  }
})`),
          },
          {
            path: "dist/stories.json",
            content: [
              {
                storyId: "app-1.template-t",
                type: "brick",
                layerType: "widget",
                author: "abc",
                isCustomTemplate: true,
                doc: {
                  id: "app-1.template-t",
                  name: "app-1.template-t",
                  dockind: "brick",
                  properties: null,
                  author: "abc",
                  slots: null,
                  history: null,
                },
                conf: [],
                originData: {
                  id: "T-01",
                  instanceId: "t",
                  templateId: "template-t",
                  creator: "abc",
                  proxy: null,
                  state: null,
                  children: [
                    {
                      instanceId: "t-1",
                      type: "brick",
                      brick: "easy-view",
                      properties:
                        '{"gap":"<% PROCESSORS.myPkg.myFunc(FN.abc()) %>"}',
                      children: [
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
                      ],
                    },
                  ],
                },
                useWidget: [],
              },
              {
                storyId: "app-1.template-u",
                type: "brick",
                layerType: "widget",
                author: "abc",
                isCustomTemplate: true,
                thumbnail: "bricks/app-1/dist/assets/abc.png",
                doc: {
                  id: "app-1.template-u",
                  name: "app-1.template-u",
                  dockind: "brick",
                  properties: [
                    {
                      name: "a",
                      type: "string",
                      required: "-",
                      default: "hello",
                      description: "properties介绍",
                    },
                    {
                      name: "b",
                      type: "-",
                      required: "-",
                      default: "-",
                      description: "-",
                    },
                    {
                      name: "c",
                      type: "cProps",
                      required: "-",
                      default: "-",
                      description: "-",
                    },
                    {
                      name: "d",
                      type: "dProps",
                      required: "-",
                      default: "-",
                      description: "-",
                    },
                    {
                      name: "instanceId",
                      type: "string",
                      required: false,
                      description: "实例 id",
                    },
                  ],
                  author: "abc",
                  slots: [
                    {
                      name: "toolbar",
                      description: "slots介绍",
                    },
                  ],
                  history: null,
                  events: [
                    {
                      type: "a.click",
                      detail: "{data:Record<string,any>[]}",
                      description: "events介绍",
                    },
                  ],
                  methods: [
                    {
                      name: "sayHello",
                      params: "{ id: string | number, name: string }",
                      description: "methods介绍",
                    },
                  ],
                  interface: [
                    {
                      kind: "interface",
                      name: "cProps",
                      typeParameter: null,
                      children: [
                        {
                          description: "this is a",
                          name: "a",
                          required: "false",
                          type: "string",
                        },
                        {
                          description: "",
                          name: "b",
                          required: false,
                          type: "boolean",
                        },
                        {
                          description: "",
                          name: "c",
                          required: false,
                          type: "Record<string, any>",
                        },
                        {
                          description: "",
                          name: "d",
                          required: false,
                          type: "Array<cProps-childProps>",
                        },
                      ],
                    },
                    {
                      kind: "interface",
                      name: "cProps-childProps",
                      typeParameter: null,
                      children: [
                        {
                          description: "",
                          name: "e",
                          required: false,
                          type: "any",
                        },
                      ],
                    },
                  ],
                },
                conf: [
                  {
                    brick: "app-1.template-u",
                    properties: {
                      a: "test",
                    },
                  },
                ],
                originData: {
                  id: "T-02",
                  instanceId: "u",
                  templateId: "template-u",
                  creator: "abc",
                  proxy: expect.any(String),
                  state: expect.any(String),
                  children: [
                    {
                      instanceId: "u-1",
                      type: "brick",
                      brick: "app-1.template-t",
                      properties:
                        '{"gridTemplateAreas":[["left","right"]],"url":"<% IMG.get(\'6659b229.png\') %>"}',
                    },
                  ],
                },
                useWidget: ["app-1.template-t"],
              },
              {
                storyId: "app-1.template-v",
                type: "brick",
                layerType: "widget",
                author: "abc",
                isCustomTemplate: true,
                thumbnail: null,
                doc: {
                  id: "app-1.template-v",
                  name: "app-1.template-v",
                  dockind: "brick",
                  author: "abc",
                  history: null,
                },
                conf: [],
                originData: {
                  id: "T-03",
                  instanceId: "v",
                  templateId: "template-v",
                  creator: "abc",
                  proxy:
                    '{\n                "properties": null,\n                "events": {},\n                "methods": 1\n              }',
                  state: "",
                },
                useWidget: [],
              },
              {
                storyId: "app-1.template-w",
                type: "brick",
                layerType: "widget",
                author: "abc",
                isCustomTemplate: true,
                doc: {
                  id: "app-1.template-w",
                  name: "app-1.template-w",
                  dockind: "brick",
                  properties: [
                    {
                      name: "FProps",
                      type: "fProps",
                      required: "-",
                      default: "-",
                      description: "-",
                    },
                  ],
                  author: "abc",
                  history: null,
                  interface: [
                    {
                      kind: "interface",
                      name: "fProps",
                      typeParameter: null,
                      children: [
                        {
                          description: "",
                          name: "a",
                          required: false,
                          type: "string",
                        },
                      ],
                    },
                  ],
                },
                conf: [
                  {
                    brick: "app-1.template-w",
                    properties: {
                      a: "test",
                      background:
                        "url('bricks/app-1/dist/assets/6659b229.png')",
                      src: "<% __WIDGET_IMG__(\"app-1\").get('my.png') %>",
                    },
                  },
                ],
                originData: {
                  id: "T-04",
                  instanceId: "w",
                  templateId: "template-w",
                  creator: "abc",
                  proxy: expect.any(String),
                  state: expect.any(String),
                },
                useWidget: [],
              },
            ],
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
      "thumbnail": "bricks/app-1/dist/assets/abc.jpeg",
      "bricks": [
        {
          "iid": "x-1",
          "brick": "easy-view",
          "properties": {
            "gap": 10
          },
          "slots": {
            "a": {
              "type": "bricks",
              "bricks": [
                {
                  "iid": "x-1-1",
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
                  "iid": "x-1-2",
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
          "iid": "y-1",
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
              fileName: "abc.png",
              imageOssPath: "www.xxx.com/url/abc.png",
            },
            {
              fileName: "abc.jpeg",
              imageOssPath: "www.xxx.com/url/abc.jpeg",
            },
            {
              fileName: "viewpoint1632809932499594914.png",
              imageOssPath:
                "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png",
            },
            {
              fileName: "blue-bg1632809958790451533.png",
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
            path: "dist/index.15397f5a.js",
            content: expect.stringContaining(
              'registerCustomTemplate("app-2.template-t",'
            ),
          },
          {
            path: "dist/stories.json",
            content: [
              {
                storyId: "app-2.template-t",
                type: "brick",
                layerType: "widget",
                author: "abc",
                isCustomTemplate: true,
                doc: {
                  id: "app-2.template-t",
                  name: "app-2.template-t",
                  dockind: "brick",
                  properties: null,
                  author: "abc",
                  slots: null,
                  history: null,
                },
                conf: [],
                originData: {
                  id: "T-01",
                  instanceId: "t",
                  templateId: "template-t",
                  creator: "abc",
                  proxy: null,
                  state: null,
                  children: [
                    {
                      instanceId: "t-1",
                      type: "brick",
                      brick: "easy-view",
                      properties:
                        '{"gap":"<% PROCESSORS.myPkg.myFunc(FN.abc()) %>"}',
                      children: [
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
                      ],
                    },
                  ],
                },
                useWidget: [],
              },
              {
                storyId: "app-2.template-u",
                type: "brick",
                layerType: "widget",
                author: "abc",
                isCustomTemplate: true,
                thumbnail: "bricks/app-2/dist/assets/abc.png",
                doc: {
                  id: "app-2.template-u",
                  name: "app-2.template-u",
                  dockind: "brick",
                  properties: [
                    {
                      name: "a",
                      type: "string",
                      required: "-",
                      default: "hello",
                      description: "properties介绍",
                    },
                    {
                      name: "b",
                      type: "-",
                      required: "-",
                      default: "-",
                      description: "-",
                    },
                    {
                      name: "c",
                      type: "cProps",
                      required: "-",
                      default: "-",
                      description: "-",
                    },
                    {
                      name: "d",
                      type: "dProps",
                      required: "-",
                      default: "-",
                      description: "-",
                    },
                    {
                      description: "实例 id",
                      name: "instanceId",
                      required: false,
                      type: "string",
                    },
                  ],
                  author: "abc",
                  slots: [
                    {
                      name: "toolbar",
                      description: "slots介绍",
                    },
                  ],
                  history: null,
                  events: [
                    {
                      type: "a.click",
                      detail: "{data:Record<string,any>[]}",
                      description: "events介绍",
                    },
                  ],
                  methods: [
                    {
                      name: "sayHello",
                      params: "{ id: string | number, name: string }",
                      description: "methods介绍",
                    },
                  ],
                  interface: [
                    {
                      kind: "interface",
                      name: "cProps",
                      typeParameter: null,
                      children: [
                        {
                          description: "this is a",
                          name: "a",
                          required: "false",
                          type: "string",
                        },
                        {
                          description: "",
                          name: "b",
                          required: false,
                          type: "boolean",
                        },
                        {
                          description: "",
                          name: "c",
                          required: false,
                          type: "Record<string, any>",
                        },
                        {
                          description: "",
                          name: "d",
                          required: false,
                          type: "Array<cProps-childProps>",
                        },
                      ],
                    },
                    {
                      kind: "interface",
                      name: "cProps-childProps",
                      typeParameter: null,
                      children: [
                        {
                          description: "",
                          name: "e",
                          required: false,
                          type: "any",
                        },
                      ],
                    },
                  ],
                },
                conf: [
                  {
                    brick: "app-2.template-u",
                    properties: {
                      a: "test",
                    },
                  },
                ],
                originData: {
                  id: "T-02",
                  instanceId: "u",
                  templateId: "template-u",
                  creator: "abc",
                  proxy: expect.any(String),
                  state: expect.any(String),
                  children: [
                    {
                      instanceId: "u-1",
                      type: "brick",
                      brick: "app-2.template-t",
                      properties:
                        '{"gridTemplateAreas":[["left","right"]],"url":"<% IMG.get(\'6659b229.png\') %>"}',
                    },
                  ],
                },
                useWidget: ["app-2.template-t"],
              },
              {
                storyId: "app-2.template-v",
                type: "brick",
                layerType: "widget",
                author: "abc",
                isCustomTemplate: true,
                thumbnail: null,
                doc: {
                  id: "app-2.template-v",
                  name: "app-2.template-v",
                  dockind: "brick",
                  author: "abc",
                  history: null,
                },
                conf: [],
                originData: {
                  id: "T-03",
                  instanceId: "v",
                  templateId: "template-v",
                  creator: "abc",
                  proxy:
                    '{\n                "properties": null,\n                "events": {},\n                "methods": 1\n              }',
                  state: "",
                },
                useWidget: [],
              },
              {
                storyId: "app-2.template-w",
                type: "brick",
                layerType: "widget",
                author: "abc",
                isCustomTemplate: true,
                doc: {
                  id: "app-2.template-w",
                  name: "app-2.template-w",
                  dockind: "brick",
                  properties: [
                    {
                      name: "FProps",
                      type: "fProps",
                      required: "-",
                      default: "-",
                      description: "-",
                    },
                  ],
                  author: "abc",
                  history: null,
                  interface: [
                    {
                      kind: "interface",
                      name: "fProps",
                      typeParameter: null,
                      children: [
                        {
                          description: "",
                          name: "a",
                          required: false,
                          type: "string",
                        },
                      ],
                    },
                  ],
                },
                conf: [
                  {
                    brick: "app-2.template-w",
                    properties: {
                      a: "test",
                      background:
                        "url('bricks/app-2/dist/assets/6659b229.png')",
                      src: "<% __WIDGET_IMG__(\"app-2\").get('my.png') %>",
                    },
                  },
                ],
                originData: {
                  id: "T-04",
                  instanceId: "w",
                  templateId: "template-w",
                  creator: "abc",
                  proxy: expect.any(String),
                  state: expect.any(String),
                },
                useWidget: [],
              },
            ],
          },
        ],
        dependBricks: ["easy-view", "general-button", "test-provider"],
        dependProcessorPackages: ["my-pkg"],
        images: {
          imagesDir: "dist/assets",
          imagesPath: [
            {
              fileName: "abc.png",
              imageOssPath: "www.xxx.com/url/abc.png",
            },
            {
              fileName: "viewpoint1632809932499594914.png",
              imageOssPath:
                "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/viewpoint1632809932499594914.png",
            },
            {
              fileName: "blue-bg1632809958790451533.png",
              imageOssPath:
                "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/blue-bg1632809958790451533.png",
            },
          ],
        },
      },
    ],
  ])("BuildProjectOfTemplates(%j) should work", async (params, result) => {
    const { files: receivedFiles, ...receivedRest } =
      await BuildProjectOfTemplates(params);
    const { files: expectFiles, ...expectRest } = result;
    expect(receivedRest).toEqual(expectRest);
    expect(receivedFiles.length).toEqual(expectFiles.length);
    receivedFiles.forEach(({ path, content }, index) => {
      const { path: expectPath, content: expectContent } = expectFiles[index];
      expect(path).toEqual(expectPath);
      if (typeof expectContent !== "string" && path.endsWith(".json")) {
        // require("fs-extra").outputFileSync(require("path").resolve(".vscode/tests", `${params.appId}.json`), content);
        expect(JSON.parse(content)).toEqual(expectContent);
      } else {
        expect(content).toEqual(expectContent);
      }
    });
  });

  it("safe JSON parse, test", () => {
    const rightJSON = `{
      "name": "abc",
      "age": 18
    }`;
    expect(safeJSONParse(rightJSON)).toEqual({
      name: "abc",
      age: 18,
    });
  });

  it("should handle json parse error", () => {
    const errorJSON = `{
      "name": "abc",
      "age: 18
    }`;
    expect(safeJSONParse(errorJSON)).toBe(undefined);
    expect(consoleError).toBeCalledTimes(1);
  });

  it.each<[string, string | undefined]>([
    ["/x/y/abc.png", "abc.png"],
    ["abc.jpeg", "abc.jpeg"],
    ["abc", "abc"],
    [undefined, undefined],
  ])("getBaseName should work", (data, result) => {
    const suffix = getBaseName(data);
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

    expect(getDeepDependencies({} as any, new Map())).toEqual([]);
  });
});
