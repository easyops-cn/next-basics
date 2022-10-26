import { Story } from "@next-core/brick-types";
import { listContainerSvg } from "../images";
export const listContainerStory: Story = {
  storyId: "basic-bricks.list-container",
  category: "container-layout",
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
    imgSrc: listContainerSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.list-container",
          properties: {
            data: ["正常", "异常", "未安装"],
            useBrick: {
              brick: "presentational-bricks.agent-status",
              properties: {
                value: "<% DATA %>",
              },
            },
          },
        },
      ],
      snippetId: "basic-bricks.list-container[basic]",
      title: {
        en: "Basic List Container",
        zh: "基础动态构件列表容器",
      },
    },
    {
      bricks: [
        {
          brick: "basic-bricks.list-container",
          properties: {
            gap: "20px",
            extraContainerStyle: {
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            },
            data: ["正常", "异常", "未安装"],
            useBrick: {
              brick: "presentational-bricks.agent-status",
              properties: {
                value: "<% DATA %>",
              },
            },
          },
        },
      ],
      snippetId: "basic-bricks.list-container[extra-style]",
      title: {
        en: "List Container with Extra Container Style",
        zh: "带额外样式的动态构件列表容器",
      },
      message: {
        en: "The container itself is a grid layout by default, and you can set additional styles",
        zh: "容器本身默认是 grid 布局，可以设置额外的样式",
      },
    },
  ],
};
