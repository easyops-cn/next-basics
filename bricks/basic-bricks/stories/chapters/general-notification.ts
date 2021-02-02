import { Story } from "@next-core/brick-types";

export const generalNotificationStory: Story = {
  storyId: "basic-bricks.general-notification",
  category: "feedback-and-tooltip",
  type: "brick",
  author: "Alex",
  text: {
    en: "general notification",
    zh: "普通 notification",
  },
  description: {
    en: "general notification",
    zh: "普通的 notification",
  },
  icon: {
    lib: "fa",
    icon: "discord",
    prefix: "fab",
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
  ],
  previewColumns: 1,
};
