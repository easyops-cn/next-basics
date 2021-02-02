import { Story } from "@next-core/brick-types";

export const BrickInputStory: Story = {
  storyId: "presentational-bricks.brick-input",
  category: "other",
  type: "brick",
  author: "momo",
  text: {
    en: "input",
    zh: "输入框",
  },
  description: {
    en: "input",
    zh: "输入框，只发起事件不更新url，注意与brick-general-search的区别",
  },
  icon: {
    lib: "fa",
    icon: "pencil-alt",
  },
  conf: {
    brick: "presentational-bricks.brick-input",
    properties: {
      placeholder: "输入关键字搜索",
      trigger: "change",
    },
    events: {
      "input.emit": [{ action: "console.log" }],
    },
  },
};
