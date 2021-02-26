import React from "react";
import { shallow } from "enzyme";
import { Form } from "antd";
import { CodeEditorFormItem } from "./CodeEditorFormItem";

jest.mock("@next-libs/editor-components", () => ({
  CodeEditorItem: function MockEditor() {
    return <div>code editor</div>;
  },
}));

describe("VisualPropertyForm", () => {
  it("should work", async () => {
    const props = {
      name: "required",
      label: "必填项",
      required: true,
      mode: "yaml",
    };
    const wrapper = shallow(<CodeEditorFormItem {...props} />);

    wrapper.find("MockEditor").invoke("onValidate")([{ type: "error" }]);

    await expect(
      wrapper.find(Form.Item).prop("rules")[1].validator()
    ).rejects.toEqual("请填写正确的 yaml 语法");

    wrapper.find("MockEditor").invoke("onValidate")([]);

    await expect(
      wrapper.find(Form.Item).prop("rules")[1].validator()
    ).resolves.toEqual(undefined);
  });
});
