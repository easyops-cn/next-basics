import { Story } from "@next-core/brick-types";

export const BrickTreeStory: Story = {
  storyId: "presentational-bricks.brick-tree",
  type: "brick",
  category: "data-view",
  author: "jo",
  text: {
    en: "Tree",
    zh: "树形构件",
  },
  icon: {
    lib: "fa",
    icon: "tree",
  },
  description: {
    en: "tree list",
    zh:
      "常用于展示应用业务树、模型树等，可以完整展现其中层级关系，并具有展开收起选择等交互功能",
  },
  conf: {
    brick: "presentational-bricks.brick-tree",
    properties: {
      dataSource: [
        {
          title: "0",
          key: "0",
          icon: { lib: "fa", icon: "briefcase" },
          children: [
            {
              title: "0-0",
              key: "00",
              icon: { lib: "fa", icon: "cube" },
            },
            {
              title: "0-1",
              key: "01",
              icon: { lib: "fa", icon: "briefcase" },
              children: [
                {
                  title: "0-1-0",
                  key: "010",
                  icon: { lib: "fa", icon: "briefcase" },
                  children: [
                    {
                      title: "0-1-0-1",
                      key: "0101",
                      icon: { lib: "fa", icon: "cube" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "1",
          key: "1",
          icon: { lib: "fa", icon: "briefcase" },
          children: [
            {
              title: "1-0",
              key: "10",
              icon: { lib: "fa", icon: "cube" },
            },
          ],
        },
      ],
      configProps: {
        checkable: true,
        showIcon: true,
      },
      searchable: true,
      placeholder: "text here to search",
      checkedKeys: ["00"],
      expandedKeys: ["0"],
    },
    events: {
      "tree.select": {
        action: "console.info",
      },
      "tree.check": {
        action: "console.info",
      },
    },
    description: {
      title: "基础用法",
      message:
        "checkedKeys和configProps.checkable实现多选，expandedKeys可以设置默认展开项，configProps.showIcon设置是否显示图标（图标需要在dataSource中维护）",
    },
  },
};
