import { Story } from "@next-core/brick-types";

const mockProps = {
  showCard: true,
  data: {
    list: [
      {
        a: "部署主机",
        value: 2,
      },
      {
        a: "上游应用",
        value: 80,
      },
      {
        a: "下游游应用",
        value: 90,
      },
    ],
  },
  suffixBrick: {
    useBrick: {
      brick: "presentational-bricks.brick-conditional-display",
      transform: {
        dataSource: "@{value}",
        rules: [
          {
            condition: {
              $lte: 60,
            },
            style: {
              backgroundColor: "var(--theme-red-color)",
              color: "rgba(255, 255, 255, 1)",
            },
            label: "@{value}",
          },
          {
            condition: {
              $and: [
                {
                  $lte: 85,
                  $gt: 60,
                },
              ],
            },
            style: {
              backgroundColor: "var(--theme-orange-color)",
              color: "rgba(255, 255, 255, 1)",
            },
            label: "@{value}",
          },
          {
            condition: {
              $and: [
                {
                  $lte: 100,
                  $gt: 85,
                },
              ],
            },
            style: {
              backgroundColor: "var(--theme-green-color)",
              color: "rgba(255, 255, 255, 1)",
            },
            label: "@{value}",
          },
        ],
      },
    },
  },
  titleBrick: {
    useBrick: {
      brick: "div",
      transform: {
        textContent: "@{a}",
      },
    },
  },
};

export const advanceListContainerStory: Story = {
  storyId: "basic-bricks.advance-list-container",
  category: "layout",
  type: "brick",
  author: "momo",
  deprecated: true,
  text: {
    en: "Dynamic List Container",
    zh: "动态构件列表容器",
  },
  description: {
    en: "Deprecated",
    zh: "已废弃，请使用 `basic-bricks.advanced-list-container`",
  },
  icon: {
    lib: "fa",
    icon: "th",
  },
  conf: [
    {
      brick: "basic-bricks.advance-list-container",
      properties: mockProps,
      events: {
        "item.click": {
          action: "console.log",
        },
      },
    },
  ],
};
