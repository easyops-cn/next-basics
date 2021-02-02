import { Story } from "@next-core/brick-types";

export const transformAgentStory: Story = {
  storyId: "basic-bricks.transform-agent",
  category: "data-convert",
  type: "brick",
  author: "steve",
  text: {
    en: "Transform Agent",
    zh: "数据转换代理",
  },
  description: {
    en: "An agent brick that transform properties from bricks to bricks",
    zh: "一个代理构件支持将一些构件的属性转换并赋值给其它构件",
  },
  icon: {
    lib: "fa",
    icon: "th",
  },
  conf: {
    brick: "div",
    slots: {
      "": {
        type: "bricks",
        bricks: [
          {
            brick: "basic-bricks.transform-agent",
            properties: {
              target: "#testTarget",
              source: {
                from: "#testSource",
              },
              transform: {
                "style.color": "@{from.style.color}",
              },
            },
            bg: true,
          },
          {
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "Do Transform",
            },
            events: {
              "general.button.click": {
                target: "basic-bricks\\.transform-agent",
                method: "execute",
              },
            },
          },
          {
            brick: "div",
            properties: {
              id: "testTarget",
              textContent: "Target",
            },
          },
          {
            brick: "div",
            properties: {
              id: "testSource",
              textContent: "Source",
              style: {
                color: "red",
              },
            },
          },
        ],
      },
    },
  },
};
