import { Story } from "@next-core/brick-types";
import { generalTitleSvg } from "../images";
export const generalTitleStory: Story = {
  storyId: "basic-bricks.general-title",
  category: "text",
  type: "brick",
  author: "astrid",
  text: {
    en: "Title",
    zh: "标题",
  },
  description: {
    en: "You can configure the title, subtitle, and description",
    zh: "可以配置标题、副标题、描述",
  },
  icon: {
    imgSrc: generalTitleSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.general-title",
          properties: {
            mainTitle: "2021.08.22 12:24:22",
            description: '编辑了"publicDev_1"属性：服务信息',
            titleSuffixBrick: {
              useBrick: [
                {
                  brick: "presentational-bricks.brick-tag",
                  properties: {
                    color: "red",
                    showCard: false,
                    showTagCircle: true,
                    tagList: ["告警中"],
                  },
                },
              ],
            },
          },
        },
      ],
      snippetId: "basic-bricks.general-title[basic]",
      title: {
        en: "Basic General Title",
        zh: "基础标题",
      },
    },
  ],
};
