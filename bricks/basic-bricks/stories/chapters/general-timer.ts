import { Story } from "@next-core/brick-types";
import { generalTimerSvg } from "../images";
export const generalTimerStory: Story = {
  storyId: "basic-bricks.general-timer",
  category: "interact-basic",
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
    imgSrc: generalTimerSvg,
  },
  conf: [
    {
      bricks: [
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
      snippetId: "basic-bricks.general-timer[basic]",
      title: {
        en: "Basic General Timer",
        zh: "基础定时器",
      },
      message: {
        en: "Write a scheduled task in the general timer. timing event",
        zh: "在general-timer.timing-event写定时任务",
      },
    },
    {
      bricks: [
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
      ],
      snippetId: "basic-bricks.general-timer[custom-event]",
      title: {
        en: "General Timer with Custom Event",
        zh: "带自定义事件的定时器",
      },
      message: {
        en: "Define the event through the property eventName",
        zh: "通过属性eventName定义事件",
      },
    },
  ],
};
