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
  deprecated: true,
  description: {
    en: "Deprecated",
    zh: "已废弃",
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
