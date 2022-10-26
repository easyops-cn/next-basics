import { Story } from "@next-core/brick-types";
import { brickAlertSvg } from "../images";
export const BrickAlertStory: Story = {
  storyId: "presentational-bricks.brick-alert",
  category: "feedback-and-tooltip",
  type: "brick",
  author: "ice",
  text: {
    en: "Alert",
    zh: "警告提示",
  },
  description: {
    en: "alert content, configurable with color type, description and showIcon",
    zh: "警告提示，可配置颜色类型，描述和是否显示图标",
  },
  icon: {
    imgSrc: brickAlertSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-alert[success-tips]",
      bricks: [
        {
          brick: "presentational-bricks.brick-alert",
          properties: {
            type: "success",
            message: "tool executed successfully",
          },
        },
      ],
      title: {
        en: "Success alert",
        zh: "成功提示",
      },
    },
    {
      snippetId: "presentational-bricks.brick-alert[info-tips-with-icon]",
      bricks: [
        {
          brick: "presentational-bricks.brick-alert",
          properties: {
            type: "success",
            message: "tool executed successfully",
          },
        },
      ],
      title: {
        en: "Info alert with icon",
        zh: "带图标正常提示",
      },
    },
    {
      snippetId: "presentational-bricks.brick-alert[warn-tips-with-close]",
      message: {
        en: "",
        zh: "当 `closable` 为true，`localStorageKey` 不为空时，以页面 url 为命名空间，控制提示在当前路径关闭后不再显示。可通过设置 `stripLocalStorageUrlSuffix` 为true关闭url命名空间，使提示的关闭全局有效",
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-alert",
          properties: {
            type: "warning",
            message: "Today is Tuesday",
            showIcon: true,
            closable: true,
            localStorageKey: "",
            stripLocalStorageUrlSuffix: true,
          },
        },
      ],
      title: {
        en: "Warn Alert with close",
        zh: "警告提示带关闭按钮",
      },
    },
    {
      brick: "presentational-bricks.brick-alert",
      properties: {
        type: "error",
        message: "HTTP 404",
        description: "Not Found",
        showIcon: true,
      },
    },
    {
      snippetId: "presentational-bricks.brick-alert[with-slot]",
      message: {
        en: "",
        zh: "本示例额外使用了通过target改变具体构件属性的知识点，具体可查看[设置指定构件属性方式](/next-docs/docs/brick-next/events#custom-handlers-properties)",
      },
      title: {
        zh: "带插槽提示",
        en: "Alert with slots",
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-alert",
          properties: {
            type: "info",
            message: "Today is Tuesday",
            showIcon: true,
            enableDescSlot: true,
          },
          slots: {
            description: {
              type: "bricks",
              bricks: [
                {
                  brick: "div",
                  slots: {
                    "": {
                      type: "bricks",
                      bricks: [
                        {
                          brick: "strong",
                          properties: {
                            textContent: "Temperature: ",
                          },
                        },
                        {
                          brick: "span",
                          properties: {
                            textContent: "24°C",
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  brick: "div",
                  slots: {
                    "": {
                      type: "bricks",
                      bricks: [
                        {
                          brick: "strong",
                          properties: {
                            textContent: "Weather: ",
                          },
                        },
                        {
                          brick: "span",
                          properties: {
                            textContent: "not bad",
                          },
                        },
                        {
                          brick: "basic-bricks.general-button",
                          properties: {
                            style: {
                              marginTop: "12px",
                            },
                            buttonName: "hello-button",
                            buttonIcon: "search",
                            buttonType: "primary",
                          },
                          events: {
                            "general.button.click": {
                              target: "#pseudoSlot",
                              properties: {
                                message: "Time flies...",
                                type: "warning",
                                enableDescSlot: false,
                              },
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
    },
    {
      description: {
        title: "带按钮",
        message: "通过enableMessageSlot支持message slot设置按钮",
      },
      brick: "presentational-bricks.brick-alert",
      properties: {
        enableDescSlot: true,
        id: "pseudoSlotBtn",
        message: "Today is Tuesday",
        showIcon: true,
        type: "info",
        enableMessageSlot: true,
      },
      slots: {
        message: {
          bricks: [
            {
              brick: "div",
              properties: {
                style: {
                  display: "flex",
                },
              },
              slots: {
                "": {
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        style: {
                          marginRight: "25px",
                        },
                        textContent: "Today is Tuesday (message slot)",
                      },
                    },
                    {
                      brick: "basic-bricks.general-button",
                      events: {
                        "general.button.click": {
                          properties: {
                            enableDescSlot: true,
                            message: "Time flies...",
                            type: "warning",
                          },
                          target: "#pseudoSlotBtn",
                        },
                      },
                      properties: {
                        buttonName: "按钮",
                        buttonType: "primary",
                        buttonShape: "round",
                        buttonSize: "small",
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
        description: {
          bricks: [
            {
              brick: "div",
              slots: {
                "": {
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        textContent: "Tomorrow will be better",
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
      description: {
        title: "带链接",
        message: "通过enableActionSlot支持action slot设置跳转链接",
      },
      brick: "presentational-bricks.brick-alert",
      properties: {
        id: "pseudoSlotBtn",
        message: "你好！欢迎使用EasyOps2.0专业版。",
        showIcon: true,
        type: "info",
        enableActionSlot: true,
      },
      slots: {
        action: {
          bricks: [
            {
              brick: "div",
              slots: {
                "": {
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-link",
                      events: {
                        "link.click": {
                          action: "console.log",
                        },
                      },
                      properties: {
                        label: "查看详情",
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
      description: {
        title: "带链接",
        message: "通过enableMessageSlot支持message slot设置跳转链接",
      },
      brick: "presentational-bricks.brick-alert",
      properties: {
        id: "pseudoSlotBtn",
        showIcon: true,
        type: "info",
        enableMessageSlot: true,
        closable: true,
      },
      slots: {
        message: {
          bricks: [
            {
              brick: "div",
              properties: {
                style: {
                  height: "22px",
                },
              },
              slots: {
                "": {
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        textContent: "你好！欢迎使用",
                      },
                    },
                    {
                      brick: "presentational-bricks.brick-link",
                      events: {
                        "link.click": {
                          action: "console.log",
                        },
                      },
                      properties: {
                        style: {
                          padding: "0 3px",
                          position: "relative",
                          bottom: "1px",
                        },
                        label: "EasyOps 2.0",
                      },
                    },
                    {
                      brick: "span",
                      properties: {
                        textContent: "专业版。",
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
      description: {
        title: "带链接",
        message:
          "通过iconSize设置icon大小，为`default`时，icon采用默认的大小显示逻辑，根据是否含描述显示大小",
      },
      brick: "presentational-bricks.brick-alert",
      properties: {
        id: "pseudoSlot",
        type: "info",
        message: "这是一段通知信息的标题",
        messageStyle: {
          fontSize: "14px",
          fontWeight: 600,
        },
        showIcon: true,
        enableDescSlot: true,
        iconSize: "big",
      },
      slots: {
        description: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        textContent: "- 小字文字信息小字文字信息。",
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "div",
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        textContent:
                          "- 小字文字信息小字文字信息，小字文字信息小字文字信息",
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "div",
              properties: {
                style: {
                  marginTop: "8px",
                },
              },
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-link",
                      properties: {
                        label: "查看详情",
                      },
                      events: {
                        "link.click": {
                          action: "console.log",
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
    {
      description: {
        title: "带链接",
        message: "通过foldDesc支持描述区折叠",
      },
      brick: "presentational-bricks.brick-alert",
      properties: {
        id: "pseudoSlot",
        type: "info",
        message: "这是一段通知信息的标题",
        messageStyle: {
          fontSize: "14px",
        },
        showIcon: true,
        enableDescSlot: true,
        enableMessageSlot: true,
        iconSize: "small",
        foldDesc: true,
      },
      slots: {
        message: {
          bricks: [
            {
              brick: "span",
              slots: {
                "": {
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        textContent:
                          "展示当前运行的采集实例。因为采集范围是动态的，可能与预期不符，请等待最长10分钟后查看，你也可以点击",
                      },
                    },
                    {
                      brick: "presentational-bricks.brick-link",
                      events: {
                        "link.click": {
                          action: "console.log",
                        },
                      },
                      properties: {
                        style: {
                          padding: "0 3px",
                          position: "relative",
                          bottom: "1px",
                        },
                        label: "立即同步",
                      },
                    },
                    {
                      brick: "span",
                      properties: {
                        textContent:
                          "。如果发现有采集实例，但没数据上报，请点击查看",
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
        description: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        style: {
                          fontWeight: 500,
                        },
                        textContent: '1、采集状态为"失败"：',
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "div",
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        style: {
                          paddingLeft: "2em",
                        },
                        textContent:
                          "﹣ 如果报错信息为get metric none，strategy:5ab3beb512b40，instance:5a14561111841，该instance是指主机的instanceid，请升级该主机Agent至3.24.14以上，且agent有与服务端8823端口的长链接",
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "div",
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        style: {
                          paddingLeft: "2em",
                        },
                        textContent:
                          "﹣ 如果报错信息为get metric error，session timeout，请确认对应的agent升级到3.24.10以上，且agent有与服务端8823端口的长链接",
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "div",
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        style: {
                          paddingLeft: "2em",
                        },
                        textContent:
                          "﹣ 如果是Prometheus插件，报错信息为connection refused，请确保exporter启动正常或可尝试手动curl对应的metrics接口",
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "div",
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        style: {
                          fontWeight: 500,
                        },
                        textContent:
                          '2、如果采集状态为"正常"，那说明采集通道是正常的，是数据处理层的问题，可查看clickhouse或flink_taskmanager/log/monitor.log查看日志',
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "div",
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "span",
                      properties: {
                        style: {
                          fontWeight: 500,
                        },
                        textContent: "3、如果还有问题，请咨询技术人员。",
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
  previewColumns: 2,
};
