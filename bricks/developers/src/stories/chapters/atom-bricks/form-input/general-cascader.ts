import doc from "../../../docs/forms/general-cascader.md";
import { Story } from "../../../interfaces";

const story: Story = {
  storyId: "forms.general-cascader",
  type: "brick",
  author: "jo",
  text: {
    en: "General Cascader",
    zh: "级联选择器",
  },
  description: {
    en:
      "Choose from a set of related data sets, separated by multi-level classification, common scenarios are provinces and cities, company level, thing classification",
    zh:
      "从一组相关联的数据集合进行选择，用多级分类进行分隔，常见场景为省市区，公司层级，事物分类等",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: [
    {
      brick: "forms.general-cascader",
      properties: {
        name: "city",
        placeholder: "自定义自定名",
        fieldNames: { label: "name", value: "code", children: "items" },
        options: [
          {
            code: "zhejiang",
            name: "Zhejiang",
            items: [
              {
                code: "hangzhou",
                name: "Hangzhou",
                items: [
                  {
                    code: "xihu",
                    name: "West Lake",
                  },
                ],
              },
            ],
          },
          {
            code: "jiangsu",
            name: "Jiangsu",
            items: [
              {
                code: "nanjing",
                name: "Nanjing",
                items: [
                  {
                    code: "zhonghuamen",
                    name: "Zhong Hua Men",
                  },
                ],
              },
            ],
          },
        ],
      },
      events: {
        "cascader.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          city: ["zhejiang", "hangzhou", "xihu"],
        },
      },
      events: {
        "validate.success": {
          action: "console.log",
          args: ["${EVENT.type}", "${EVENT.detail}"],
        },
        "validate.error": {
          action: "console.warn",
          args: ["${EVENT.type}", "${EVENT.detail}"],
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-cascader",
              properties: {
                name: "city",
                label: "城市选择",
                placeholder: "请选择城市",
                required: true,
                options: [
                  {
                    value: "zhejiang",
                    label: "Zhejiang",
                    children: [
                      {
                        value: "hangzhou",
                        label: "Hangzhou",
                        children: [
                          {
                            value: "xihu",
                            label: "West Lake",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    value: "jiangsu",
                    label: "Jiangsu",
                    children: [
                      {
                        value: "nanjing",
                        label: "Nanjing",
                        children: [
                          {
                            value: "zhonghuamen",
                            label: "Zhong Hua Men",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              events: {
                "cascader.change": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                showCancelButton: true,
                submitText: "提交",
                cancelText: "取消",
              },
              events: {
                "submit.button.click": {
                  action: "console.log",
                },
                "cancel.button.click": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
  ],
  doc,
};

export default story;
