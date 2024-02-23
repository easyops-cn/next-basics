import { Story } from "@next-core/brick-types";
import { brickGeneralSearchSvg } from "../images";
import { brickGeneralSearchUpdateUrlSvg } from "../images";
import { brickGeneralSearchNotUpdateUrlSvg } from "../images";
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
    en: "search input, it offers various events which cater to different scenarios and user interactions,The UI can be customized with options for size, shape, input style, button style, and more",
    zh: "搜索框，具备多种事件处理功能以适应不同的场景和用户交互需求,此外，界面样式可以通过大小、形状、输入框样式和按钮样式等进行自定义",
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
      thumbnail: brickGeneralSearchNotUpdateUrlSvg,
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
      thumbnail: brickGeneralSearchUpdateUrlSvg,
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
