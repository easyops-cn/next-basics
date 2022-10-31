import { Story } from "@next-core/brick-types";
import { brickIllustrationSvg } from "../images";
import { brickIllustrationGuideSvg } from "../images";
export const BrickIllustrationStory: Story = {
  storyId: "presentational-bricks.brick-illustration",
  category: "feedback-and-tooltip",
  type: "brick",
  author: "Alex",
  text: {
    en: "illustration",
    zh: "插画展示构件",
  },
  tags: [],
  description: {
    en: "illustration",
    zh: "插画展示构件内容来自`插画库`，如需更多类型请到`插画库`挑选",
  },
  icon: {
    imgSrc: brickIllustrationSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-illustration[guide]",
      title: {
        zh: "引导类型插画",
        en: "",
      },
      message: {
        zh: "此类型插画一般与`header`属性配合使用,`mode: guide`",
        en: "",
      },
      thumbnail: brickIllustrationGuideSvg,
      bricks: [
        {
          brick: "presentational-bricks.brick-illustration",
          description: {
            title: "引导类型插画",
            message: "此类型插画一般与`header`属性配合使用,`mode: guide`",
          },
          properties: {
            mode: "guide",
            category: "default",
            name: "search-empty",
            header: {
              title: "欢迎使用请求追踪",
              description: "请在左侧输入条件搜索",
            },
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.brick-illustration[feedback]",
      title: {
        zh: "反馈类型插画",
        en: "",
      },
      message: {
        zh: "此类型插画一般与`footer`属性配合使用,`mode: feedback`",
        en: "",
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-illustration",
          properties: {
            mode: "feedback",
            category: "exception",
            name: "http-404",
            footer: {
              text: "暂时未找到您查询的页面，请",
              url: "<% `${APP.homepage}` %>",
              label: "返回首页",
            },
          },
        },
      ],
    },
  ],
};
