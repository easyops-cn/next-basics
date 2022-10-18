import { Story } from "@next-core/brick-types";
import { dynamicContentSvg } from "../images";

export const DynamicContentStory: Story = {
  storyId: "presentational-bricks.dynamic-content",
  category: "data-transform",
  type: "brick",
  author: "lynette",
  text: {
    en: "dynamic content",
    zh: "模板动态内容",
  },
  description: {
    en: "",
    zh: "支持解析模版的动态内容构件，例如：共 #{total} 条",
  },
  icon: {
    imgSrc: dynamicContentSvg,
  },
  conf: [
    {
      brick: "presentational-bricks.dynamic-content",
      properties: {
        dataSource: {
          total: 100,
        },
        dynamicContent: "共 #{total} 条",
      },
    },
    {
      brick: "presentational-bricks.dynamic-content",
      properties: {
        dataSource: {
          ctime: "2019-10-10",
        },
        dynamicContent: "创建时间：#{ctime}",
      },
    },
  ],
  previewColumns: 2,
};
