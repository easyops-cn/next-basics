import React from "react";
import { shallow } from "enzyme";
import { MicroApp } from "./MicroApp";
import { BtnExitDashboardMode } from "./BtnExitDashboardMode";

describe("MicroApp", () => {
  it("should work with default", () => {
    const wrapper = shallow(<MicroApp />);
    expect(wrapper.find(".content-grid").hasClass("no-gap")).toBe(false);
    expect(wrapper.find("#titleBarSlot").length).toBe(1);
  });

  it("should work with no-gap", () => {
    const wrapper = shallow(<MicroApp noGap={true} />);
    expect(wrapper.find(".content-grid").hasClass("no-gap")).toBe(true);
  });

  it("should work with page title", () => {
    const wrapper = shallow(<MicroApp pageTitle="Hello" />);
    expect(wrapper.find("#titleBarSlot").length).toBe(0);
    expect(wrapper.find("PageTitle").prop("pageTitle")).toBe("Hello");
  });

  it("should work with dashboard mode", () => {
    const wrapper = shallow(<MicroApp pageTitle="Hello" />);
    expect(wrapper.find(BtnExitDashboardMode).length).toBe(0);
    wrapper.setProps({ dashboardMode: true });
    expect(wrapper.find(BtnExitDashboardMode).length).toBe(1);
  });

  it("should work with banner", () => {
    const bannerStyle = {
      backgroundImage: "url(some-image-url)",
    };
    const wrapper = shallow(<MicroApp bannerStyle={bannerStyle} />);
    expect(wrapper.find("#bannerSlot").length).toBe(1);
    expect(wrapper.find("#bannerTitleBarSlot").length).toBe(1);
    expect(wrapper.find("#bannerToolbarSlot").length).toBe(1);
    expect(wrapper.find(".banner-container").prop("style")).toBe(bannerStyle);
  });
});
