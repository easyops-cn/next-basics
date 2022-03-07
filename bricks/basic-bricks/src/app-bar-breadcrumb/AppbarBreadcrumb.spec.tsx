import React from "react";
import { mount } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { AppbarBreadcrumb } from "./AppbarBreadcrumb";
import { act } from "react-dom/test-utils";

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
    expect(wrapper.html()).toEqual(
      '<div class="breadcrumbContainer"><div class="ant-breadcrumb"><span><span class="ant-breadcrumb-link"><a>page1</a></span><span class="ant-breadcrumb-separator">/</span></span><span><span class="ant-breadcrumb-link"><a>page2</a></span><span class="ant-breadcrumb-separator">/</span></span></div></div>'
    );
  });

  it("should work while props.breadcrumb was null", () => {
    const wrapper = mount(<AppbarBreadcrumb breadcrumb={[]} />);

    expect(wrapper.html()).toEqual(
      '<div class="breadcrumbContainer"><div class="ant-breadcrumb"><span><span class="ant-breadcrumb-link"><a>page3</a></span><span class="ant-breadcrumb-separator">/</span></span></div></div>'
    );
  });
});
