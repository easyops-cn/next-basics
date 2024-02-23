import { Story } from "@next-core/brick-types";
import { entryCardItemNormalSvg, entryCardItemSvg } from "../images";
export const EntryCardItemStory: Story = {
  storyId: "presentational-bricks.entry-card-item",
  category: "card-info",
  type: "brick",
  author: "lynette",
  text: {
    en: "entry card item",
    zh: "入口卡片项",
  },
  description: {
    en: "provide a user-friendly and customizable card information component for frontend development. It offers a variety of properties to fine-tune the card's appearance and behavior, including data sources, title, description, icons, colors, and URL redirection. The storyboard is particularly useful for creating clear and interactive card entries in applications",
    zh: "它具备了丰富的属性配置，能够细致地调整卡片的展现形式和交互行为。它支持数据源绑定、标题、描述、图标、颜色以及URL跳转等功能，特别适用于在应用中创建清晰且具有交互性的卡片入口",
  },
  icon: {
    imgSrc: entryCardItemSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.entry-card-item[normal]",
      title: {
        zh: "基础入口卡片项",
        en: "",
      },
      thumbnail: entryCardItemNormalSvg,
      bricks: [
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
      ],
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
