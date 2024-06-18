import { Story } from "@next-core/brick-types";
import { generalNotificationSvg } from "../images";
import { generalNotificationBasicSvg } from "../images";
export const generalNotificationStory: Story = {
  storyId: "basic-bricks.general-notification",
  category: "feedback-and-tooltip",
  type: "brick",
  author: "Alex",
  text: {
    en: "Notification Reminder Box",
    zh: "Notification通知提醒框",
  },
  description: {
    en: "general notification",
    zh: "普通的 notification",
  },
  icon: {
    imgSrc: generalNotificationSvg,
  },
  conf: [
    {
      brick: "span",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "open notification",
              },
              events: {
                "general.button.click": {
                  target: "basic-bricks\\.general-notification",
                  method: "open",
                  args: ["info"],
                },
              },
            },
            {
              brick: "basic-bricks.general-notification",
              properties: {
                message: "Notification Title",
                description: "Notification Description.",
                duration: 3,
                placement: "topRight",
                icon: "smile",
                iconStyle: {
                  color: "red",
                  textAlign: "center",
                },
              },
              events: {
                "general.notification.close": {
                  action: "console.log",
                },
                "general.notification.click": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
    {
      bricks: [
        {
          brick: "basic-bricks.general-notification",
          events: {
            "general.notification.click": {
              action: "message.info",
              args: ["notification click"],
            },
            "general.notification.close": {
              action: "message.info",
              args: ["notification close"],
            },
          },
          properties: {
            description: "Notification Description.",
            duration: 3,
            icon: "smile",
            iconStyle: {
              color: "red",
              textAlign: "center",
            },
            message: "Notification Title",
            placement: "topRight",
          },
        },
      ],
      snippetId: "basic-bricks.general-notification[basic]",
      title: {
        en: "Basic General Notification",
        zh: "基础通知提醒框",
      },
      actions: [
        {
          text: "Open Notification",
          method: "open",
        },
      ],
      thumbnail: generalNotificationBasicSvg,
    },
    {
      description: {
        title: "带底部按钮的提醒框",
      },
      brick: "span",
      slots: {
        content: {
          bricks: [
            {
              brick: "basic-bricks.general-button",
              events: {
                "general.button.click": {
                  method: "open",
                  target: "basic-bricks\\.general-notification",
                },
              },
              properties: {
                buttonName: "open notification",
              },
            },
            {
              brick: "basic-bricks.general-notification",
              events: {
                "general.notification.click": {
                  action: "console.log",
                },
                "general.notification.close": {
                  action: "console.log",
                },
              },
              properties: {
                btnBrick: {
                  useBrick: [
                    {
                      brick: "div",
                      properties: {
                        style: {
                          display: "flex",
                          gap: "20px",
                        },
                      },
                      slots: {
                        content: {
                          type: "bricks",
                          bricks: [
                            {
                              brick: "presentational-bricks.brick-link",
                              properties: {
                                label: "查看详情",
                              },
                            },
                            {
                              brick: "presentational-bricks.brick-link",
                              properties: {
                                label: "忽略",
                                type: "text",
                              },
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
                description:
                  "Notification Description.Notification Description.Notification Description.Notification Description.Notification Description.",
                duration: 3000,
                icon: {
                  lib: "easyops",
                  category: "app",
                  icon: "announcement-app",
                  color: "orange",
                },
                iconStyle: {
                  color: "orange",
                  textAlign: "center",
                },
                message:
                  "A Long Notification Title.A Long Notification Title.A Long Notification Title.",
                placement: "topRight",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
  ],
  previewColumns: 1,
};
