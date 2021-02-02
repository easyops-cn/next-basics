import { Story } from "@next-core/brick-types";

export const BrickDescriptionsStory: Story = {
  storyId: "presentational-bricks.brick-descriptions",
  category: "description",
  type: "brick",
  author: "lynette",
  text: {
    en: "Descriptions",
    zh: "描述列表",
  },
  description: {
    en: "",
    zh: "常用于概要信息的描述，2~3列",
  },
  icon: {
    lib: "fa",
    icon: "clipboard-list",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-descriptions",
      properties: {
        itemList: [
          {
            text: "Lynette",
            label: "UserName",
          },
          {
            text: "18",
            label: "Age",
          },
          {
            label: "Tags",
            useBrick: {
              brick: "presentational-bricks.brick-tag",
              transform: {
                tagList: "@{tags}",
              },
              properties: {
                configProps: {
                  color: "orange",
                },
                showCard: false,
              },
            },
          },
        ],
        descriptionTitle: "User Info",
        dataSource: {
          tags: ["user"],
        },
      },
    },
    {
      brick: "presentational-bricks.brick-descriptions",
      properties: {
        itemList: [
          {
            label: "开始时间",
            useBrick: {
              brick: "presentational-bricks.brick-humanize-time",
              transform: {
                value: "@{ctime}",
              },
              properties: {
                formatter: "full",
              },
            },
          },
          {
            field: "name",
            label: "任务名称",
          },
        ],
        showCard: true,
        descriptionTitle: "任务详情",
        dataSource: {
          ctime: 1571017058,
          name: "巡检",
        },
      },
    },
  ],
};
