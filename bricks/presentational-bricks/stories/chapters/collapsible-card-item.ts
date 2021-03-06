import { Story } from "@next-core/brick-types";

export const CollapsibleCardItemStory: Story = {
  storyId: "presentational-bricks.collapsible-card-item",
  category: "card",
  type: "brick",
  author: "lynette",
  text: {
    en: "collapsible card item",
    zh: "折叠卡片项",
  },
  description: {
    en: "collapsible card item",
    zh: "长条形可折叠卡片，里面可以放表单／description等构件",
  },
  icon: {
    lib: "fa",
    icon: "clock",
  },
  conf: {
    brick: "presentational-bricks.collapsible-card-item",
    properties: {
      contentStyle: {
        paddingBottom: "16px",
      },
      cardTitle: "gitlab",
      icon: {
        lib: "antd",
        type: "gitlab",
      },
    },
    slots: {
      content: {
        type: "bricks",
        bricks: [
          {
            brick: "presentational-bricks.brick-descriptions",
            properties: {
              showCard: false,
              itemList: [
                {
                  text: "https://git2.easyops.local",
                  label: "GitLab URL",
                },
                {
                  text: "zMKpMvRPhfWf2A-EX5oj",
                  label: "Access Key",
                },
              ],
            },
          },
        ],
      },
      operate: {
        type: "bricks",
        bricks: [
          {
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "设置",
              buttonType: "primary",
            },
            events: {
              "general.button.click": [
                {
                  action: "console.log",
                },
              ],
            },
          },
        ],
      },
    },
  },
};
