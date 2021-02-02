import { Story } from "@next-core/brick-types";

export const CostTimeStory: Story = {
  storyId: "presentational-bricks.cost-time",
  category: "value-mapping",
  type: "brick",
  author: "lynette",
  text: {
    en: "cost time",
    zh: "耗时",
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
