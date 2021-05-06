import React from "react";
import { mount } from "enzyme";
import { Empty } from "antd";
import { BrickDocument } from "./BrickDocument";

const doc = {
  id: "presentational-bricks.calendar",
  author: "Alex",
  name: "日历 calendar",
  dockind: "brick",
  description: "按照日历形式展示数据的容器",
  slots: [
    {
      name: "items",
      description: "子节点",
    },
    {
      name: "content",
      description: "内容",
    },
  ],
  history: [
    {
      version: "1.x.0",
      change: "新增构件 `presentational-bricks.brick-calendar`",
    },
    {
      version: "2.x.0",
      change: "增加name字段",
    },
  ],
  memo: "just memo",
  properties: [
    {
      name: "dateCell",
      type: "[UseBrickConf](#UseBrickConf)",
      required: "-",
      default: "-",
      description: "自定义 brick 渲染日期单元格，返回内容会被追加到单元格",
    },
    {
      name: "fullscreen",
      type: "Boolean",
      required: "true",
      default: "true",
      description: "是否全屏展示",
    },
    {
      name: "mode",
      type: "[CalendarMode](#calendarmode)",
      required: "false",
      default: "month",
      description: "初始模式.",
    },
    {
      name: "monthCell",
      type: "[UseBrickConf](#UseBrickConf)",
      required: "true",
      default: "-",
      description: "自定义 brick 渲染日期单元格，返回内容会被追加到单元格",
    },
    {
      name: "testIn",
      type: "Boolean",
      required: "true",
      default: "true",
      description: "是否全屏展示",
    },
    {
      name: "value",
      type: "[moment](http://www.baidu.com)",
      required: "false",
      default: "当前日期",
      description: "value  日历默认值.",
    },
  ],
  events: [
    {
      type: "presentational.calendar.onChange",
      detail: "[moment](https://www.moment.com)",
      description: "日期变化事件",
    },
    {
      type: "presentational.calendar.onSelect",
      detail: "[moment](https://www.baidu.com)",
      description: "日期变化事件",
    },
  ],
  methods: [
    {
      name: "openModal",
      description: "打开模态框",
    },
  ],
  interface: [
    {
      name: "Color",
      kind: "enum",
      children: [
        {
          name: "blue",
          value: '"blue"',
          description: "",
        },
        {
          name: "cyan",
          value: '"cyan"',
          description: "",
        },
        {
          name: "geekblue",
          value: '"geekblue"',
          description: "",
        },
        {
          name: "gray",
          value: '"gray"',
          description: "",
        },
        {
          name: "green",
          value: '"green"',
          description: "绿色",
        },
        {
          name: "orange",
          value: '"orange"',
          description: "",
        },
        {
          name: "purple",
          value: '"purple"',
          description: "",
        },
        {
          name: "red",
          value: '"red"',
          description: "",
        },
      ],
    },
    {
      name: "ButtonProps",
      kind: "interface",
      children: [
        {
          name: "name",
          type: "string",
          required: false,
          description: "",
        },
        {
          name: "type",
          type: '"aa" | "bb"',
          required: false,
          description: "",
        },
      ],
    },
    {
      name: "OperationButton",
      kind: "interface",
      children: [
        {
          name: "configProps",
          type: "ButtonProps",
          required: false,
          description: "透传antd button props",
        },
        {
          name: "eventName",
          type: "string",
          required: false,
          description: "",
        },
        {
          name: "id",
          type: "string",
          required: false,
        },
        {
          name: "testProps",
          type: "Partial<TestProps>[]",
          required: false,
          description: "",
        },
        {
          name: "text",
          type: "Record<string, any>",
          required: true,
          description: "",
        },
      ],
    },
    {
      name: "TestProps",
      kind: "interface",
      children: [
        {
          name: "name",
          type: "string",
          required: false,
          description: "",
        },
        {
          name: "type",
          type: '"aa" | "bb"',
          required: false,
          description: "",
        },
      ],
    },
    {
      name: "Todo",
      kind: "interface",
      children: [
        {
          name: "completed",
          type: "boolean",
          required: false,
          description: "",
        },
        {
          name: "description",
          type: "sexType[]",
          required: false,
          description: "",
        },
        {
          name: "title",
          type: "nameType",
          required: false,
          description: "",
        },
      ],
    },
    {
      name: "UseBrickConf",
      kind: "interface",
      children: [
        {
          name: "brick",
          type: "string",
          required: false,
          description: "",
        },
        {
          name: "if",
          type: "string | boolean",
          required: true,
          description: "",
        },
        {
          name: "lifeCycle",
          type: "Record<string, any>",
          required: true,
          description: "",
        },
        {
          name: "properties",
          type: "Record<any, string>",
          required: true,
          description: "",
        },
        {
          name: "slots",
          type: "Record<string, any>",
          required: true,
          description: "",
        },
        {
          name: "transformFrom",
          type: "string | string[]",
          required: true,
          description: "",
        },
      ],
    },
    {
      name: "TodoPreview",
      kind: "type",
      description: "todo预览",
      type: 'Pick<Todo, "title" | "completed">',
    },
    {
      name: "TodoDescriptionPreview",
      kind: "type",
      description: "todo描述预览",
      type: 'Omit<Todo, "description">',
    },
    {
      name: "stringType",
      kind: "type",
      description: "",
      type: '"name" | "sex"',
    },
    {
      name: "nameType",
      kind: "type",
      description: "",
      type: '"name"',
    },
    {
      name: "sexType",
      kind: "type",
      description: "",
      type: '"sex"',
    },
    {
      name: "mixType",
      kind: "type",
      description: "",
      type: "sexType | nameType[]",
    },
  ],
};
import * as brickKit from "@next-core/brick-kit";

jest.mock("@next-core/brick-kit");

const spyOnHistoryReplace = jest.fn();
jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {},
  replace: spyOnHistoryReplace,
  createHref: () => "/oops",
} as any);

describe("BrickDocument", () => {
  const props = {
    storyId: "presentational-bricks.calendar",
    storyType: "bricks",
  };
  it("should work", async () => {
    const wrapper = mount(<BrickDocument {...props} doc={doc} />);
    await (global as any).flushPromises();

    expect(wrapper).toBeTruthy();
  });

  it("should show up empty when docs equal to null", async () => {
    const wrapper = mount(<BrickDocument {...props} doc={null} />);
    await (global as any).flushPromises();
    expect(wrapper.find(Empty).length).toBe(1);
  });

  it("should show up empty when docs equal to null when doc not found", async () => {
    const wrapper = mount(
      <BrickDocument storyId={"test.test-id"} storyType={"brick"} doc={null} />
    );
    await (global as any).flushPromises();
    expect(wrapper.find(Empty).length).toBe(1);
  });
});
