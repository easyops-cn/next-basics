import { Story } from "@next-core/brick-types";

export const generalTimerStory: Story = {
  storyId: "basic-bricks.general-timer",
  category: "other",
  type: "brick",
  author: "cyril",
  text: {
    en: "timer",
    zh: "定时器",
  },
  description: {
    en: "Set up a timer to dispatch a specific event",
    zh: "启动一个定时发出指定事件的定时器",
  },
  icon: {
    lib: "antd",
    icon: "clock-circle",
  },
  conf: [
    {
      brick: "basic-bricks.general-timer",
      properties: {
        eventName: "specific-event",
        interval: 10000,
        dataSource: "some data",
      },
      events: {
        "specific-event": {
          action: "console.log",
        },
      },
    },
    {
      brick: "basic-bricks.general-timer",
      properties: {
        interval: 10000,
      },
      events: {
        "general-timer.timing-event": {
          action: "console.log",
        },
      },
    },
  ],
};
