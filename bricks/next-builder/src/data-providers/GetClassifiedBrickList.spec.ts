import { GetClassifiedBrickList } from "./GetClassifiedBrickList";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
    getCurrentApp: () => ({
      config: {
        libraryShowV3Brick: true,
      },
    }),
  }),
}));

describe("GetClassifiedBrickList", () => {
  it("should work", () => {
    const result = GetClassifiedBrickList([
      {
        type: "brick",
        id: "eo-button",
        title: "通用按钮",
        category: "",
        description: "通用按钮",
        layerType: "brick",
        icon: {
          imgSrc:
            "bricks/basic-bricks/dist/stories-asserts/basic-bricks.general-button.7c984d49a9a7220c.svg",
        },
        editorProps: null,
        $searchTextPool: ["eo-button", "通用按钮"],
        v3Brick: true,
      },
      {
        type: "brick",
        id: "basic-bricks.general-button",
        title: "通用按钮",
        category: "interact-basic",
        description: "可发送点击事件、可配置按钮名称、按钮跳转链接等",
        layerType: "brick",
        icon: {
          imgSrc:
            "bricks/basic-bricks/dist/stories-asserts/basic-bricks.general-button.7c984d49a9a7220c.svg",
        },
        editorProps: null,
        $searchTextPool: [
          "general button",
          "通用按钮",
          "basic-bricks.general-button",
        ],
      },
      {
        type: "brick",
        id: "base-layout.tpl-navigation-bar-widget",
        title: "基础导航栏",
        category: "navigation",
        description: "基础导航栏布局",
        layerType: "widget",
        thumbnail:
          "bricks/base-layout/dist/assets/base-layout.tpl-navigation-bar-widget1660567719247912814.png",
        icon: null,
        editorProps: null,
        $searchTextPool: [
          "基础导航栏",
          "base-layout.tpl-navigation-bar-widget",
        ],
      },
      {
        type: "provider",
        id: "basic-providers.provider-http-proxy",
        title: "provider-http-proxy",
        $searchTextPool: ["basic-providers.provider-http-proxy"],
      },
      {
        type: "customTemplate",
        id: "tpl-help-modal",
        title: "tpl-help-modal",
        nodeId: "B-7748",
        instanceId: "5a51e747b3b6b",
        $searchTextPool: ["tpl-help-modal"],
      },
      {
        type: "snippet",
        id: "basic-bricks.easy-view[grid-template-areas]",
        title: "由 grid-template-areas 划分区域的 easy-view",
        category: "container-layout",
        thumbnail:
          "bricks/basic-bricks/dist/stories-asserts/basic-bricks.easy-view[grid-template-areas].8b33235222d905dd.svg",
        bricks: [
          {
            brick: "basic-bricks.easy-view",
            properties: {
              containerStyle: {
                gap: "var(--page-card-gap)",
              },
              gridTemplateAreas: [
                ["header", "header"],
                ["sidebar", "content"],
                ["footer", "footer"],
              ],
              gridTemplateColumns: "200px 1fr",
            },
            slots: {
              content: {
                bricks: [
                  {
                    brick: "div",
                    properties: {
                      style: {
                        background: "aquamarine",
                      },
                      textContent: "Content",
                    },
                  },
                ],
                type: "bricks",
              },
              footer: {
                bricks: [
                  {
                    brick: "div",
                    properties: {
                      style: {
                        background: "gray",
                      },
                      textContent: "Footer",
                    },
                  },
                ],
                type: "bricks",
              },
              header: {
                bricks: [
                  {
                    brick: "div",
                    properties: {
                      style: {
                        background: "green",
                      },
                      textContent: "Header",
                    },
                  },
                ],
                type: "bricks",
              },
              sidebar: {
                bricks: [
                  {
                    brick: "div",
                    properties: {
                      style: {
                        background: "orange",
                      },
                      textContent: "Sidebar",
                    },
                  },
                ],
                type: "bricks",
              },
            },
          },
        ],
        $searchTextPool: [
          "easy view dividing by grid template areas",
          "由 grid-template-areas 划分区域的 easy-view",
          "basic-bricks.easy-view[grid-template-areas]",
        ],
      },
    ]);
    expect(result).toEqual({
      classifiedList: {
        brick: {
          __all__: [
            {
              type: "brick",
              id: "basic-bricks.general-button",
              title: "通用按钮",
              category: "interact-basic",
              description: "可发送点击事件、可配置按钮名称、按钮跳转链接等",
              layerType: "brick",
              icon: {
                imgSrc:
                  "bricks/basic-bricks/dist/stories-asserts/basic-bricks.general-button.7c984d49a9a7220c.svg",
              },
              editorProps: null,
              $searchTextPool: [
                "general button",
                "通用按钮",
                "basic-bricks.general-button",
              ],
              _type: "brick",
              _category: "interact-basic",
              _originBricks: [],
            },
            {
              type: "provider",
              id: "basic-providers.provider-http-proxy",
              title: "provider-http-proxy",
              $searchTextPool: ["basic-providers.provider-http-proxy"],
              _type: "brick",
              _originBricks: [],
            },
          ],
          "interact-basic": [
            {
              type: "brick",
              id: "basic-bricks.general-button",
              title: "通用按钮",
              category: "interact-basic",
              description: "可发送点击事件、可配置按钮名称、按钮跳转链接等",
              layerType: "brick",
              icon: {
                imgSrc:
                  "bricks/basic-bricks/dist/stories-asserts/basic-bricks.general-button.7c984d49a9a7220c.svg",
              },
              editorProps: null,
              $searchTextPool: [
                "general button",
                "通用按钮",
                "basic-bricks.general-button",
              ],
              _type: "brick",
              _category: "interact-basic",
              _originBricks: [],
            },
          ],
        },
        v3Brick: {
          __all__: [
            {
              type: "brick",
              id: "eo-button",
              title: "通用按钮",
              category: "",
              description: "通用按钮",
              layerType: "brick",
              icon: {
                imgSrc:
                  "bricks/basic-bricks/dist/stories-asserts/basic-bricks.general-button.7c984d49a9a7220c.svg",
              },
              editorProps: null,
              $searchTextPool: ["eo-button", "通用按钮"],
              _type: "v3Brick",
              _category: "",
              _originBricks: [],
              v3Brick: true,
            },
          ],
        },
        widget: {
          __all__: [
            {
              type: "brick",
              id: "base-layout.tpl-navigation-bar-widget",
              title: "基础导航栏",
              category: "navigation",
              description: "基础导航栏布局",
              layerType: "widget",
              thumbnail:
                "bricks/base-layout/dist/assets/base-layout.tpl-navigation-bar-widget1660567719247912814.png",
              icon: null,
              editorProps: null,
              $searchTextPool: [
                "基础导航栏",
                "base-layout.tpl-navigation-bar-widget",
              ],
              _type: "widget",
              _category: "navigation",
              _originBricks: [],
            },
          ],
          navigation: [
            {
              type: "brick",
              id: "base-layout.tpl-navigation-bar-widget",
              title: "基础导航栏",
              category: "navigation",
              description: "基础导航栏布局",
              layerType: "widget",
              thumbnail:
                "bricks/base-layout/dist/assets/base-layout.tpl-navigation-bar-widget1660567719247912814.png",
              icon: null,
              editorProps: null,
              $searchTextPool: [
                "基础导航栏",
                "base-layout.tpl-navigation-bar-widget",
              ],
              _type: "widget",
              _category: "navigation",
              _originBricks: [],
            },
          ],
        },
        customTemplate: {
          __all__: [
            {
              type: "customTemplate",
              id: "tpl-help-modal",
              title: "tpl-help-modal",
              nodeId: "B-7748",
              instanceId: "5a51e747b3b6b",
              $searchTextPool: ["tpl-help-modal"],
              _type: "customTemplate",
              _originBricks: [],
            },
          ],
        },
      },
      brickMap: {
        "eo-button": {
          type: "brick",
          id: "eo-button",
          title: "通用按钮",
          category: "",
          description: "通用按钮",
          layerType: "brick",
          icon: {
            imgSrc:
              "bricks/basic-bricks/dist/stories-asserts/basic-bricks.general-button.7c984d49a9a7220c.svg",
          },
          editorProps: null,
          $searchTextPool: ["eo-button", "通用按钮"],
          _type: "v3Brick",
          _category: "",
          _originBricks: [],
          v3Brick: true,
        },
        "basic-bricks.general-button": {
          type: "brick",
          id: "basic-bricks.general-button",
          title: "通用按钮",
          category: "interact-basic",
          description: "可发送点击事件、可配置按钮名称、按钮跳转链接等",
          layerType: "brick",
          icon: {
            imgSrc:
              "bricks/basic-bricks/dist/stories-asserts/basic-bricks.general-button.7c984d49a9a7220c.svg",
          },
          editorProps: null,
          $searchTextPool: [
            "general button",
            "通用按钮",
            "basic-bricks.general-button",
          ],
          _type: "brick",
          _category: "interact-basic",
          _originBricks: [],
        },
        "base-layout.tpl-navigation-bar-widget": {
          type: "brick",
          id: "base-layout.tpl-navigation-bar-widget",
          title: "基础导航栏",
          category: "navigation",
          description: "基础导航栏布局",
          layerType: "widget",
          thumbnail:
            "bricks/base-layout/dist/assets/base-layout.tpl-navigation-bar-widget1660567719247912814.png",
          icon: null,
          editorProps: null,
          $searchTextPool: [
            "基础导航栏",
            "base-layout.tpl-navigation-bar-widget",
          ],
          _type: "widget",
          _category: "navigation",
          _originBricks: [],
        },
        "basic-providers.provider-http-proxy": {
          type: "provider",
          id: "basic-providers.provider-http-proxy",
          title: "provider-http-proxy",
          $searchTextPool: ["basic-providers.provider-http-proxy"],
          _type: "brick",
          _originBricks: [],
        },
        "tpl-help-modal": {
          type: "customTemplate",
          id: "tpl-help-modal",
          title: "tpl-help-modal",
          nodeId: "B-7748",
          instanceId: "5a51e747b3b6b",
          $searchTextPool: ["tpl-help-modal"],
          _type: "customTemplate",
          _originBricks: [],
        },
        "basic-bricks.easy-view[grid-template-areas]": {
          type: "snippet",
          id: "basic-bricks.easy-view[grid-template-areas]",
          title: "由 grid-template-areas 划分区域的 easy-view",
          category: "container-layout",
          thumbnail:
            "bricks/basic-bricks/dist/stories-asserts/basic-bricks.easy-view[grid-template-areas].8b33235222d905dd.svg",
          bricks: [
            {
              brick: "basic-bricks.easy-view",
              properties: {
                containerStyle: {
                  gap: "var(--page-card-gap)",
                },
                gridTemplateAreas: [
                  ["header", "header"],
                  ["sidebar", "content"],
                  ["footer", "footer"],
                ],
                gridTemplateColumns: "200px 1fr",
              },
              slots: {
                content: {
                  bricks: [
                    {
                      brick: "div",
                      properties: {
                        style: {
                          background: "aquamarine",
                        },
                        textContent: "Content",
                      },
                    },
                  ],
                  type: "bricks",
                },
                footer: {
                  bricks: [
                    {
                      brick: "div",
                      properties: {
                        style: {
                          background: "gray",
                        },
                        textContent: "Footer",
                      },
                    },
                  ],
                  type: "bricks",
                },
                header: {
                  bricks: [
                    {
                      brick: "div",
                      properties: {
                        style: {
                          background: "green",
                        },
                        textContent: "Header",
                      },
                    },
                  ],
                  type: "bricks",
                },
                sidebar: {
                  bricks: [
                    {
                      brick: "div",
                      properties: {
                        style: {
                          background: "orange",
                        },
                        textContent: "Sidebar",
                      },
                    },
                  ],
                  type: "bricks",
                },
              },
            },
          ],
          $searchTextPool: [
            "easy view dividing by grid template areas",
            "由 grid-template-areas 划分区域的 easy-view",
            "basic-bricks.easy-view[grid-template-areas]",
          ],
          _category: "container-layout",
          _originBricks: ["basic-bricks.easy-view"],
        },
      },
      i18nTransform: expect.anything(),
    });
    expect(result.i18nTransform("type", "v3Brick")).toEqual(
      "next-builder:V3_BRICK"
    );
  });
});
