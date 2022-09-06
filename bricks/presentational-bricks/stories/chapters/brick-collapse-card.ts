import { Story } from "@next-core/brick-types";
import { brickCollapseCardSvg } from "../images";
export const BrickCollapseCardStory: Story = {
  storyId: "presentational-bricks.brick-collapse-card",
  category: "text",
  type: "brick",
  author: "lynette",
  text: {
    en: "Collapse card",
    zh: "详情折叠",
  },
  description: {
    en: "",
    zh: "详情折叠，有需要再展开，避免一开始太喧宾夺主，如工具详情",
  },
  icon: {
    imgSrc: brickCollapseCardSvg,
  },
  conf: [
    {
      brick: "presentational-bricks.brick-collapse-card",
      properties: {
        title: "名称",
        expandInactiveText: "工具详情",
      },
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                textContent: "Content",
              },
            },
          ],
        },
      },
    },
    {
      brick: "presentational-bricks.brick-collapse-card",
      properties: {
        expandInactiveText: "展开",
        expandInactiveIcon: "down",
        expandActiveText: "收起",
        expandActiveIcon: "up",
        isActive: true,
        titleWithIconAndDesc: true,
        cardTitle: "容器管理-闲置资源采集",
        descriptionList: [
          {
            label: "作者",
            text: "defalutUser",
          },
          {
            label: "分类",
            text: "容器管理",
          },
        ],
        titleIcon: {
          lib: "easyops",
          category: "agile",
          icon: "easy-now",
        },
      },
      slots: {
        content: {
          bricks: [
            {
              brick: "presentational-bricks.brick-descriptions",
              properties: {
                showCard: false,
                itemList: [
                  {
                    label: "版本信息",
                    text: "1.0.10",
                  },
                  {
                    label: "版本作者",
                    text: "defaultUser",
                  },
                  {
                    label: "脚本信息",
                    text: "python",
                  },
                ],
              },
            },
          ],
          type: "bricks",
        },
      },
    },
  ],
};
