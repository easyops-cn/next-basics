import { Story } from "@next-core/brick-types";

export const DropdownSelectStory: Story = {
  storyId: "presentational-bricks.dropdown-select",
  category: "navigation",
  type: "brick",
  author: "jo",
  text: {
    en: "Dropdown Select",
    zh: "下拉菜单选择框",
  },
  description: {
    en: "To Store Related Menu Items When There Are Many Menu Items",
    zh: "用于菜单项较多时收纳相关菜单项",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: [
    {
      brick: "presentational-bricks.dropdown-select",
      properties: {
        dataSource: [
          {
            label: "应用1",
            value: "132b4a",
            desc: "作为测试用",
          },
          {
            label: "应用2",
            value: "43bca6",
            desc: "记录相关修改信息",
          },
        ],
        value: "43bca6",
        label: "#{item.label}",
        placeholder: "placeholder",
        optionTitle: "#{item.label}",
        optionContent: "#{item.desc}",
        valuePath: "item.value",
      },
      events: {
        "select.change": {
          action: "console.info",
        },
      },
    },
    {
      brick: "presentational-bricks.dropdown-select",
      properties: {
        dataSource: [
          {
            label: "应用3",
            value: "132b4a",
            desc: "作为开发用",
          },
          {
            label: "应用4",
            value: "43bca6",
            desc: "记录相关创建信息",
          },
        ],
        value: "应用4",
        label: "#{item.label}",
        placeholder: "placeholder",
        optionTitle: "#{item.label}",
        optionContent: "#{item.desc}",
        valuePath: "item.label",
      },
      events: {
        "select.change": {
          action: "console.info",
        },
      },
    },
  ],
};
