import { Story } from "@next-core/brick-types";
import { calendarNormalSvg, calendarSvg, calendarWithTagSvg } from "../images";

export const CalendarStory: Story = {
  storyId: "presentational-bricks.calendar",
  category: "display-component",
  type: "brick",
  author: "Alex",
  text: {
    en: "Calendar",
    zh: "日历",
  },
  description: {
    en: "The calendar container,The brick supports various event responses such as date changes, panel changes, and date selection, and offers a rich set of property configurations, including default date, initial mode, full-screen display, and custom rendering of date cells",
    zh: "按照日历形式展示数据的容器，该构件支持多种事件响应，如日期变化、日期面板变化及点击选择日期等，并提供了丰富的属性配置，如默认日期、初始模式、是否全屏展示以及自定义渲染日期单元格等",
  },
  icon: {
    imgSrc: calendarSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.calendar[normal]",
      title: {
        zh: "基础日历",
        en: "",
      },
      thumbnail: calendarNormalSvg,
      bricks: [
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
      ],
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
    {
      snippetId: "presentational-bricks.calendar[with-tag]",
      title: {
        zh: "基础日历(带tag标记)",
        en: "",
      },
      thumbnail: calendarWithTagSvg,
      bricks: [
        {
          brick: "presentational-bricks.calendar",
          events: {
            "presentational.calendar.onChange-v2": {
              action: "console.log",
              args: ["${EVENT.detail}"],
            },
            "presentational.calendar.onSelect-v2": {
              action: "console.log",
              args: ["${EVENT.detail}"],
            },
          },
          properties: {
            value: "<% moment('2021-07-25') %>",
            monthCell: {
              useBrick: {
                brick: "presentational-bricks.brick-tag",
                properties: {
                  showCard: false,
                },
                transform: {
                  color: "orange",
                  showTagCircle: true,
                  tagList: "<% DATA.data?.map(v=>v.data) %>",
                },
              },
            },
            dateCell: {
              useBrick: {
                brick: "presentational-bricks.brick-tag",
                properties: {
                  showCard: false,
                },
                transform: {
                  color: "orange",
                  showTagCircle: true,
                  tagList: "<% DATA.data?.map(v=>v.data) %>",
                },
              },
            },
            data: [
              {
                date: "2021-07-02",
                data: "1",
              },
              {
                date: "2021-07-02",
                data: "2",
              },
              {
                date: "2021-07-09",
                data: "3",
              },
              {
                date: "2021-07-16",
                data: "4",
              },
            ],
          },
        },
      ],
    },
    {
      brick: "presentational-bricks.calendar",
      events: {
        "presentational.calendar.onChange-v2": {
          action: "console.log",
          args: ["${EVENT.detail}"],
        },
        "presentational.calendar.onSelect-v2": {
          action: "console.log",
          args: ["${EVENT.detail}"],
        },
      },
      properties: {
        value: "<% moment('2021-07-25') %>",
        monthCell: {
          useBrick: {
            brick: "presentational-bricks.brick-tag",
            properties: {
              showCard: false,
            },
            transform: {
              color: "orange",
              showTagCircle: true,
              tagList: "<% DATA.data?.map(v=>v.data) %>",
            },
          },
        },
        dateCell: {
          useBrick: {
            brick: "presentational-bricks.brick-tag",
            properties: {
              showCard: false,
            },
            transform: {
              color: "orange",
              showTagCircle: true,
              tagList: "<% DATA.data?.map(v=>v.data) %>",
            },
          },
        },
        data: [
          {
            date: "2021-07-02",
            data: "1",
          },
          {
            date: "2021-07-02",
            data: "2",
          },
          {
            date: "2021-07-09",
            data: "3",
          },
          {
            date: "2021-07-16",
            data: "4",
          },
        ],
      },
    },
  ],
};
