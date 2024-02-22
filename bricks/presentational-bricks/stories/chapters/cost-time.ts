import { Story } from "@next-core/brick-types";
import { costTimeSvg } from "../images";
export const CostTimeStory: Story = {
  storyId: "presentational-bricks.cost-time",
  category: "data-transform",
  type: "brick",
  author: "lynette",
  text: {
    en: "Text Conversion - Automatic Conversion to UNIX Time Consuming",
    zh: "文本转换-自动转换unix时间耗时",
  },
  description: {
    en: "primarily used for data transformation presentation. It can represent the time cost with millisecond-level accuracy and allows for custom start and end times",
    zh: "主要用于数据转换展示，能够以毫秒级精度表现消耗时间，并允许自定义起始与结束时间,用户可通过属性配置单位样式，以适应不同的界面设计需求",
  },
  icon: {
    imgSrc: costTimeSvg,
  },
  conf: [
    {
      brick: "presentational-bricks.cost-time",
      properties: {
        cost: 123456,
      },
    },
    {
      brick: "presentational-bricks.cost-time",
      properties: {
        startTime: 1593603641000,
        endTime: 1593603798000,
      },
    },
  ],
  previewColumns: 2,
};
