import { Story } from "@next-core/brick-types";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export const generalCustomButtonsStory: Story = {
  storyId: "basic-bricks.general-custom-buttons",
  category: "other",
  type: "brick",
  author: "ice",
  text: {
    en: "General custom button",
    zh: "自定义按钮组",
  },
  description: {
    en: "General button",
    zh: "可配置收纳起来的更多按钮，可配置不同事件，常用于页面右上角、卡片右上角等操作位。",
  },
  icon: {
    lib: "fa",
    icon: "pencil-alt",
  },
  conf: [
    {
      description: {
        title: "基本用法",
        message: "将多个button组合在一起。",
      },
      brick: "basic-bricks.general-custom-buttons",
      properties: {
        dataset: {
          testid: "basic-usage-demo",
        },
        alignment: "end",
        customButtons: [
          {
            text: "新建",
            buttonType: "primary",
            icon: {
              lib: "antd",
              icon: "plus-circle",
              theme: "outlined",
            },
            eventName: "button-create",
          },
          {
            text: "导入",
            icon: "import",
            eventName: "button-import",
          },
          {
            text: "导出",
            icon: "export",
            eventName: "button-export",
          },
        ],
      },
      events: {
        "button-create": {
          action: "message.success",
          args: ["点击了新建按钮"],
        },
        "button-import": {
          action: "message.success",
          args: ["点击了导入按钮"],
        },
        "button-export": {
          action: "message.success",
          args: ["点击了导出按钮"],
        },
      },
    },
    {
      description: {
        title: "分别对按钮进行配置",
        message: "支持配置按钮的样式、禁用、tooltip、事件等等。",
      },
      brick: "basic-bricks.general-custom-buttons",
      properties: {
        dataset: {
          testid: "type-disabled-tooltip-event-demo",
        },
        alignment: "start",
        customButtons: [
          {
            text: "主按钮",
            buttonType: "primary",
            eventName: "primary-button",
          },
          {
            text: "禁用按钮",
            disabledTooltip: "权限不足",
            disabled: true,
            eventName: "default-button",
          },
          {
            text: "警告按钮",
            tooltip: "危险！！！",
            buttonType: "danger",
            eventName: "danger-button",
          },
          {
            text: "链接按钮",
            buttonType: "link",
            buttonHref: "http://docs.developers.easyops.cn/",
            urlTarget: "_blank",
          },
          {
            text: "圆边大按钮",
            buttonSize: "large",
            buttonShape: "round",
            eventName: "round-button",
          },
        ],
      },
      events: {
        "primary-button": {
          action: "message.success",
          args: ["点击了主按钮"],
        },
        "default-button": {
          action: "message.success",
          args: ["点击了默认按钮"],
        },
        "danger-button": {
          action: "message.success",
          args: ["点击了警告按钮"],
        },
        "round-button": {
          action: "message.success",
          args: ["点击了圆边大按钮"],
        },
      },
    },
    {
      description: {
        title: "组合按钮1",
        message:
          '位置为页面的右上角区域。使用形态为图标+文字按钮，默认放置三个，其中一个为主按钮，放于所有按钮的最左侧；≥3 的情况下，默认展示出两个，其他按钮用下拉按钮收起，收纳在"···"的更多按钮中。',
      },
      brick: "basic-bricks.general-custom-buttons",
      properties: {
        dataset: {
          testid: "default-dropdown-demo",
        },
        alignment: "end",
        customButtons: [
          {
            text: "新建",
            buttonType: "primary",
            icon: {
              lib: "antd",
              icon: "plus-circle",
              theme: "outlined",
            },
            eventName: "button-create",
            testId: "create",
          },
          {
            text: "搜索",
            icon: "search",
            eventName: "button-search",
            testId: "search",
          },
          {
            isDropdown: true,
            text: "权限管理",
            icon: "user",
            eventName: "button-permission",
            testId: "permission",
          },
          {
            isDropdown: true,
            text: "环境设置",
            icon: {
              lib: "antd",
              icon: "global",
              theme: "outlined",
            },
            eventName: "button-setting",
            testId: "setting",
          },
        ],
      },
      events: {
        "button-create": {
          action: "console.log",
        },
        "button-search": {
          action: "console.log",
        },
        "button-permission": {
          action: "console.log",
        },
        "button-setting": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "组合按钮2",
        message:
          "组合按钮的样式也可以和普通按钮保持一致。同时，可以利用分隔符对收纳在里面的按钮进行分组。",
      },
      brick: "basic-bricks.general-custom-buttons",
      properties: {
        dataset: {
          testid: "customized-dropdown-demo",
        },
        alignment: "end",
        dropdownPlacement: "topLeft",
        dropdownBtnIcon: {
          lib: "antd",
          icon: "setting",
          theme: "outlined",
        },
        dropdownBtnText: "更多操作",
        customButtons: [
          {
            isDropdown: false,
            buttonType: "primary",
            text: "更新视图",
            icon: "save",
            eventName: "instance.topology.update",
          },
          {
            isDropdown: false,
            text: "导入视图",
            icon: "import",
            eventName: "instance.topology.import",
          },
          {
            isDropdown: true,
            text: "另存为",
            icon: "file-add",
            eventName: "instance.topology.saveAs",
          },
          {
            isDropdown: true,
            text: "个性化",
            icon: "setting",
            eventName: "instance.topology.setting",
          },
          {
            isDropdown: true,
            isDivider: true,
          },
          {
            isDropdown: true,
            text: "删除视图",
            icon: "delete",
            color: "var(--theme-red-color)",
            eventName: "instance.topology.delete",
          },
        ],
      },
      events: {
        "instance.topology.update": {
          action: "console.log",
        },
        "instance.topology.import": {
          action: "console.log",
        },
        "instance.topology.setting": {
          action: "console.log",
        },
        "instance.topology.saveAs": {
          action: "console.log",
        },
        "instance.topology.delete": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "按钮更新",
        message:
          "需要利用updateButton方法，对按钮进行更新（例如：启用、禁用、tooltip文字）等。编排时可以配合provider使用。",
      },
      brick: "div",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-custom-buttons",
              properties: {
                dataset: {
                  testid: "update-button-demo",
                },
                id: "testTarget",
                alignment: "end",
                customButtons: [
                  {
                    isDropdown: false,
                    text: "更新视图",
                    icon: "save",
                    id: "update-btn",
                    eventName: "instance.topology.update",
                  },
                  {
                    isDropdown: true,
                    text: "另存为",
                    icon: "file-add",
                    id: "save-as-btn",
                    eventName: "instance.topology.saveAs",
                  },
                  {
                    isDropdown: true,
                    text: "删除视图",
                    icon: "delete",
                    color: "var(--theme-red-color)",
                    id: "delete-btn",
                    eventName: "instance.topology.delete",
                  },
                ],
              },
              events: {
                "instance.topology.update": {
                  action: "console.log",
                },
                "instance.topology.saveAs": {
                  action: "console.log",
                },
                "instance.topology.delete": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                style: {
                  marginTop: "10px",
                },
                buttonType: "link",
                buttonName: "点击更新",
              },
              events: {
                "general.button.click": [
                  {
                    target: "#testTarget",
                    method: "updateButton",
                    args: [
                      "update-btn",
                      {
                        disabled: true,
                        text: "视图无法更新",
                        tooltip: "权限不足",
                      },
                    ],
                  },
                  {
                    target: "#testTarget",
                    method: "updateButton",
                    args: ["delete-btn", { disabled: false }],
                  },
                ],
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonType: "link",
                buttonName: "点击重置",
              },
              events: {
                "general.button.click": [
                  {
                    target: "#testTarget",
                    method: "updateButton",
                    args: [
                      "update-btn",
                      { disabled: false, text: "更新视图", tooltip: "" },
                    ],
                  },
                  {
                    target: "#testTarget",
                    method: "updateButton",
                    args: ["delete-btn", { disabled: true }],
                  },
                ],
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "仅在卡片内部使用按钮",
        message:
          "仅在卡片内部操作区使用按钮时，使用圆形图标按钮的样式。图标置于标题分割线之下的场景，使用文字按钮/图标，默认放置四个。≥4 的情况，展示出三个，其他按钮用【···】收起。",
      },
      brick: "basic-bricks.general-card",
      properties: {
        cardTitle: "卡片标题",
      },
      slots: {
        content: {
          bricks: [
            {
              brick: "container-brick.search-bar",
              slots: {
                end: {
                  bricks: [
                    {
                      brick: "basic-bricks.general-custom-buttons",
                      events: {
                        "instance.topology.delete": {
                          action: "console.log",
                        },
                        "instance.topology.saveAs": {
                          action: "console.log",
                        },
                        "instance.topology.update": {
                          action: "console.log",
                        },
                      },
                      properties: {
                        dataset: {
                          testid: "style-in-card-demo",
                        },
                        alignment: "end",
                        customButtons: [
                          {
                            buttonShape: "circle",
                            buttonType: "icon",
                            eventName: "instance.topology.update",
                            icon: "plus",
                            isDropdown: false,
                            tooltip: "Add",
                            tooltipPlacement: "left",
                          },
                          {
                            buttonShape: "circle",
                            buttonType: "icon",
                            eventName: "instance.topology.update",
                            icon: "save",
                            isDropdown: false,
                            tooltip: "Save",
                            tooltipPlacement: "left",
                          },
                          {
                            buttonShape: "circle",
                            buttonType: "icon",
                            eventName: "action.danger1",
                            icon: "close",
                            isDropdown: false,
                            tooltip: "Danger Action 1",
                            tooltipPlacement: "left",
                            danger: true,
                          },
                          {
                            buttonHref:
                              "/developers/brick-book/brick/basic-bricks.general-custom-buttons",
                            eventName: "instance.topology.delete",
                            icon: "search",
                            isDropdown: true,
                            text: "Detail",
                            tooltip: "Open Detail in New Window",
                            tooltipPlacement: "left",
                            urlTarget: "_blank",
                          },
                          {
                            color: "var(--theme-red-color)",
                            eventName: "instance.topology.delete",
                            icon: "delete",
                            isDropdown: true,
                            text: "Delete",
                            tooltip: "删除",
                            tooltipPlacement: "right",
                          },
                          {
                            eventName: "action.danger2",
                            icon: "close",
                            isDropdown: true,
                            text: "Danger Action 2",
                            danger: true,
                          },
                        ],
                        isMoreButton: true,
                        moreButtonShape: "icon",
                      },
                    },
                  ],
                  type: "bricks",
                },
                start: {
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-general-search",
                      properties: {
                        placeholder: "text here to search",
                      },
                    },
                  ],
                  type: "bricks",
                },
              },
            },
            {
              brick: "span",
              properties: {
                textContent: "内容",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      description: {
        title: "仅在卡片右上角操作区使用按钮",
        message:
          "仅在卡片右上角操作区使用按钮时，使用圆形图标按钮的样式。内容卡片有标题，图标置于标题分割线之上的场景，使用文字按钮/图标，默认放置四个。≥4 的情况，展示出三个，其他按钮用【···】收起。",
      },
      brick: "basic-bricks.general-card",
      properties: {
        cardTitle: "卡片标题",
        hasExtraSlot: true,
      },
      slots: {
        extra: {
          bricks: [
            {
              brick: "basic-bricks.general-custom-buttons",
              events: {
                "instance.topology.delete": {
                  action: "console.log",
                },
                "instance.topology.saveAs": {
                  action: "console.log",
                },
                "instance.topology.update": {
                  action: "console.log",
                },
              },
              properties: {
                alignment: "end",
                customButtons: [
                  {
                    eventName: "default-button",
                    text: "次按钮",
                  },
                  {
                    buttonShape: "circle",
                    buttonType: "icon",
                    eventName: "instance.topology.update",
                    icon: "plus",
                    isDropdown: false,
                    tooltip: "Add",
                    tooltipPlacement: "left",
                  },
                  {
                    buttonShape: "circle",
                    buttonType: "icon",
                    eventName: "instance.topology.update",
                    icon: "save",
                    isDropdown: false,
                    tooltip: "Save",
                    tooltipPlacement: "left",
                  },
                  {
                    buttonHref:
                      "/developers/brick-book/brick/basic-bricks.general-custom-buttons",
                    eventName: "instance.topology.delete",
                    icon: "search",
                    isDropdown: true,
                    text: "Detail",
                    tooltip: "Open Detail in New Window",
                    tooltipPlacement: "left",
                    urlTarget: "_blank",
                  },
                  {
                    color: "var(--theme-red-color)",
                    eventName: "instance.topology.delete",
                    icon: "delete",
                    isDropdown: true,
                    text: "Delete",
                    tooltip: "删除",
                    tooltipPlacement: "right",
                  },
                ],
                isMoreButton: true,
                moreButtonShape: "icon",
              },
            },
          ],
          type: "bricks",
        },
        content: {
          bricks: [
            {
              brick: "div",
              properties: {
                textContent: "内容",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      description: {
        title: "卡片右上角操作区和内部同时使用按钮",
        message:
          "卡片内部操作区按钮使用圆形图标按钮的样式。卡片右上角操作区按钮使用文字按钮样式，且若有多个按钮需收纳在一起",
      },
      brick: "basic-bricks.general-card",
      properties: {
        cardTitle: "卡片标题",
        hasExtraSlot: true,
      },
      slots: {
        extra: {
          bricks: [
            {
              brick: "basic-bricks.general-custom-buttons",
              properties: {
                style: {
                  "margin-right": "-15px",
                },
                alignment: "end",
                dropdownBtnType: "link",
                dropdownBtnText: "更多",
                customButtons: [
                  {
                    eventName: "instance.topology.saveAs",
                    icon: "file-add",
                    id: "save-as-btn",
                    isDropdown: true,
                    text: "另存为",
                  },
                  {
                    color: "var(--theme-red-color)",
                    eventName: "instance.topology.delete",
                    icon: "delete",
                    id: "delete-btn",
                    isDropdown: true,
                    text: "删除视图",
                  },
                ],
              },
            },
          ],
          type: "bricks",
        },
        content: {
          bricks: [
            {
              brick: "container-brick.search-bar",
              slots: {
                end: {
                  bricks: [
                    {
                      brick: "basic-bricks.general-custom-buttons",
                      events: {
                        "instance.topology.delete": {
                          action: "console.log",
                        },
                        "instance.topology.saveAs": {
                          action: "console.log",
                        },
                        "instance.topology.update": {
                          action: "console.log",
                        },
                      },
                      properties: {
                        alignment: "end",
                        customButtons: [
                          {
                            buttonShape: "circle",
                            buttonType: "icon",
                            eventName: "instance.topology.update",
                            icon: "plus",
                            isDropdown: false,
                            tooltip: "Add",
                            tooltipPlacement: "left",
                          },
                          {
                            buttonShape: "circle",
                            buttonType: "icon",
                            eventName: "instance.topology.update",
                            icon: "save",
                            isDropdown: false,
                            tooltip: "Save",
                            tooltipPlacement: "left",
                          },
                          {
                            buttonHref:
                              "/developers/brick-book/brick/basic-bricks.general-custom-buttons",
                            eventName: "instance.topology.delete",
                            icon: "search",
                            isDropdown: true,
                            text: "Detail",
                            tooltip: "Open Detail in New Window",
                            tooltipPlacement: "left",
                            urlTarget: "_blank",
                          },
                          {
                            color: "var(--theme-red-color)",
                            eventName: "instance.topology.delete",
                            icon: "delete",
                            isDropdown: true,
                            text: "Delete",
                            tooltip: "删除",
                            tooltipPlacement: "right",
                          },
                        ],
                        isMoreButton: true,
                        moreButtonShape: "icon",
                      },
                    },
                  ],
                  type: "bricks",
                },
                start: {
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-general-search",
                      properties: {
                        placeholder: "text here to search",
                      },
                    },
                  ],
                  type: "bricks",
                },
              },
            },
            {
              brick: "span",
              properties: {
                textContent: "内容",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      description: {
        title: "特殊样式：拉伸按钮",
        message: "alignment为stretch时，拉伸按钮",
      },
      brick: "basic-bricks.general-custom-buttons",
      properties: {
        isMoreButton: false,
        alignment: "stretch",
        customButtons: [
          {
            isDropdown: true,
            text: "编辑",
            icon: {
              lib: "fa",
              icon: "edit",
              prefix: "fas",
            },
            eventName: "instance.edit",
          },
          {
            isDropdown: true,
            text: "删除",
            icon: "delete",
            eventName: "instance.delete",
          },
        ],
      },
      events: {
        "instance.edit": {
          action: "console.log",
        },
        "instance.delete": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "按钮收纳",
        message:
          "在卡片中使用圆形图标按钮时，支持自定义更多按钮的样式，区分不同dropdown的内容。",
      },
      brick: "basic-bricks.general-card",
      slots: {
        content: {
          bricks: [
            {
              brick: "container-brick.search-bar",
              slots: {
                end: {
                  bricks: [
                    {
                      brick: "basic-bricks.general-custom-buttons",
                      properties: {
                        alignment: "end",
                        isMoreButton: true,
                        moreButtonShape: "icon",
                        moreBtnIcon: "plus",
                        customButtons: [
                          {
                            icon: {
                              lib: "fa",
                              icon: "app-store",
                              prefix: "fab",
                            },
                            isDropdown: true,
                            text: "添加微应用",
                          },
                          {
                            icon: {
                              lib: "antd",
                              icon: "appstore-add",
                              theme: "outlined",
                            },
                            isDropdown: true,
                            text: "添加自定义项",
                          },
                          {
                            icon: {
                              lib: "antd",
                              icon: "folder-add",
                              theme: "outlined",
                            },
                            isDropdown: true,
                            text: "添加文件夹",
                          },
                        ],
                      },
                    },
                    {
                      brick: "basic-bricks.general-custom-buttons",
                      properties: {
                        alignment: "end",
                        isMoreButton: true,
                        moreButtonShape: "icon",
                        moreBtnIcon: "save",
                        customButtons: [
                          {
                            icon: {
                              lib: "fa",
                              icon: "app-store",
                              prefix: "fab",
                            },
                            isDropdown: true,
                            text: "导入A",
                          },
                          {
                            icon: {
                              lib: "antd",
                              icon: "appstore-add",
                              theme: "outlined",
                            },
                            isDropdown: true,
                            text: "导入B",
                          },
                          {
                            icon: {
                              lib: "antd",
                              icon: "folder-add",
                              theme: "outlined",
                            },
                            isDropdown: true,
                            text: "导入C",
                          },
                        ],
                      },
                    },
                  ],
                  type: "bricks",
                },
                start: {
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-general-search",
                      properties: {
                        placeholder: "text here to search",
                      },
                    },
                  ],
                  type: "bricks",
                },
              },
            },
            {
              brick: "h1",
              properties: {
                textContent: "Content",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
  ],
  previewColumns: 2,
};
