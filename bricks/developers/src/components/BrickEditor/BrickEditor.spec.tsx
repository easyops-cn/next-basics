import React from "react";
import { shallow, mount } from "enzyme";
import AceEditor from "react-ace";
import { BrickConf } from "@next-core/brick-types";
import { BrickEditor } from "./BrickEditor";

describe("BrickEditor", () => {
  it("should work when shallow rendering", () => {
    const conf: BrickConf = {
      brick: "div",
    };
    const wrapper = mount(
      <BrickEditor defaultConf={conf} onConfChange={null} mode="json" />
    );
    expect(wrapper.find(AceEditor).prop("value")).toMatchInlineSnapshot(`
      "{
        \\"brick\\": \\"div\\"
      }"
    `);
  });

  it("should work when conf is falsy", () => {
    const wrapper = mount(
      <BrickEditor defaultConf={null} onConfChange={null} mode="json" />
    );
    expect(wrapper.find(AceEditor).prop("value")).toBe("");
  });

  it("should work handle code editing", () => {
    const handleConfChange = jest.fn();
    const conf: BrickConf = {
      brick: "span",
    };
    const wrapper = shallow(
      <BrickEditor
        defaultConf={conf}
        onConfChange={handleConfChange}
        mode="json"
      />
    );
    const getEditor = () => wrapper.find(AceEditor);
    const getEditorCard = () => wrapper.find("div").first();

    getEditor().invoke("onBlur")(new FocusEvent("blur"));
    expect(handleConfChange).not.toBeCalled();

    getEditor().invoke("onChange")('["error');
    // Ref https://github.com/airbnb/enzyme/issues/1153
    wrapper.update();
    expect(getEditorCard().prop("style")).not.toHaveProperty(
      "boxShadow",
      "none"
    );

    getEditor().invoke("onBlur")(new FocusEvent("blur"));
    wrapper.update();
    expect(getEditor().prop("value")).toBe('["error');
    expect(handleConfChange).not.toBeCalled();

    getEditor().invoke("onChange")('{"brick":"div"}');
    wrapper.update();
    expect(getEditorCard().prop("style")).toHaveProperty("boxShadow", "none");

    getEditor().invoke("onBlur")(new FocusEvent("blur"));
    wrapper.update();
    expect(getEditor().prop("value")).toBe('{"brick":"div"}');

    expect(handleConfChange.mock.calls[0][0]).toEqual({ brick: "div" });
  });
});
