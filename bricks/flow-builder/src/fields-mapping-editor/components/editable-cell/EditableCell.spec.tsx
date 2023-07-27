import React from "react";
import { Typography } from "antd";
import { shallow } from "enzyme";
import { EditableCell } from "./EditableCell";

jest.mock("@next-libs/code-editor-components", () => ({
  CodeEditorItem: function CodeEditorItemWrapper() {
    return <div>editor item</div>;
  },
}));

describe("EditableCell", () => {
  it("should work", () => {
    const props = {
      name: "name",
      dataIndex: "name",
      editing: false,
      record: {
        name: "name",
        type: "string",
        description: "名称",
        value: "hello",
      },
      children: <div id="name">hello</div>,
    };
    const wrapper = shallow(<EditableCell {...props} />);
    expect(wrapper.find("div").text()).toEqual("hello");

    wrapper.setProps({
      dataIndex: "value",
      record: {
        name: "name",
        type: "bool",
        value: true,
      },
    });
    wrapper.update();
    expect(wrapper.find(".cellWrapper").text()).toEqual("true");

    wrapper.setProps({
      dataIndex: "value",
      record: {
        name: "sort",
        type: "object",
        value: {
          order: 4,
        },
      },
    });
    wrapper.update();
    expect(wrapper.find(Typography.Link).text()).toEqual("查看");

    wrapper.setProps({
      editing: true,
    });
    wrapper.update();
    expect(wrapper.find("CodeEditorFormItem").length).toEqual(1);
  });
});
