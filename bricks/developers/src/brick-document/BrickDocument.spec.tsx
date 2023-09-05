import React from "react";
import { mount } from "enzyme";
import { Empty } from "antd";
import { BrickDocument } from "./BrickDocument";
import { V3BrickDocTypes } from "../components/v3/V3Types";
import * as brickKit from "@next-core/brick-kit";
import { pick } from "lodash";

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
      type: "UseBrickConf",
      required: "-",
      default: "-",
      description:
        "自定义 brick 渲染日期单元格，返回内容会被追加到单元格, 具体查看 [UseBrickConf](#UseBrickConf)",
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
      type: "CalendarMode",
      required: "false",
      default: "month",
      description: "初始模式.[UseBrickConf](#UseBrickConf)",
    },
    {
      name: "monthCell",
      type: "UseBrickConf",
      required: "true",
      default: "-",
      description:
        "自定义 brick 渲染日期单元格，返回内容会被追加到单元格，具体查看 [UseBrickConf](#UseBrickConf)",
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
      type: "moment",
      required: "false",
      default: "当前日期",
      description: "value  日历默认值. 具体查看 [moment](http://www.baidu.com)",
    },
    {
      name: "highlight",
      type: "HighlightProps",
      required: false,
      default: "-",
      description: "高亮选项",
      deprecated: true,
    },
    {
      name: "inputStyle",
      type: "CSSProperties",
      required: false,
      description: "输入框样式",
    },
    {
      name: "icon",
      type: "MenuIcon",
      required: false,
      description: "图标icon",
    },
  ],
  events: [
    {
      type: "presentational.calendar.onChange",
      detail: "moment",
      description: "日期变化事件 具体查看 [moment](http://www.baidu.com)",
    },
    {
      type: "presentational.calendar.onSelect",
      detail: "moment",
      description: "日期变化事件 具体查看 [moment](http://www.baidu.com)",
    },
    {
      type: "presentational.calendar.onClick",
      description: "日期点击事件",
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

const v3Doc = {
  id: "eo-form",
  slots: [
    {
      description: "表单内容",
      name: null,
    },
    {
      description: "操作区",
      name: "toolbar",
    },
  ],
  properties: [
    {
      description: "布局方式",
      name: "layout",
      type: "Layout",
    },
    {
      description: "表单组件尺寸",
      name: "size",
      type: "ComponentSize",
    },
    {
      attribute: false,
      name: "formStyle",
      type: "React.CSSProperties",
    },
  ],
  events: [
    {
      description: "表单值变更事件",
      detail: {
        description: null,
        type: "Record<string, unknown>",
      },
      name: "values.change",
    },
    {
      description: "表单验证成功时触发事件",
      detail: {
        type: "Record<string, unknown>",
      },
      name: "validate.success",
    },
    {
      description: "表单验证报错时触发事件",
      detail: {
        type: "MessageBody[]",
      },
      name: "validate.error",
    },
  ],
  methods: [
    {
      description: "表单校验方法",
      name: "validate",
      params: [],
      returns: {
        type: "boolean | Record<string, unknown>",
      },
    },
    {
      description: "表单设置值方法",
      name: "setInitValue",
      params: [
        {
          name: "values",
          type: "Record<string, unknown>",
        },
      ],
      returns: null,
    },
    {
      description: "表单重置值方法",
      name: "resetFields",
      params: [
        {
          name: "name",
          type: "string",
        },
      ],
      returns: null,
    },
    {
      description: "获取表单值方法",
      name: "getFieldsValue",
      params: [
        {
          name: "name",
          type: "string",
        },
      ],
      returns: null,
    },
  ],
  interface: {
    types: [
      {
        annotation: {
          type: "union",
          types: [
            {
              type: "jsLiteral",
              value: "large",
            },
            {
              type: "jsLiteral",
              value: "medium",
            },
            {
              type: "jsLiteral",
              value: "small",
            },
            {
              type: "jsLiteral",
              value: "xs",
            },
          ],
        },
        name: "ComponentSize",
        type: "typeAlias",
      },
    ],
  },
};

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

    wrapper.setProps({
      doc: pick(doc, "id"),
    });
    wrapper.update();
    await (global as any).flushPromises();
    expect(wrapper.find(".brickDocCard")).toBeTruthy();
  });

  it("should show up empty when docs equal to null", async () => {
    const wrapper = mount(<BrickDocument {...props} doc={null} />);
    await (global as any).flushPromises();
    expect(wrapper.find(Empty).length).toBe(1);
    wrapper.find("Button").invoke("onClick")(null);
  });

  it("should show up empty when docs equal to null when doc not found", async () => {
    const wrapper = mount(
      <BrickDocument storyId={"test.test-id"} storyType={"brick"} doc={null} />
    );
    await (global as any).flushPromises();
    expect(wrapper.find(Empty).length).toBe(1);
  });
});

describe("V3 BrickDocument", () => {
  const props = {
    storyId: "eo-form",
    storyType: "bricks",
  };
  it("should work", async () => {
    const wrapper = mount(
      <BrickDocument {...props} v3Brick={true} doc={v3Doc} />
    );
    await (global as any).flushPromises();

    // properties
    expect(wrapper.find("table").at(0).find("tbody tr").length).toBe(3);
    // events
    expect(wrapper.find("table").at(1).find("tbody tr").length).toBe(3);
    // methods
    expect(wrapper.find("table").at(2).find("tbody tr").length).toBe(4);
    expect(wrapper.find("table").at(2).find("thead th").length).toBe(4);
    // slots
    expect(wrapper.find("table").at(3).find("tbody tr").length).toBe(2);
  });

  it("interface should work", async () => {
    const wrapper = mount(
      <BrickDocument {...props} v3Brick={true} doc={v3Doc} />
    );
    await (global as any).flushPromises();

    expect(wrapper.find(V3BrickDocTypes)).toBeTruthy();
  });
});
