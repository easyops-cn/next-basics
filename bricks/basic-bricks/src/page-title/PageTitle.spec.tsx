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
});
