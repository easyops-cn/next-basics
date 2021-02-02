import React from "react";
import { mount } from "enzyme";
import { GeneralDrawer } from "./GeneralDrawer";

describe("GeneralModal", () => {
  it("should work", () => {
    const wrapper = mount(<GeneralDrawer visible={true} />);
    expect(wrapper.find('#headerRight').length).toBe(1);
    expect(wrapper.find('#content').length).toBe(1);
  });

  it("headerLeft slot should not exist", () => {
    const wrapper = mount(<GeneralDrawer visible={true} title="Hello" />);
    expect(wrapper.find('#headerLeft').length).toBe(0);
  });

  it("hasFooter should work", () => {
    const wrapper = mount(<GeneralDrawer visible={true} hasFooter={true} />);
    expect(wrapper.find('#footer').length).toBe(1);
  });
});
