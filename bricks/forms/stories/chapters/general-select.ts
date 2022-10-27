import { Story } from "@next-core/brick-types";
import { generalSelectSvg } from "../images";
export const generalSelecttStory: Story = {
  storyId: "forms.general-select",
  category: "form-input-basic",
  type: "brick",
  author: "steve",
  text: {
    en: "Select",
    zh: "下拉选择器",
  },
  description: {
    en: "",
    zh: "",
  },
  icon: {
    imgSrc: generalSelectSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "forms.general-select",
          properties: {
            dataset: {
              testid: "basic-usage-demo",
            },
            name: "gender",
            label: "性别",
            value: "female",
            placeholder: "请选择性别",
            emptyOption: {
              label: "不分性别",
              value: "",
            },
            options: [
              {
                label: "男",
                value: "male",
              },
              {
                label: "女",
                value: "female",
              },
            ],
            inputBoxStyle: {
              width: 120,
            },
          },
          events: {
            "general.select.change": {
              action: "console.log",
              args: ["gender", "<% EVENT.detail %>"],
            },
          },
        },
      ],
      snippetId: "forms.general-select[basic]",
      title: {
        en: "Basic General Select",
        zh: "基础下拉选择器",
      },
    },
    {
      bricks: [
        {
          brick: "forms.general-select",
          properties: {
            dataset: {
              testid: "multiple-demo",
            },
            mode: "multiple",
            name: "city",
            label: "城市(多选)",
            value: ["Japan", "China"],
            options: [
              {
                label: "中国",
                value: "China",
              },
              {
                label: "日本",
                value: "Japan",
              },
              {
                label: "韩国",
                value: "Korea",
              },
              {
                label: "美国",
                value: "USA",
              },
            ],
            inputBoxStyle: {
              width: 250,
            },
          },
          events: {
            "general.select.change": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "forms.general-select[multi]",
      title: {
        en: "Multi General Select",
        zh: "多选下拉选择器",
      },
    },
    {
      brick: "forms.general-select",
      properties: {
        dataset: {
          testid: "suffix-demo",
        },
        name: "version",
        label: "版本",
        value: "abc123",
        placeholder: "请选择版本",
        options: [
          {
            label: "1.0.0",
            value: "abc123",
            type: 0,
          },
          {
            label: "2.0.0",
            value: "abc456",
            type: 1,
          },
          {
            label: "3.0.0",
            value: "abc789",
            type: 2,
          },
        ],
        inputBoxStyle: {
          width: 300,
        },
        suffix: {
          useBrick: {
            brick: "presentational-bricks.brick-value-mapping",
            properties: {
              mapping: {
                0: {
                  text: "生产",
                  color: "green",
                },
                1: {
                  text: "开发",
                  color: "cyan",
                },
                2: {
                  text: "测试",
                  color: "orange",
                },
              },
              value: "<% DATA.type %>",
            },
          },
        },
      },
      events: {
        "general.select.change": {
          action: "console.log",
          args: ["gender", "<% EVENT.detail %>"],
        },
        "general.select.search": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.general-select",
      properties: {
        dataset: {
          testid: "group-by-demo",
        },
        inputBoxStyle: {
          width: 250,
        },
        name: "city",
        label: "城市(分组显示)",
        groupBy: "location",
        options: [
          {
            label: "中国",
            value: "China",
            location: "亚洲",
          },
          {
            label: "韩国",
            value: "Korea",
            location: "亚洲",
          },
          {
            label: "日本",
            value: "Japan",
            location: "亚洲",
          },
          {
            label: "美国",
            value: "USA",
            location: "北美洲",
          },
          {
            label: "加拿大",
            value: "Canada",
            location: "北美洲",
          },
          {
            label: "英国",
            value: "UK",
            location: "欧洲",
          },
        ],
      },
      events: {
        "general.select.change": {
          action: "console.log",
          args: ["gender", "<% EVENT.detail %>"],
        },
        "general.select.change.v2": {
          action: "console.log",
        },
        "general.select.search": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.general-select",
      properties: {
        dataset: {
          testid: "tags-mode-demo",
        },
        mode: "tags",
        name: "city",
        label: "tags模式(自定义分词分隔符)",
        tokenSeparators: [";", " "],
        options: [
          "a1",
          "a2",
          "a3",
          "b1",
          "b2",
          "b3",
          "c1",
          "c2",
          "c3",
          "d1",
          "d2",
          "d3",
          "e1",
          "e2",
          "e3",
          "f1",
          "f2",
          "f3",
          "g1",
          "g2",
          "g3",
        ],
        inputBoxStyle: {
          width: 250,
        },
      },
      events: {
        "general.select.change": {
          action: "console.log",
        },
      },
    },
  ],
};
