import { Story } from "@next-core/brick-types";
import { generalModalSvg } from "../images";
import { generalModalBasicSvg } from "../images";
import { generalModalCustomTitleSvg } from "../images";
import { generalModalFooterSvg } from "../images";
import { generalModalFullScreenSvg } from "../images";
export const generalModalStory: Story = {
  storyId: "basic-bricks.general-modal",
  category: "container-display",
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
    imgSrc: generalModalSvg,
  },
  conf: [
    {
      description: {
        title: "基本使用",
      },
      brick: "div",
      slots: {
        content: {
          bricks: [
            {
              brick: "basic-bricks.general-button",
              events: {
                "general.button.click": {
                  method: "open",
                  target: "#origin",
                },
              },
              properties: {
                buttonName: "点击弹出模态框",
              },
            },
            {
              brick: "basic-bricks.general-modal",
              events: {
                "basic-bricks.general-modal.cancel": {
                  action: "message.info",
                  args: ["cancel modal"],
                },
                "basic-bricks.general-modal.confirm": {
                  action: "message.info",
                  args: ["confirm modal"],
                },
                "modal.close": {
                  action: "message.info",
                  args: ["close modal"],
                },
                "modal.open": {
                  action: "message.info",
                  args: ["open modal"],
                },
              },
              properties: {
                id: "origin",
                modalTitle: "Modal Title",
                okText: "Save",
              },
              slots: {
                content: {
                  bricks: [
                    {
                      brick: "h3",
                      properties: {
                        textContent: "modal content",
                      },
                    },
                  ],
                  type: "bricks",
                },
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-modal",
          events: {
            "basic-bricks.general-modal.cancel": {
              action: "message.info",
              args: ["cancel modal"],
            },
            "basic-bricks.general-modal.confirm": {
              action: "message.info",
              args: ["confirm modal"],
            },
            "modal.close": {
              action: "message.info",
              args: ["close modal"],
            },
            "modal.open": {
              action: "message.info",
              args: ["open modal"],
            },
          },
          properties: {
            id: "origin",
            modalTitle: "Modal Title",
            okText: "Save",
          },
          slots: {
            content: {
              bricks: [
                {
                  brick: "h3",
                  properties: {
                    textContent: "modal content",
                  },
                },
              ],
              type: "bricks",
            },
          },
        },
      ],
      snippetId: "basic-bricks.general-modal[basic]",
      title: {
        en: "Basic General Modal",
        zh: "基础模态框",
      },
      actions: [
        {
          text: "Open Modal",
          method: "open",
        },
      ],
      thumbnail: generalModalBasicSvg,
    },
    {
      bricks: [
        {
          description: {
            title: "",
            message:
              "全局完成类操作置于弹窗底部，使用文字按钮，一个主按钮，放于所有按钮的最右侧。",
          },
          brick: "basic-bricks.general-modal",
          events: {
            "basic-bricks.general-modal.cancel": {
              action: "message.info",
              args: ["modal cancel"],
            },
            "basic-bricks.general-modal.confirm": {
              action: "message.info",
              args: ["modal confirm"],
            },
            "modal.close": {
              action: "message.info",
              args: ["modal close"],
            },
            "modal.open": {
              action: "message.info",
              args: ["modal open"],
            },
          },
          properties: {
            enableFooterSlot: true,
            id: "withSlot",
            modalTitle: "Modal Title",
          },
          slots: {
            content: {
              bricks: [
                {
                  brick: "h3",
                  properties: {
                    textContent: "modal content",
                  },
                },
              ],
              type: "bricks",
            },
            footer: {
              bricks: [
                {
                  brick: "basic-bricks.general-button",
                  events: {
                    "general.button.click": [
                      {
                        action: "console.log",
                      },
                      {
                        method: "close",
                        target: "#withSlot",
                      },
                    ],
                  },
                  properties: {
                    buttonName: "Delete",
                    buttonType: "danger",
                  },
                },
              ],
              type: "bricks",
            },
          },
        },
      ],
      snippetId: "basic-bricks.general-modal[footer]",
      title: {
        en: "General Modal with Footer Slot",
        zh: "带footer的模态框",
      },
      actions: [
        {
          text: "Open Modal",
          method: "open",
        },
      ],
      thumbnail: generalModalFooterSvg,
    },
    {
      bricks: [
        {
          description: {
            title: "标题相关：对齐方式、图标、标题后自定义构件",
            message: "图标来源可以为src(httpSrc/DataSrc)或平台的图标库",
          },
          brick: "basic-bricks.general-modal",
          events: {
            "basic-bricks.general-modal.cancel": {
              action: "message.info",
              args: ["modal cancel"],
            },
            "basic-bricks.general-modal.confirm": {
              action: "message.info",
              args: ["modal confirm"],
            },
            "modal.close": {
              action: "message.info",
              args: ["modal close"],
            },
            "modal.open": {
              action: "message.info",
              args: ["modal open"],
            },
          },
          properties: {
            id: "title-customized",
            modalTitle: "Modal Title",
            okText: "Save",
            titleAlign: "center",
            titleIcon: {
              color: "var(--color-warning)",
              icon: "warning",
              lib: "antd",
              theme: "outlined",
            },
          },
          slots: {
            content: {
              bricks: [
                {
                  brick: "h3",
                  properties: {
                    textContent: "modal content",
                  },
                },
              ],
              type: "bricks",
            },
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
          },
        },
      ],
      snippetId: "basic-bricks.general-modal[custom-title]",
      title: {
        en: "General Modal with Custom Title",
        zh: "带自定义标题的模态框",
      },
      actions: [
        {
          text: "Open Modal",
          method: "open",
        },
      ],
      thumbnail: generalModalCustomTitleSvg,
    },
    {
      bricks: [
        {
          description: {
            title: "全屏模式",
          },
          brick: "basic-bricks.general-modal",
          events: {
            "basic-bricks.general-modal.cancel": {
              action: "message.info",
              args: ["modal cancel"],
            },
            "basic-bricks.general-modal.confirm": {
              action: "message.info",
              args: ["modal confirm"],
            },
            "modal.close": {
              action: "message.info",
              args: ["modal close"],
            },
            "modal.open": {
              action: "message.info",
              args: ["modal open"],
            },
          },
          properties: {
            fullscreen: true,
            id: "fullscreen-mode",
            modalTitle: "Modal Title",
            okText: "Save",
          },
          slots: {
            content: {
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
              type: "bricks",
            },
          },
        },
      ],
      snippetId: "basic-bricks.general-modal[full-screen]",
      title: {
        en: "Full Screen General Modal",
        zh: "全屏模态框",
      },
      actions: [
        {
          text: "Open Modal",
          method: "open",
        },
      ],
      thumbnail: generalModalFullScreenSvg,
    },
    {
      description: {
        title: "模态框里放tabs容器",
      },
      brick: "div",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              events: {
                "general.button.click": {
                  method: "open",
                  target: "#tabsModal",
                },
              },
              properties: {
                buttonName: "点击弹出模态框",
              },
            },
            {
              brick: "basic-bricks.general-modal",
              properties: {
                id: "tabsModal",
                okText: "确定",
                isHiddenBodyPadding: true,
              },
              slots: {
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "container-brick.tabs-container",
                      properties: {
                        activeTabIndex: 2,
                        showCard: false,
                        slotType: "bricks",
                        style: {
                          marginTop: "6px",
                        },
                        tabList: [
                          {
                            key: "0",
                            text: "Tab1",
                          },
                          {
                            key: "1",
                            text: "Tab2",
                          },
                          {
                            key: "2",
                            text: "Tab3",
                          },
                        ],
                      },
                      slots: {
                        content: {
                          type: "bricks",
                          bricks: [
                            {
                              brick: "div",
                              properties: {
                                textContent: "small Panel 1",
                              },
                            },
                            {
                              brick: "div",
                              properties: {
                                textContent: "small Panel 2",
                              },
                            },
                            {
                              brick: "div",
                              properties: {
                                textContent: "small Panel 3",
                              },
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  ],
};
