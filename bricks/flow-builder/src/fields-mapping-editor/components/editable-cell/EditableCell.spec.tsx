import React from "react";
import { shallow } from "enzyme";
import { EditableCell } from "./EditableCell";

jest.mock("@next-libs/code-editor-components", () => ({
  CodeEditorItemWrapper: function CodeEditorItemWrapper() {
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
      editing: true,
    });

    const editorItemShallow = wrapper.find("CodeEditorItemWrapper").shallow();
    wrapper.update();
    expect(editorItemShallow.find("div").text()).toEqual("editor item");
  });
});
