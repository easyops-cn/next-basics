import React from "react";
import { mount, shallow } from "enzyme";
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
    const onFirstActivated = jest.fn();
    const wrapper = mount(
      <WorkbenchPane
        titleLabel="Hello"
        active={false}
        onActiveChange={onActiveChange}
        onFirstActivated={onFirstActivated}
      />
    );
    expect(wrapper.find(RightOutlined).length).toBe(1);
    expect(onActiveChange).toBeCalledTimes(1);
    expect(onActiveChange).toHaveBeenNthCalledWith(1, false);
    expect(onFirstActivated).not.toBeCalled();

    wrapper.find(".pane-header").simulate("click");
    expect(wrapper.find(DownOutlined).length).toBe(1);
    expect(onActiveChange).toBeCalledTimes(2);
    expect(onActiveChange).toHaveBeenNthCalledWith(2, true);
    expect(onFirstActivated).toBeCalledTimes(1);

    wrapper.find(".pane-header").simulate("click");
    expect(wrapper.find(RightOutlined).length).toBe(1);
    expect(onActiveChange).toBeCalledTimes(3);
    expect(onActiveChange).toHaveBeenNthCalledWith(3, false);

    // Re-active will be ignored.
    wrapper.find(".pane-header").simulate("click");
    expect(onFirstActivated).toBeCalledTimes(1);

    expect(wrapper.find(".pane").hasClass("scrolled")).toBe(false);
    await act(async () => {
      wrapper.find(".pane-body").getDOMNode().scrollTop = 20;
      wrapper.find(".pane-body").simulate("scroll");
      await (global as any).flushPromises();
      wrapper.update();
    });
    expect(wrapper.find(".pane").hasClass("scrolled")).toBe(true);
  });

  it("should show alerts", async () => {
    const wrapper = shallow(
      <WorkbenchPane
        titleLabel="Hello"
        alerts={[
          { type: "warning", message: "Oops" },
          { type: "error", message: "Yaks" },
          { type: "success", message: "ok" },
          { type: "info", message: "note" },
        ]}
      />
    );
    expect(wrapper.find(".alert").length).toBe(4);
    expect(wrapper.find("GeneralIcon").length).toBe(4);
    expect(wrapper.find("GeneralIcon").at(0).props()).toMatchObject({
      icon: { icon: "exclamation-circle" },
    });
    expect(wrapper.find("GeneralIcon").at(1).props()).toMatchObject({
      icon: { icon: "close-circle" },
    });
    expect(wrapper.find("GeneralIcon").at(2).props()).toMatchObject({
      icon: { icon: "check-circle" },
    });
    expect(wrapper.find("GeneralIcon").at(3).props()).toMatchObject({
      icon: { icon: "info-circle" },
    });
  });
});
