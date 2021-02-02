import { Story } from "../../../interfaces";
import docMD from "../../../docs/basic-bricks/index-card.md";

export const story: Story = {
  storyId: "basic-bricks.index-card",
  type: "brick",
  author: "william",
  text: {
    en: "Index Card Container",
    zh: "页面容器",
  },
  deprecated: true,
  description: {
    en: "",
    zh: "页面容器，注意与micro-app的区别",
  },
  icon: {
    lib: "fa",
    icon: "bowling-ball",
  },
  conf: {
    brick: "basic-bricks.index-card",
    properties: {
      title: "Hello World",
    },
    slots: {
      toolbar: {
        type: "bricks",
        bricks: [
          {
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "Create New One",
            },
          },
          {
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "Edit Existed One",
            },
          },
        ],
      },
      content: {
        type: "bricks",
        bricks: [
          {
            brick: "div",
            properties: {
              textContent: "hello",
              style: {
                border: "3px solid orange",
                height: "60px",
                background: "#fff",
              },
            },
          },
          {
            brick: "div",
            properties: {
              textContent: "world",
              style: {
                border: "3px solid orange",
                height: "100px",
                background: "#fff",
              },
            },
          },
        ],
      },
    },
  },
  doc: docMD,
};
