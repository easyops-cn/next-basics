import { Story } from "@next-core/brick-types";
import {
  brickTimelineBaseSvg,
  brickTimelineExtensionSvg,
  brickTimelineSvg,
} from "../images";
export const BrickTimelineStory: Story = {
  storyId: "presentational-bricks.brick-timeline",
  category: "display-component",
  type: "brick",
  author: "jo",
  text: {
    en: "timeline",
    zh: "时间轴",
  },
  description: {
    en: "primarily used to present data in the form of a timeline. It comes with a variety of configurable options such as data sources, custom bricks, and timeline types. The Timeline Brick supports responsive design, allowing for color mapping based on different data states to enhance the user's visual experience",
    zh: "该构件主要用于以时间线的形式展示数据。其具备丰富的配置项，如数据源、自定义构件以及时间轴类型等。时间轴构件支持响应式布局，可以根据不同的数据状态映射显示相应颜色，增强用户视觉体验",
  },
  icon: {
    imgSrc: brickTimelineSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-timeline[base]",
      title: {
        zh: "基础时间轴",
        en: "",
      },
      thumbnail: brickTimelineBaseSvg,
      bricks: [
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
          events: {
            "item.click": [
              {
                action: "console.log",
                args: ["hello wolrd"],
              },
            ],
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.brick-timeline[extension]",
      title: {
        zh: "基础时间轴(带时间)",
        en: "",
      },
      thumbnail: brickTimelineExtensionSvg,
      bricks: [
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
          events: {
            "item.click": [
              {
                action: "console.log",
                args: ["hello wolrd"],
              },
            ],
          },
        },
      ],
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
