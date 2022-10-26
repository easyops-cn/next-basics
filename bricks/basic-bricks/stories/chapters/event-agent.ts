import { Story } from "@next-core/brick-types";

export const eventAgentStory: Story = {
  storyId: "basic-bricks.event-agent",
  category: "other",
  type: "brick",
  author: "steve",
  text: {
    en: "Event Agent",
    zh: "事件代理",
  },
  description: {
    en: "Use the event agent to handle callbacks by events.",
    zh: "使用事件代理来处理回调。",
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.event-agent",
          properties: {
            id: "my-event-agent",
          },
          events: {
            "event.trigger": [
              {
                if: '<% EVENT.detail.type === "success" %>',
                action: "message.success",
                args: ["<% EVENT.detail.message %>"],
              },
              {
                if: '<% EVENT.detail.type === "error" %>',
                action: "message.error",
                args: ["<% EVENT.detail.message %>"],
              },
            ],
          },
        },
      ],
      snippetId: "basic-bricks.event-agent[basic]",
      title: {
        en: "Basic Event Agent",
        zh: "基础时间代理",
      },
      actions: [
        {
          text: "dispatch()",
          method: "trigger",
          args: [
            {
              type: "success",
              message: "Good",
            },
          ],
        },
      ],
    },
    {
      brick: "basic-bricks.general-button",
      properties: {
        buttonName: "Good",
      },
      events: {
        "general.button.click": {
          target: "#my-event-agent",
          method: "trigger",
          args: [
            {
              type: "success",
              message: "Good",
            },
          ],
        },
      },
    },
    {
      brick: "basic-bricks.general-button",
      properties: {
        buttonName: "Bad",
      },
      events: {
        "general.button.click": {
          target: "#my-event-agent",
          method: "trigger",
          args: [
            {
              type: "error",
              message: "Bad",
            },
          ],
        },
      },
    },
  ],
};
