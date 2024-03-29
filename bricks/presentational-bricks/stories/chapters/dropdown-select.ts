import { Story } from "@next-core/brick-types";
import { dropdownSelectNormalSvg, dropdownSelectSvg } from "../images";
export const DropdownSelectStory: Story = {
  storyId: "presentational-bricks.dropdown-select",
  category: "navigation",
  type: "brick",
  author: "jo",
  text: {
    en: "Menu with Dropdown Select",
    zh: "菜单切换-带下拉选择",
  },
  description: {
    en: "a feature-rich dropdown selector brick. it supports both single and multiple selection operations and can be tailored to meet various business needs through the configuration of various properties",
    zh: "功能丰富的下拉选择器构件，它支持单选与多选操作，并且可以通过配置各种属性来满足不同的业务需求",
  },
  icon: {
    imgSrc: dropdownSelectSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.dropdown-select[normal]",
      title: {
        zh: "基础单选示例",
        en: "",
      },
      thumbnail: dropdownSelectNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.dropdown-select",
          properties: {
            options: [
              {
                label: "应用1",
                value: "aaaa",
                content: "描述1",
              },
              {
                label: "应用2",
                value: "bbbb",
                content: "描述2",
              },
              {
                label: "应用3",
                value: "cccc",
                content: "描述3",
              },
            ],
            placeholder: "请选择",
            value: "aaaa",
            labelFontSize: "16px",
          },
          events: {
            "select.change": {
              action: "console.info",
            },
          },
        },
      ],
    },
    {
      description: {
        title: "多选示例",
      },
      brick: "presentational-bricks.dropdown-select",
      properties: {
        options: [
          {
            label: "应用1",
            value: "aaaa",
            content: "描述1",
          },
          {
            label: "应用2",
            value: "bbbb",
            content: "描述2",
          },
          {
            label: "应用3",
            value: "cccc",
            content: "描述3",
          },
        ],
        value: "bbbb",
        placeholder: "请选择",
        labelFontSize: "14px",
        multipleSelect: true,
        selectedKeys: ["aaaa", "bbbb"],
      },
      events: {
        "select.change": {
          action: "console.info",
        },
      },
    },
  ],
};
