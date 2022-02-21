import { Story } from "../../../interfaces";
import docMD from "../../../docs/agile/issue-card.md";

export const story: Story = {
  storyId: "agile.issue-card",
  type: "brick",
  author: "lynette",
  text: {
    en: "issue card",
    zh: "issue 卡片",
  },
  description: {
    en: "issue card",
    zh: "issue 卡片",
  },
  icon: {
    lib: "fa",
    icon: "grip-lines-vertical",
    prefix: "fas",
  },
  conf: [
    {
      brick: "agile.issue-card",
      properties: {
        issueInfo: {
          name: "AGILE_V2-9",
          id: "59e21fc0610b8",
          creator: "leon",
          ctime: "2020-02-09 18:21:22",
          title: "【编排】作为用户，希望能自由创建issue，以便将各事务统一管理",
          assignee: [
            {
              name: "leon",
              id: "56ffdd9b599e9",
              user_icon:
                "http://p.qlogo.cn/bizmail/d47GDej7HBmeibwD2tQVh8szhfBP6TrZIZcamNxY6xRsm4yHf2C63mA/0",
            },
          ],
          tester: [
            {
              name: "alrenhuang",
              id: "56ffdd9ba8648",
              user_icon:
                "http://p.qlogo.cn/bizmail/O1tyN98UWdKvhH2dtsicBEXOOD05XSFBKWe6XjicImtWrLzRFFZBKEqw/0",
            },
          ],
          step: "developed",
          type: "story",
          reporter: [
            {
              name: "leon",
              id: "56ffdd9b599e9",
              user_icon:
                "http://p.qlogo.cn/bizmail/d47GDej7HBmeibwD2tQVh8szhfBP6TrZIZcamNxY6xRsm4yHf2C63mA/0",
            },
          ],
          priority: "medium",
          storyPoint: 1.5,
        },
      },
      events: {
        "card.click": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "topRightBrick",
        message: "自定义右上角的内容",
      },
      brick: "agile.issue-card",
      properties: {
        topRightBrick: {
          useBrick: {
            brick: "basic-bricks.general-custom-buttons",
            events: {
              "instance.delete": {
                action: "console.log",
              },
              "instance.set.default": {
                action: "console.log",
              },
            },
            properties: {
              customButtons: [
                {
                  eventName: "instance.set.default",
                  icon: "setting",
                  isDropdown: true,
                  text: "设为默认",
                },
                {
                  color: "#E02020",
                  eventName: "instance.delete",
                  icon: "delete",
                  isDropdown: true,
                  text: "删除",
                },
              ],
              isMoreButton: true,
              moreButtonShape: "no",
            },
          },
        },
        issueInfo: {
          isShowSubtasksStatistics: true,
          name: "AGILE_V2-9",
          id: "59e21fc0610b8",
          creator: "leon",
          ctime: "2020-02-09 18:21:22",
          title: "【编排】作为用户，希望能自由创建issue，以便将各事务统一管理",
          assignee: [
            {
              name: "leon",
              id: "56ffdd9b599e9",
              user_icon:
                "http://p.qlogo.cn/bizmail/d47GDej7HBmeibwD2tQVh8szhfBP6TrZIZcamNxY6xRsm4yHf2C63mA/0",
            },
          ],
          tester: [
            {
              name: "alrenhuang",
              id: "56ffdd9ba8648",
              user_icon:
                "http://p.qlogo.cn/bizmail/O1tyN98UWdKvhH2dtsicBEXOOD05XSFBKWe6XjicImtWrLzRFFZBKEqw/0",
            },
          ],
          step: "developed",
          type: "story",
          reporter: [
            {
              name: "leon",
              id: "56ffdd9b599e9",
              user_icon:
                "http://p.qlogo.cn/bizmail/d47GDej7HBmeibwD2tQVh8szhfBP6TrZIZcamNxY6xRsm4yHf2C63mA/0",
            },
          ],
          priority: "medium",
          storyPoint: 1.5,
        },
        events: {
          "card.click": {
            action: "console.log",
          },
        },
      },
    },
  ],
  doc: docMD,
};
