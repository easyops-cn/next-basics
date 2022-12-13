import { Story } from "@next-core/brick-types";
import { dropdownButtonNormalSvg, dropdownButtonSvg } from "../images";
export const DropdownButtonStory: Story = {
  storyId: "presentational-bricks.dropdown-button",
  category: "interact-basic",
  type: "brick",
  author: "astrid",
  text: {
    en: "Dropdown Button",
    zh: "带下拉框的按钮",
  },
  description: {
    en: "A button is on the left, and a related functional menu is on the right. ",
    zh: "左边是按钮，右边是额外的相关功能菜单",
  },
  icon: {
    imgSrc: dropdownButtonSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.dropdown-button[normal]",
      title: {
        zh: "基础带下拉框的按钮",
        en: "",
      },
      thumbnail: dropdownButtonNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.dropdown-button",
          properties: {
            leftButtonIcon: "reload",
            buttonName: "Dropdown",
            options: [
              {
                label: "item1",
                value: "test",
              },
              {
                label: "item2",
                value: "test2",
              },
            ],
          },
          events: {
            "select.change": {
              action: "console.log",
            },
            "left.button.click": {
              action: "console.log",
            },
          },
          description: {
            title: "基本",
            message: "",
          },
        },
      ],
    },
    {
      brick: "presentational-bricks.dropdown-button",
      properties: {
        leftButtonIcon: "reload",
        buttonName: "Dropdown",
        options: [
          {
            label: "item1",
            value: "test",
          },
          {
            label: "item2",
            value: "test2",
          },
        ],
        textPlacement: "right",
      },
      events: {
        "select.change": {
          action: "console.log",
        },
        "left.button.click": {
          action: "console.log",
        },
      },
    },
  ],
};
