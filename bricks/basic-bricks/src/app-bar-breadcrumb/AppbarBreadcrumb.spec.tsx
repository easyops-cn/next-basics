import React from "react";
import { mount } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { AppbarBreadcrumb } from "./AppbarBreadcrumb";

jest.spyOn(kit, "getHistory").mockReturnValue({
  push: jest.fn(),
  createHref: jest.fn(),
} as any);
const spyOnUseRecentApps = jest.spyOn(kit, "useRecentApps");
spyOnUseRecentApps.mockReturnValue({});

const mockGetNavConfig = jest.fn(() => ({
  breadcrumb: [
    {
      text: "page3",
      to: "http://www.c.com",
    },
  ],
}));
jest.spyOn(kit, "getRuntime").mockReturnValue({
  getNavConfig: mockGetNavConfig,
} as any);

describe("AppbarBreadcrumb", () => {
  it("should work", () => {
    const wrapper = mount(
      <AppbarBreadcrumb
        breadcrumb={[
          { text: "page1", to: "http://www.a.com" },
          { text: "page2", to: "http://www.b.com" },
        ]}
        separator="/"
      />
    );
    expect(wrapper.prop("breadcrumb").length).toBe(2);
    expect(wrapper.find(".ant-breadcrumb-link").length).toBe(2);
  });

  it("should work while props.breadcrumb was null", () => {
    const wrapper = mount(<AppbarBreadcrumb breadcrumb={[]} />);

    expect(wrapper.find(".ant-breadcrumb-link").length).toBe(1);
  });
});
