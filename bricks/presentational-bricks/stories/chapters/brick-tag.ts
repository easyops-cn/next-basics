import { Story } from "@next-core/brick-types";
import { brickTagSvg } from "../images";
import { brickTagDisabledWithCloseSvg } from "../images";
import { brickTagNormalSvg } from "../images";
export const BrickTagStory: Story = {
  storyId: "presentational-bricks.brick-tag",
  category: "display-component",
  type: "brick",
  author: "lynette",
  text: {
    en: "Tag Label",
    zh: "Tag 标签",
  },
  tags: [
    {
      en: "show",
      zh: "数据显示",
    },
  ],
  description: {
    en: "tag label, support Tag and CheckableTag",
    zh: "进行标记和分类的小标签，同时支持基本标签和可选中标签",
  },
  icon: {
    imgSrc: brickTagSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-tag[normal]",
      title: {
        zh: "基本",
        en: "",
      },
      message: {
        zh: "标签支持多彩标签、可选择标签、可删除标签。",
        en: "",
      },
      thumbnail: {
        imgSrc: brickTagNormalSvg,
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-tag",
          properties: {
            color: "green",
            showCard: true,
            showTagCircle: true,
            tagList: ["Active", "Normal"],
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.brick-tag[disabled-with-close]",
      title: {
        zh: "禁用可删除标签",
        en: "",
      },
      thumbnail: {
        imgSrc: brickTagDisabledWithCloseSvg,
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-tag",
          properties: {
            showCard: false,
            closable: true,
            tagList: [
              {
                key: "p1",
                label: "紧急变更",
                disabled: true,
              },
              {
                key: "p2",
                label: "计划变更",
                disabled: true,
              },
              {
                key: "p3",
                label: "发布流程",
              },
              {
                key: "p4",
                label: "发布流程",
              },
              {
                key: "p5",
                label: "发布计划",
              },
              {
                key: "p6",
                label: "测试计划",
              },
            ],
          },
          events: {
            "tag.close": {
              action: "console.log",
              args: ["${EVENT.detail}"],
            },
          },
        },
      ],
    },
    {
      description: {
        title: "多种颜色",
        message: "标签支持多彩标签、可选择标签、可删除标签。",
      },
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.brick-tag",
              properties: {
                color: "green",
                showCard: true,
                showTagCircle: true,
                tagList: ["Active", "Normal"],
              },
            },
            {
              brick: "presentational-bricks.brick-tag",
              properties: {
                color: "var(--color-warning)",
                showCard: true,
                showTagCircle: false,
                tagList: ["Active", "Normal"],
              },
            },
            {
              brick: "presentational-bricks.brick-tag",
              events: {
                "checked.update": {
                  action: "console.log",
                },
                "checked.update.v2": {
                  action: "console.log",
                },
              },
              properties: {
                showCard: true,
                componentType: "CheckableTag",
                default: "testB",
                multipleCheck: false,
                tagList: [
                  {
                    key: "testA",
                    label: "testA",
                  },
                  {
                    key: "testB",
                    label: "testB",
                    icon: {
                      lib: "fa",
                      icon: "adjust",
                      prefix: "fas",
                    },
                  },
                  {
                    key: "testC",
                    label: "testC",
                  },
                ],
              },
            },
            {
              brick: "presentational-bricks.brick-tag",
              properties: {
                showCard: true,
                closable: true,
                tagList: [
                  {
                    key: "close1",
                    label: "close1",
                  },
                  {
                    key: "close2",
                    label: "close2",
                  },
                  {
                    key: "close3",
                    label: "close3",
                  },
                ],
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "非填充色标签",
        message: "设置color为内置主题色（颜色名称）时为非填充色标签。",
      },
      brick: "presentational-bricks.card-item",
      properties: {
        cardLayoutType: "icon-as-background",
        dataSource: {
          descriptionList: ["Deployment 工作模式", "1 个负载均衡器", "啦啦"],
          id: "1",
          name: "k8s运行状态",
        },
        fields: {
          cardTitle: "name",
          descriptionList: "descriptionList",
        },
        style: {
          width: "250px",
        },
      },
      slots: {
        topRightOperate: {
          bricks: [
            {
              brick: "presentational-bricks.brick-tag",
              properties: {
                color: "green",
                showCard: false,
                showTagCircle: true,
                tagList: ["Active"],
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      description: {
        title: "填充色标签",
        message:
          "设置color为非内置主题色时为填充色标签。填充色标签的重要等级更高。",
      },
      brick: "presentational-bricks.card-item",
      properties: {
        cardLayoutType: "icon-as-background",
        dataSource: {
          descriptionList: ["Deployment 工作模式", "1 个负载均衡器", "啦啦啦"],
          id: "1",
          name: "k8s警告等级",
        },
        fields: {
          cardTitle: "name",
          descriptionList: "descriptionList",
        },
        style: {
          width: "250px",
        },
      },
      slots: {
        topRightOperate: {
          bricks: [
            {
              brick: "presentational-bricks.brick-tag",
              properties: {
                showCard: false,
                color: "var(--color-error)",
                tagList: ["严重"],
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      description: {
        title: "可选择标签",
      },
      brick: "forms.general-form",
      events: {
        "validate.error": {
          action: "console.warn",
          args: ["${EVENT.detail}"],
        },
        "validate.success": {
          action: "console.log",
          args: ["${EVENT.detail}"],
        },
      },
      properties: {
        valueTypes: {
          time: "moment|YYYY-MM-DD",
        },
      },
      slots: {
        items: {
          bricks: [
            {
              brick: "presentational-bricks.brick-tag",
              events: {
                "checked.update": {
                  action: "console.log",
                },
                "checked.update.v2": {
                  action: "console.log",
                },
              },
              properties: {
                showCard: false,
                componentType: "CheckableTag",
                default: "tool",
                style: {
                  marginBottom: "20px",
                },
                tagList: [
                  {
                    key: "tool",
                    label: "工具",
                  },
                  {
                    key: "step",
                    label: "流程",
                  },
                  {
                    key: "pipeline",
                    label: "流水线",
                  },
                  {
                    key: "automation",
                    label: "自动化作业",
                  },
                ],
              },
            },
            {
              brick: "forms.general-input",
              properties: {
                label: "任务对象",
                name: "target",
                required: true,
              },
            },
            {
              brick: "forms.general-input",
              properties: {
                label: "名称",
                name: "name",
                required: true,
              },
            },
            {
              brick: "forms.general-select",
              properties: {
                label: "执行策略",
                name: "nickname",
                options: [
                  {
                    label: "一次性",
                    value: "once",
                  },
                  {
                    label: "周期性",
                    value: "circle",
                  },
                ],
                inputBoxStyle: {
                  width: 120,
                },
              },
            },
            {
              brick: "forms.general-date-picker",
              properties: {
                label: "时间",
                name: "time",
                placeholder: "when",
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                cancelText: "取消",
                showCancelButton: true,
                submitText: "提交",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      description: {
        title: "带图标的可选择标签",
      },
      brick: "basic-bricks.general-card",
      slots: {
        content: {
          bricks: [
            {
              brick: "presentational-bricks.brick-tag",
              properties: {
                componentType: "CheckableTag",
                showCard: false,
                tagList: [
                  {
                    key: "p1",
                    label: "任务视图1",
                    icon: {
                      lib: "fa",
                      icon: "adjust",
                      prefix: "fas",
                    },
                  },
                  {
                    key: "p2",
                    label: "任务视图2",
                    icon: {
                      lib: "fa",
                      icon: "adjust",
                      prefix: "fas",
                    },
                  },
                  {
                    key: "p3",
                    label: "任务视图3",
                    icon: {
                      lib: "fa",
                      icon: "adjust",
                      prefix: "fas",
                    },
                  },
                  {
                    key: "p4",
                    label: "任务视图4",
                    icon: {
                      lib: "fa",
                      icon: "adjust",
                      prefix: "fas",
                    },
                  },
                  {
                    key: "p5",
                    label: "任务视图5",
                    icon: {
                      lib: "fa",
                      icon: "adjust",
                      prefix: "fas",
                    },
                  },
                  {
                    key: "p6",
                    label: "任务视图6",
                    icon: {
                      lib: "fa",
                      icon: "adjust",
                      prefix: "fas",
                    },
                  },
                  {
                    key: "p7",
                    label: "任务视图7",
                    icon: {
                      lib: "fa",
                      icon: "adjust",
                      prefix: "fas",
                    },
                  },
                  {
                    key: "p8",
                    label: "任务视图8",
                    icon: {
                      lib: "fa",
                      icon: "adjust",
                      prefix: "fas",
                    },
                  },
                ],
                multipleCheck: false,
                default: "p1",
              },
              events: {
                "checked.update": {
                  action: "console.log",
                },
                "checked.update.v2": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "chart-v2.pie-chart",
              events: {
                "chart-v2.click": {
                  action: "console.log",
                },
              },
              properties: {
                height: 300,
                data: [
                  {
                    item: "事例一",
                    count: 40,
                    percent: 0.4,
                  },
                  {
                    item: "事例二",
                    count: 21,
                    percent: 0.21,
                  },
                  {
                    item: "事例三",
                    count: 17,
                    percent: 0.17,
                  },
                  {
                    item: "事例四",
                    count: 13,
                    percent: 0.13,
                  },
                  {
                    item: "事例五",
                    count: 9,
                    percent: 0.09,
                  },
                ],
                yField: "percent",
                groupField: "item",
                radius: 0.75,
                innerRadius: 0.5,
                axis: {
                  yAxis: {
                    unit: "percent(1)",
                  },
                },
                innerTextCfg: {
                  content: "some content",
                  style: {
                    fontSize: 16,
                  },
                },
              },
            },
          ],
          type: "bricks",
        },
      },
    },
    {
      description: {
        title: "可删除标签",
      },
      brick: "basic-bricks.general-card",
      slots: {
        content: {
          bricks: [
            {
              brick: "p",
              properties: {
                textContent: "设置常用列表",
              },
            },
            {
              brick: "presentational-bricks.brick-tag",
              properties: {
                showCard: false,
                closable: true,
                tagList: [
                  {
                    key: "p1",
                    label: "紧急变更",
                    disabled: true,
                  },
                  {
                    key: "p2",
                    label: "计划变更",
                    disabled: true,
                  },
                  {
                    key: "p3",
                    label: "发布流程",
                  },
                  {
                    key: "p4",
                    label: "发布流程",
                  },
                  {
                    key: "p5",
                    label: "发布计划",
                  },
                  {
                    key: "p6",
                    label: "测试计划",
                  },
                ],
              },
              events: {
                "tag.close": {
                  action: "console.log",
                  args: ["${EVENT.detail}"],
                },
              },
            },
          ],
          type: "bricks",
        },
      },
    },
  ],
  previewColumns: 2,
};
