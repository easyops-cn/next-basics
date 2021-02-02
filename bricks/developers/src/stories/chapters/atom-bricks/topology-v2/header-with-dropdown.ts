import { Story } from "../../../interfaces";
import doc from "../../../docs/graph/header-with-dropdown.md";

export const story: Story = {
  storyId: "graph.header-with-dropdown",
  type: "brick",
  author: "lynette",
  text: {
    en: "Header with dropdown",
    zh: "带下拉框的header构件",
  },
  icon: {
    lib: "antd",
    icon: "line",
    theme: "outlined",
  },
  description: {
    en: "",
    zh: "可以配置dropdown的header构件，常用于general-graph构件的子构件",
  },
  conf: [
    {
      brick: "graph.header-with-dropdown",
      properties: {
        header: "APP",
        item: {
          objectId: "APP",
        },
        contentItemActions: {
          useBrick: [
            {
              brick: "presentational-bricks.general-label",
              if: "@{item.objectId|boolean}",
              properties: {
                text: "Add",
              },
            },
          ],
        },
      },
      events: {
        "header.click": {
          action: "console.log",
        },
      },
    },
    {
      brick: "div",
      properties: {
        style: {
          width: "200px",
          background: "#ddd",
          borderRadius: "6px",
          padding: "8px",
        },
      },
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "graph.header-with-dropdown",
              properties: {
                header: "Project Menu",
                item: {
                  name: "Project Menu",
                },
                contentItemActions: {
                  useBrick: [
                    {
                      brick: "presentational-bricks.general-label",
                      properties: {
                        text: "Add",
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  ],
  doc,
  previewColumns: 2,
};
