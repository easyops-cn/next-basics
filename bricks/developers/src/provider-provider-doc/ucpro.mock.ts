// Mock data
export default {
  id: 6109,
  name: "@next-sdk/ucpro-sdk",
  kind: 0,
  flags: {},
  children: [
    {
      id: 6134,
      name: '"api/ucpro/desktop/clone.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/api/ucpro/desktop/clone.d.ts",
      children: [
        {
          id: 6135,
          name: "CloneRequestBody",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          children: [
            {
              id: 6137,
              name: "appId",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "新的小产品id",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/clone.d.ts",
                  line: 7,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6139,
              name: "homepage",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "新的小产品homepage",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/clone.d.ts",
                  line: 11,
                  character: 12,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6136,
              name: "name",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "新的小产品名称",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/clone.d.ts",
                  line: 5,
                  character: 8,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6138,
              name: "parentAppId",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "被clone的小产品id",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/clone.d.ts",
                  line: 9,
                  character: 15,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [6137, 6139, 6136, 6138],
            },
          ],
          sources: [
            {
              fileName: "api/ucpro/desktop/clone.d.ts",
              line: 3,
              character: 33,
            },
          ],
        },
        {
          id: 6140,
          name: "CloneResponseBody",
          kind: 4194304,
          kindString: "Type alias",
          flags: {
            isExported: true,
          },
          sources: [
            {
              fileName: "api/ucpro/desktop/clone.d.ts",
              line: 13,
              character: 37,
            },
          ],
          type: {
            type: "reference",
            name: "Partial",
            typeArguments: [
              {
                type: "reference",
                name: "ModelInstalledMicroApp",
                id: 6111,
              },
            ],
          },
        },
        {
          id: 6141,
          name: "DesktopApi_clone",
          kind: 32,
          kindString: "Variable",
          flags: {
            isExported: true,
            isConst: true,
          },
          comment: {
            shortText: "克隆小产品",
            tags: [
              {
                tag: "description",
                text: "克隆大产品",
              },
              {
                tag: "endpoint",
                text: "GET /api/v1/clone",
              },
            ],
          },
          sources: [
            {
              fileName: "api/ucpro/desktop/clone.d.ts",
              line: 15,
              character: 26,
            },
          ],
          type: {
            type: "reflection",
            declaration: {
              id: 6142,
              name: "__type",
              kind: 65536,
              kindString: "Type literal",
              flags: {},
              signatures: [
                {
                  id: 6143,
                  name: "__call",
                  kind: 4096,
                  kindString: "Call signature",
                  flags: {},
                  parameters: [
                    {
                      id: 6144,
                      name: "data",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {},
                      type: {
                        type: "reference",
                        name: "CloneRequestBody",
                        id: 6135,
                      },
                    },
                    {
                      id: 6145,
                      name: "options",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {
                        isOptional: true,
                      },
                      type: {
                        type: "reference",
                        name: "HttpOptions",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    name: "Promise",
                    typeArguments: [
                      {
                        type: "reference",
                        name: "Partial",
                        typeArguments: [
                          {
                            type: "reference",
                            name: "ModelInstalledMicroApp",
                            id: 6111,
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
              sources: [
                {
                  fileName: "api/ucpro/desktop/clone.d.ts",
                  line: 15,
                  character: 27,
                },
              ],
            },
          },
        },
      ],
      groups: [
        {
          title: "Interfaces",
          kind: 256,
          children: [6135],
        },
        {
          title: "Type aliases",
          kind: 4194304,
          children: [6140],
        },
        {
          title: "Variables",
          kind: 32,
          children: [6141],
        },
      ],
      sources: [
        {
          fileName: "api/ucpro/desktop/clone.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6146,
      name: '"api/ucpro/desktop/getAppDependencies.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/api/ucpro/desktop/getAppDependencies.d.ts",
      children: [
        {
          id: 6147,
          name: "GetAppDependenciesRequestParams",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          children: [
            {
              id: 6148,
              name: "appId",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "小产品id",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/getAppDependencies.d.ts",
                  line: 4,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [6148],
            },
          ],
          sources: [
            {
              fileName: "api/ucpro/desktop/getAppDependencies.d.ts",
              line: 2,
              character: 48,
            },
          ],
        },
        {
          id: 6149,
          name: "GetAppDependenciesResponseBody",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          children: [
            {
              id: 6150,
              name: "dependencies",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
                isOptional: true,
              },
              comment: {
                shortText: "依赖信息列表",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/getAppDependencies.d.ts",
                  line: 8,
                  character: 16,
                },
              ],
              type: {
                type: "array",
                elementType: {
                  type: "reflection",
                  declaration: {
                    id: 6151,
                    name: "__type",
                    kind: 65536,
                    kindString: "Type literal",
                    flags: {},
                    sources: [
                      {
                        fileName: "api/ucpro/desktop/getAppDependencies.d.ts",
                        line: 8,
                        character: 18,
                      },
                    ],
                  },
                },
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [6150],
            },
          ],
          sources: [
            {
              fileName: "api/ucpro/desktop/getAppDependencies.d.ts",
              line: 6,
              character: 47,
            },
          ],
        },
        {
          id: 6152,
          name: "DesktopApi_getAppDependencies",
          kind: 32,
          kindString: "Variable",
          flags: {
            isExported: true,
            isConst: true,
          },
          comment: {
            shortText: "获取在线商店应用当前版本的依赖信息",
          },
          sources: [
            {
              fileName: "api/ucpro/desktop/getAppDependencies.d.ts",
              line: 20,
              character: 39,
            },
          ],
          type: {
            type: "reflection",
            declaration: {
              id: 6153,
              name: "__type",
              kind: 65536,
              kindString: "Type literal",
              flags: {},
              signatures: [
                {
                  id: 6154,
                  name: "__call",
                  kind: 4096,
                  kindString: "Call signature",
                  flags: {},
                  parameters: [
                    {
                      id: 6155,
                      name: "params",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {},
                      type: {
                        type: "reference",
                        name: "GetAppDependenciesRequestParams",
                        id: 6147,
                      },
                    },
                    {
                      id: 6156,
                      name: "options",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {
                        isOptional: true,
                      },
                      type: {
                        type: "reference",
                        name: "HttpOptions",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    name: "Promise",
                    typeArguments: [
                      {
                        type: "reference",
                        name: "GetAppDependenciesResponseBody",
                        id: 6149,
                      },
                    ],
                  },
                },
              ],
              sources: [
                {
                  fileName: "api/ucpro/desktop/getAppDependencies.d.ts",
                  line: 20,
                  character: 40,
                },
              ],
            },
          },
        },
      ],
      groups: [
        {
          title: "Interfaces",
          kind: 256,
          children: [6147, 6149],
        },
        {
          title: "Variables",
          kind: 32,
          children: [6152],
        },
      ],
      sources: [
        {
          fileName: "api/ucpro/desktop/getAppDependencies.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6157,
      name: '"api/ucpro/desktop/getTaskStatus.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/api/ucpro/desktop/getTaskStatus.d.ts",
      children: [
        {
          id: 6158,
          name: "GetTaskStatusResponseBody",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          children: [
            {
              id: 6163,
              name: "msg",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
                isOptional: true,
              },
              comment: {
                shortText: "部署信息",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/getTaskStatus.d.ts",
                  line: 12,
                  character: 7,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6162,
              name: "stage",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
                isOptional: true,
              },
              comment: {
                shortText:
                  "任务进行的阶段。 ready - 就绪， download - 下载, deploy - 安装, uninstall - 卸载",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/getTaskStatus.d.ts",
                  line: 10,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6160,
              name: "status",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
                isOptional: true,
              },
              comment: {
                shortText: "任务状态, running-正在运行， failed-失败, ok-成功",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/getTaskStatus.d.ts",
                  line: 6,
                  character: 10,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6159,
              name: "taskId",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
                isOptional: true,
              },
              comment: {
                shortText: "部署任务id",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/getTaskStatus.d.ts",
                  line: 4,
                  character: 10,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6161,
              name: "taskType",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
                isOptional: true,
              },
              comment: {
                shortText: "任务类型， install-安装， uninstall-卸载",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/getTaskStatus.d.ts",
                  line: 8,
                  character: 12,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [6163, 6162, 6160, 6159, 6161],
            },
          ],
          sources: [
            {
              fileName: "api/ucpro/desktop/getTaskStatus.d.ts",
              line: 2,
              character: 42,
            },
          ],
        },
        {
          id: 6164,
          name: "DesktopApi_getTaskStatus",
          kind: 32,
          kindString: "Variable",
          flags: {
            isExported: true,
            isConst: true,
          },
          comment: {
            shortText: "查询部署任务状态",
          },
          sources: [
            {
              fileName: "api/ucpro/desktop/getTaskStatus.d.ts",
              line: 15,
              character: 34,
            },
          ],
          type: {
            type: "reflection",
            declaration: {
              id: 6165,
              name: "__type",
              kind: 65536,
              kindString: "Type literal",
              flags: {},
              signatures: [
                {
                  id: 6166,
                  name: "__call",
                  kind: 4096,
                  kindString: "Call signature",
                  flags: {},
                  parameters: [
                    {
                      id: 6167,
                      name: "taskId",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {},
                      type: {
                        type: "union",
                        types: [
                          {
                            type: "intrinsic",
                            name: "string",
                          },
                          {
                            type: "intrinsic",
                            name: "number",
                          },
                        ],
                      },
                    },
                    {
                      id: 6168,
                      name: "options",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {
                        isOptional: true,
                      },
                      type: {
                        type: "reference",
                        name: "HttpOptions",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    name: "Promise",
                    typeArguments: [
                      {
                        type: "reference",
                        name: "GetTaskStatusResponseBody",
                        id: 6158,
                      },
                    ],
                  },
                },
              ],
              sources: [
                {
                  fileName: "api/ucpro/desktop/getTaskStatus.d.ts",
                  line: 15,
                  character: 35,
                },
              ],
            },
          },
        },
      ],
      groups: [
        {
          title: "Interfaces",
          kind: 256,
          children: [6158],
        },
        {
          title: "Variables",
          kind: 32,
          children: [6164],
        },
      ],
      sources: [
        {
          fileName: "api/ucpro/desktop/getTaskStatus.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6200,
      name: '"api/ucpro/desktop/index.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/api/ucpro/desktop/index.d.ts",
      sources: [
        {
          fileName: "api/ucpro/desktop/index.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6169,
      name: '"api/ucpro/desktop/installApp.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/api/ucpro/desktop/installApp.d.ts",
      children: [
        {
          id: 6170,
          name: "InstallAppRequestBody",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          children: [
            {
              id: 6171,
              name: "appId",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "小产品id",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/installApp.d.ts",
                  line: 4,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6172,
              name: "version",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "小产品版本号",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/installApp.d.ts",
                  line: 6,
                  character: 11,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [6171, 6172],
            },
          ],
          sources: [
            {
              fileName: "api/ucpro/desktop/installApp.d.ts",
              line: 2,
              character: 38,
            },
          ],
        },
        {
          id: 6173,
          name: "InstallAppResponseBody",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          children: [
            {
              id: 6174,
              name: "taskId",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
                isOptional: true,
              },
              comment: {
                shortText: "任务id",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/installApp.d.ts",
                  line: 10,
                  character: 10,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [6174],
            },
          ],
          sources: [
            {
              fileName: "api/ucpro/desktop/installApp.d.ts",
              line: 8,
              character: 39,
            },
          ],
        },
        {
          id: 6175,
          // For new sdk, the name should be `DesktopApi_installApp`,
          // but for legacy sdk, it is `installApp`.
          name: "installApp",
          kind: 32,
          kindString: "Variable",
          flags: {
            isExported: true,
            isConst: true,
          },
          comment: {
            shortText: "安装小产品",
          },
          sources: [
            {
              fileName: "api/ucpro/desktop/installApp.d.ts",
              line: 13,
              character: 31,
            },
          ],
          type: {
            type: "reflection",
            declaration: {
              id: 6176,
              name: "__type",
              kind: 65536,
              kindString: "Type literal",
              flags: {},
              signatures: [
                {
                  id: 6177,
                  name: "__call",
                  kind: 4096,
                  kindString: "Call signature",
                  flags: {},
                  parameters: [
                    {
                      id: 6178,
                      name: "data",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {},
                      type: {
                        type: "reference",
                        name: "InstallAppRequestBody",
                        id: 6170,
                      },
                    },
                    {
                      id: 6179,
                      name: "options",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {
                        isOptional: true,
                      },
                      type: {
                        type: "reference",
                        name: "HttpOptions",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    name: "Promise",
                    typeArguments: [
                      {
                        type: "reference",
                        name: "InstallAppResponseBody",
                        id: 6173,
                      },
                    ],
                  },
                },
              ],
              sources: [
                {
                  fileName: "api/ucpro/desktop/installApp.d.ts",
                  line: 13,
                  character: 32,
                },
              ],
            },
          },
        },
      ],
      groups: [
        {
          title: "Interfaces",
          kind: 256,
          children: [6170, 6173],
        },
        {
          title: "Variables",
          kind: 32,
          children: [6175],
        },
      ],
      sources: [
        {
          fileName: "api/ucpro/desktop/installApp.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6180,
      name: '"api/ucpro/desktop/runningTasks.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/api/ucpro/desktop/runningTasks.d.ts",
      children: [
        {
          id: 6181,
          name: "RunningTasksResponseBody",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          children: [
            {
              id: 6182,
              name: "appId",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "appId",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/runningTasks.d.ts",
                  line: 4,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6183,
              name: "taskId",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "任务Id",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/runningTasks.d.ts",
                  line: 6,
                  character: 10,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6184,
              name: "taskType",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "任务类型， install-安装， uninstall-卸载",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/runningTasks.d.ts",
                  line: 8,
                  character: 12,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [6182, 6183, 6184],
            },
          ],
          sources: [
            {
              fileName: "api/ucpro/desktop/runningTasks.d.ts",
              line: 2,
              character: 41,
            },
          ],
        },
        {
          id: 6185,
          name: "DesktopApi_runningTasks",
          kind: 32,
          kindString: "Variable",
          flags: {
            isExported: true,
            isConst: true,
          },
          comment: {
            shortText: "正在安装或卸载的小产品任务",
          },
          sources: [
            {
              fileName: "api/ucpro/desktop/runningTasks.d.ts",
              line: 11,
              character: 33,
            },
          ],
          type: {
            type: "reflection",
            declaration: {
              id: 6186,
              name: "__type",
              kind: 65536,
              kindString: "Type literal",
              flags: {},
              signatures: [
                {
                  id: 6187,
                  name: "__call",
                  kind: 4096,
                  kindString: "Call signature",
                  flags: {},
                  parameters: [
                    {
                      id: 6188,
                      name: "options",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {
                        isOptional: true,
                      },
                      type: {
                        type: "reference",
                        name: "HttpOptions",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    name: "Promise",
                    typeArguments: [
                      {
                        type: "reference",
                        name: "RunningTasksResponseBody",
                        id: 6181,
                      },
                    ],
                  },
                },
              ],
              sources: [
                {
                  fileName: "api/ucpro/desktop/runningTasks.d.ts",
                  line: 11,
                  character: 34,
                },
              ],
            },
          },
        },
      ],
      groups: [
        {
          title: "Interfaces",
          kind: 256,
          children: [6181],
        },
        {
          title: "Variables",
          kind: 32,
          children: [6185],
        },
      ],
      sources: [
        {
          fileName: "api/ucpro/desktop/runningTasks.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6189,
      name: '"api/ucpro/desktop/uninstallApp.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/api/ucpro/desktop/uninstallApp.d.ts",
      children: [
        {
          id: 6190,
          name: "UninstallAppRequestBody",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          children: [
            {
              id: 6191,
              name: "appId",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "小产品id",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/uninstallApp.d.ts",
                  line: 4,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6192,
              name: "version",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "小产品版本号",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/uninstallApp.d.ts",
                  line: 6,
                  character: 11,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [6191, 6192],
            },
          ],
          sources: [
            {
              fileName: "api/ucpro/desktop/uninstallApp.d.ts",
              line: 2,
              character: 40,
            },
          ],
        },
        {
          id: 6193,
          name: "UninstallAppResponseBody",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          children: [
            {
              id: 6194,
              name: "taskId",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
                isOptional: true,
              },
              comment: {
                shortText: "任务id",
              },
              sources: [
                {
                  fileName: "api/ucpro/desktop/uninstallApp.d.ts",
                  line: 10,
                  character: 10,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [6194],
            },
          ],
          sources: [
            {
              fileName: "api/ucpro/desktop/uninstallApp.d.ts",
              line: 8,
              character: 41,
            },
          ],
        },
        {
          id: 6195,
          name: "DesktopApi_uninstallApp",
          kind: 32,
          kindString: "Variable",
          flags: {
            isExported: true,
            isConst: true,
          },
          comment: {
            shortText: "卸载小产品",
          },
          sources: [
            {
              fileName: "api/ucpro/desktop/uninstallApp.d.ts",
              line: 13,
              character: 33,
            },
          ],
          type: {
            type: "reflection",
            declaration: {
              id: 6196,
              name: "__type",
              kind: 65536,
              kindString: "Type literal",
              flags: {},
              signatures: [
                {
                  id: 6197,
                  name: "__call",
                  kind: 4096,
                  kindString: "Call signature",
                  flags: {},
                  parameters: [
                    {
                      id: 6198,
                      name: "data",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {},
                      type: {
                        type: "reference",
                        name: "UninstallAppRequestBody",
                        id: 6190,
                      },
                    },
                    {
                      id: 6199,
                      name: "options",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {
                        isOptional: true,
                      },
                      type: {
                        type: "reference",
                        name: "HttpOptions",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    name: "Promise",
                    typeArguments: [
                      {
                        type: "reference",
                        name: "UninstallAppResponseBody",
                        id: 6193,
                      },
                    ],
                  },
                },
              ],
              sources: [
                {
                  fileName: "api/ucpro/desktop/uninstallApp.d.ts",
                  line: 13,
                  character: 34,
                },
              ],
            },
          },
        },
      ],
      groups: [
        {
          title: "Interfaces",
          kind: 256,
          children: [6190, 6193],
        },
        {
          title: "Variables",
          kind: 32,
          children: [6195],
        },
      ],
      sources: [
        {
          fileName: "api/ucpro/desktop/uninstallApp.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6201,
      name: '"api/ucpro/org/importModels.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/api/ucpro/org/importModels.d.ts",
      children: [
        {
          id: 6202,
          name: "OrgApi_importModels",
          kind: 32,
          kindString: "Variable",
          flags: {
            isExported: true,
            isConst: true,
          },
          comment: {
            shortText: "导入模型",
          },
          sources: [
            {
              fileName: "api/ucpro/org/importModels.d.ts",
              line: 3,
              character: 33,
            },
          ],
          type: {
            type: "reflection",
            declaration: {
              id: 6203,
              name: "__type",
              kind: 65536,
              kindString: "Type literal",
              flags: {},
              signatures: [
                {
                  id: 6204,
                  name: "__call",
                  kind: 4096,
                  kindString: "Call signature",
                  flags: {},
                  parameters: [
                    {
                      id: 6205,
                      name: "options",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {
                        isOptional: true,
                      },
                      type: {
                        type: "reference",
                        name: "HttpOptions",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    name: "Promise",
                    typeArguments: [
                      {
                        type: "intrinsic",
                        name: "void",
                      },
                    ],
                  },
                },
              ],
              sources: [
                {
                  fileName: "api/ucpro/org/importModels.d.ts",
                  line: 3,
                  character: 34,
                },
              ],
            },
          },
        },
      ],
      groups: [
        {
          title: "Variables",
          kind: 32,
          children: [6202],
        },
      ],
      sources: [
        {
          fileName: "api/ucpro/org/importModels.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6211,
      name: '"api/ucpro/org/index.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/api/ucpro/org/index.d.ts",
      sources: [
        {
          fileName: "api/ucpro/org/index.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6206,
      name: '"api/ucpro/org/registerOrg.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/api/ucpro/org/registerOrg.d.ts",
      children: [
        {
          id: 6207,
          name: "OrgApi_registerOrg",
          kind: 32,
          kindString: "Variable",
          flags: {
            isExported: true,
            isConst: true,
          },
          comment: {
            shortText: "org注册",
          },
          sources: [
            {
              fileName: "api/ucpro/org/registerOrg.d.ts",
              line: 3,
              character: 32,
            },
          ],
          type: {
            type: "reflection",
            declaration: {
              id: 6208,
              name: "__type",
              kind: 65536,
              kindString: "Type literal",
              flags: {},
              signatures: [
                {
                  id: 6209,
                  name: "__call",
                  kind: 4096,
                  kindString: "Call signature",
                  flags: {},
                  parameters: [
                    {
                      id: 6210,
                      name: "options",
                      kind: 32768,
                      kindString: "Parameter",
                      flags: {
                        isOptional: true,
                      },
                      type: {
                        type: "reference",
                        name: "HttpOptions",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    name: "Promise",
                    typeArguments: [
                      {
                        type: "intrinsic",
                        name: "void",
                      },
                    ],
                  },
                },
              ],
              sources: [
                {
                  fileName: "api/ucpro/org/registerOrg.d.ts",
                  line: 3,
                  character: 33,
                },
              ],
            },
          },
        },
      ],
      groups: [
        {
          title: "Variables",
          kind: 32,
          children: [6207],
        },
      ],
      sources: [
        {
          fileName: "api/ucpro/org/registerOrg.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6212,
      name: '"index.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/index.d.ts",
      sources: [
        {
          fileName: "index.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6110,
      name: '"model/micro_app/ModelInstalledMicroApp.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/model/micro_app/ModelInstalledMicroApp.d.ts",
      children: [
        {
          id: 6111,
          name: "ModelInstalledMicroApp",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          comment: {
            shortText: "小产品",
          },
          children: [
            {
              id: 6113,
              name: "appId",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "小产品id",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 6,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6123,
              name: "clonedFrom",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "克隆对象",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 27,
                  character: 14,
                },
              ],
              type: {
                type: "reflection",
                declaration: {
                  id: 6124,
                  name: "__type",
                  kind: 65536,
                  kindString: "Type literal",
                  flags: {},
                  sources: [
                    {
                      fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                      line: 27,
                      character: 15,
                    },
                  ],
                },
              },
            },
            {
              id: 6128,
              name: "ctime",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "创建时间",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 42,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6118,
              name: "currentVersion",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "当前版本",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 17,
                  character: 18,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6120,
              name: "homepage",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "小产品首页",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 21,
                  character: 12,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6114,
              name: "icons",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "图标url",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 8,
                  character: 9,
                },
              ],
              type: {
                type: "reflection",
                declaration: {
                  id: 6115,
                  name: "__type",
                  kind: 65536,
                  kindString: "Type literal",
                  flags: {},
                  sources: [
                    {
                      fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                      line: 8,
                      character: 10,
                    },
                  ],
                },
              },
            },
            {
              id: 6119,
              name: "installStatus",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "安装状态， ok-成功, running-正在安装",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 19,
                  character: 17,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6121,
              name: "internal",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText:
                  "表示该应用是内部的，不出现在 launchpad 和 app store 中",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 23,
                  character: 12,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6131,
              name: "menuIcon",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "菜单中显示的图标",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 48,
                  character: 12,
                },
              ],
              type: {
                type: "reflection",
                declaration: {
                  id: 6132,
                  name: "__type",
                  kind: 65536,
                  kindString: "Type literal",
                  flags: {},
                  sources: [
                    {
                      fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                      line: 48,
                      character: 13,
                    },
                  ],
                },
              },
            },
            {
              id: 6129,
              name: "mtime",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "修改时间",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 44,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6112,
              name: "name",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "小产品名称",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 4,
                  character: 8,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6125,
              name: "owner",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "作者",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 36,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6130,
              name: "pkgName",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "关联程序包名称",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 46,
                  character: 11,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6122,
              name: "private",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "私有安装应用, true or false",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 25,
                  character: 11,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6126,
              name: "readme",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "readme",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 38,
                  character: 10,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6127,
              name: "status",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "状态",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 40,
                  character: 10,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6116,
              name: "storyboardJson",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "小产品配置",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 13,
                  character: 18,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6117,
              name: "tags",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              comment: {
                shortText: "标签",
              },
              sources: [
                {
                  fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
                  line: 15,
                  character: 8,
                },
              ],
              type: {
                type: "array",
                elementType: {
                  type: "intrinsic",
                  name: "string",
                },
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [
                6113, 6123, 6128, 6118, 6120, 6114, 6119, 6121, 6131, 6129,
                6112, 6125, 6130, 6122, 6126, 6127, 6116, 6117,
              ],
            },
          ],
          sources: [
            {
              fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
              line: 2,
              character: 39,
            },
          ],
        },
      ],
      groups: [
        {
          title: "Interfaces",
          kind: 256,
          children: [6111],
        },
      ],
      sources: [
        {
          fileName: "model/micro_app/ModelInstalledMicroApp.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6133,
      name: '"model/micro_app/index.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/model/micro_app/index.d.ts",
      sources: [
        {
          fileName: "model/micro_app/index.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 6213,
      name: '"wrapper.d"',
      kind: 1,
      kindString: "External module",
      flags: {
        isExported: true,
      },
      originalName:
        "/Users/wangshenwei/anyclouds/brick-next/node_modules/@next-sdk/ucpro-sdk/dist/types/wrapper.d.ts",
      children: [
        {
          id: 6214,
          name: "ResponseBodyWrapper",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          typeParameter: [
            {
              id: 6215,
              name: "T",
              kind: 131072,
              kindString: "Type parameter",
              flags: {},
            },
          ],
          children: [
            {
              id: 6216,
              name: "code",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              sources: [
                {
                  fileName: "wrapper.d.ts",
                  line: 2,
                  character: 8,
                },
              ],
              type: {
                type: "intrinsic",
                name: "number",
              },
            },
            {
              id: 6217,
              name: "data",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              sources: [
                {
                  fileName: "wrapper.d.ts",
                  line: 3,
                  character: 8,
                },
              ],
              type: {
                type: "typeParameter",
                name: "T",
              },
            },
            {
              id: 6218,
              name: "error",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
                isOptional: true,
              },
              sources: [
                {
                  fileName: "wrapper.d.ts",
                  line: 4,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 6219,
              name: "message",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
                isOptional: true,
              },
              sources: [
                {
                  fileName: "wrapper.d.ts",
                  line: 5,
                  character: 11,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [6216, 6217, 6218, 6219],
            },
          ],
          sources: [
            {
              fileName: "wrapper.d.ts",
              line: 1,
              character: 36,
            },
          ],
        },
        {
          id: 6220,
          name: "ResponseListWrapper",
          kind: 256,
          kindString: "Interface",
          flags: {
            isExported: true,
          },
          typeParameter: [
            {
              id: 6221,
              name: "T",
              kind: 131072,
              kindString: "Type parameter",
              flags: {},
            },
          ],
          children: [
            {
              id: 6222,
              name: "list",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              sources: [
                {
                  fileName: "wrapper.d.ts",
                  line: 8,
                  character: 8,
                },
              ],
              type: {
                type: "array",
                elementType: {
                  type: "typeParameter",
                  name: "T",
                },
              },
            },
            {
              id: 6223,
              name: "page",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              sources: [
                {
                  fileName: "wrapper.d.ts",
                  line: 9,
                  character: 8,
                },
              ],
              type: {
                type: "intrinsic",
                name: "number",
              },
            },
            {
              id: 6224,
              name: "page_size",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              sources: [
                {
                  fileName: "wrapper.d.ts",
                  line: 10,
                  character: 13,
                },
              ],
              type: {
                type: "intrinsic",
                name: "number",
              },
            },
            {
              id: 6225,
              name: "total",
              kind: 1024,
              kindString: "Property",
              flags: {
                isExported: true,
              },
              sources: [
                {
                  fileName: "wrapper.d.ts",
                  line: 11,
                  character: 9,
                },
              ],
              type: {
                type: "intrinsic",
                name: "number",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              kind: 1024,
              children: [6222, 6223, 6224, 6225],
            },
          ],
          sources: [
            {
              fileName: "wrapper.d.ts",
              line: 7,
              character: 36,
            },
          ],
        },
      ],
      groups: [
        {
          title: "Interfaces",
          kind: 256,
          children: [6214, 6220],
        },
      ],
      sources: [
        {
          fileName: "wrapper.d.ts",
          line: 1,
          character: 0,
        },
      ],
    },
  ],
  groups: [
    {
      title: "External modules",
      kind: 1,
      children: [
        6134, 6146, 6157, 6200, 6169, 6180, 6189, 6201, 6211, 6206, 6212, 6110,
        6133, 6213,
      ],
    },
  ],
};
