import { Story } from "@next-core/brick-types";

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
    en: "such as 15 seconds,one day",
    zh: "如：15秒、1天",
  },
  icon: {
    lib: "fa",
    icon: "clock",
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
