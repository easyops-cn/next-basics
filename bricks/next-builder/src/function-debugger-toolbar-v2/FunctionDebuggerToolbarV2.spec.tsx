import React from "react";
import { shallow } from "enzyme";
import { FunctionDebuggerToolbarV2 } from "./FunctionDebuggerToolbarV2";

describe("FunctionDebuggerToolbarV2", () => {
  it("should work for debug input", () => {
    const onButtonClick = jest.fn();
    const wrapper = shallow(
      <FunctionDebuggerToolbarV2 onButtonClick={onButtonClick} saveDisabled />
    );
    expect(wrapper.find(".debuggerToolbar").hasClass("input")).toBe(true);
    expect(wrapper.find(".debuggerToolbar").hasClass("debug")).toBe(true);

    wrapper.find(".debuggerButton").at(0).simulate("click");
    expect(onButtonClick).toBeCalledWith({ action: "run" });

    wrapper.find(".debuggerButton").at(1).simulate("click");
    expect(onButtonClick).toBeCalledTimes(1);

    wrapper.setProps({ saveDisabled: false });
    wrapper.find(".debuggerButton").at(1).simulate("click");
    expect(onButtonClick).toBeCalledTimes(2);
    expect(onButtonClick).toHaveBeenNthCalledWith(2, { action: "save" });
  });

  it("should work for debug output", () => {
    const wrapper = shallow(<FunctionDebuggerToolbarV2 type="output" />);
    expect(wrapper.find(".debuggerToolbar").hasClass("output")).toBe(true);
    expect(wrapper.find(".debuggerToolbar").hasClass("debug")).toBe(true);
  });

  it("should work for test input", () => {
    const wrapper = shallow(<FunctionDebuggerToolbarV2 type="test-input" />);
    expect(wrapper.find(".debuggerToolbar").hasClass("input")).toBe(true);
    expect(wrapper.find(".debuggerToolbar").hasClass("test")).toBe(true);
  });

  it("should work for test output", () => {
    const wrapper = shallow(<FunctionDebuggerToolbarV2 type="test-output" />);
    expect(wrapper.find(".debuggerToolbar").hasClass("output")).toBe(true);
    expect(wrapper.find(".debuggerToolbar").hasClass("test")).toBe(true);
    expect(wrapper.find(".debuggerToolbar").hasClass("ok")).toBe(false);
    expect(wrapper.find(".debuggerToolbar").hasClass("failed")).toBe(false);

    wrapper.setProps({
      status: "ok",
    });
    expect(wrapper.find(".debuggerToolbar").hasClass("ok")).toBe(true);

    wrapper.setProps({
      status: "failed",
    });
    expect(wrapper.find(".debuggerToolbar").hasClass("failed")).toBe(true);
  });
});
