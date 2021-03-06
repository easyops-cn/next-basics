import { Story } from "@next-core/brick-types";

export const listContainerStory: Story = {
  storyId: "basic-bricks.list-container",
  category: "layout",
  type: "brick",
  author: "steve",
  text: {
    en: "Dynamic List Container",
    zh: "动态构件列表容器",
  },
  description: {
    en: "A list container support specified `useBrick`",
    zh: "可以指定子项使用特定构件的列表容器，相当于是动态的构件列表",
  },
  icon: {
    lib: "fa",
    icon: "th",
  },
  conf: [
    {
      brick: "basic-bricks.list-container",
      properties: {
        useBrick: {
          brick: "presentational-bricks.agent-status",
          transform: {
            value: "@{}",
          },
        },
        data: ["正常", "异常", "未安装"],
      },
    },
    {
      brick: "basic-bricks.list-container",
      properties: {
        containerStyle: {
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        },
        useBrick: {
          brick: "presentational-bricks.agent-status",
          transform: {
            value: "@{}",
          },
        },
        data: ["正常", "异常", "未安装"],
      },
    },
  ],
};
