import { Story } from "@next-core/brick-types";

export const EntryCardItemStory: Story = {
  storyId: "presentational-bricks.entry-card-item",
  category: "card",
  type: "brick",
  author: "lynette",
  text: {
    en: "entry card item",
    zh: "入口卡片项",
  },
  description: {
    en: "entry card item",
    zh: "可配置icon和title的卡片项",
  },
  icon: {
    lib: "fa",
    icon: "list",
  },
  conf: [
    {
      brick: "presentational-bricks.entry-card-item",
      properties: {
        dataSource: {
          id: "1",
          name: "卡片标题",
          iconColor: "cyan",
          icon: {
            lib: "easyops",
            category: "model",
            icon: "app",
          },
        },
        fields: {
          cardTitle: "name",
          icon: "icon",
          iconColor: "iconColor",
        },
        urlTemplate: "/#{id}",
      },
    },
    {
      brick: "presentational-bricks.entry-card-item",
      properties: {
        cardTitle: "卡片标题",
        iconColor: "brightOrange",
        icon: {
          lib: "easyops",
          category: "model",
          icon: "host",
        },
        urlTemplate: "/123",
      },
    },
  ],
  previewColumns: 2,
};
