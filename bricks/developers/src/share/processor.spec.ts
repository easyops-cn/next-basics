import {
  getAllStoryListV2,
  getAdjustedConf,
  processIconInPreview,
} from "./processor";
import i18next from "i18next";
import * as brickKit from "@next-core/brick-kit";

jest.mock("../stories/chapters/atom-bricks");
jest.mock("../stories/chapters/business-bricks");
const mockGetFeatureFlags = jest.fn().mockReturnValue({
  "developers-brick-preview": false,
});
jest.spyOn(brickKit, "getRuntime").mockReturnValue({
  getFeatureFlags: mockGetFeatureFlags,
  getBasePath: jest.fn().mockReturnValue("/next/"),
} as any);

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
      {
        author: "lucy",
        category: "list",
        text: {
          en: "list widget",
          zh: "列表挂件",
        },
        storyId: "easyops-builtin-widgets.tpl-base-layout",
        layerType: "widget",
        doc: null,
        type: "brick",
        originData: {
          isExport: false,
        },
      },
    ];
    expect(getAllStoryListV2(categoryGroups, stories)).toEqual([
      {
        id: "fake-story-of-correct",
        category: undefined,
        icon: undefined,
        subTitle: undefined,
        type: "brick",
        title: "Fake Story of Correct Zh",
        description: "Fake description of Correct Zh",
        tags: ["Fake Chapter zh 1", "zh"],
      },
      {
        id: "fake-story-of-slots",
        category: undefined,
        icon: undefined,
        subTitle: undefined,
        type: "brick",
        title: "Fake Story of Slots Zh",
        description: "Fake description of Slots Zh",
        tags: ["Fake Chapter zh 1"],
      },
      {
        id: "fake-story-of-slots-invalid",
        category: undefined,
        icon: undefined,
        subTitle: undefined,
        type: "brick",
        title: "Fake Story of Slots Invalid Zh",
        description: "~",
        tags: ["Fake Chapter zh 1"],
      },
      {
        id: "fake-story-of-empty",
        category: undefined,
        icon: undefined,
        subTitle: undefined,
        type: "brick",
        title: "Fake Story of Empty Zh",
        description: "~",
        tags: ["Fake Chapter zh 1"],
      },
      {
        id: "presentational-bricks.general-list",
        icon: undefined,
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
        category: undefined,
        icon: undefined,
        subTitle: undefined,
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
      {
        subTitle: "lynette",
        category: "no-match-category",
        title: "no matched",
        description: "~",
        id: undefined,
        icon: undefined,
        tags: ["未匹配分类"],
        type: undefined,
      },
    ]);

    expect(consoleWarn).toHaveBeenCalled();
  });
});

describe("getAdjustedConf", () => {
  it.each([
    [
      {
        brick: "basic.general-button",
        description: {
          title: "按钮",
          message: "通用按钮",
        },
        properties: {
          name: "查看",
        },
      },
      {
        description: { message: "通用按钮", title: "按钮" },
        previewConf: {
          brick: "basic.general-button",
          properties: { name: "查看" },
        },
      },
    ],
    [
      {
        snippetId: "basic.general-button[basic]",
        title: {
          en: "basic",
          zh: "基本",
        },
        message: {
          en: "one primary button",
          zh: "一个初级按钮",
        },
        bricks: [
          {
            brick: "basic.general-button",
            properties: { name: "查看" },
          },
        ],
      },
      {
        actions: undefined,
        description: { message: "一个初级按钮", title: "基本" },
        previewConf: [
          { brick: "basic.general-button", properties: { name: "查看" } },
        ],
      },
    ],
  ])("should work", (conf, result) => {
    expect(getAdjustedConf(conf)).toEqual(result);
  });
});

describe("processIconInPreview", () => {
  const location = window.location;
  delete window.location;
  window.location = {
    origin: "http://sit.easyops.com",
  } as Location;

  afterAll(() => {
    window.location = location;
  });

  it.each([
    [
      { lib: "antd", icon: "edit" },
      { lib: "antd", icon: "edit" },
    ],
    [
      { imgSrc: "brick/demo.svg" },
      { imgSrc: "http://sit.easyops.com/next/brick/demo.svg" },
      {
        imgSrc: "data:image/svg+xml,sddf",
      },
      {
        imgSrc: "data:image/svg+xml,sddf",
      },
    ],
  ])("should work", (icon, result) => {
    expect(processIconInPreview(icon)).toEqual(result);
  });
});
