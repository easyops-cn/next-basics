import { Story } from "@next-core/brick-types";
import { taskCalendarSvg } from "../images";
export const TaskCalendarStory: Story = {
  storyId: "time.task-calendar",
  category: "display-component",
  type: "brick",
  author: "nlicroshan",
  text: {
    en: "task Calendar",
    zh: "任务日历",
  },
  description: {
    en: "Display info in calendar",
    zh: "在日历中展示相关数据",
  },
  icon: {
    imgSrc: taskCalendarSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "time.task-calendar",
          events: {
            "calendar.onSelect": [
              {
                action: "console.log",
                args: ["${EVENT.detail}"],
              },
            ],
            "calendar.onPanelChange": [
              {
                action: "console.log",
                args: ["${EVENT.detail}"],
              },
            ],
          },
          properties: {
            style: {
              width: "500px",
            },
            value: "2021-06-20",
            briefList: [
              {
                date: "2021-06-13",
                text: "休",
              },
              {
                date: "2021-06-12",
                text: "休",
              },
              {
                date: "2021-06-14",
                text: "休",
              },
            ],
            taskSettings: {
              taskTitle: "运维任务",
              fields: {
                priority: "OPT_PRIORITY_ID",
                summary: "OPT_SUMMARY",
                time: "OPT_NOTIFICATION_TM",
              },
              colorMap: {
                "0": "var(--theme-red-color)",
                "1": "var(--theme-orange-color)",
                "2": "var(--theme-purple-color)",
                "3": "var(--theme-green-color)",
              },
            },
            importanceSettings: {
              priority: ["发版", "两会", "人行窗口"],
              colorMap: {
                发版: "var(--theme-green-color)",
                两会: "var(--theme-cyan-color)",
                人行窗口: "var(--theme-geekblue-color)",
              },
            },
            taskList: [
              {
                date: "2021-06-20",
                task: [
                  {
                    OPT_CHANGE_NUMBER: "001",
                    OPT_SUMMARY: "XBUS系统月度巡检",
                    OPT_NOTIFICATION_TM: "2021-05-01 09:00:00",
                    OPT_PRIORITY_ID: "3",
                    url: "/test?id=001",
                  },
                  {
                    OPT_CHANGE_NUMBER: "002",
                    OPT_SUMMARY: "ESB系统月度巡检",
                    OPT_NOTIFICATION_TM: "2021-05-01 10:00:00",
                    OPT_PRIORITY_ID: "3",
                    url: "/test?id=002",
                  },
                  {
                    OPT_CHANGE_NUMBER: "003",
                    OPT_SUMMARY: "新同城数据中心EBUS部署",
                    OPT_NOTIFICATION_TM: "2021-05-01 10:00:00",
                    OPT_PRIORITY_ID: "2",
                  },
                ],
              },
              {
                date: "2021-06-02",
                task: [
                  {
                    OPT_CHANGE_NUMBER: "004",
                    OPT_SUMMARY: "EBUS系统老中心WAS漏洞修复工作",
                    OPT_NOTIFICATION_TM: "2021-05-01 10:00:00",
                    OPT_PRIORITY_ID: "1",
                  },
                ],
              },
              {
                date: "2021-06-03",
                task: [],
              },
            ],
            importantList: [
              {
                date: "2021-06-01",
                issues: ["发版"],
              },
              {
                date: "2021-06-02",
                issues: [],
              },
              {
                date: "2021-06-03",
                issues: ["人行窗口", "两会"],
              },
            ],
          },
        },
      ],
      snippetId: "time.task-calendar[basic]",
      title: {
        en: "Basic Task Calendar",
        zh: "基本任务日历",
      },
      message: {
        en: "Basic use",
        zh: "基本使用",
      },
    },
  ],
};
