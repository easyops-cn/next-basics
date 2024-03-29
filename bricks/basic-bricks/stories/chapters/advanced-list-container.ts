import { Story } from "@next-core/brick-types";
import { advancedListContainerSvg } from "../images";
import { advancedListContainerBasicSvg } from "../images";
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
        dataSource: "<% DATA.value %>",
        rules: [
          {
            condition: {
              $lte: 60,
            },
            style: {
              backgroundColor: "var(--color-error)",
              color: "rgba(255, 255, 255, 1)",
              borderRadius: "var(--larger-border-radius)",
            },
            label: "<% DATA.value %>",
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
              backgroundColor: "var(--color-warning)",
              color: "rgba(255, 255, 255, 1)",
              borderRadius: "var(--larger-border-radius)",
            },
            label: "<% DATA.value %>",
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
              backgroundColor: "var(--color-success)",
              color: "rgba(255, 255, 255, 1)",
              borderRadius: "var(--larger-border-radius)",
            },
            label: "<% DATA.value %>",
          },
        ],
      },
    },
  },
  titleBrick: {
    useBrick: {
      brick: "div",
      transform: {
        textContent: "<% DATA.a %>",
      },
    },
  },
};

export const advancedListContainerStory: Story = {
  storyId: "basic-bricks.advanced-list-container",
  category: "container-layout",
  type: "brick",
  author: "momo",
  text: {
    en: "Dynamic Vertical List Container",
    zh: "动态纵向列表容器",
  },
  description: {
    en: "A list container support specified `useBrick`",
    zh: "可以指定子项使用特定构件的列表容器，相当于是动态的构件列表",
  },
  icon: {
    imgSrc: advancedListContainerSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.advanced-list-container",
          properties: mockProps,
          events: {
            "item.click": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "basic-bricks.advanced-list-container[basic]",
      title: {
        en: "Basic Advanced List Container",
        zh: "基础动态纵向列表容器",
      },
      thumbnail: advancedListContainerBasicSvg,
    },
  ],
};
