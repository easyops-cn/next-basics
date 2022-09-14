import { Story } from "@next-core/brick-types";
import { generalRadioSvg } from "../images";
export const GeneralRadioStory: Story = {
  storyId: "forms.general-radio",
  category: "form-input-basic",
  type: "brick",
  author: "jo",
  text: {
    en: "Radio",
    zh: "单选框",
  },
  description: {
    en: "general Radio",
    zh: "通用的单选框",
  },
  icon: {
    imgSrc: generalRadioSvg,
  },
  conf: [
    {
      brick: "forms.general-radio",
      properties: {
        dataset: { testid: "basic-usage-demo" },
        name: "city",
        label: "城市",
        value: "Shanghai",
        options: ["Shanghai", "Beijing", "Chengdu"],
      },
      events: {
        "general.radio.change": {
          action: "console.log",
          args: ["city1", "<% EVENT.detail %>"],
        },
      },
    },
    {
      brick: "forms.general-radio",
      properties: {
        name: "city",
        label: "城市",
        value: "Shanghai",
        type: "button",
        options: [
          {
            label: "上海",
            value: "Shanghai",
          },
          {
            label: "北京",
            value: "Beijing",
          },
          {
            label: "成都",
            value: "Chengdu",
          },
        ],
      },
      events: {
        "general.radio.change": {
          action: "console.log",
          args: ["city2", "<% EVENT.detail %>"],
        },
      },
    },
    {
      brick: "forms.general-radio",
      description: {
        title: "当type = default时，给radio设置图标",
      },
      events: {
        "general.radio.change": {
          action: "console.log",
          args: ["city3", "<% EVENT.detail %>"],
        },
      },
      properties: {
        label: "城市",
        name: "city",
        options: [
          {
            label: "上海",
            value: "Shanghai",
            icon: {
              icon: "bar-chart",
              lib: "antd",
              theme: "outlined",
              iconStyle: {
                color: "blue",
                fontSize: "18px",
              },
            },
          },
          {
            icon: {
              imgSrc:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              imgStyle: {
                objectFit: "cover",
                borderRadius: "50%",
              },
            },
            label: "北京",
            value: "Beijing",
          },
          {
            label: "成都",
            value: "Chengdu",
            icon: {
              color: {
                endColor: "var(--palette-blue-6)",
                startColor: "var(--palette-red-6)",
              },
              icon: "aim",
              lib: "antd",
              theme: "outlined",
            },
          },
        ],
        value: "Beijing",
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          city: "Beijing",
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-radio",
              properties: {
                name: "city",
                label: "城市",
                required: true,
                options: ["Shanghai", "Beijing", "Chengdu"],
              },
              events: {
                "general.radio.change": {
                  action: "console.log",
                  args: ["city3", "<% EVENT.detail %>"],
                },
              },
            },
            {
              brick: "forms.general-radio",
              properties: {
                name: "size",
                label: "型号",
                type: "button",
                options: [
                  {
                    label: "大",
                    value: "big",
                  },
                  {
                    label: "中",
                    value: "medium",
                  },
                  {
                    label: "小",
                    value: "small",
                  },
                ],
              },
              events: {
                "general.radio.change": {
                  action: "console.log",
                  args: ["size", "<% EVENT.detail %>"],
                },
              },
            },
          ],
        },
      },
    },
    {
      brick: "forms.general-form",
      description: {
        title: "禁用选项",
      },
      properties: {
        values: {
          city: "Beijing",
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-radio",
              properties: {
                name: "city",
                label: "城市",
                required: true,
                options: [
                  {
                    label: "上海",
                    value: "Shanghai",
                    disabled: true,
                  },
                  {
                    label: "北京",
                    value: "Beijing",
                    disabled: true,
                  },
                  {
                    label: "成都",
                    value: "Chengdu",
                  },
                ],
              },
              events: {
                "general.radio.change": {
                  action: "console.log",
                  args: ["city3", "<% EVENT.detail %>"],
                },
              },
            },
          ],
        },
      },
    },
    {
      description: {
        title: "使用图标按钮样式",
      },
      brick: "forms.general-radio",
      events: {
        "general.radio.change": {
          action: "console.log",
          args: ["<% EVENT.detail %>"],
        },
      },
      properties: {
        label: "图表",
        name: "chart",
        options: [
          {
            icon: {
              lib: "antd",
              icon: "area-chart",
              theme: "outlined",
            },
            value: "area-chart",
          },
          {
            icon: {
              lib: "antd",
              icon: "bar-chart",
              theme: "outlined",
            },
            value: "bar-chart",
          },
          {
            icon: {
              lib: "antd",
              icon: "pie-chart",
              theme: "outlined",
            },
            value: "pie-chart",
          },
          {
            icon: {
              lib: "antd",
              icon: "radar-chart",
              theme: "outlined",
            },
            value: "radar-chart",
          },
        ],
        type: "button",
        value: "Shanghai",
      },
    },
    {
      brick: "forms.general-form",
      description: {
        title:
          "可以设置大小`size`：大-`large`、中-`middle`、小-`small`。只对按钮样式生效。",
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-radio",
              properties: {
                type: "button",
                name: "large",
                label: "大",
                size: "large",
                options: [
                  {
                    label: "上海",
                    value: "Shanghai",
                  },
                  {
                    label: "北京",
                    value: "Beijing",
                  },
                  {
                    label: "成都",
                    value: "Chengdu",
                  },
                ],
              },
            },
            {
              brick: "forms.general-radio",
              properties: {
                type: "button",
                name: "middle",
                label: "中",
                size: "middle",
                options: [
                  {
                    label: "上海",
                    value: "Shanghai",
                  },
                  {
                    label: "北京",
                    value: "Beijing",
                  },
                  {
                    label: "成都",
                    value: "Chengdu",
                  },
                ],
              },
            },
            {
              brick: "forms.general-radio",
              properties: {
                type: "button",
                name: "small",
                label: "小",
                size: "small",
                options: [
                  {
                    label: "上海",
                    value: "Shanghai",
                  },
                  {
                    label: "北京",
                    value: "Beijing",
                  },
                  {
                    label: "成都",
                    value: "Chengdu",
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
        title: "使用icon类型样式案例",
      },
      brick: "forms.general-radio",
      events: {
        "general.radio.change": {
          action: "console.log",
          args: ["<% EVENT.detail %>"],
        },
      },
      properties: {
        label: "图标",
        name: "icon",
        options: [
          {
            icon: {
              lib: "antd",
              icon: "area-chart",
              theme: "outlined",
            },
            label: "area-chart",
            value: "area-chart",
          },
          {
            icon: {
              lib: "antd",
              icon: "bar-chart",
              theme: "outlined",
            },
            label: "bar-chart",
            value: "bar-chart",
          },
          {
            icon: {
              lib: "antd",
              icon: "pie-chart",
              theme: "outlined",
            },
            label: "pie-chart",
            value: "pie-chart",
          },
        ],
        type: "icon",
        value: "area-chart",
      },
    },
    {
      brick: "forms.general-radio",
      events: {
        "general.radio.change": {
          action: "console.log",
          args: ["<% EVENT.detail %>"],
        },
      },
      properties: {
        label: "图标",
        name: "circleIcon",
        options: [
          {
            icon: {
              lib: "easyops",
              category: "monitor",
              icon: "create-strategy",
            },
            label: "新建并绑定策略",
            value: "create",
          },
          {
            icon: {
              lib: "easyops",
              category: "monitor",
              icon: "bind-strategy",
            },
            label: "绑定已有策略",
            value: "bind",
          },
        ],
        type: "icon-circle",
        value: "create",
      },
    },
    {
      description: {
        title:
          "可通过easyops-builtin-widgets.tpl-card-list-base-item-of-illustration配置插画内容",
      },
      brick: "forms.general-radio",
      properties: {
        label: "图标",
        useBrick: {
          brick:
            "easyops-builtin-widgets.tpl-card-list-base-item-of-illustration",
          properties: {
            background: "<% DATA.background %>",
            topBg: "<% DATA.image %>",
            cardTitle: "<% DATA.title %>",
            cardDesc: "<% DATA.description %>",
          },
        },
        name: "icon",
        options: [
          {
            label: "green",
            value: "green",
            background: "green",
            image:
              "url('/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/create1653638263844900005.png')",
            title: "标题一",
            description: "这是第一个卡片的描述",
          },
          {
            label: "blue",
            value: "blue",
            background: "blue",
            image:
              "url('/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/base-of-template1653642745768123613.png')",
            title: "标题一",
            description: "这是第一个卡片的描述",
          },
        ],
        type: "custom",
        value: "blue",
        customStyle: {
          height: "291px",
          width: "212px",
        },
      },
    },
  ],
  previewColumns: 2,
};
