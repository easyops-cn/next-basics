import React from "react";
import { mount } from "enzyme";
import { GeneralDrawer } from "./GeneralDrawer";

describe("GeneralModal", () => {
  it("should work", () => {
    const wrapper = mount(<GeneralDrawer visible={true} />);
    expect(wrapper.find("#headerRight").length).toBe(1);
    expect(wrapper.find("#content").length).toBe(1);
  });

  it("headerLeft slot should not exist", () => {
    const wrapper = mount(<GeneralDrawer visible={true} title="Hello" />);
    expect(wrapper.find("#headerLeft").length).toBe(0);
  });

  it("hasFooter should work", () => {
    const wrapper = mount(<GeneralDrawer visible={true} hasFooter={true} />);
    expect(wrapper.find("#footer").length).toBe(1);
  });
  it("loading should work", () => {
    const wrapper = mount(
      <GeneralDrawer visible={true} hasFooter={true} loading={true} />
    );
    expect(wrapper.find(".ant-spin-nested-loading").length).toBe(1);
  });

  it("float should work", () => {
    const wrapper = mount(<GeneralDrawer visible={true} isFloat={true} />);
    expect(wrapper.find(".floatDrawer").length).not.toBe(0);
    expect(wrapper.find(".outerBtn").length).toBe(0);

    wrapper.setProps({ hasOuterSwitch: true });
    wrapper.update();
    expect(wrapper.find(".defaultOuterBtn").length).toBe(1);

    wrapper.setProps({
      useBigOuterSwitch: true,
      customSwitchConfig: {
        openIcon: {
          lib: "easyops",
          category: "default",
          icon: "calendar",
        },
        closeText: "关闭",
      },
    });
    wrapper.update();
    expect(wrapper.find(".bigOuterBtn").length).toBe(1);
  });
});
