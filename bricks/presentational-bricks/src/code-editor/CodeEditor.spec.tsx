import React from "react";
import { shallow } from "enzyme";
import { CodeEditor } from "./CodeEditor";
import AceEditor from "react-ace";

describe("CodeEditor", () => {
  it("should work", () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const handleErrorChange = jest.fn();
    const wrapper = shallow(
      <CodeEditor
        theme="tomorrow"
        mode="text"
        dataSource="123"
        editorStyle={{ width: "100%" }}
        setOptions={{ tabSize: 2 }}
        handleChange={onChange}
        handleBlur={onBlur}
        handleErrorChange={handleErrorChange}
        required={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ dataSource: "" });
    wrapper.find(AceEditor).invoke("onChange")("456");
    expect(wrapper.find(AceEditor).prop("value")).toBe("456");

    wrapper.find(AceEditor).invoke("onBlur")();
    expect(onBlur).toHaveBeenCalled();

    wrapper.find(AceEditor).invoke("onValidate")([]);
    expect(wrapper.find(AceEditor).prop("className")).not.toContain("hasError");

    wrapper.find(AceEditor).invoke("onValidate")([
      { type: "error", row: 1, column: 1, text: "err" }
    ]);
    expect(wrapper.find(AceEditor).prop("className")).toContain("hasError");

    wrapper.find(AceEditor).invoke("onChange")("");
    wrapper.find(AceEditor).invoke("onValidate")([]);
    expect(wrapper.find(AceEditor).prop("className")).toContain("hasError");
  });
});
