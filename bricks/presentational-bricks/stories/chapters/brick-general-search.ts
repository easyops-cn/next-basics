import { Story } from "@next-core/brick-types";
import { brickGeneralSearchSvg } from "../images";
export const BrickGeneralSearchStory: Story = {
  storyId: "presentational-bricks.brick-general-search",
  category: "interact-basic",
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
    imgSrc: brickGeneralSearchSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-general-search[not-update-url]",
      title: {
        en: "Search input(not update url)",
        zh: "搜索框(不更新url)",
      },
      bricks: [
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
      ],
    },
    {
      snippetId: "presentational-bricks.brick-general-search[update-url]",
      title: {
        en: "Search input(update url)",
        zh: "搜索框(更新url)",
      },
      bricks: [
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
    },
  ],
};
