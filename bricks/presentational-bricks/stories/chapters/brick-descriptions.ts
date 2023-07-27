import { Story } from "@next-core/brick-types";
import { brickDescriptionsSvg } from "../images";
import { brickDescriptionsNormalSvg } from "../images";
export const BrickDescriptionsStory: Story = {
  storyId: "presentational-bricks.brick-descriptions",
  category: "text",
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
    imgSrc: brickDescriptionsSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-descriptions[normal]",
      text: {
        zh: "描述列表",
        en: "Description list",
      },
      thumbnail: brickDescriptionsNormalSvg,
      bricks: [
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
                  properties: {
                    tagList: "<% DATA.tags %>",
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
              tags: ["user", "admin"],
            },
          },
        },
      ],
    },
    {
      brick: "presentational-bricks.brick-descriptions",
      properties: {
        itemList: [
          {
            label: "开始时间",
            useBrick: {
              brick: "presentational-bricks.brick-humanize-time",
              properties: {
                value: "<% DATA.ctime %>",
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
    {
      brick: "presentational-bricks.brick-descriptions",
      description: {
        title: "设置需要隐藏的列表项",
      },
      properties: {
        itemList: [
          {
            text: "Lynette1",
            label: "UserName1",
            group: "a",
          },
          {
            text: "18",
            label: "Age1",
            group: "a",
          },
          {
            label: "Tags1",
            group: "a",
            useBrick: {
              brick: "presentational-bricks.brick-tag",
              properties: {
                tagList: "<% DATA.tags %>",
                configProps: {
                  color: "orange",
                },
                showCard: false,
              },
            },
          },
          {
            text: "Lynette2",
            label: "UserName2",
            group: "b",
          },
          {
            text: "19",
            label: "Age2",
            group: "b",
          },
          {
            label: "Tags2",
            group: "b",
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
          {
            text: "Lynette3",
            label: "UserName3",
            group: "c",
          },
          {
            text: "20",
            label: "Age3",
            group: "c",
          },
          {
            label: "Tags3",
            group: "c",
            useBrick: {
              brick: "presentational-bricks.brick-tag",
              properties: {
                tagList: "<% DATA.tags %>",
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
        hideGroups: ["b"],
      },
    },
    {
      brick: "presentational-bricks.brick-descriptions",
      properties: {
        descriptionList: [
          {
            itemList: [
              {
                text: "name",
                label: "名称",
              },
              {
                text: "无",
                label: "环境类型",
              },
              {
                text: "client",
                label: "授权模式",
              },
              {
                text: "无",
                label: "服务提供商",
              },
            ],
            descriptionTitle: "基本信息",
          },
          {
            itemList: [
              {
                text: "导入",
                label: "集群来源",
              },
              {
                text: "3个",
                label: "节点数量",
              },
              {
                text: "可分配CPU",
                label: "12 Cores",
              },
              {
                text: "可分配内存",
                label: "44GB",
              },
            ],
            descriptionTitle: "集群规格",
          },
          {
            itemList: [
              {
                text: "Lynette",
                label: "UserName",
              },
              {
                text: "18",
                label: "Age",
              },
            ],
            descriptionTitle: "User Info",
          },
        ],
      },
    },
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
              properties: {
                tagList: "<% DATA.tags %>",
                configProps: {
                  color: "orange",
                },
                showCard: false,
              },
            },
          },
          {
            text: " 2018-01-24",
            label: "Order time",
          },
          {
            text: "2019-04-24 18:00:00",
            label: "Usage Time",
            span: 2,
          },
          {
            text: "Data disk type: MongoDB",
            label: "Config Info",
            span: 3,
          },
        ],
        descriptionTitle: "User Info",
        bordered: true,
        dataSource: {
          tags: ["user", "admin"],
        },
      },
    },
  ],
};
