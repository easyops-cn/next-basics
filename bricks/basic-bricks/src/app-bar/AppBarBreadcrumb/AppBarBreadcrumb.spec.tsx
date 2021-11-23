import React from "react";
import { shallow } from "enzyme";
import { Breadcrumb } from "antd";
import * as kit from "@next-core/brick-kit";
import { AppBarBreadcrumb } from "./AppBarBreadcrumb";
import { Link } from "@next-libs/basic-components";

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

  it("should work with current app had breadcrumb", () => {
    spyOnUseRecentApps.mockReturnValueOnce({
      currentApp: {
        id: "hello",
        homepage: "/hello",
        name: "Halo",
        breadcrumb: {
          items: [
            {
              text: "主页",
              to: "/homepage",
            },
          ],
        },
      },
    });
    const wrapper = shallow(
      <AppBarBreadcrumb
        breadcrumb={[
          {
            text: "First",
            to: "/first",
          },
        ]}
      />
    );

    expect(wrapper.find(Breadcrumb.Item).length).toBe(3);
    const link = wrapper.find(Link).at(0);
    expect(link.props()).toMatchObject({
      to: "/homepage",
    });
    expect(link.getElement().props.children).toBe("主页");
  });

  it("should work with current app had breadcrumb and noCurrentApp was true", () => {
    spyOnUseRecentApps.mockReturnValueOnce({
      currentApp: {
        id: "hello",
        homepage: "/hello",
        name: "Halo",
        breadcrumb: {
          items: [
            {
              text: "主页",
            },
          ],
        },
      },
    });
    const wrapper = shallow(
      <AppBarBreadcrumb
        breadcrumb={[
          {
            text: "First",
          },
        ]}
        noCurrentApp={true}
      />
    );

    expect(wrapper.find(Breadcrumb.Item).length).toBe(2);
    expect(wrapper.find(Link).length).toBe(0);
  });
});
