import React from "react";
import { mount, shallow } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { PageTitle } from "./PageTitle";

const spyOnSetPageTitle = jest.fn();
jest.spyOn(kit, "getRuntime").mockReturnValue({
  appBar: {
    setPageTitle: spyOnSetPageTitle,
  },
} as any);

describe("PageTitle", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update page title", () => {
    const wrapper = mount(<PageTitle pageTitle="hello" />);
    expect(spyOnSetPageTitle).toBeCalledWith("hello");

    wrapper.setProps({
      pageTitle: "world",
    });
    expect(spyOnSetPageTitle).toBeCalledWith("world");
  });

  it("should toggle dashboard mode", () => {
    const wrapper = shallow(<PageTitle pageTitle="hello" />);
    expect(wrapper.find(".page-title-content").prop("style").fontSize).toBe(18);

    wrapper.setProps({
      dashboardMode: true,
    });
    expect(wrapper.find(".page-title-content").prop("style").fontSize).toBe(38);
  });
});
