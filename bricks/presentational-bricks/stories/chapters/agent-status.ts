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
      brick: "presentational-bricks.agent-status",
      properties: {
        value: "正常",
      },
    },
    {
      brick: "presentational-bricks.agent-status",
      properties: {
        value: "异常",
      },
    },
    {
      brick: "presentational-bricks.agent-status",
      properties: {
        value: "未安装",
      },
    },
    {
      brick: "presentational-bricks.agent-status",
      properties: {
        value: "已卸载",
      },
    },
  ],
  previewColumns: 2,
};
