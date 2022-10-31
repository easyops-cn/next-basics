import { Story } from "@next-core/brick-types";
import { generalNotificationSvg } from "../images";
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
    },
  ],
  previewColumns: 1,
};
