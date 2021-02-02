import React from "react";
import { shallow } from "enzyme";
import { Breadcrumb } from "antd";
import * as kit from "@next-core/brick-kit";
import { AppBarBreadcrumb } from "./AppBarBreadcrumb";

const spyOnHistoryPush = jest.fn();
jest.spyOn(kit, "getHistory").mockReturnValue({
  push: spyOnHistoryPush,
} as any);
const spyOnUseRecentApps = jest.spyOn(kit, "useRecentApps");
const popWorkspaceStack = jest.fn();
jest.spyOn(kit, "getRuntime").mockReturnValue({
  popWorkspaceStack,
} as any);

describe("AppBarBreadcrumb", () => {
  it("should work with no current app", () => {
    spyOnUseRecentApps.mockReturnValueOnce({});
    const wrapper = shallow(
      <AppBarBreadcrumb
        breadcrumb={[
          {
            text: "First",
            to: "/first",
          },
          {
            text: "Second",
          },
        ]}
      />
    );
    expect(wrapper.find(Breadcrumb.Item).length).toBe(2);
  });

  it("should work with current app", () => {
    spyOnUseRecentApps.mockReturnValueOnce({
      currentApp: {
        id: "hello",
        homepage: "/hello",
        name: "Hello",
      },
    });
    const wrapper = shallow(
      <AppBarBreadcrumb
        breadcrumb={[
          {
            text: "First",
            to: "/first",
          },
          {
            text: "Second",
          },
        ]}
      />
    );
    expect(wrapper.find(Breadcrumb.Item).length).toBe(3);
  });

  it("should work with current app and previous workspace", () => {
    spyOnUseRecentApps.mockReturnValueOnce({
      currentApp: {
        id: "hello",
        homepage: "/hello",
        name: "Halo",
        localeName: "Hello",
      },
      previousWorkspace: {
        appId: "world",
        appName: "世界",
        appLocaleName: "World",
        url: "/world",
      },
    });
    const wrapper = shallow(<AppBarBreadcrumb breadcrumb={null} />);
    wrapper.find(".workspaceButton").simulate("click");
    expect(popWorkspaceStack).toBeCalled();
    expect(spyOnHistoryPush).toBeCalledWith("/world");
  });

  it("should work with no current app and no breadcrumb", () => {
    spyOnUseRecentApps.mockReturnValueOnce({});
    const wrapper = shallow(<AppBarBreadcrumb breadcrumb={[]} />);
    expect(wrapper.find(Breadcrumb.Item).length).toBe(0);
  });
});
