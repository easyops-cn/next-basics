import { Story } from "../../../interfaces";
import docMD from "../../../docs/basic-bricks/micro-app.md";

export const story: Story = {
  storyId: "basic-bricks.micro-app",
  type: "brick",
  author: "steve",
  deprecated: true,
  text: {
    en: "Micro App",
    zh: "小产品容器",
  },
  description: {
    en: "Deprecated",
    zh: "已废弃，请使用 `basic-bricks.micro-view`",
  },
  icon: {
    lib: "fa",
    icon: "box",
  },
  conf: {
    brick: "basic-bricks.micro-app",
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
