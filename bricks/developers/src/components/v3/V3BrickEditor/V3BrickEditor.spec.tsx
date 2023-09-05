import React from "react";
import { shallow, mount } from "enzyme";
import AceEditor from "react-ace";
import { V3BrickEditor } from "./V3BrickEditor";
import { Clipboard } from "@next-libs/clipboard";

jest.mock("brace/mode/yaml");
jest.mock("brace/mode/html");

jest.useFakeTimers();

describe("V3BrickEditor", () => {
  it("should work", () => {
    const value = `brick: div`;
    const onDebouncedChange = jest.fn();
    const wrapper = mount(
      <V3BrickEditor
        value={value}
        onDebouncedChange={onDebouncedChange}
        mode="yaml"
      />
    );
    wrapper.find(AceEditor).invoke("onChange")(`brick: span`);
    jest.runAllTimers();
    expect(onDebouncedChange).lastCalledWith("brick: span", "yaml");
    wrapper.find(Clipboard).invoke("onCopy")(`brick: span`, true);
    wrapper.find(Clipboard).invoke("onCopy")(`brick: span`, false);
  });

  it("should work handle code editing", () => {
    const value = `brick: div`;
    const wrapper = shallow(<V3BrickEditor value={value} mode="yaml" />);

    wrapper.find(AceEditor).invoke("onValidate")([] as any);
    wrapper.update();
    expect(wrapper.find(".editorCard").prop("style")).toHaveProperty(
      "boxShadow",
      "none"
    );

    wrapper.find(AceEditor).invoke("onValidate")([{ type: "error" }] as any);
    wrapper.update();
    expect(wrapper.find(".editorCard").prop("style")).not.toHaveProperty(
      "boxShadow",
      "none"
    );
  });
});
