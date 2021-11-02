import { Story } from "@next-core/brick-types";

export const BrickTimelineStory: Story = {
  storyId: "presentational-bricks.brick-timeline",
  category: "data-view",
  type: "brick",
  author: "jo",
  text: {
    en: "timeline",
    zh: "时间轴",
  },
  description: {
    en: "show information by timeline",
    zh: "垂直展示的时间流信息，常用于变更历史、工作动态等",
  },
  icon: {
    lib: "fa",
    icon: "stream",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-timeline",
      properties: {
        itemList: [
          {
            title: "easyops",
            description: '编辑了"publicDev_1"属性：服务信息',
            time: 1554861661000,
            status: "success",
            link: "#abc",
          },
          {
            title: "default",
            description: '编辑了"publicDev_1"属性：服务信息、agent版本',
            status: "warn",
            time: 1554892201000,
            link: "#def",
          },
          {
            title: "jack",
            description: '编辑了"publicDev_1"属性：服务信息',
            status: "running",
            time: 1555032601000,
            link: "#ghi",
          },
          {
            title: "goodman",
            description: '编辑了"publicDev_1"属性：服务信息',
            status: "normal",
            time: 1555050451000,
            link: "#jkl",
          },
          {
            title: "easyops",
            description: '编辑了"publicDev_1"属性：服务信息',
            status: "warn",
            time: 1557666471000,
            link: "#mno",
          },
        ],
        timeType: "millisecond",
        statusMap: {
          warn: "red",
          running: "blue",
          success: "green",
          normal: "gray",
        },
        type: "base",
      },
    },
    {
      brick: "presentational-bricks.brick-timeline",
      properties: {
        itemList: [
          {
            title: "easyops",
            description: '编辑了"publicDev_1"属性：服务信息',
            time: 1554861661000,
            status: "success",
            link: "#abc",
          },
          {
            title: "default",
            description: '编辑了"publicDev_1"属性：服务信息、agent版本',
            status: "warn",
            time: 1554892201000,
            link: "#def",
          },
          {
            title: "jack",
            description: '编辑了"publicDev_1"属性：服务信息',
            status: "running",
            time: 1555032601000,
            link: "#ghi",
          },
          {
            title: "goodman",
            description: '编辑了"publicDev_1"属性：服务信息',
            status: "normal",
            time: 1555050451000,
            link: "#jkl",
          },
          {
            title: "easyops",
            description: '编辑了"publicDev_1"属性：服务信息',
            status: "warn",
            time: 1557666471000,
            link: "#mno",
          },
          {
            title: "lock",
            description: '编辑了"publicDev_1"属性：服务信息',
            status: "normal",
            time: 1557666571000,
            link: "#mno",
          },
        ],
        statusMap: {
          warn: "red",
          running: "blue",
          success: "green",
          normal: "gray",
        },
        type: "extension",
      },
    },
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                style: {
                  marginBottom: "20px",
                },
                textContent: "点击标题弹出模态框显示详情信息",
              },
            },
            {
              brick: "presentational-bricks.brick-timeline",
              properties: {
                itemList: [
                  {
                    title: "easyops",
                    description: '编辑了"publicDev_1"属性：服务信息',
                    time: 1554861661000,
                    status: "success",
                    instanceId: "586db1d355788",
                  },
                  {
                    title: "default",
                    description: '编辑了"publicDev_1"属性：服务信息、agent版本',
                    status: "warn",
                    time: 1554892201000,
                    instanceId: "586db1d35574f",
                  },
                  {
                    title: "jack",
                    description: '编辑了"publicDev_1"属性：服务信息',
                    status: "running",
                    time: 1555032601000,
                    instanceId: "586db1d355799",
                  },
                  {
                    title: "goodman",
                    description: '编辑了"publicDev_1"属性：服务信息',
                    status: "normal",
                    time: 1555050451000,
                    instanceId: "586db1d35575d",
                  },
                  {
                    title: "easyops",
                    description: '编辑了"publicDev_1"属性：服务信息',
                    status: "warn",
                    time: 1557666471000,
                    instanceId: "586db1d355790",
                  },
                ],
                timeType: "millisecond",
                statusMap: {
                  warn: "red",
                  running: "blue",
                  success: "green",
                  normal: "gray",
                },
                type: "base",
              },
              events: {
                "item.click": [
                  {
                    target: "#detail-modal",
                    properties: {
                      modalTitle: "${EVENT.detail.title}",
                    },
                  },
                  {
                    target: "#info-container",
                    properties: {
                      textContent: "${EVENT.detail.description}",
                    },
                  },
                  {
                    target: "#detail-modal",
                    method: "open",
                  },
                ],
              },
            },
            {
              brick: "basic-bricks.general-modal",
              properties: {
                id: "detail-modal",
              },
              slots: {
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "div",
                      properties: {
                        id: "info-container",
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  ],
};
