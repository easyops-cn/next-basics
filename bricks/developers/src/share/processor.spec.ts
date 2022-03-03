import { getAllStoryListV2 } from "./processor";
import i18next from "i18next";

jest.mock("../stories/chapters/atom-bricks");
jest.mock("../stories/chapters/business-bricks");
const consoleWarn = jest
  .spyOn(console, "warn")
  .mockImplementation(() => void 0);

describe("getAllStoryListV2", () => {
  it("getAllStoryListV2", () => {
    i18next.language = "zh";
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
            stories: [],
          },
          {
            category: "layout",
            title: {
              en: "layout",
              zh: "布局与容器",
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
            category: "for-test",
            title: {
              en: "cmdb instances",
              zh: "CMDB实例",
            },
          },
        ],
      },
      {
        group: "widget",
        title: {
          en: "widget",
          zh: "挂件",
        },
        items: [
          {
            category: "easyops-builtin-widgets",
            title: {
              en: "easyops-builtin-widgets",
              zh: "内置挂件",
            },
          },
        ],
      },
    ];
    const stories = [
      {
        author: "alex",
        category: "test",
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
        author: "lynette",
        category: "no matched",
        text: {
          en: "no matched",
          zh: "no matched",
        },
      },
      {
        author: "lynette",
        category: "for-test",
        deprecated: true,
        text: {
          en: "for-test-deprecated",
          zh: "for-test-deprecated",
        },
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
      {
        author: "sailor",
        category: "test",
        text: {
          en: "list widget",
          zh: "列表挂件",
        },
        description: {
          en: "",
          zh: "",
        },
        storyId: "easyops-builtin-widgets.tpl-list-widget",
        layerType: "widget",
        doc: null,
        type: "brick",
      },
    ];
    expect(getAllStoryListV2(categoryGroups, stories)).toEqual([
      {
        id: "fake-story-of-correct",
        type: "brick",
        title: "Fake Story of Correct Zh",
        description: "Fake description of Correct Zh",
        tags: ["Fake Chapter zh 1", "zh"],
      },
      {
        id: "fake-story-of-slots",
        type: "brick",
        title: "Fake Story of Slots Zh",
        description: "Fake description of Slots Zh",
        tags: ["Fake Chapter zh 1"],
      },
      {
        id: "fake-story-of-slots-invalid",
        type: "brick",
        title: "Fake Story of Slots Invalid Zh",
        description: "~",
        tags: ["Fake Chapter zh 1"],
      },
      {
        id: "fake-story-of-empty",
        type: "brick",
        title: "Fake Story of Empty Zh",
        description: "~",
        tags: ["Fake Chapter zh 1"],
      },
      {
        id: "presentational-bricks.general-list",
        type: "brick",
        title: "general-list",
        subTitle: "alex",
        description: "~",
        tags: ["测试ALEX"],
        category: "test",
      },
      {
        id: "alex.advance-setting",
        type: "brick",
        title: "alex-test",
        subTitle: "alex",
        description: "~",
        tags: ["测试ALEX"],
        icon: {
          icon: "pen",
          lib: "fa",
        },
        category: "test",
      },
      {
        id: "fake-story-of-business",
        type: "template",
        title: "Fake Story of Correct Zh",
        description: "~",
        tags: ["Fake Chapter 1"],
      },
      {
        subTitle: "sailor",
        category: "easyops-builtin-widgets",
        title: "列表挂件",
        description: "~",
        id: "easyops-builtin-widgets.tpl-list-widget",
        icon: undefined,
        tags: ["内置挂件"],
        type: "brick",
      },
    ]);

    expect(consoleWarn).toHaveBeenCalled();
  });
});
