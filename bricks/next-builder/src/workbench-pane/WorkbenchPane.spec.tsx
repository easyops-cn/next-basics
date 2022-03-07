import React from "react";
import { mount } from "enzyme";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { WorkbenchPane } from "./WorkbenchPane";
import { act } from "react-dom/test-utils";

describe("WorkbenchPane", () => {
  beforeEach(() => {
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      Promise.resolve(1).then(cb);
      return 1;
    });
  });

  afterEach(() => {
    (window.requestAnimationFrame as jest.Mock).mockRestore();
  });

  it("should work", async () => {
    const onActiveChange = jest.fn();
    const onPaneActivated = jest.fn();
    const wrapper = mount(
      <WorkbenchPane
        titleLabel="Hello"
        active={false}
        onActiveChange={onActiveChange}
        onPaneActivated={onPaneActivated}
      />
    );
    expect(wrapper.find(RightOutlined).length).toBe(1);
    expect(onActiveChange).toBeCalledTimes(1);
    expect(onActiveChange).toHaveBeenNthCalledWith(1, false);
    expect(onPaneActivated).not.toBeCalled();

    wrapper.find(".pane").simulate("click");
    expect(wrapper.find(DownOutlined).length).toBe(1);
    expect(onActiveChange).toBeCalledTimes(2);
    expect(onActiveChange).toHaveBeenNthCalledWith(2, true);
    expect(onPaneActivated).toBeCalledTimes(1);

    // Re-active will be ignored.
    wrapper.find(".pane").simulate("click");
    expect(onActiveChange).toBeCalledTimes(2);
    expect(onPaneActivated).toBeCalledTimes(1);

    expect(wrapper.find(".pane-body").hasClass("scrolled")).toBe(false);
    await act(async () => {
      wrapper.find(".pane-body").getDOMNode().scrollTop = 20;
      wrapper.find(".pane-body").simulate("scroll");
      await (global as any).flushPromises();
      wrapper.update();
    });
    expect(wrapper.find(".pane-body").hasClass("scrolled")).toBe(true);
  });
});
