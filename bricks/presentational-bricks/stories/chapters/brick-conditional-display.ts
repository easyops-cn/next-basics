import { Story } from "@next-core/brick-types";

export const BrickConditionalDisplayStory: Story = {
  storyId: "presentational-bricks.brick-conditional-display",
  category: "value-mapping",
  type: "brick",
  author: "cyril",
  text: {
    en: "conditional display",
    zh: "条件展示",
  },
  description: {
    en: "",
    zh: "按不同条件渲染，比如告警数为0是绿色，大于1时显示黄色, 更灵活的方式请通过表达式、函数来做数据处理",
  },
  icon: {
    lib: "fa",
    icon: "dolly",
  },
  conf: {
    brick: "presentational-bricks.brick-conditional-display",
    properties: {
      dataSource: {
        fullScore: 150,
        score: 130,
      },
      rules: [
        {
          condition: {
            $or: [
              {
                fullScore: 100,
                score: {
                  $lt: 60,
                },
              },
              {
                fullScore: 150,
                score: {
                  $lt: 90,
                },
              },
            ],
          },
          style: {
            backgroundColor: "rgba(252, 80, 67, 1)",
            color: "rgba(255, 255, 255, 1)",
          },
          label: "不及格",
        },
        {
          condition: {
            $or: [
              {
                fullScore: 100,
                score: {
                  $gte: 60,
                  $lt: 80,
                },
              },
              {
                fullScore: 150,
                score: {
                  $gte: 90,
                  $lt: 120,
                },
              },
            ],
          },
          style: {
            backgroundColor: "rgba(255, 162, 53, 1)",
            color: "rgba(255, 255, 255, 1)",
          },
          label: "及格",
        },
        {
          condition: {
            $or: [
              {
                fullScore: 100,
                score: {
                  $gte: 80,
                  $lt: 90,
                },
              },
              {
                fullScore: 150,
                score: {
                  $gte: 120,
                  $lt: 135,
                },
              },
            ],
          },
          style: {
            backgroundColor: "var(--color-success)",
            color: "rgba(255, 255, 255, 1)",
          },
          label: "良好",
        },
        {
          condition: {
            $or: [
              {
                fullScore: 100,
                score: {
                  $gte: 90,
                },
              },
              {
                fullScore: 150,
                score: {
                  $gte: 135,
                },
              },
            ],
          },
          style: {
            backgroundColor: "rgba(22, 123, 224, 1)",
            color: "rgba(255, 255, 255, 1)",
          },
          label: "优秀",
        },
      ],
    },
  },
};
