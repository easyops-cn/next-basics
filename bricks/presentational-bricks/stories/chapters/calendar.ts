import { Story } from "@next-core/brick-types";

export const CalendarStory: Story = {
  storyId: "presentational-bricks.calendar",
  category: "form-input",
  type: "brick",
  author: "Alex",
  text: {
    en: "Calendar",
    zh: "日历",
  },
  description: {
    en: "The calendar container",
    zh: "按照日历形式展示数据的容器",
  },
  icon: {
    lib: "antd",
    icon: "calendar",
  },
  conf: [
    {
      brick: "presentational-bricks.calendar",
      properties: {
        fullscreen: true,
        value: "<% moment('2017-01-25') %>",
        mode: "month",
      },
      events: {
        "presentational.calendar.onChange": {
          action: "console.log",
        },
        "presentational.calendar.onSelect": {
          action: "console.log",
        },
        "presentational.calendar.onPanelChange": {
          action: "console.log",
        },
      },
    },
    {
      brick: "presentational-bricks.calendar",
      properties: {
        fullscreen: true,
        mode: "month",
        dateCell: {
          useBrick: {
            brick: "div",
            transform: {
              style: {
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                height: "100%",
                color: "rgb(85, 151, 220)",
              },
              textContent: "<%  DATA.date.format('ll') %>",
            },
          },
        },
        monthCell: {
          useBrick: {
            brick: "presentational-bricks.brick-tag",
            transform: {
              style: {
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                height: "100%",
              },
              color: "orange",
              showCard: false,
              showTagCircle: true,
              tagList: "<% [DATA.date.format('LLL')] %>",
            },
          },
        },
      },
      events: {
        "presentational.calendar.onChange": {
          action: "console.log",
        },
        "presentational.calendar.onSelect": {
          action: "console.log",
        },
        "presentational.calendar.onPanelChange": {
          action: "console.log",
        },
      },
    },
  ],
};
