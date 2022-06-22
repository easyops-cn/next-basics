import React from "react";
import { shallow } from "enzyme";
import { MicroApp } from "./MicroApp";
import { BtnExitDashboardMode } from "./BtnExitDashboardMode";
import { ReactComponent as Logo } from "../images/logo-3.1.svg";
import { getRuntime } from "@next-core/brick-kit";
import { PageTitle } from "../page-title/PageTitle";

jest.mock("@next-core/brick-kit");
const brandFn = jest.fn().mockReturnValue({});
(getRuntime as jest.Mock).mockReturnValue({
  getBrandSettings: brandFn,
});

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

  it("should work with banner page title", () => {
    const wrapper = shallow(<MicroApp bannerPageTitle="Hello" />);
    expect(wrapper.find("#bannerTitleBarSlot").length).toBe(0);
    expect(wrapper.find("PageTitle").prop("pageTitle")).toBe("Hello");
  });

  it("should work with dashboard mode", () => {
    const wrapper = shallow(<MicroApp pageTitle="Hello" />);
    expect(wrapper.find(BtnExitDashboardMode).length).toBe(0);
    wrapper.setProps({ dashboardMode: true });
    expect(wrapper.find(BtnExitDashboardMode).length).toBe(1);
    expect(wrapper.find(Logo).length).toBe(1);
    brandFn.mockReturnValue({ dashboard_mode_logo_url: "/a/b/c" });
    wrapper.setProps({});
    expect(wrapper.find(Logo).length).toBe(0);
    expect(wrapper.find("img").length).toBe(1);
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

  it("should work with page title scale", () => {
    const wrapper = shallow(<MicroApp pageTitle="Hello" dashboardMode />);
    expect(wrapper.find(".page-title").prop("style")).toBe(null);
    expect(wrapper.find(PageTitle).prop("pageTitleScale")).toBe(1);
    wrapper.setProps({
      pageTitleScale: 2,
    });
    expect(wrapper.find(".page-title").prop("style")).toEqual({ height: 152 });
    expect(wrapper.find(PageTitle).prop("pageTitleScale")).toBe(2);
  });
});
