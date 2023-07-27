import React from "react";
import { mount } from "enzyme";
import { LoadingBar } from "./LoadingBar";
import { act } from "react-dom/test-utils";

describe("LoadingBar", () => {
  it("should mount", () => {
    const wrapper = mount(<LoadingBar />);
    const getClassName = (): string =>
      wrapper
        .find("div")
        .at(0)
        .prop("className");
    expect(getClassName()).toEqual("global-loading-bar rendered-loading-bar");

    // 模拟 loading bar 在某些请求开始和结束之间初始化的情况。
    // 即在收到任何 `start` 事件前先收到了 `end` 事件。
    act(() => {
      window.dispatchEvent(new CustomEvent("request.end"));
    });
    wrapper.update();
    expect(getClassName()).toEqual("global-loading-bar rendered-loading-bar");

    act(() => {
      window.dispatchEvent(new CustomEvent("request.start"));
    });
    wrapper.update();
    expect(getClassName()).toEqual(
      "global-loading-bar rendered-loading-bar loading"
    );

    act(() => {
      window.dispatchEvent(new CustomEvent("request.end"));
    });
    wrapper.update();
    expect(getClassName()).toEqual("global-loading-bar rendered-loading-bar");

    wrapper.unmount();
  });
});
