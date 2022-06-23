import React from "react";
import { mount, shallow } from "enzyme";
import { useApplyPageTitle, getRuntime } from "@next-core/brick-kit";
import { PageTitle } from "./PageTitle";

jest.mock("@next-core/brick-kit");

const featureFlagsFn = jest.fn().mockReturnValue({
  "support-ui-8.0-base-layout": true,
});
const currentRouteFn = jest.fn().mockReturnValue({
  bricks: [
    {
      brick: "base-layout.tpl-base-page-module",
    },
  ],
});
(getRuntime as jest.Mock).mockReturnValue({
  getFeatureFlags: featureFlagsFn,
  getCurrentRoute: currentRouteFn,
});

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
    expect(wrapper.find(".page-title-content").prop("style").fontSize).toBe(
      "var(--title-font-size-larger)"
    );
    expect(wrapper.find(".page-title-content").prop("style").fontWeight).toBe(
      "normal"
    );
  });

  it("should update page title with ui6.0", () => {
    const wrapper = mount(<PageTitle pageTitle="hello" />);
    expect(useApplyPageTitle).toBeCalledWith("hello");
    const featureFlagsFn = jest.fn().mockReturnValue({
      "support-ui-8.0-base-layout": false,
    });
    const currentRouteFn = jest.fn().mockReturnValue({
      bricks: [
        {
          brick: "basic-bricks.micro-view",
        },
      ],
    });
    (getRuntime as jest.Mock).mockReturnValue({
      getFeatureFlags: featureFlagsFn,
      getCurrentRoute: currentRouteFn,
    });
    wrapper.setProps({
      pageTitle: "world",
    });
    expect(useApplyPageTitle).toBeCalledWith("world");
    expect(wrapper.find(".page-title-content").prop("style").fontSize).toBe(
      "var(--page-title-font-size)"
    );
    expect(wrapper.find(".page-title-content").prop("style").fontWeight).toBe(
      "var(--page-title-font-weight)"
    );
  });

  it("should update page title with ui6.0", () => {
    const wrapper = mount(<PageTitle pageTitle="hello" />);
    expect(useApplyPageTitle).toBeCalledWith("hello");
    const featureFlagsFn = jest.fn().mockReturnValue({
      "support-ui-8.0-base-layout": false,
    });
    const currentRouteFn = jest.fn().mockReturnValue({
      bricks: [
        {
          brick: "basic-bricks.micro-view",
        },
      ],
    });
    (getRuntime as jest.Mock).mockReturnValue({
      getFeatureFlags: featureFlagsFn,
      getCurrentRoute: currentRouteFn,
    });
    wrapper.setProps({
      pageTitle: "world",
    });
    expect(useApplyPageTitle).toBeCalledWith("world");
    expect(wrapper.find(".page-title-content").prop("style").fontSize).toBe(
      "var(--page-title-font-size)"
    );
    expect(wrapper.find(".page-title-content").prop("style").fontWeight).toBe(
      "var(--page-title-font-weight)"
    );
  });

  it("should toggle dashboard mode", () => {
    const wrapper = shallow(<PageTitle pageTitle="hello" />);
    expect(wrapper.find(".page-title-content").prop("style").fontSize).toBe(
      "var(--page-title-font-size)"
    );

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
