import { Story } from "@next-core/brick-types";
import { brickConditionalDisplaySvg } from "../images";
import { brickConditionalDisplayNormalSvg } from "../images";
export const BrickConditionalDisplayStory: Story = {
  storyId: "presentational-bricks.brick-conditional-display",
  category: "data-transform",
  type: "brick",
  author: "cyril",
  text: {
    en: "Tag - Condition Judgment Display",
    zh: "Tag标签-条件判断展示",
  },
  description: {
    en: "the brick is categorized under data transformation. This component is designed to process data based on predefined rules and present text content with different styles accordingly. Its core functionality relies on MongoDB's query operators, allowing developers to define complex display rules. By configuring the data source and display rules, scenarios such as grading scores can be presented accurately",
    zh: "此构件属于数据转换类别，主要用于根据预设的规则对数据进行处理，并以不同的样式展示相应的文本内容。允许开发者定义复杂的展示规则。通过配置数据源和展示规则，可以实现如成绩等级划分等场景的精准展示",
  },
  icon: {
    imgSrc: brickConditionalDisplaySvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-conditional-display[normal]",
      title: {
        zh: "条件展示文本",
        en: "Conditional display text",
      },
      thumbnail: brickConditionalDisplayNormalSvg,
      bricks: [
        {
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
      ],
    },
  ],
};
