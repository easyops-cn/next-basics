import React from "react";
import { Input, Tooltip } from "antd";
import { mount } from "enzyme";
import { VisualPropertyForm } from "./VisualPropertyForm";
import { CodeEditorFormItem } from "./CodeEditorFormItem";
jest.mock("@next-libs/editor-components", () => ({
  CodeEditorItem: function MockEditor() {
    return <div>code editor</div>;
  },
}));

describe("VisualPropertyForm", () => {
  it("should work", () => {
    const props = {
      brickProperties: {
        name: "lucy",
        palceholder: "<% CTX.placeholder %>",
        age: 123,
        count: "<% CTX.count %>",
        disabled: true,
        required: "<% CTX.required %>",
        value: ["a", "b", "c"],
        fieds: "<%  CTX.fieds %>",
        options: ["a", "b", "c"],
        category: "<% CTX.category %>",
      },
      propertyTypeList: [
        { name: "name", type: "string", description: "名称" },
        { name: "palceholder", type: "string", description: "提示" },
        { name: "count", type: "number", description: "数量" },
        { name: "age", type: "number", description: "年龄" },
        { name: "value", type: "string[]", description: "值" },
        { name: "fieds", type: "string[]", description: "字段" },
        { name: "disabled", type: "boolean", description: "置灰" },
        { name: "required", type: "boolean", description: "必填" },
        { name: "options", type: "OptionProps", description: "下拉选项" },
      ],
      labelIcon: {
        normal: {
          lib: "fa",
          icon: "code",
          prefix: "fas",
          color: "#167be0",
        },
        advanced: {
          lib: "fa",
          icon: "cog",
          prefix: "fas",
          color: "#167be0",
        },
      },
    } as any;

    const wrapper = mount(<VisualPropertyForm {...props} />);

    expect(wrapper.find(Tooltip).at(0).prop("title")).toEqual("名称");
    expect(wrapper.find(Tooltip).at(1).prop("title")).toEqual("提示");
    expect(wrapper.find(Tooltip).at(2).prop("title")).toEqual("数量");
  });

  it("should work with differnt mode", () => {
    const props = {
      brickProperties: {
        name: "lucy",
      },
      propertyTypeList: [
        { name: "name", type: "string", description: "名称", group: "basic" },
      ],
      labelIcon: {
        normal: {
          lib: "fa",
          icon: "code",
          prefix: "fas",
          color: "#167be0",
        },
        advanced: {
          lib: "fa",
          icon: "cog",
          prefix: "fas",
          color: "#167be0",
        },
      },
    } as any;

    const wrapper = mount(<VisualPropertyForm {...props} />);

    expect(wrapper.find(Input).length).toEqual(1);
    wrapper.find(".iconContainer").at(0).invoke("onClick")("name");
    expect(wrapper.find(Input).length).toEqual(0);
    expect(wrapper.find("MockEditor").length).toEqual(1);
    wrapper.find(".ant-collapse-header").at(1).simulate("click");
    wrapper.update();
    expect(wrapper.find("MockEditor").length).toEqual(2);

    wrapper.find(".iconContainer").at(0).invoke("onClick")("name");
    expect(wrapper.find(Input).length).toEqual(1);
    expect(wrapper.find("MockEditor").length).toEqual(1);
  });

  it("should render template params", () => {
    const props = {
      brickProperties: {
        name: "lucy",
      },
      propertyTypeList: [{ name: "name", type: "string", description: "名称" }],
      labelIcon: {
        normal: {
          lib: "fa",
          icon: "code",
          prefix: "fas",
          color: "#167be0",
        },
        advanced: {
          lib: "fa",
          icon: "cog",
          prefix: "fas",
          color: "#167be0",
        },
      },
      brickInfo: {
        type: "template",
      },
    } as any;

    const wrapper = mount(<VisualPropertyForm {...props} />);

    wrapper.find(".ant-collapse-header").at(1).simulate("click");
    wrapper.update();

    expect(wrapper.find(CodeEditorFormItem).prop("label")).toEqual(
      "other params"
    );

    wrapper.setProps({
      brickInfo: {
        type: "brick",
      },
    });

    wrapper.update();

    expect(wrapper.find(CodeEditorFormItem).prop("label")).toEqual(
      "other properties"
    );
  });
});
