import { Story } from "@next-core/brick-types";
import { agendaCalendarSvg } from "../images";
export const AgendaCalendarStory: Story = {
  storyId: "calendar-bricks.agenda-calendar",
  category: "display-component",
  type: "brick",
  author: "zhendonghuang",
  text: {
    en: "calendar-bricks.agenda-calendar",
    zh: "日程日历",
  },
  icon: { imgSrc: agendaCalendarSvg },
  description: {
    en: "calendar-bricks.agenda-calendar",
    zh: "日程日历",
  },
  conf: [
    {
      brick: "calendar-bricks.agenda-calendar",
      description: {
        title: "基础用法",
      },
      events: {
        "calendar.onAgendaSelect": [
          {
            action: "console.log",
          },
        ],
        "calendar.onDateSelect": [
          {
            properties: {
              hidden: true,
            },
            target: "#agendaCollapsedButton",
          },
          {
            action: "console.log",
          },
          {
            args: ["\u003c% PIPES.datetime(EVENT.detail.date) %\u003e"],
            method: "gotoDate",
            target: "_self",
          },
          {
            args: ["customDay"],
            method: "setViewType",
            target: "_self",
          },
          {
            properties: {
              value: "customDay",
            },
            target: "#viewTypeRadio",
          },
        ],
        "calendar.onQuickSwitchDate": [
          {
            action: "console.log",
          },
        ],
      },
      properties: {
        id: "calendar",
        showEventCount: true,
        agendaData: [
          {
            id: "event1",
            calendarId: "cal2",
            title: "奇怪的任务",
            start: "2022-10-17",
            end: "2022-10-17",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly mee6578979579690ting",
            start: "2022-10-18",
            end: "2022-10-19T12:00:00",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting test",
            start: "2022-10-09T19:00:00",
            end: "2022-10-09T19:29:00",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting test1",
            start: "2022-10-09T12:00:00",
            end: "2022-10-09T13:29:00",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting test2",
            start: "2022-10-09T08:00:00",
            end: "2022-10-09T13:29:00",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting test3",
            start: "2022-10-09T11:20:00",
            end: "2022-10-09T13:29:00",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting test4",
            start: "2022-10-09T11:00:00",
            end: "2022-10-09T13:29:00",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting1",
            start: "2022-10-09T14:00:00",
            end: "2022-10-09T19:29:00",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting3",
            start: "2022-10-09T19:00:00",
            end: "2022-10-09T19:29:00",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting morning",
            start: "2022-10-09T00:00:00",
            end: "2022-10-09T01:29:00",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "meeting night",
            start: "2022-10-09T22:00:00",
            end: "2022-10-09T23:59:00",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event2",
            calendarId: "cal2",
            title: "Weekly meeting 讨论是否第一个",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T10:08:00",
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting start 4:00",
            start: "2022-09-28T04:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting start 00:00",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting start 8:00",
            start: "2022-09-28T08:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting start 7:00",
            start: "2022-09-28T07:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event2",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T10:08:00",
          },
          {
            id: "event3",
            calendarId: "cal2",
            title: "Weekly meeting9999999",
            start: "2022-09-28T09:00:00",
            end: "2022-09-28T10:00:00",
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event2",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T10:08:00",
          },
          {
            id: "event3",
            calendarId: "cal2",
            title: "Weekly meeting9999999",
            start: "2022-09-28T09:00:00",
            end: "2022-09-28T10:00:00",
          },
          {
            id: "event1",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T23:59:00",
            allDay: "true",
            task: {
              a: "1",
              b: "2",
            },
          },
          {
            id: "event2",
            calendarId: "cal2",
            title: "Weekly meeting",
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T10:08:00",
          },
          {
            id: "event3",
            calendarId: "cal2",
            title: "Weekly meeting 28/09/11-28/10:00",
            start: "2022-09-28T09:11:00",
            end: "2022-09-28T10:00:00",
          },
          {
            id: "event35647678254789785376359789",
            calendarId: "cal2",
            title:
              "Weekly meeting 讨论超长名字 5689467542603578ting56894675426035789ting56894675426035789ting56894675426035789ting56894675426035789980568307",
            start: "2022-09-18T01:00:00",
            end: "2022-09-30T10:09:19",
            task: {
              a: "1",
              b: "2",
            },
          },
        ],
        customHolidays: [
          {
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T20:10:09",
            name: "测试节日281",
          },
          {
            start: "2022-09-30",
            end: "2022-09-30",
            name: " 测试节日301",
          },
          {
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T20:10:09",
            name: "测试节日282",
          },
          {
            start: "2022-09-30",
            end: "2022-09-30",
            name: " 测试节日302",
          },
          {
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T20:10:09",
            name: "测试节日283",
          },
          {
            start: "2022-09-30",
            end: "2022-09-30",
            name: " 测试节日303",
          },
          {
            start: "2022-09-30",
            end: "2022-09-30",
            name: " 测试节日304",
          },
          {
            start: "2022-09-28T00:00:00",
            end: "2022-09-28T20:10:09",
            name: "测试节日205",
          },
          {
            start: "2022-09-30",
            end: "2022-09-30",
            name: " 测试节日305",
          },
          {
            name: "奇怪的节日",
            start: "2022-10-17",
            end: "2022-10-17",
          },
        ],

        firstDay: 1,
        agendaRandomColor: true,
        displayDate: "2022-09-28T20:10:09",
        afterQuickSwitchBrick: {
          useBrick: [
            {
              brick: "forms.general-radio",
              events: {
                "general.radio.change": [
                  {
                    method: "setViewType",
                    target: "#calendar",
                    args: ["\u003c% EVENT.detail %\u003e"],
                  },
                ],
              },
              properties: {
                id: "viewTypeRadio",
                value: "dayGridMonth",
                options: [
                  {
                    label: "月",
                    value: "dayGridMonth",
                  },
                  {
                    label: "周",
                    value: "dayGridWeek",
                  },
                  {
                    label: "日",
                    value: "customDay",
                  },
                ],
                style: {
                  "margin-left": "10px",
                  "margin-right": "10px",
                },
                type: "button",
              },
            },
          ],
        },
      },
    },
  ],
};
