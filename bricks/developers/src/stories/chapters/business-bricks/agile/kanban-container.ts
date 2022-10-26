import { Story } from "../../../interfaces";
import docMD from "../../../docs/agile/kanban-container.md";

export const story: Story = {
  storyId: "agile.kanban-container",
  category: "card-info",
  type: "brick",
  author: "lynette",
  text: {
    en: "kanban container",
    zh: "看板容器",
  },
  description: {
    en: "kanban container",
    zh: "看板容器，支持自定义卡片构件",
  },
  icon: {
    lib: "fa",
    icon: "grip-lines-vertical",
    prefix: "fas",
  },
  conf: [
    {
      bricks: [
        {
          brick: "basic-bricks.general-card",
          slots: {
            content: {
              type: "bricks",
              bricks: [
                {
                  brick: "basic-bricks.general-modal",
                  properties: {
                    modalTitle: "issue 详情",
                  },
                  slots: {
                    content: {
                      type: "bricks",
                      bricks: [
                        {
                          brick: "presentational-bricks.brick-descriptions",
                          properties: {
                            showCard: false,
                            itemList: [
                              {
                                label: "优先级",
                                field: "priority",
                              },
                              {
                                label: "类型",
                                field: "type",
                              },
                              {
                                label: "估时",
                                field: "storyPoint",
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  brick: "agile.kanban-container",
                  properties: {
                    style: {
                      height: "400px",
                    },
                    columns: [
                      {
                        key: "notMatch",
                        title: "未分配",
                        regex: ".*",
                      },
                      {
                        key: "to-be-developed",
                        title: "待研发",
                      },
                      {
                        key: "developing",
                        title: "研发中",
                      },
                      {
                        key: "developed",
                        title: "研发完成",
                      },
                      {
                        key: "to-be-tested",
                        title: "待测试",
                      },
                      {
                        key: "testing",
                        title: "测试中",
                      },
                      {
                        key: "tested",
                        title: "测试完成",
                      },
                      {
                        key: "to-be-released",
                        title: "待发布",
                      },
                      {
                        key: "released",
                        title: "已发布",
                      },
                    ],
                    data: [
                      {
                        name: "AGILE_V2-1",
                        id: "59e206c7d400b",
                        creator: "leon",
                        ctime: "2020-02-09 16:29:39",
                        title:
                          "【构件】作为编排者，希望提供issue负责人快速编辑构件，便于分配人力资源",
                        description: "",
                        step: "to-be-developed",
                        type: "story",
                        assignee: [
                          {
                            name: "lynetteli",
                            id: "5a056f960d018",
                            user_icon:
                              "http://p.qlogo.cn/bizmail/6TQTiciakRybURBxjCFL7CvQiczLloC1ibw6fKCfpxiacboUDmjU5cGgXIQ/0",
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
                        priority: "high",
                        storyPoint: "1",
                        subtasks: [
                          {
                            name: "MICRO_APP-32",
                            priority: "medium",
                            title: "Issue 编排",
                            type: "story",
                          },
                          {
                            name: "MICRO_APP-32",
                            priority: "medium",
                            title: "Issue 编排",
                            type: "story",
                            resolution: "",
                          },
                          {
                            name: "MICRO_APP-32",
                            priority: "medium",
                            title: "Issue 编排",
                            type: "story",
                            resolution: "123",
                          },
                        ],
                        groupId: 0,
                      },
                      {
                        name: "AGILE_V2-2",
                        id: "59e206c7d4012",
                        creator: "leon",
                        ctime: "2020-02-09 16:29:39",
                        title: "不符合设计规范",
                        description: "",
                        step: "to-be-developed",
                        type: "bug",
                        assignee: [
                          {
                            name: "lynetteli",
                            id: "5a056f960d018",
                            user_icon:
                              "http://p.qlogo.cn/bizmail/6TQTiciakRybURBxjCFL7CvQiczLloC1ibw6fKCfpxiacboUDmjU5cGgXIQ/0",
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
                        priority: "high",
                        groupId: 0,
                      },
                      {
                        name: "AGILE_V2-3",
                        id: "59e207de95d36",
                        creator: "leon",
                        ctime: "2020-02-09 16:34:32",
                        title:
                          "【构件】作为编排者，希望提供标准的issue表格列表模板，以便在不同场景视图下复用",
                        description:
                          "只需要封装table部分，不需要考虑过滤表单\n[参考](http://192.168.100.162/next/agile-solution/solution/59bd846d74698)\n\n",
                        step: "developed",
                        type: "sub-task",
                        assignee: [
                          {
                            name: "alrenhuang",
                            id: "56ffdd9ba8648",
                            user_icon:
                              "http://p.qlogo.cn/bizmail/O1tyN98UWdKvhH2dtsicBEXOOD05XSFBKWe6XjicImtWrLzRFFZBKEqw/0",
                          },
                        ],
                        tester: [
                          {
                            name: "leon",
                            id: "56ffdd9b599e9",
                            user_icon:
                              "http://p.qlogo.cn/bizmail/d47GDej7HBmeibwD2tQVh8szhfBP6TrZIZcamNxY6xRsm4yHf2C63mA/0",
                          },
                        ],
                        priority: "high",
                        parent: [
                          {
                            name: "MICRO_APP-32",
                            priority: "medium",
                            title: "Issue 编排",
                            type: "story",
                          },
                        ],
                        groupId: 1,
                      },
                      {
                        name: "AGILE_V2-9",
                        id: "59e21fc0610b8",
                        creator: "leon",
                        ctime: "2020-02-09 18:21:22",
                        title:
                          "【编排】作为用户，希望能自由创建issue，以便将各事务统一管理",
                        step: "developed",
                        type: "story",
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
                        priority: "medium",
                        groupId: 2,
                      },
                      {
                        name: "AGILE_V2-13",
                        id: "59e260f76fc6a",
                        creator: "leon",
                        ctime: "2020-02-09 23:13:08",
                        title: "【产品】issue类型与workflow设计",
                        step: "to-be-developed",
                        type: "story",
                        assignee: [
                          {
                            name: "smiletan",
                            id: "586cce0f141ce",
                            user_icon:
                              "https://p.qlogo.cn/bizmail/ib215MErS2GA0Qf1Vz9ZFHEAB2A4eE2SLIXurVfHeJ9eZfUeuQp5icPg/0",
                          },
                        ],
                        tester: [
                          {
                            name: "leon",
                            id: "56ffdd9b599e9",
                            user_icon:
                              "http://p.qlogo.cn/bizmail/d47GDej7HBmeibwD2tQVh8szhfBP6TrZIZcamNxY6xRsm4yHf2C63mA/0",
                          },
                        ],
                        priority: "low",
                        groupId: 2,
                      },
                    ],
                    useBrick: {
                      brick: "agile.issue-card",
                      properties: {
                        issuePriorityConfig: [
                          {
                            backgroundColor: "#fc5043",
                            name: "high",
                            title: "高",
                          },
                          {
                            backgroundColor: "#eda844",
                            name: "medium",
                            title: "中",
                          },
                          {
                            backgroundColor: "#69cc6a",
                            name: "low",
                            title: "低",
                          },
                        ],
                      },
                      transform: {
                        issueInfo: "@{itemData}",
                      },
                      events: {
                        "parent.click": {
                          action: "console.log",
                        },
                        "subtask.click": {
                          action: "console.log",
                        },
                        "card.click": [
                          {
                            action: "console.log",
                          },
                          {
                            target:
                              "presentational-bricks\\.brick-descriptions",
                            properties: {
                              dataSource: "${event.detail}",
                            },
                          },
                          {
                            target: "basic-bricks\\.general-modal",
                            method: "open",
                          },
                        ],
                      },
                    },
                  },
                  events: {
                    "drag.end": [
                      {
                        action: "console.log",
                      },
                    ],
                    "drag.end.regex": [
                      {
                        action: "console.log",
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      ],
      snippetId: "agile.kanban-container[basic]",
      title: {
        en: "Basic Kanban Container",
        zh: "基础看板容器",
      },
    },
  ],
  doc: docMD,
};
