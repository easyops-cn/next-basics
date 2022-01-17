import React from "react";
import { mount, shallow } from "enzyme";
import { useApplyPageTitle } from "@next-core/brick-kit";
import { PageTitle } from "./PageTitle";

jest.mock("@next-core/brick-kit");

describe("PageTitle", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update page title", () => {
    const wrapper = mount(<PageTitle pageTitle="hello" />);
    expect(useApplyPageTitle).toBeCalledWith("hello");

    wrapper.setProps({
      pageTitle: "world",
    });
    expect(useApplyPageTitle).toBeCalledWith("world");
  });

  it("should toggle dashboard mode", () => {
    const wrapper = shallow(<PageTitle pageTitle="hello" />);
    expect(wrapper.find(".page-title-content").prop("style").fontSize).toBe(18);

    wrapper.setProps({
      dashboardMode: true,
    });
    expect(wrapper.find(".page-title-content").prop("style").fontSize).toBe(38);
  });

  it("should update page title scale", () => {
    const wrapper = shallow(<PageTitle pageTitle="hello" dashboardMode />);
    expect(wrapper.find(".page-title-before").prop("style")).toBe(null);
    expect(wrapper.find(".page-title-content").prop("style").fontSize).toBe(38);
    expect(
      wrapper.find(".page-title-content").prop("style").backgroundSize
    ).toBe(undefined);
    expect(wrapper.find(".page-title-after").prop("style")).toBe(null);

    wrapper.setProps({
      pageTitleScale: 2,
    });
    expect(wrapper.find(".page-title-before").prop("style")).toEqual({
      backgroundSize: "1036px 90px",
    });
    expect(wrapper.find(".page-title-content").prop("style")).toMatchObject({
      fontSize: 76,
      backgroundSize: "100% 90px",
    });
    expect(wrapper.find(".page-title-after").prop("style")).toEqual({
      backgroundSize: "1036px 90px",
    });
  });
});
