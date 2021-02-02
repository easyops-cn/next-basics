import { Story } from "@next-core/brick-types";

export const GeneralRadioStory: Story = {
  storyId: "forms.general-radio",
  category: "form-input",
  type: "brick",
  author: "jo",
  text: {
    en: "General Radio",
    zh: "普通单选框",
  },
  description: {
    en: "general Radio",
    zh: "通用的单选框",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: [
    {
      brick: "forms.general-radio",
      properties: {
        name: "city",
        label: "城市",
        value: "Shanghai",
        options: ["Shanghai", "Beijing", "Chengdu"],
      },
      events: {
        "general.radio.change": {
          action: "console.log",
          args: ["city1", "${EVENT.detail}"],
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
          args: ["city2", "${EVENT.detail}"],
        },
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
                  args: ["city3", "${EVENT.detail}"],
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
                  args: ["size", "${EVENT.detail}"],
                },
              },
            },
          ],
        },
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
                  args: ["city3", "${EVENT.detail}"],
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
          args: ["${EVENT.detail}"],
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
  ],
  previewColumns: 2,
};
