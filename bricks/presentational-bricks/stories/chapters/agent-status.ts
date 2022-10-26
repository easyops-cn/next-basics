import { Story } from "@next-core/brick-types";

export const AgentStatusStory: Story = {
  storyId: "presentational-bricks.agent-status",
  category: "value-mapping",
  type: "brick",
  author: "ice",
  text: {
    en: "Agent Status",
    zh: "agent 状态",
  },
  description: {
    en: "use tags to display agent status",
    zh: "以标签的方式来展示 agent 状态",
  },
  icon: {
    lib: "fa",
    icon: "bell",
  },
  conf: [
    {
      snippetId: "presentational-bricks.agent-status[normal]",
      title: {
        zh: "正常",
        en: "normall",
      },
      bricks: [
        {
          brick: "presentational-bricks.agent-status",
          properties: {
            value: "正常",
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.agent-status[error]",
      title: {
        zh: "异常",
        en: "error",
      },
      bricks: [
        {
          brick: "presentational-bricks.agent-status",
          properties: {
            value: "异常",
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.agent-status[not-instanlled]",
      title: {
        zh: "未安装",
        en: "not-installed",
      },
      bricks: [
        {
          brick: "presentational-bricks.agent-status",
          properties: {
            value: "未安装",
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.agent-status[uninstalled]",
      title: {
        zh: "已卸载",
        en: "uninstalled",
      },
      bricks: [
        {
          brick: "presentational-bricks.agent-status",
          properties: {
            value: "已卸载",
          },
        },
      ],
    },
  ],
  previewColumns: 2,
};
