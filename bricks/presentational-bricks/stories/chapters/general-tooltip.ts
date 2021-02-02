import { Story } from "@next-core/brick-types";

export const GeneralTooltipStory: Story = {
  storyId: "presentational-bricks.general-tooltip",
  category: "feedback-and-tooltip",
  type: "brick",
  author: "jo",
  text: {
    en: "general tooltip",
    zh: "普通 tooltip",
  },
  description: {
    en: "general tooltip",
    zh: "普通的 tooltip",
  },
  icon: {
    lib: "fa",
    icon: "discord",
    prefix: "fab",
  },
  conf: [
    {
      brick: "presentational-bricks.general-tooltip",
      properties: {
        icon: {
          lib: "fa",
          icon: "info-circle",
        },
        content: "这是一个 tooltips",
        text: "文案信息",
      },
    },
    {
      brick: "presentational-bricks.general-tooltip",
      properties: {
        type: "popover",
        icon: {
          lib: "fa",
          icon: "info-circle",
        },
        content: "this is popover",
      },
    },
    {
      brick: "presentational-bricks.general-tooltip",
      properties: {
        type: "popover",
        icon: {
          lib: "fa",
          icon: "atom",
        },
        content: ["名称：APP", "创建时间：2019-12-21", "修改时间: 2020-02-21"],
      },
    },
  ],
  previewColumns: 2,
};
