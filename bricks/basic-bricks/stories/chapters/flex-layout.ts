import { Story } from "@next-core/brick-types";

export const flexLayoutStory: Story = {
  storyId: "basic-bricks.flex-layout",
  category: "layout",
  type: "brick",
  author: "kehua",
  text: {
    en: "Flex Layout",
    zh: "flex布局",
  },
  description: {
    en: "A Flex layout container",
    zh: "基于Flex的布局容器",
  },
  icon: {
    lib: "fa",
    icon: "th",
  },
  conf: {
    brick: "basic-bricks.flex-layout",
    properties: {
      justifyContent: "center",
      alignItems: "center",
      style: {
        border: "1px solid black",
        background: "pink",
        height: "200px",
        width: "200px",
      },
    },
    slots: {
      "": {
        type: "bricks",
        bricks: [
          {
            brick: "div",
            properties: {
              textContent: "《第一个div》",
              style: { background: "yellow" },
            },
          },
          {
            brick: "div",
            properties: {
              textContent: "《第二个div》",
              style: { background: "orange" },
            },
          },
        ],
      },
    },
  },
};
