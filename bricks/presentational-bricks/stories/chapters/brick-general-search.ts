import { Story } from "@next-core/brick-types";

export const BrickGeneralSearchStory: Story = {
  storyId: "presentational-bricks.brick-general-search",
  category: "other",
  type: "brick",
  author: "lynette",
  text: {
    en: "general search",
    zh: "搜索框",
  },
  description: {
    en: "search",
    zh: "搜索框，满足大部分的搜索需求",
  },
  icon: {
    lib: "fa",
    icon: "search",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-general-search",
      properties: {
        placeholder: "搜索不更新 url 参数",
        shouldUpdateUrlParams: false,
        shouldTrimQuery: true,
      },
      events: {
        "query.change": [{ action: "console.log" }],
        "filter.update": [{ action: "console.log" }],
      },
    },
    {
      brick: "presentational-bricks.brick-general-search",
      properties: {
        placeholder: "搜索更新 url 参数",
        defaultArgs: [{ field: "name", value: "xxxx" }],
        shouldUpdateUrlParams: true,
        shouldTrimQuery: true,
      },
      events: {
        "query.change": [{ action: "console.log" }],
        "filter.update": [{ action: "console.log" }],
      },
    },
  ],
};
