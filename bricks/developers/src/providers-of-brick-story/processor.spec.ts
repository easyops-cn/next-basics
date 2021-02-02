import {
  findStoryById,
  listBrickStory,
  categoryList,
  categoryMenu,
  categoryMenuV2,
  listBrickStoryV2,
  getBrickDocs,
} from "./processor";
import i18next from "i18next";

jest.mock("../stories/chapters/atom-bricks");
jest.mock("../stories/chapters/business-bricks");

describe("providers-of-brick-story", () => {
  it("findStoryById should be ok", () => {
    const story = findStoryById("fake-story-of-correct", "brick", [
      { storyId: "test-id", type: "test-type" },
    ]);
    expect(story.storyId).toBe("fake-story-of-correct");
    expect(story.conf.brick).toBe("fake-brick-of-correct");
    expect(
      findStoryById("fake-story-of-business", "template", []).storyId
    ).toBe("fake-story-of-business");
  });

  describe("listBrickStory", () => {
    it("atom", () => {
      return listBrickStory("atom").then((data) => expect(data.total).toBe(4));
    });

    it("business", () => {
      return listBrickStory("business").then((data) =>
        expect(data.total).toBe(1)
      );
    });

    it("xxxxx", () => {
      return listBrickStory("xxxxx").then((data) => expect(data.total).toBe(5));
    });
  });

  it("listBrickStory search by description", async () => {
    const data = await listBrickStory("atom", "fake description of correct");

    expect(data.total).toBe(1);

    const data2 = await listBrickStory("atom", "Fake description of Correct1");

    expect(data2.total).toBe(0);
  });

  it("listBrickStory search by title", () => {
    return listBrickStory("atom", "Fake Story of Correct Zh").then((data) =>
      expect(data.total).toBe(1)
    );
  });

  it("listBrickStory support multiple conf", () => {
    return listBrickStory("atom", "fake-template-of-empty").then((data) =>
      expect(data.total).toBe(0)
    );
  });

  it("listBrickStory search by category", async () => {
    i18next.language = "zh";
    const data = await listBrickStory("atom", undefined, "Fake Chapter zh 1");
    expect(data.total).toBe(4);

    const data2 = await listBrickStory("atom", undefined, [
      "Fake Chapter zh 1",
      "xxx",
    ]);
    expect(data2.total).toBe(4);
  });

  it("i18next should be ok", async () => {
    i18next.language = "en";
    const data = await listBrickStory("atom");
    expect(data.list[0].description).toBe("Fake description of Correct En");

    const data2 = await listBrickStory("atom");
    expect(data2.list[0].tags).toEqual(["Fake Chapter en 1", "en"]);

    const data3 = await categoryMenu();
    expect(data3.menuItems[0].text).toBe("developers:ALL");
    i18next.language = "zh";

    const data4 = await listBrickStory("atom");
    expect(data4.list[0].description).toBe("Fake description of Correct Zh");

    const data5 = await listBrickStory("atom");
    expect(data5.list[0].tags).toEqual(["Fake Chapter zh 1", "zh"]);
  });

  it("categoryList", async () => {
    const data = await categoryList("atom");
    expect(data.length).toBe(1);
    const data2 = await categoryList("business");
    expect(data2.length).toBe(1);
  });

  it("categoryMenu", async () => {
    // i18next.language = "zh";
    const data = await categoryMenu();
    expect(data.menuItems[0].text).toBe("developers:ALL");

    const data2 = await categoryMenu();
    expect(data2.menuItems[1].title).toBe("developers:ATOM");

    const data3 = await categoryMenu();
    expect(data3.menuItems[2].title).toBe("developers:BUSINESS");
  });

  it("categoryMenuV2", () => {
    const data = [
      {
        group: "atom",
        title: {
          en: "atom",
          zh: "原子构件",
        },
        items: [
          {
            category: "test",
            title: {
              en: "test",
              zh: "测试ALEX",
            },
          },
          {
            category: "layout",
            title: {
              en: "layout",
              zh: "布局与容器",
            },
          },
          {
            category: "card",
            title: {
              en: "card",
              zh: "卡片列表",
            },
          },
          {
            category: "general-tables",
            title: {
              en: "General tables",
              zh: "表格相关",
            },
          },
          {
            category: "description",
            title: {
              en: "description",
              zh: "详情描述",
            },
          },
          {
            category: "chart",
            title: {
              en: "chart",
              zh: "图表相关",
            },
          },
          {
            category: "value-mapping",
            title: {
              en: "value-mapping",
              zh: "数值映射",
            },
          },
          {
            category: "data-view",
            title: {
              en: "data view",
              zh: "数据展示",
            },
          },
          {
            category: "form-input",
            title: {
              en: "form input",
              zh: "表单输入",
            },
          },
          {
            category: "navigation",
            title: {
              en: "navigation",
              zh: "导航菜单",
            },
          },
          {
            category: "feedback-and-tooltip",
            title: {
              en: "feedback-and-tooltip",
              zh: "反馈提示",
            },
          },
          {
            category: "data-convert",
            title: {
              en: "data-convert",
              zh: "数据转换工具",
            },
          },
          {
            category: "topology",
            title: {
              en: "topology",
              zh: "拓扑",
            },
          },
          {
            category: "other",
            title: {
              en: "other",
              zh: "其他",
            },
          },
        ],
      },
      {
        group: "business",
        title: {
          en: "business",
          zh: "业务构件",
        },
        items: [
          {
            category: "william",
            title: {
              en: "william",
              zh: "测试WILLIAM",
            },
          },
          {
            category: "cmdb-object",
            title: {
              en: "CMDB Object",
              zh: "CMDB模型",
            },
          },
          {
            category: "cmdb-instances",
            title: {
              en: "cmdb instances",
              zh: "CMDB实例",
            },
          },
          {
            category: "cmdb-chart",
            title: {
              en: "CMDB Chart",
              zh: "CMDB图表",
            },
          },
          {
            category: "cmdb-topology",
            title: {
              en: "cmdb topology",
              zh: "CMDB拓扑",
            },
          },
          {
            category: "ci",
            title: {
              en: "CI",
              zh: "持续集成",
            },
          },
          {
            category: "auto-collection",
            title: {
              en: "Auto Collection",
              zh: "自动采集",
            },
          },
          {
            category: "tool-and-flow",
            title: {
              en: "Tool And Flow",
              zh: "工具流程",
            },
          },
          {
            category: "monitor-alert",
            title: {
              en: "Alert Event",
              zh: "告警事件",
            },
          },
          {
            category: "monitor-charts",
            title: {
              en: "Monitor Metric Chart",
              zh: "监控指标",
            },
          },
          {
            category: "monitor-collect",
            title: {
              en: "Monitor Collect",
              zh: "监控采集",
            },
          },
          {
            category: "real-time-monitor",
            title: {
              en: "Real Time Monitor",
              zh: "实时监控",
            },
          },
          {
            category: "ops-automation",
            title: {
              en: "ops automation",
              zh: "运维自动化",
            },
          },
          {
            category: "deploy",
            title: {
              en: "Deploy",
              zh: "发布部署",
            },
          },
          {
            category: "monitor-log",
            title: {
              en: "log",
              zh: "日志相关",
            },
          },
          {
            category: "agile",
            title: {
              en: "Agile",
              zh: "敏捷管理",
            },
          },
          {
            category: "permission",
            title: {
              en: "permission",
              zh: "权限相关",
            },
          },
        ],
      },
    ];
    const expectData = {
      menuItems: [
        {
          activeMatchSearch: true,
          exact: true,
          text: "developers:ALL",
          to: "/developers/brick-book?category=",
        },
        {
          items: [
            {
              activeMatchSearch: true,
              exact: true,
              text: "测试ALEX",
              to: "/developers/brick-book?category=test",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "布局与容器",
              to: "/developers/brick-book?category=layout",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "卡片列表",
              to: "/developers/brick-book?category=card",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "表格相关",
              to: "/developers/brick-book?category=general-tables",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "详情描述",
              to: "/developers/brick-book?category=description",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "图表相关",
              to: "/developers/brick-book?category=chart",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "数值映射",
              to: "/developers/brick-book?category=value-mapping",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "数据展示",
              to: "/developers/brick-book?category=data-view",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "表单输入",
              to: "/developers/brick-book?category=form-input",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "导航菜单",
              to: "/developers/brick-book?category=navigation",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "反馈提示",
              to: "/developers/brick-book?category=feedback-and-tooltip",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "数据转换工具",
              to: "/developers/brick-book?category=data-convert",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "拓扑",
              to: "/developers/brick-book?category=topology",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "其他",
              to: "/developers/brick-book?category=other",
            },
          ],
          title: "原子构件",
          type: "group",
        },
        {
          items: [
            {
              activeMatchSearch: true,
              exact: true,
              text: "测试WILLIAM",
              to: "/developers/brick-book?category=william",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "CMDB模型",
              to: "/developers/brick-book?category=cmdb-object",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "CMDB实例",
              to: "/developers/brick-book?category=cmdb-instances",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "CMDB图表",
              to: "/developers/brick-book?category=cmdb-chart",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "CMDB拓扑",
              to: "/developers/brick-book?category=cmdb-topology",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "持续集成",
              to: "/developers/brick-book?category=ci",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "自动采集",
              to: "/developers/brick-book?category=auto-collection",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "工具流程",
              to: "/developers/brick-book?category=tool-and-flow",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "告警事件",
              to: "/developers/brick-book?category=monitor-alert",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "监控指标",
              to: "/developers/brick-book?category=monitor-charts",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "监控采集",
              to: "/developers/brick-book?category=monitor-collect",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "实时监控",
              to: "/developers/brick-book?category=real-time-monitor",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "运维自动化",
              to: "/developers/brick-book?category=ops-automation",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "发布部署",
              to: "/developers/brick-book?category=deploy",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "日志相关",
              to: "/developers/brick-book?category=monitor-log",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "敏捷管理",
              to: "/developers/brick-book?category=agile",
            },
            {
              activeMatchSearch: true,
              exact: true,
              text: "权限相关",
              to: "/developers/brick-book?category=permission",
            },
          ],
          title: "业务构件",
          type: "group",
        },
      ],
      title: "",
    };
    return categoryMenuV2(data).then((v) => expect(v).toEqual(expectData));
  });

  it("getBrickDocs", () => {
    return getBrickDocs().then((v) => {
      expect(v).toEqual({
        "fake-story-of-business": undefined,
        "fake-story-of-correct": undefined,
        "fake-story-of-empty": undefined,
        "fake-story-of-slots": undefined,
        "fake-story-of-slots-invalid": undefined,
      });
    });
  });

  it("listBrickStoryV2", async () => {
    const categoryGroups = [
      {
        group: "atom",
        title: {
          en: "atom",
          zh: "原子构件",
        },
        items: [
          {
            category: "test",
            title: {
              en: "test",
              zh: "测试ALEX",
            },
          },
          {
            category: "layout",
            title: {
              en: "layout",
              zh: "布局与容器",
            },
          },
          {
            category: "card",
            title: {
              en: "card",
              zh: "卡片列表",
            },
          },
          {
            category: "general-tables",
            title: {
              en: "General tables",
              zh: "表格相关",
            },
          },
          {
            category: "description",
            title: {
              en: "description",
              zh: "详情描述",
            },
          },
          {
            category: "chart",
            title: {
              en: "chart",
              zh: "图表相关",
            },
          },
          {
            category: "value-mapping",
            title: {
              en: "value-mapping",
              zh: "数值映射",
            },
          },
          {
            category: "data-view",
            title: {
              en: "data view",
              zh: "数据展示",
            },
          },
          {
            category: "form-input",
            title: {
              en: "form input",
              zh: "表单输入",
            },
          },
          {
            category: "navigation",
            title: {
              en: "navigation",
              zh: "导航菜单",
            },
          },
          {
            category: "feedback-and-tooltip",
            title: {
              en: "feedback-and-tooltip",
              zh: "反馈提示",
            },
          },
          {
            category: "data-convert",
            title: {
              en: "data-convert",
              zh: "数据转换工具",
            },
          },
          {
            category: "topology",
            title: {
              en: "topology",
              zh: "拓扑",
            },
          },
          {
            category: "other",
            title: {
              en: "other",
              zh: "其他",
            },
          },
        ],
      },
      {
        group: "business",
        title: {
          en: "business",
          zh: "业务构件",
        },
        items: [
          {
            category: "william",
            title: {
              en: "william",
              zh: "测试WILLIAM",
            },
          },
          {
            category: "cmdb-object",
            title: {
              en: "CMDB Object",
              zh: "CMDB模型",
            },
          },
          {
            category: "cmdb-instances",
            title: {
              en: "cmdb instances",
              zh: "CMDB实例",
            },
          },
          {
            category: "cmdb-chart",
            title: {
              en: "CMDB Chart",
              zh: "CMDB图表",
            },
          },
          {
            category: "cmdb-topology",
            title: {
              en: "cmdb topology",
              zh: "CMDB拓扑",
            },
          },
          {
            category: "ci",
            title: {
              en: "CI",
              zh: "持续集成",
            },
          },
          {
            category: "auto-collection",
            title: {
              en: "Auto Collection",
              zh: "自动采集",
            },
          },
          {
            category: "tool-and-flow",
            title: {
              en: "Tool And Flow",
              zh: "工具流程",
            },
          },
          {
            category: "monitor-alert",
            title: {
              en: "Alert Event",
              zh: "告警事件",
            },
          },
          {
            category: "monitor-charts",
            title: {
              en: "Monitor Metric Chart",
              zh: "监控指标",
            },
          },
          {
            category: "monitor-collect",
            title: {
              en: "Monitor Collect",
              zh: "监控采集",
            },
          },
          {
            category: "real-time-monitor",
            title: {
              en: "Real Time Monitor",
              zh: "实时监控",
            },
          },
          {
            category: "ops-automation",
            title: {
              en: "ops automation",
              zh: "运维自动化",
            },
          },
          {
            category: "deploy",
            title: {
              en: "Deploy",
              zh: "发布部署",
            },
          },
          {
            category: "monitor-log",
            title: {
              en: "log",
              zh: "日志相关",
            },
          },
          {
            category: "agile",
            title: {
              en: "Agile",
              zh: "敏捷管理",
            },
          },
          {
            category: "permission",
            title: {
              en: "permission",
              zh: "权限相关",
            },
          },
        ],
      },
    ];
    const stories = [
      {
        author: "alex",
        category: "form-input",
        text: {
          en: "普通列表",
          zh: "general-list",
        },
        description: {
          en: "",
          zh: "",
        },
        storyId: "presentational-bricks.general-list",
        doc: null,
        type: "brick",
      },
      {
        author: "alex",
        text: {
          en: "advance-setting",
          zh: "alex-test",
        },

        description: {
          en: "",
          zh: "",
        },
        storyId: "test.advance-setting",
        doc: null,
        type: "brick",
      },
      {
        author: "alex",
        category: "test",
        conf: [
          {
            brick: "div",
            slots: {
              "": {
                bricks: [
                  {
                    brick: "forms.general-form",
                    events: {
                      "validate.error": {
                        action: "console.warn",
                        args: ["${EVENT.type}", "${EVENT.detail}"],
                      },
                      "validate.success": {
                        action: "console.log",
                        args: ["${EVENT.type}", "${EVENT.detail}"],
                      },
                    },
                    properties: {
                      name: "hello",
                      valueTypes: {
                        time: "moment|YYYY-MM-DD",
                      },
                      values: {
                        change: "descriptionA",
                        nickname: "lucy",
                        username: "easyops",
                      },
                    },
                    slots: {
                      items: {
                        bricks: [
                          {
                            brick: "forms.general-radio",
                            events: {
                              "general.radio.change": [
                                {
                                  args: [
                                    "<% EVENT.detail !== 'descriptionA' %>",
                                  ],
                                  method: "setNotRender",
                                  target: "#descriptionA",
                                },
                                {
                                  args: [
                                    "<% EVENT.detail !== 'descriptionB' %>",
                                  ],
                                  method: "setNotRender",
                                  target: "#descriptionB",
                                },
                              ],
                            },
                            properties: {
                              label: "动态切换",
                              name: "change",
                              options: ["descriptionA", "descriptionB"],
                            },
                          },
                          {
                            brick: "forms.advance-setting",
                            properties: {
                              foldName: "查看",
                            },
                            slots: {
                              content: {
                                bricks: [
                                  {
                                    brick: "forms.general-text-area",
                                    properties: {
                                      autoSize: {
                                        maxRows: 8,
                                        minRows: 3,
                                      },
                                      id: "descriptionA",
                                      label: "描述A",
                                      max: 10,
                                      message: {
                                        max: "最长长度限制，10",
                                        required: "请输入内容",
                                      },
                                      name: "descriptionA",
                                      placeholder: "请填写描述",
                                      required: true,
                                      value: "This is a long description",
                                    },
                                  },
                                  {
                                    brick: "forms.general-select",
                                    properties: {
                                      hidden: true,
                                      id: "descriptionB",
                                      inputBoxStyle: {
                                        width: "100%",
                                      },
                                      label: "描述B",
                                      name: "descriptionB",
                                      notRender: true,
                                      options: [
                                        {
                                          label: "男",
                                          value: "male",
                                        },
                                        {
                                          label: "女",
                                          value: "female",
                                        },
                                      ],
                                      placeholder: "请填写描述",
                                      required: true,
                                    },
                                  },
                                ],
                                type: "bricks",
                              },
                            },
                          },
                          {
                            brick: "forms.general-buttons",
                            events: {
                              "cancel.button.click": {
                                action: "console.log",
                              },
                              "submit.button.click": {
                                action: "console.log",
                              },
                            },
                            properties: {
                              cancelText: "取消",
                              showCancelButton: true,
                              submitText: "提交",
                            },
                          },
                        ],
                        type: "bricks",
                      },
                    },
                  },
                ],
                type: "bricks",
              },
            },
          },
          {
            brick: "div",
            slots: {
              "": {
                bricks: [
                  {
                    brick: "forms.general-form",
                    events: {
                      "validate.error": {
                        action: "console.warn",
                        args: ["${EVENT.type}", "${EVENT.detail}"],
                      },
                      "validate.success": {
                        action: "console.log",
                        args: ["${EVENT.type}", "${EVENT.detail}"],
                      },
                    },
                    properties: {
                      layout: "vertical",
                      name: "hello",
                      valueTypes: {
                        time: "moment|YYYY-MM-DD",
                      },
                      values: {
                        change: "descriptionA",
                        nickname: "lucy",
                        username: "easyops",
                      },
                    },
                    slots: {
                      items: {
                        bricks: [
                          {
                            brick: "forms.general-radio",
                            events: {
                              "general.radio.change": [
                                {
                                  args: [
                                    "<% EVENT.detail !== 'descriptionA' %>",
                                  ],
                                  method: "setNotRender",
                                  target: "#descriptionA",
                                },
                                {
                                  args: [
                                    "<% EVENT.detail !== 'descriptionB' %>",
                                  ],
                                  method: "setNotRender",
                                  target: "#descriptionB",
                                },
                              ],
                            },
                            properties: {
                              label: "动态切换",
                              name: "change",
                              options: ["descriptionA", "descriptionB"],
                            },
                          },
                          {
                            brick: "forms.advance-setting",
                            events: {
                              "advance.setting.collapse": {
                                properties: {
                                  foldName: "高级设置...",
                                },
                                target: "#vertical",
                              },
                              "advance.setting.expand": [
                                {
                                  action: "console.log",
                                },
                                {
                                  properties: {
                                    foldName: "高级设置折叠",
                                  },
                                  target: "#vertical",
                                },
                              ],
                            },
                            properties: {
                              foldName: "高级设置...",
                              id: "vertical",
                              showDivider: false,
                              showFoldIcon: false,
                            },
                            slots: {
                              content: {
                                bricks: [
                                  {
                                    brick: "forms.general-text-area",
                                    properties: {
                                      autoSize: {
                                        maxRows: 8,
                                        minRows: 3,
                                      },
                                      id: "descriptionA",
                                      label: "描述A",
                                      max: 10,
                                      message: {
                                        max: "最长长度限制，10",
                                        required: "请输入内容",
                                      },
                                      name: "descriptionA",
                                      placeholder: "请填写描述",
                                      required: true,
                                      value: "This is a long description",
                                    },
                                  },
                                  {
                                    brick: "forms.general-select",
                                    properties: {
                                      hidden: true,
                                      id: "descriptionB",
                                      inputBoxStyle: {
                                        width: "100%",
                                      },
                                      label: "描述B",
                                      name: "descriptionB",
                                      notRender: true,
                                      options: [
                                        {
                                          label: "男",
                                          value: "male",
                                        },
                                        {
                                          label: "女",
                                          value: "female",
                                        },
                                      ],
                                      placeholder: "请填写描述",
                                      required: true,
                                    },
                                  },
                                ],
                                type: "bricks",
                              },
                            },
                          },
                          {
                            brick: "forms.general-buttons",
                            events: {
                              "cancel.button.click": {
                                action: "console.log",
                              },
                              "submit.button.click": {
                                action: "console.log",
                              },
                            },
                            properties: {
                              cancelText: "取消",
                              showCancelButton: true,
                              submitText: "提交",
                            },
                          },
                        ],
                        type: "bricks",
                      },
                    },
                  },
                ],
                type: "bricks",
              },
            },
          },
        ],
        description: {
          en: "",
          zh: "",
        },
        doc: {
          author: "momo",
          description: "",
          dockind: "brick",
          events: [
            {
              description: "折叠时发生事件",
              detail: "{show: false}",
              type: "advance.setting.collapse",
            },
            {
              description: "展开时发生事件",
              detail: "{show: true}",
              type: "advance.setting.expand",
            },
          ],
          history: [
            {
              change: "新增构件 `forms.advance-setting`",
              version: "1.87.0",
            },
          ],
          id: "alex.advance-setting",
          interface: [],
          memo: "",
          name: "forms.advance-setting",
          properties: [
            {
              default: "false",
              description: "是否虚线",
              name: "dividerDashed",
              required: "false",
              type: "boolean",
            },
            {
              default: "center",
              description: "分割线标题的位置",
              name: "dividerOrientation",
              required: "false",
              type: '"left"|"right"',
            },
            {
              default: "-",
              description: "折叠展示名称",
              name: "foldName",
              required: "true",
              type: "string",
            },
            {
              default: "-",
              description: "折叠展示的样式编写",
              name: "foldStyle",
              required: "false",
              type: "object",
            },
            {
              default: "-",
              description: "是否展开",
              name: "show",
              required: "false",
              type: "boolean",
            },
            {
              default: "true",
              description: "是否分割线",
              name: "showDivider",
              required: "false",
              type: "boolean",
            },
            {
              default: "true",
              description: "是否显示折叠图标",
              name: "showFoldIcon",
              required: "false",
              type: "boolean",
            },
          ],
          slots: [
            {
              description: "内容插槽",
              name: "content",
            },
          ],
        },
        icon: {
          icon: "pen",
          lib: "fa",
        },
        storyId: "alex.advance-setting",
        text: {
          en: "advance-setting",
          zh: "alex-test",
        },
        type: "brick",
      },
    ];
    const data = await listBrickStoryV2(
      categoryGroups,
      stories,
      "",
      "",
      "",
      2,
      3
    );
    expect(data).toEqual({
      list: [
        {
          description: "~",
          id: "fake-story-of-empty",
          tags: ["Fake Chapter zh 1"],
          title: "Fake Story of Empty Zh",
          type: "brick",
        },
        {
          description: "~",
          id: "test.advance-setting",
          subTitle: "alex",
          tags: ["Fake Chapter zh 1"],
          title: "alex-test",
          type: "brick",
        },
        {
          category: "test",
          description: "~",
          icon: {
            icon: "pen",
            lib: "fa",
          },
          id: "alex.advance-setting",
          subTitle: "alex",
          tags: ["测试ALEX"],
          title: "alex-test",
          type: "brick",
        },
      ],
      page: 2,
      pageSize: 3,
      total: 8,
    });

    const data2 = await listBrickStoryV2(
      categoryGroups,
      stories,
      "",
      "",
      "",
      null,
      null,
      {
        doc: true,
      }
    );

    expect(data2).toEqual({
      list: [
        {
          description: "Fake description of Correct Zh",
          id: "fake-story-of-correct",
          tags: ["Fake Chapter zh 1", "zh"],
          title: "Fake Story of Correct Zh",
          type: "brick",
        },
        {
          description: "Fake description of Slots Zh",
          id: "fake-story-of-slots",
          tags: ["Fake Chapter zh 1"],
          title: "Fake Story of Slots Zh",
          type: "brick",
        },
        {
          description: "~",
          id: "fake-story-of-slots-invalid",
          tags: ["Fake Chapter zh 1"],
          title: "Fake Story of Slots Invalid Zh",
          type: "brick",
        },
        {
          description: "~",
          id: "fake-story-of-empty",
          tags: ["Fake Chapter zh 1"],
          title: "Fake Story of Empty Zh",
          type: "brick",
        },
        {
          description: "~",
          doc: null,
          id: "test.advance-setting",
          subTitle: "alex",
          tags: ["Fake Chapter zh 1"],
          title: "alex-test",
          type: "brick",
        },
        {
          category: "test",
          description: "~",
          doc: {
            author: "momo",
            description: "",
            dockind: "brick",
            events: [
              {
                description: "折叠时发生事件",
                detail: "{show: false}",
                type: "advance.setting.collapse",
              },
              {
                description: "展开时发生事件",
                detail: "{show: true}",
                type: "advance.setting.expand",
              },
            ],
            history: [
              {
                change: "新增构件 `forms.advance-setting`",
                version: "1.87.0",
              },
            ],
            id: "alex.advance-setting",
            interface: [],
            memo: "",
            name: "forms.advance-setting",
            properties: [
              {
                default: "false",
                description: "是否虚线",
                name: "dividerDashed",
                required: "false",
                type: "boolean",
              },
              {
                default: "center",
                description: "分割线标题的位置",
                name: "dividerOrientation",
                required: "false",
                type: '"left"|"right"',
              },
              {
                default: "-",
                description: "折叠展示名称",
                name: "foldName",
                required: "true",
                type: "string",
              },
              {
                default: "-",
                description: "折叠展示的样式编写",
                name: "foldStyle",
                required: "false",
                type: "object",
              },
              {
                default: "-",
                description: "是否展开",
                name: "show",
                required: "false",
                type: "boolean",
              },
              {
                default: "true",
                description: "是否分割线",
                name: "showDivider",
                required: "false",
                type: "boolean",
              },
              {
                default: "true",
                description: "是否显示折叠图标",
                name: "showFoldIcon",
                required: "false",
                type: "boolean",
              },
            ],
            slots: [
              {
                description: "内容插槽",
                name: "content",
              },
            ],
          },
          icon: {
            icon: "pen",
            lib: "fa",
          },
          id: "alex.advance-setting",
          subTitle: "alex",
          tags: ["测试ALEX"],
          title: "alex-test",
          type: "brick",
        },
        {
          category: "form-input",
          description: "~",
          doc: null,
          id: "presentational-bricks.general-list",
          subTitle: "alex",
          tags: ["表单输入"],
          title: "general-list",
          type: "brick",
        },
        {
          description: "~",
          id: "fake-story-of-business",
          tags: ["Fake Chapter 1"],
          title: "Fake Story of Correct Zh",
          type: "template",
        },
      ],
      page: 1,
      pageSize: 20,
      total: 8,
    });
  });

  it("listBrickStory search by title in en language", async () => {
    i18next.language = "en";
    const data = await listBrickStory("atom", "Fake Story of Correct Zh");
    expect(data.total).toBe(0);

    const data2 = await listBrickStory("atom", "Fake Story of Correct En");
    expect(data2.total).toBe(1);
  });
});
