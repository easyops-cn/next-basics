import { Story } from "../../../interfaces";
import doc from "../../../docs/graph/item-with-tag.md";

export const story: Story = {
  storyId: "graph.item-with-tag",
  type: "brick",
  author: "lynette",
  text: {
    en: "Graph Node with tag",
    zh: "拓扑节点-带标签",
  },
  icon: {
    lib: "fa",
    icon: "bars",
    prefix: "fas",
  },
  description: {
    en: "",
    zh: "可以配置标签/icon/text的item构件，常用于general-graph构件的子构件",
  },
  conf: [
    {
      brick: "graph.item-with-tag",
      properties: {
        text: "appName",
        icon: {
          lib: "antd",
          icon: "environment",
          theme: "filled",
          color: "#71D7E3",
        },
        tagText: "string",
        tagColor: "gray",
      },
      events: {
        "item.click": {
          action: "console.log",
        },
      },
    },
    {
      brick: "div",
      properties: {
        style: {
          width: "200px",
          background: "#e6f6ff",
          borderRadius: "6px",
          padding: "8px",
        },
      },
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "graph.item-with-tag",
              properties: {
                text: "appId",
                icon: {
                  lib: "antd",
                  icon: "key",
                  theme: "outlined",
                  color: "rgb(255, 190, 13)",
                },
                tagText: "string",
                tagColor: "cyan",
              },
              events: {
                "item.click": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
    {
      brick: "div",
      properties: {
        style: {
          width: "200px",
          background: "#cccccc",
          borderRadius: "6px",
          padding: "10px",
          display: "grid",
          gap: "8px",
        },
      },
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "graph.item-with-tag",
              properties: {
                hoverable: true,
                text: "Hoverable item",
                showUnderline: false,
                defaultBgColor: "#ffffff",
                icon: {
                  lib: "easyops",
                  category: "model",
                  icon: "provider",
                },
              },
              events: {
                "item.click": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "graph.item-with-tag",
              properties: {
                hoverable: true,
                text: "Hoverable item",
                showUnderline: false,
                defaultBgColor: "#ffffff",
                icon: {
                  lib: "easyops",
                  category: "model",
                  icon: "provider",
                },
              },
              events: {
                "item.click": {
                  action: "console.log",
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
