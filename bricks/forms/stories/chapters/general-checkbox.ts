import { Story } from "@next-core/brick-types";

export const GeneralCheckboxStory: Story = {
  storyId: "forms.general-checkbox",
  type: "brick",
  category: "form-input",
  author: "jo",
  text: {
    en: "General Checkbox",
    zh: "普通多选框",
  },
  description: {
    en: "General Checkbox",
    zh: "通用多选框",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: [
    {
      brick: "forms.general-checkbox",
      properties: {
        name: "fruits",
        label: "水果",
        options: ["Apple", "Orange", "Pear"],
        value: ["Apple"],
      },
      events: {
        "general.checkbox.change": {
          action: "console.log",
          args: ["水果", "${EVENT.detail}"],
        },
      },
    },
    {
      brick: "forms.general-checkbox",
      properties: {
        name: "user",
        label: "用户",
        options: [
          { label: "管理员", value: "Administrator" },
          { label: "测试", value: "tester" },
          { label: "开发", value: "developer", disabled: true },
        ],
        value: ["tester", "developer"],
      },
      events: {
        "general.checkbox.change": {
          action: "console.log",
          args: ["用户", "${EVENT.detail}"],
        },
      },
    },
    {
      brick: "forms.general-checkbox",
      properties: {
        name: "user",
        label: "用户(多列场景)",
        colSpan: 8,
        options: [
          { label: "管理员", value: "Administrator" },
          { label: "测试", value: "tester" },
          { label: "开发", value: "developer" },
          { label: "管理员2", value: "Administrator2" },
          { label: "测试2", value: "tester2" },
          { label: "开发2", value: "developer2" },
        ],
        value: ["tester", "developer"],
      },
      events: {
        "general.checkbox.change": {
          action: "console.log",
          args: ["用户(多列场景)", "${EVENT.detail}"],
        },
      },
    },
    {
      brick: "forms.general-checkbox",
      description: {
        title: "分组复选框",
        message:
          "上层复选框仅作为分类标识，不作为表单数据项，勾选／取消勾选上层复选框可全选／取消全选。每个分组下可包含多个复选框。",
      },
      properties: {
        name: "goods",
        label: "商品",
        colSpan: 4,
        isGroup: true,
        optionGroups: [
          {
            name: "水果",
            key: "fruits",
            options: [
              {
                label: "苹果",
                value: "apple",
              },
              {
                label: "香蕉",
                value: "banana",
              },
            ],
          },
          {
            name: "蔬菜",
            key: "vegetables",
            options: [
              {
                label: "土豆",
                value: "potato",
              },
            ],
          },
        ],
        value: ["banana", "potato"],
      },
      events: {
        "general.checkbox.change": {
          action: "console.log",
          args: ["商品", "${EVENT.detail}"],
        },
      },
    },
  ],
};
