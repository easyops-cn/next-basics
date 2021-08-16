import { Story } from "@next-core/brick-types";
export const GeneralSliderElementStory: Story = {
  storyId: "presentational-bricks.general-slider",
  category: "layout",
  type: "brick",
  author: "jo",
  text: {
    en: "presentational-bricks.general-slider",
    zh: "滑动型输入器",
  },
  icon: { lib: "fa", icon: "sliders-h" },
  description: {
    en: "general slider",
    zh: "滑动型输入器，展示当前值和可选范围",
  },
  conf: [
    {
      brick: "presentational-bricks.general-slider",
      description: {
        title: "基础用法",
        message: "",
      },
      events: {
        "slider.change": {
          action: "console.log",
        },
        "slider.after.change": {
          action: "console.log",
        },
      },
      properties: {
        value: 30,
      },
    },
    {
      brick: "presentational-bricks.general-slider",
      description: {
        title: "dashboard 样式",
        message: "",
      },
      events: {
        "slider.change": {
          action: "console.log",
        },
        "slider.after.change": {
          action: "console.log",
        },
      },
      properties: {
        value: [30, 60],
        range: true,
        uiType: "dashboard",
      },
    },
  ],
};
