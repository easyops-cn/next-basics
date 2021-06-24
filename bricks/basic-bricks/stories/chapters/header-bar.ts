import { Story } from "@next-core/brick-types";
export const headerBarStory: Story = {
  storyId: "basic-bricks.header-bar",
  category: "layout",
  type: "brick",
  author: "zekunpan",
  text: {
    en: "header-bar",
    zh: "header-bar布局构件，便于用户在basic-view模式下自由设定header头",
  },
  description: {
    en: "Provides navigation bar: left navigation bar slot, toolbar: right toolbar slot",
    zh: "提供navbar:左侧导航栏插槽，toolbar: 右侧工具栏插槽，可配置背景颜色",
  },
  icon: {
    lib: "fa",
    icon: "th",
  },
  conf: {
    brick: "basic-bricks.header-bar",
    properties: {
      headerBackgroundColor: "#2d3040",
    },
    slots: {
      navbar: {
        type: "bricks",
        bricks: [
          {
            brick: "div",
            properties: {
              textContent: "navbar",
              style: {
                color: "red",
              },
            },
          },
        ],
      },
      toolbar: {
        type: "bricks",
        bricks: [
          {
            brick: "div",
            properties: {
              textContent: "toolbar",
              style: {
                color: "pink",
              },
            },
          },
        ],
      },
    },
    events: {
      "logo.click": {
        action: "message.success",
        args: ["点击了logo"],
      },
    },
  },
};
