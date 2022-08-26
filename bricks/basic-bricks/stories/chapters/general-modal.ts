import { Story } from "@next-core/brick-types";

export const generalModalStory: Story = {
  storyId: "basic-bricks.general-modal",
  category: "layout",
  type: "brick",
  author: "ice",
  text: {
    en: "General Modal",
    zh: "模态框",
  },
  description: {
    en: "provide slot to hold other custom elements, different from forms.general-modal",
    zh: "提供插槽以展示其他构件，注意与表单通用模态框 (forms.general-modal) 的不同",
  },
  icon: {
    lib: "fa",
    icon: "draw-polygon",
  },
  conf: [
    {
      description: {
        title: "",
        message:
          "全局完成类操作置于弹窗底部，使用文字按钮，一个主按钮，放于所有按钮的最右侧。",
      },
      brick: "div",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "点击弹出模态框",
              },
              events: {
                "general.button.click": {
                  target: "#origin",
                  method: "open",
                },
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "点击弹出模态框，带 footer slot",
              },
              events: {
                "general.button.click": {
                  target: "#withSlot",
                  method: "open",
                },
              },
            },
            {
              brick: "basic-bricks.general-modal",
              slots: {
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "h3",
                      properties: {
                        textContent: "modal content",
                      },
                    },
                  ],
                },
              },
              properties: {
                id: "origin",
                okText: "Save",
                modalTitle: "Modal Title",
              },
              events: {
                "basic-bricks.general-modal.cancel": {
                  action: "console.log",
                },
                "basic-bricks.general-modal.confirm": {
                  action: "console.log",
                },
                "modal.open": {
                  action: "console.log",
                },
                "modal.close": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "basic-bricks.general-modal",
              slots: {
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "h3",
                      properties: {
                        textContent: "modal content",
                      },
                    },
                  ],
                },
                footer: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "basic-bricks.general-button",
                      properties: {
                        buttonType: "danger",
                        buttonName: "Delete",
                      },
                      events: {
                        "general.button.click": [
                          {
                            action: "console.log",
                          },
                          {
                            target: "#withSlot",
                            method: "close",
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              properties: {
                id: "withSlot",
                modalTitle: "Modal Title",
                enableFooterSlot: true,
              },
              events: {
                "basic-bricks.general-modal.cancel": {
                  action: "console.log",
                },
                "basic-bricks.general-modal.confirm": {
                  action: "console.log",
                },
                "modal.open": {
                  action: "console.log",
                },
                "modal.close": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "标题相关：对齐方式、图标、标题后自定义构件",
        message: "图标来源可以为src(httpSrc/DataSrc)或平台的图标库",
      },
      brick: "div",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "点击弹出模态框",
              },
              events: {
                "general.button.click": {
                  target: "#title-customized",
                  method: "open",
                },
              },
            },
            {
              brick: "basic-bricks.general-modal",
              slots: {
                headerExtra: {
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-tag",
                      properties: {
                        color: "var(--color-warning)",
                        showCard: false,
                        tagList: ["警告"],
                        tagStyle: {
                          marginLeft: "-4px",
                        },
                      },
                    },
                  ],
                  type: "bricks",
                },
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "h3",
                      properties: {
                        textContent: "modal content",
                      },
                    },
                  ],
                },
              },
              properties: {
                id: "title-customized",
                okText: "Save",
                modalTitle: "Modal Title",
                titleAlign: "center",
                titleIcon: {
                  lib: "antd",
                  icon: "warning",
                  theme: "outlined",
                  color: "var(--color-warning)",
                },
              },
              events: {
                "basic-bricks.general-modal.cancel": {
                  action: "console.log",
                },
                "basic-bricks.general-modal.confirm": {
                  action: "console.log",
                },
                "modal.open": {
                  action: "console.log",
                },
                "modal.close": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "全屏模式",
      },
      brick: "div",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "点击弹出模态框",
              },
              events: {
                "general.button.click": {
                  target: "#fullscreen-mode",
                  method: "open",
                },
              },
            },
            {
              brick: "basic-bricks.general-modal",
              slots: {
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "h3",
                      properties: {
                        textContent: "modal content",
                      },
                    },
                    {
                      brick: "p",
                      properties: {
                        textContent: "some content...",
                      },
                    },
                    {
                      brick: "p",
                      properties: {
                        textContent: "some content...",
                      },
                    },
                    {
                      brick: "p",
                      properties: {
                        textContent: "some content...",
                      },
                    },
                  ],
                },
              },
              properties: {
                id: "fullscreen-mode",
                okText: "Save",
                modalTitle: "Modal Title",
                fullscreen: true,
              },
              events: {
                "basic-bricks.general-modal.cancel": {
                  action: "console.log",
                },
                "basic-bricks.general-modal.confirm": {
                  action: "console.log",
                },
                "modal.open": {
                  action: "console.log",
                },
                "modal.close": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
  ],
};
