import { groupItem } from "./constants";
import { adjustBrickSort, getSnippetsOfBrickMap } from "./processor";

describe("processor", () => {
  it.each([
    [
      [
        {
          key: "layout",
          text: "布局",
          children: [],
        },
      ],
      undefined,
      [
        {
          key: "layout",
          text: "布局",
          children: [],
        },
      ],
    ],
    [
      [
        {
          children: [
            {
              type: "brick",
              id: "basic-bricks.micro-view",
            },
            {
              type: "brick",
              id: "basic-bricks.general-button",
            },
            {
              type: "brick",
              id: "basic-bricks.general-card",
            },
            {
              type: "brick",
              id: "basic-bricks.easy-view",
            },
            {
              type: "brick",
              id: "basic-bricks.general-modal",
            },
            {
              type: "brick",
              id: "basic-bricks.general-drawer",
            },
          ],
          key: "suggest",
          text: "推荐",
        },
        {
          key: "layout",
          text: "布局",
          children: [
            {
              category: "layout",
              id: "basic-bricks.grid-layout",
              layerType: "brick",
              title: "网格布局",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.micro-view",
              layerType: "brick",
              title: "通用页面视图容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advanced-list-container",
              layerType: "brick",
              title: "动态构件列表容器v2",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advance-list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "container-brick.search-bar",
              layerType: "brick",
              title: "搜索框容器",
              type: "brick",
            },
          ],
        },
        {
          key: "form-input",
          text: "表单输入",
          children: [
            {
              category: "form-input",
              id: "code.vs-code-editor",
              layerType: "brick",
              title: "VS Code代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "code-bricks.code-editor",
              layerType: "brick",
              title: "代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-form",
              layerType: "brick",
              title: "普通表单",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-input",
              layerType: "brick",
              title: "普通输入框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-time-picker",
              layerType: "brick",
              title: "普通时间选择框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-date-picker",
              layerType: "brick",
              title: "普通日期选择框",
              type: "brick",
            },
          ],
        },
      ],
      [
        {
          group: "form-input",
          position: [
            "code.vs-code-editor",
            "code-bricks.code-editor",
            "forms.general-form",
            "forms.general-input",
            "forms.general-time-picker",
            "forms.general-date-picker",
          ],
        },
      ],
      [
        {
          children: [
            {
              category: "form-input",
              id: "code.vs-code-editor",
              layerType: "brick",
              title: "VS Code代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "code-bricks.code-editor",
              layerType: "brick",
              title: "代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-form",
              layerType: "brick",
              title: "普通表单",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-input",
              layerType: "brick",
              title: "普通输入框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-time-picker",
              layerType: "brick",
              title: "普通时间选择框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-date-picker",
              layerType: "brick",
              title: "普通日期选择框",
              type: "brick",
            },
          ],
          key: "form-input",
          text: "表单输入",
        },
        {
          children: [
            { id: "basic-bricks.micro-view", type: "brick" },
            { id: "basic-bricks.general-button", type: "brick" },
            { id: "basic-bricks.general-card", type: "brick" },
            { id: "basic-bricks.easy-view", type: "brick" },
            { id: "basic-bricks.general-modal", type: "brick" },
            { id: "basic-bricks.general-drawer", type: "brick" },
          ],
          key: "suggest",
          text: "推荐",
        },
        {
          children: [
            {
              category: "layout",
              id: "basic-bricks.grid-layout",
              layerType: "brick",
              title: "网格布局",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.micro-view",
              layerType: "brick",
              title: "通用页面视图容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advanced-list-container",
              layerType: "brick",
              title: "动态构件列表容器v2",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advance-list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "container-brick.search-bar",
              layerType: "brick",
              title: "搜索框容器",
              type: "brick",
            },
          ],
          key: "layout",
          text: "布局",
        },
      ],
    ],
    [
      [
        {
          children: [
            {
              type: "brick",
              id: "basic-bricks.micro-view",
            },
            {
              type: "brick",
              id: "basic-bricks.general-button",
            },
            {
              type: "brick",
              id: "basic-bricks.general-card",
            },
            {
              type: "brick",
              id: "basic-bricks.easy-view",
            },
            {
              type: "brick",
              id: "basic-bricks.general-modal",
            },
            {
              type: "brick",
              id: "basic-bricks.general-drawer",
            },
          ],
          key: "suggest",
          text: "推荐",
        },
        {
          key: "layout",
          text: "布局",
          children: [
            {
              category: "layout",
              id: "basic-bricks.grid-layout",
              layerType: "brick",
              title: "网格布局",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.micro-view",
              layerType: "brick",
              title: "通用页面视图容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advanced-list-container",
              layerType: "brick",
              title: "动态构件列表容器v2",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advance-list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "container-brick.search-bar",
              layerType: "brick",
              title: "搜索框容器",
              type: "brick",
            },
          ],
        },
        {
          key: "form-input",
          text: "表单输入",
          children: [
            {
              category: "form-input",
              id: "code.vs-code-editor",
              layerType: "brick",
              title: "VS Code代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "code-bricks.code-editor",
              layerType: "brick",
              title: "代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-form",
              layerType: "brick",
              title: "普通表单",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-input",
              layerType: "brick",
              title: "普通输入框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-time-picker",
              layerType: "brick",
              title: "普通时间选择框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-date-picker",
              layerType: "brick",
              title: "普通日期选择框",
              type: "brick",
            },
          ],
        },
      ],
      [
        {
          group: "form-input",
          position: [
            "forms.general-date-picker",
            "forms.general-time-picker",
            "forms.general-input",
            "forms.general-form",
            "code-bricks.code-editor",
            "code.vs-code-editor",
          ],
        },
        {
          group: "test",
          position: ["test.hello-word"],
        },
        {
          group: "suggest",
          position: ["test.hello-work", "basic-bricks.general-modal"],
        },
      ],
      [
        {
          children: [
            {
              category: "form-input",
              id: "forms.general-date-picker",
              layerType: "brick",
              title: "普通日期选择框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-time-picker",
              layerType: "brick",
              title: "普通时间选择框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-input",
              layerType: "brick",
              title: "普通输入框",
              type: "brick",
            },
            {
              category: "form-input",
              id: "forms.general-form",
              layerType: "brick",
              title: "普通表单",
              type: "brick",
            },
            {
              category: "form-input",
              id: "code-bricks.code-editor",
              layerType: "brick",
              title: "代码编辑构件",
              type: "brick",
            },
            {
              category: "form-input",
              id: "code.vs-code-editor",
              layerType: "brick",
              title: "VS Code代码编辑构件",
              type: "brick",
            },
          ],
          key: "form-input",
          text: "表单输入",
        },
        {
          children: [
            { id: "basic-bricks.general-modal", type: "brick" },
            { id: "basic-bricks.micro-view", type: "brick" },
            { id: "basic-bricks.general-button", type: "brick" },
            { id: "basic-bricks.general-card", type: "brick" },
            { id: "basic-bricks.easy-view", type: "brick" },
            { id: "basic-bricks.general-drawer", type: "brick" },
          ],
          key: "suggest",
          text: "推荐",
        },
        {
          children: [
            {
              category: "layout",
              id: "basic-bricks.grid-layout",
              layerType: "brick",
              title: "网格布局",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.micro-view",
              layerType: "brick",
              title: "通用页面视图容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advanced-list-container",
              layerType: "brick",
              title: "动态构件列表容器v2",
              type: "brick",
            },
            {
              category: "layout",
              id: "basic-bricks.advance-list-container",
              layerType: "brick",
              title: "动态构件列表容器",
              type: "brick",
            },
            {
              category: "layout",
              id: "container-brick.search-bar",
              layerType: "brick",
              title: "搜索框容器",
              type: "brick",
            },
          ],
          key: "layout",
          text: "布局",
        },
      ],
    ],
  ])("adjustBrickSort should work %#", (group, sortTemplates, result) => {
    expect(adjustBrickSort(group as groupItem[], sortTemplates)).toEqual(
      result
    );
  });

  it.each([
    [
      [
        {
          id: "presentational-bricks.brick-link",
          title: "链接",
          bricks: [
            {
              brick: "presentational-bricks.brick-link",
              properties: {
                label: "查看",
              },
            },
          ],
        },
        {
          id: "basic-bricks-widgets.general-button-mix",
          title: "混合按钮",
          bricks: [
            {
              brick: "basic-bricks.general-card",
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "basic-bricks.general-button",
                      properties: {
                        buttonType: "primary",
                      },
                    },
                    {
                      brick: "basic-bricks.general-custom-buttons",
                      properties: {
                        alignment: "end",
                        customButtons: [
                          {
                            buttonType: "primary",
                            eventName: "button-create",
                            text: "新建",
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          ],
          useInBricks: [
            "basic-bricks.general-custom-buttons",
            "basic-bricks.general-button",
          ],
        },
        {
          id: "basic-bricks.general-button[primary]",
          title: "主按钮",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonType: "primary",
              },
            },
          ],
        },
        {
          id: "basic-bricks.general-button[default]",
          title: "默认按钮",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonType: "default",
              },
            },
          ],
          thumbnail: {
            imgSrc: "../images/default.svg",
          },
        },
        {
          id: "presentational-bricks-widgets.card-item-with-description-drawer",
          title: "带描述抽屉的卡片项",
          bricks: [
            {
              bg: false,
              brick: "div",
              iid: "5e2a50d911d35",
              injectDeep: true,
              portal: false,
              slots: {
                "": {
                  bricks: [
                    {
                      bg: false,
                      brick: "presentational-bricks.card-item",
                      events: {
                        "presentational-bricks.card-item.click": {
                          method: "open",
                          target: "#my-drawer",
                        },
                      },
                      iid: "5e2a50d912f2d",
                      injectDeep: true,
                      portal: false,
                      properties: {
                        cardLayoutType: "icon-small-align-left",
                        cardSubtitle: "副标题文字",
                        cardTitle: "卡片标题",
                        dataset: {
                          testid: "drawer-card",
                        },
                        descriptionList: "点击查看详细信息",
                        icon: {
                          icon: "chart-pie",
                          lib: "fa",
                        },
                        iconColor: "geekblue",
                        style: {
                          width: "300px",
                        },
                      },
                    },
                    {
                      bg: false,
                      brick: "basic-bricks.general-drawer",
                      iid: "5e2a50d9158f9",
                      injectDeep: true,
                      portal: false,
                      properties: {
                        closable: true,
                        customTitle: "添加信息",
                        dataset: {
                          testid: "drawer",
                        },
                        hasFooter: true,
                        id: "my-drawer",
                        maskClosable: true,
                        width: 600,
                      },
                      slots: {
                        content: {
                          bricks: [
                            {
                              bg: false,
                              brick: "presentational-bricks.brick-descriptions",
                              iid: "5e2a51afac0ef",
                              injectDeep: true,
                              portal: false,
                              properties: {
                                column: 2,
                                dataset: {
                                  testid: "drawer-description1",
                                },
                                descriptionTitle: "基本信息",
                                itemList: [
                                  {
                                    label: "名称",
                                    text: "easyops",
                                  },
                                  {
                                    label: "环境类型",
                                    text: "无",
                                  },
                                  {
                                    label: "授权模式",
                                    text: "clientCert",
                                  },
                                  {
                                    label: "服务供应商",
                                  },
                                ],
                                showCard: false,
                              },
                            },
                            {
                              bg: false,
                              brick: "presentational-bricks.brick-descriptions",
                              iid: "5e2a521ecab06",
                              injectDeep: true,
                              portal: false,
                              properties: {
                                column: 2,
                                dataset: {
                                  testid: "drawer-description2",
                                },
                                descriptionTitle: "集群规格",
                                itemList: [
                                  {
                                    label: "集群来源",
                                    text: "导入",
                                  },
                                  {
                                    label: "Manter节点数量",
                                    text: "3个",
                                  },
                                  {
                                    label: "可分配CPU",
                                    text: "12 Cores",
                                  },
                                  {
                                    label: "可分配内存",
                                    text: "44.8GIB",
                                  },
                                ],
                                showCard: false,
                                style: {
                                  marginTop: "20px",
                                },
                              },
                            },
                          ],
                          type: "bricks",
                        },
                        headerRight: {
                          bricks: [
                            {
                              bg: false,
                              brick: "basic-bricks.general-custom-buttons",
                              iid: "5e2a525344293",
                              injectDeep: true,
                              portal: false,
                              properties: {
                                customButtons: [
                                  {
                                    buttonType: "link",
                                    icon: {
                                      color: "#167be0",
                                      icon: "share-alt",
                                      lib: "fa",
                                      prefix: "fas",
                                    },
                                    isDropdown: false,
                                    tooltip: "分享",
                                    tooltipPlacement: "bottom",
                                  },
                                ],
                                dataset: {
                                  testid: "drawer-share-btn",
                                },
                              },
                            },
                          ],
                          type: "bricks",
                        },
                      },
                    },
                    {
                      brick: "basic-bricks.general-button",
                      properties: {
                        buttonType: "primary",
                      },
                    },
                    {
                      brick: "presentational-bricks.brick-link",
                      properties: {
                        label: "查看",
                      },
                    },
                  ],
                  type: "bricks",
                },
              },
            },
          ],
          useInBricks: [
            "basic-bricks.general-button",
            "presentational-bricks.brick-link",
          ],
          thumbnail: {
            imgSrc: "../images/default.svg",
          },
        },
        {
          id: "presentational-bricks-widgets.general-search-no-update-query",
          title: "搜索框（不更新url）",
          bricks: [
            {
              brick: "presentational-bricks.brick-general-search",
              events: {
                "filter.update": [
                  {
                    action: "message.success",
                    args: ["点击搜索"],
                  },
                ],
                "query.change": [
                  {
                    action: "message.success",
                    args: ["输入搜索"],
                  },
                ],
              },
              iid: "5e2692449abbb",
              injectDeep: true,
              portal: false,
              properties: {
                dataset: {
                  testid: "general-search-no-update-query",
                },
                buttonType: "primary",
                placeholder: "搜索不更新 url 参数",
                shouldTrimQuery: true,
                shouldUpdateUrlParams: false,
              },
            },
          ],
        },
      ],
      new Map([
        [
          "basic-bricks.general-button",
          new Map([
            [
              "selfBrick",
              [
                {
                  id: "basic-bricks.general-button[default]",
                  title: "默认按钮",
                  bricks: [
                    {
                      brick: "basic-bricks.general-button",
                      properties: {
                        buttonType: "default",
                      },
                    },
                  ],
                  thumbnail: {
                    imgSrc: "../images/default.svg",
                  },
                },
                {
                  id: "basic-bricks.general-button[primary]",
                  title: "主按钮",
                  bricks: [
                    {
                      brick: "basic-bricks.general-button",
                      properties: {
                        buttonType: "primary",
                      },
                    },
                  ],
                },
              ],
            ],
            [
              "scene",
              [
                {
                  id: "presentational-bricks-widgets.card-item-with-description-drawer",
                  title: "带描述抽屉的卡片项",
                  bricks: [
                    {
                      bg: false,
                      brick: "div",
                      iid: "5e2a50d911d35",
                      injectDeep: true,
                      portal: false,
                      slots: {
                        "": {
                          bricks: [
                            {
                              bg: false,
                              brick: "presentational-bricks.card-item",
                              events: {
                                "presentational-bricks.card-item.click": {
                                  method: "open",
                                  target: "#my-drawer",
                                },
                              },
                              iid: "5e2a50d912f2d",
                              injectDeep: true,
                              portal: false,
                              properties: {
                                cardLayoutType: "icon-small-align-left",
                                cardSubtitle: "副标题文字",
                                cardTitle: "卡片标题",
                                dataset: {
                                  testid: "drawer-card",
                                },
                                descriptionList: "点击查看详细信息",
                                icon: {
                                  icon: "chart-pie",
                                  lib: "fa",
                                },
                                iconColor: "geekblue",
                                style: {
                                  width: "300px",
                                },
                              },
                            },
                            {
                              bg: false,
                              brick: "basic-bricks.general-drawer",
                              iid: "5e2a50d9158f9",
                              injectDeep: true,
                              portal: false,
                              properties: {
                                closable: true,
                                customTitle: "添加信息",
                                dataset: {
                                  testid: "drawer",
                                },
                                hasFooter: true,
                                id: "my-drawer",
                                maskClosable: true,
                                width: 600,
                              },
                              slots: {
                                content: {
                                  bricks: [
                                    {
                                      bg: false,
                                      brick:
                                        "presentational-bricks.brick-descriptions",
                                      iid: "5e2a51afac0ef",
                                      injectDeep: true,
                                      portal: false,
                                      properties: {
                                        column: 2,
                                        dataset: {
                                          testid: "drawer-description1",
                                        },
                                        descriptionTitle: "基本信息",
                                        itemList: [
                                          {
                                            label: "名称",
                                            text: "easyops",
                                          },
                                          {
                                            label: "环境类型",
                                            text: "无",
                                          },
                                          {
                                            label: "授权模式",
                                            text: "clientCert",
                                          },
                                          {
                                            label: "服务供应商",
                                          },
                                        ],
                                        showCard: false,
                                      },
                                    },
                                    {
                                      bg: false,
                                      brick:
                                        "presentational-bricks.brick-descriptions",
                                      iid: "5e2a521ecab06",
                                      injectDeep: true,
                                      portal: false,
                                      properties: {
                                        column: 2,
                                        dataset: {
                                          testid: "drawer-description2",
                                        },
                                        descriptionTitle: "集群规格",
                                        itemList: [
                                          {
                                            label: "集群来源",
                                            text: "导入",
                                          },
                                          {
                                            label: "Manter节点数量",
                                            text: "3个",
                                          },
                                          {
                                            label: "可分配CPU",
                                            text: "12 Cores",
                                          },
                                          {
                                            label: "可分配内存",
                                            text: "44.8GIB",
                                          },
                                        ],
                                        showCard: false,
                                        style: {
                                          marginTop: "20px",
                                        },
                                      },
                                    },
                                  ],
                                  type: "bricks",
                                },
                                headerRight: {
                                  bricks: [
                                    {
                                      bg: false,
                                      brick:
                                        "basic-bricks.general-custom-buttons",
                                      iid: "5e2a525344293",
                                      injectDeep: true,
                                      portal: false,
                                      properties: {
                                        customButtons: [
                                          {
                                            buttonType: "link",
                                            icon: {
                                              color: "#167be0",
                                              icon: "share-alt",
                                              lib: "fa",
                                              prefix: "fas",
                                            },
                                            isDropdown: false,
                                            tooltip: "分享",
                                            tooltipPlacement: "bottom",
                                          },
                                        ],
                                        dataset: {
                                          testid: "drawer-share-btn",
                                        },
                                      },
                                    },
                                  ],
                                  type: "bricks",
                                },
                              },
                            },
                            {
                              brick: "basic-bricks.general-button",
                              properties: {
                                buttonType: "primary",
                              },
                            },
                            {
                              brick: "presentational-bricks.brick-link",
                              properties: {
                                label: "查看",
                              },
                            },
                          ],
                          type: "bricks",
                        },
                      },
                    },
                  ],
                  useInBricks: [
                    "basic-bricks.general-button",
                    "presentational-bricks.brick-link",
                  ],
                  thumbnail: {
                    imgSrc: "../images/default.svg",
                  },
                },
                {
                  id: "basic-bricks-widgets.general-button-mix",
                  title: "混合按钮",
                  bricks: [
                    {
                      brick: "basic-bricks.general-card",
                      slots: {
                        "": {
                          type: "bricks",
                          bricks: [
                            {
                              brick: "basic-bricks.general-button",
                              properties: {
                                buttonType: "primary",
                              },
                            },
                            {
                              brick: "basic-bricks.general-custom-buttons",
                              properties: {
                                alignment: "end",
                                customButtons: [
                                  {
                                    buttonType: "primary",
                                    eventName: "button-create",
                                    text: "新建",
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    },
                  ],
                  useInBricks: [
                    "basic-bricks.general-custom-buttons",
                    "basic-bricks.general-button",
                  ],
                },
              ],
            ],
          ]),
        ],
        [
          "presentational-bricks.brick-general-search",
          new Map([
            [
              "selfBrick",
              [
                {
                  id: "presentational-bricks-widgets.general-search-no-update-query",
                  title: "搜索框（不更新url）",
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-general-search",
                      events: {
                        "filter.update": [
                          {
                            action: "message.success",
                            args: ["点击搜索"],
                          },
                        ],
                        "query.change": [
                          {
                            action: "message.success",
                            args: ["输入搜索"],
                          },
                        ],
                      },
                      iid: "5e2692449abbb",
                      injectDeep: true,
                      portal: false,
                      properties: {
                        dataset: {
                          testid: "general-search-no-update-query",
                        },
                        buttonType: "primary",
                        placeholder: "搜索不更新 url 参数",
                        shouldTrimQuery: true,
                        shouldUpdateUrlParams: false,
                      },
                    },
                  ],
                },
              ],
            ],
          ]),
        ],
        [
          "presentational-bricks.brick-link",
          new Map([
            [
              "selfBrick",
              [
                {
                  id: "presentational-bricks.brick-link",
                  title: "链接",
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-link",
                      properties: {
                        label: "查看",
                      },
                    },
                  ],
                },
              ],
            ],
            [
              "scene",
              [
                {
                  id: "presentational-bricks-widgets.card-item-with-description-drawer",
                  thumbnail: {
                    imgSrc: "../images/default.svg",
                  },
                  title: "带描述抽屉的卡片项",
                  bricks: [
                    {
                      bg: false,
                      brick: "div",
                      iid: "5e2a50d911d35",
                      injectDeep: true,
                      portal: false,
                      slots: {
                        "": {
                          bricks: [
                            {
                              bg: false,
                              brick: "presentational-bricks.card-item",
                              events: {
                                "presentational-bricks.card-item.click": {
                                  method: "open",
                                  target: "#my-drawer",
                                },
                              },
                              iid: "5e2a50d912f2d",
                              injectDeep: true,
                              portal: false,
                              properties: {
                                cardLayoutType: "icon-small-align-left",
                                cardSubtitle: "副标题文字",
                                cardTitle: "卡片标题",
                                dataset: {
                                  testid: "drawer-card",
                                },
                                descriptionList: "点击查看详细信息",
                                icon: {
                                  icon: "chart-pie",
                                  lib: "fa",
                                },
                                iconColor: "geekblue",
                                style: {
                                  width: "300px",
                                },
                              },
                            },
                            {
                              bg: false,
                              brick: "basic-bricks.general-drawer",
                              iid: "5e2a50d9158f9",
                              injectDeep: true,
                              portal: false,
                              properties: {
                                closable: true,
                                customTitle: "添加信息",
                                dataset: {
                                  testid: "drawer",
                                },
                                hasFooter: true,
                                id: "my-drawer",
                                maskClosable: true,
                                width: 600,
                              },
                              slots: {
                                content: {
                                  bricks: [
                                    {
                                      bg: false,
                                      brick:
                                        "presentational-bricks.brick-descriptions",
                                      iid: "5e2a51afac0ef",
                                      injectDeep: true,
                                      portal: false,
                                      properties: {
                                        column: 2,
                                        dataset: {
                                          testid: "drawer-description1",
                                        },
                                        descriptionTitle: "基本信息",
                                        itemList: [
                                          {
                                            label: "名称",
                                            text: "easyops",
                                          },
                                          {
                                            label: "环境类型",
                                            text: "无",
                                          },
                                          {
                                            label: "授权模式",
                                            text: "clientCert",
                                          },
                                          {
                                            label: "服务供应商",
                                          },
                                        ],
                                        showCard: false,
                                      },
                                    },
                                    {
                                      bg: false,
                                      brick:
                                        "presentational-bricks.brick-descriptions",
                                      iid: "5e2a521ecab06",
                                      injectDeep: true,
                                      portal: false,
                                      properties: {
                                        column: 2,
                                        dataset: {
                                          testid: "drawer-description2",
                                        },
                                        descriptionTitle: "集群规格",
                                        itemList: [
                                          {
                                            label: "集群来源",
                                            text: "导入",
                                          },
                                          {
                                            label: "Manter节点数量",
                                            text: "3个",
                                          },
                                          {
                                            label: "可分配CPU",
                                            text: "12 Cores",
                                          },
                                          {
                                            label: "可分配内存",
                                            text: "44.8GIB",
                                          },
                                        ],
                                        showCard: false,
                                        style: {
                                          marginTop: "20px",
                                        },
                                      },
                                    },
                                  ],
                                  type: "bricks",
                                },
                                headerRight: {
                                  bricks: [
                                    {
                                      bg: false,
                                      brick:
                                        "basic-bricks.general-custom-buttons",
                                      iid: "5e2a525344293",
                                      injectDeep: true,
                                      portal: false,
                                      properties: {
                                        customButtons: [
                                          {
                                            buttonType: "link",
                                            icon: {
                                              color: "#167be0",
                                              icon: "share-alt",
                                              lib: "fa",
                                              prefix: "fas",
                                            },
                                            isDropdown: false,
                                            tooltip: "分享",
                                            tooltipPlacement: "bottom",
                                          },
                                        ],
                                        dataset: {
                                          testid: "drawer-share-btn",
                                        },
                                      },
                                    },
                                  ],
                                  type: "bricks",
                                },
                              },
                            },
                            {
                              brick: "basic-bricks.general-button",
                              properties: {
                                buttonType: "primary",
                              },
                            },
                            {
                              brick: "presentational-bricks.brick-link",
                              properties: {
                                label: "查看",
                              },
                            },
                          ],
                          type: "bricks",
                        },
                      },
                    },
                  ],
                  useInBricks: [
                    "basic-bricks.general-button",
                    "presentational-bricks.brick-link",
                  ],
                },
              ],
            ],
          ]),
        ],
        [
          "basic-bricks.general-custom-buttons",
          new Map([
            [
              "scene",
              [
                {
                  id: "basic-bricks-widgets.general-button-mix",
                  title: "混合按钮",
                  bricks: [
                    {
                      brick: "basic-bricks.general-card",
                      slots: {
                        "": {
                          type: "bricks",
                          bricks: [
                            {
                              brick: "basic-bricks.general-button",
                              properties: {
                                buttonType: "primary",
                              },
                            },
                            {
                              brick: "basic-bricks.general-custom-buttons",
                              properties: {
                                alignment: "end",
                                customButtons: [
                                  {
                                    buttonType: "primary",
                                    eventName: "button-create",
                                    text: "新建",
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    },
                  ],
                  useInBricks: [
                    "basic-bricks.general-custom-buttons",
                    "basic-bricks.general-button",
                  ],
                },
              ],
            ],
          ]),
        ],
      ]),
    ],
  ])("getSnippetsOfBrick should work %#", (list, result) => {
    expect(getSnippetsOfBrickMap(list)).toEqual(result);
  });
});
