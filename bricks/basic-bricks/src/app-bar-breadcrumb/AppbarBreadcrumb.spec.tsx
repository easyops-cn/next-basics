import React from "react";
import { mount, shallow } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { AppbarBreadcrumb } from "./AppbarBreadcrumb";

jest.spyOn(kit, "getHistory").mockReturnValue({
  push: jest.fn(),
  createHref: jest.fn(),
} as any);
const spyOnUseRecentApps = jest.spyOn(kit, "useRecentApps");
const popWorkspaceStack = jest.fn();
jest.spyOn(kit, "getRuntime").mockReturnValue({
  popWorkspaceStack,
} as any);
spyOnUseRecentApps.mockReturnValueOnce({});

describe("AppbarBreadcrumb", () => {
  it("should work", () => {
    const wrapper = shallow(
      <AppbarBreadcrumb
        breadcrumb={[{ text: "page1", to: "http://www.a.com" }]}
      />
    );
    expect(wrapper.html()).toEqual(
      '<div class="breadcrumbContainer"><div class="ant-breadcrumb"><span><span class="ant-breadcrumb-link"><a>page1</a></span><span class="ant-breadcrumb-separator">&gt;</span></span></div></div>'
    );
  });
});
