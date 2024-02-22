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
    en: "It features a button with an attached dropdown menu, providing users a compact way to trigger actions or select options. This brick offers various properties to customize the appearance and behavior, making it an ideal choice for developers seeking a balance between functionality and simplicity",
    zh: "集成了一个按钮和一个下拉菜单，为用户提供了一种紧凑的方式来触发动作或选择选项。该构件提供多种属性以定制外观和行为，对于寻求功能和简洁性平衡的开发者来说，这是一个理想的选择",
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
