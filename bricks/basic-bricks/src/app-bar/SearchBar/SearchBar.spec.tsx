import React from "react";
import { shallow } from "enzyme";
import { Input } from "antd";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("should trigger input onChange", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<SearchBar onChange={onChange} />);
    wrapper.find(Input).invoke("onChange")({
      target: {
        value: "hello",
      },
    } as any);
    expect(onChange).toBeCalledWith("hello");
  });

  it("should stop propagation when click input", () => {
    const stopPropagation = jest.fn();
    const wrapper = shallow(<SearchBar onChange={null} />);
    wrapper.find(".inputContainer").invoke("onClick")({
      stopPropagation,
    } as any);
    expect(stopPropagation).toBeCalled();
  });

  it("should prevent default when certain keydown", () => {
    const preventDefault = jest.fn();
    const wrapper = shallow(<SearchBar onChange={null} />);
    wrapper.find(Input).invoke("onKeyDown")({
      key: "a",
      preventDefault,
    } as any);
    expect(preventDefault).not.toBeCalled();
    wrapper.find(Input).invoke("onKeyDown")({
      key: "ArrowLeft",
      preventDefault,
    } as any);
    expect(preventDefault).toBeCalled();
  });

  it("should handle focus and blur", () => {
    const wrapper = shallow(<SearchBar onChange={null} />);
    expect(wrapper.hasClass("focus")).toBe(false);
    wrapper.find(Input).invoke("onFocus")(null);
    expect(wrapper.hasClass("focus")).toBe(true);
    wrapper.find(Input).invoke("onBlur")(null);
    expect(wrapper.hasClass("focus")).toBe(false);
  });
});
