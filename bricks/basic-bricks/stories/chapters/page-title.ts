import { Story } from "@next-core/brick-types";
import { pageTitleSvg } from "../images";
import { pageTitleBasicSvg } from "../images";
export const pageTitleStory: Story = {
  storyId: "basic-bricks.page-title",
  category: "text",
  type: "brick",
  author: "steve",
  text: {
    en: "page title",
    zh: "页面标题",
  },
  description: {
    en: "page title",
    zh: "页面标题，在`basic-bricks.micro-view`的titleBar插槽中使用，如果只是普通字符串的可用pageTitle属性代替，如果是动态的话则用这个构件",
  },
  icon: {
    imgSrc: pageTitleSvg,
  },
  conf: [
    {
      brick: "basic-bricks.micro-view",
      slots: {
        titleBar: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.page-title",
              properties: {
                pageTitle: "Hello World",
              },
            },
          ],
        },
      },
    },
    {
      bricks: [
        {
          brick: "basic-bricks.page-title",
          properties: {
            pageTitle: "Hello World",
          },
        },
      ],
      snippetId: "basic-bricks.page-title[basic]",
      title: {
        en: "Basic Page Title",
        zh: "基础页面标题",
      },
      thumbnail: pageTitleBasicSvg,
    },
  ],
};
