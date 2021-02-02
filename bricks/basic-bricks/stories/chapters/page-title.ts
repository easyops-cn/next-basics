import { Story } from "@next-core/brick-types";

export const pageTitleStory: Story = {
  storyId: "basic-bricks.page-title",
  category: "navigation",
  type: "brick",
  author: "steve",
  text: {
    en: "page title",
    zh: "页面标题",
  },
  description: {
    en: "page title",
    zh:
      "页面标题，在`basic-bricks.micro-view`的titleBar插槽中使用，如果只是普通字符串的可用pageTitle属性代替，如果是动态的话则用这个构件",
  },
  icon: {
    lib: "fa",
    icon: "cube",
  },
  conf: {
    brick: "basic-bricks.micro-view",
    slots: {
      titleBar: {
        type: "bricks",
        bricks: [
          {
            brick: "basic-bricks.page-title",
            properties: {
              pageTitle: "Hello World",
            },
          },
        ],
      },
    },
  },
};
