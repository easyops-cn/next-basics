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
    zh:
      "可配置收纳起来的更多按钮，可配置不同事件，常用于页面右上角、卡片右上角等操作位。",
  },
  icon: {
    lib: "fa",
    icon: "pencil-alt",
  },
  conf: [
    {
      description: {
        title: "基本用法",
        message:
          "将多个button组合在一起，常用于页面右上角操作位，此时应包含一个主按钮并右对齐。",
      },
      brick: "basic-bricks.general-custom-buttons",
      properties: {
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
          '组合按钮大于等于4个时，应只展示两个常用按钮，其他按钮收纳在"···"的更多按钮中。',
      },
      brick: "basic-bricks.general-custom-buttons",
      properties: {
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
            text: "搜索",
            icon: "search",
            eventName: "button-search",
          },
          {
            isDropdown: true,
            text: "权限管理",
            icon: "user",
            eventName: "button-permission",
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
        title: "卡片操作区",
        message: "在卡片的操作区中，通常会使用圆形图标按钮的样式。",
      },
      brick: "basic-bricks.general-card",
      slots: {
        content: {
          bricks: [
            {
              brick: "container-brick.search-bar",
              slots: {
                start: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-general-search",
                      properties: {
                        placeholder: "text here to search",
                      },
                    },
                  ],
                },
                end: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "basic-bricks.general-custom-buttons",
                      properties: {
                        isMoreButton: true,
                        moreButtonShape: "icon",
                        alignment: "end",
                        customButtons: [
                          {
                            isDropdown: false,
                            buttonType: "icon",
                            buttonShape: "circle",
                            icon: "plus",
                            tooltip: "Add",
                            tooltipPlacement: "left",
                            eventName: "instance.topology.update",
                          },
                          {
                            isDropdown: false,
                            buttonType: "icon",
                            buttonShape: "circle",
                            icon: "save",
                            tooltip: "Save",
                            tooltipPlacement: "left",
                            eventName: "instance.topology.update",
                          },
                          {
                            isDropdown: true,
                            text: "Detail",
                            icon: "search",
                            tooltip: "Open Detail in New Window",
                            tooltipPlacement: "left",
                            buttonHref:
                              "/developers/brick-book/brick/basic-bricks.general-custom-buttons",
                            urlTarget: "_blank",
                            eventName: "instance.topology.delete",
                          },
                          {
                            isDropdown: true,
                            text: "Delete",
                            icon: "delete",
                            color: "var(--theme-red-color)",
                            tooltip: "删除",
                            tooltipPlacement: "right",
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
                  ],
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
          "在卡片操作区中使用圆形图标按钮时，支持自定义更多按钮的样式，区分不同dropdown的内容。",
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
