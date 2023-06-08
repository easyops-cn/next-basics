import React from "react";
import { mount } from "enzyme";
import { ThreeLevelMenuPopoverContent } from "./ThreeLevelMenuPopoverContent";
import { SidebarMenuGroups } from "./utils";
import * as brickKit from "@next-core/brick-kit";

jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {
    pathname: "/page-1-2",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  listen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createHref: () => {},
} as any);

const menuItem = {
  type: "subMenu",
  title: "menu-item-04",
  items: [
    {
      instanceId: "5fc6bcc946b0e",
      sort: 0,
      key: "3.0",
      text: "menu-group-04-01",
      to: "/nlicro-test2",
      type: "group",
      title: "menu-group-04-01",
      items: [
        {
          instanceId: "3.0.0",
          key: "3.0.0",
          sort: 0,
          text: "menu-item-3.0.0",
          to: "/nlicro-test772",
          type: "default",
        },
        {
          instanceId: "3.0.1",
          key: "3.0.1",
          sort: 0,
          text: "menu-item-3.0.1",
          to: "/nlicro-test2/chart",
          type: "default",
        },
        {
          instanceId: "3.0.2",
          key: "3.0.2",
          sort: 0,
          text: "menu-item-3.0.2",
          to: "/nlicro-test772",
          type: "default",
        },
      ],
    },
    {
      instanceId: "5fc6bcc946b72",
      sort: 0,
      key: "3.1",
      text: "menu-group-04-02",
      to: "/nlicro-test2",
      type: "group",
      title: "menu-group-04-02",
      items: [
        {
          instanceId: "3.1.0",
          key: "3.1.0",
          sort: 0,
          text: "menu-item-3.1.0",
          to: "/nlicro-test772",
          type: "default",
        },
        {
          instanceId: "3.1.1",
          key: "3.1.1",
          sort: 0,
          text: "menu-item-3.1.1",
          to: "/nlicro-test772",
          type: "default",
        },
        {
          instanceId: "3.1.2",
          key: "3.1.2",
          sort: 0,
          text: "menu-item-3.1.2",
          to: "/nlicro-test772",
          type: "default",
        },
      ],
    },
    {
      instanceId: "5fc6bcc946bd6",
      sort: 0,
      key: "3.2",
      text: "menu-group-04-03",
      to: "/nlicro-test2",
      type: "group",
      title: "menu-group-04-03",
      items: [
        {
          instanceId: "3.2.0",
          key: "3.2.0",
          sort: 0,
          text: "menu-item-3.2.0",
          to: "/nlicro-test772",
          type: "default",
        },
        {
          instanceId: "3.2.1",
          key: "3.2.1",
          sort: 0,
          text: "menu-item-3.2.1",
          to: "/nlicro-test772",
          type: "default",
        },
        {
          instanceId: "3.2.2",
          key: "3.2.2",
          sort: 0,
          text: "menu-item-3.2.2",
          to: "/nlicro-test772",
          type: "default",
        },
      ],
    },
    {
      instanceId: "5fc6bcc946c3a",
      sort: 0,
      key: "3.3",
      text: "menu-group-04-04",
      to: "/nlicro-test2",
      type: "default",
      title: "menu-group-04-04",
    },
    {
      instanceId: "5fc6bcc946c9e",
      sort: 0,
      key: "3.4",
      text: "menu-group-04-05",
      to: "/nlicro-test2",
      type: "subMenu",
      title: "menu-group-04-05",
    },
  ],
  defaultExpanded: false,
  childLayout: "category",
} as SidebarMenuGroups;

describe("ThreeLevelMenuPopoverContent", () => {
  it("should work without selectedKey", () => {
    const wrapper = mount(
      <ThreeLevelMenuPopoverContent menuItem={menuItem} selectedKey={[]} />
    );

    expect(wrapper.find(".groupItem")).toHaveLength(4);
    expect(wrapper.find(".groupItemChecked")).toHaveLength(0);
    expect(
      wrapper.find(".groupItem").at(0).hasClass("groupItemActive")
    ).toBeTruthy();
    expect(wrapper.find(".menuContainer")).toHaveLength(1);
    expect(wrapper.find(".menuHeaderText").text()).toBe("menu-group-04-01");

    wrapper.find(".groupItem").at(1).simulate("mouseenter");
    expect(
      wrapper.find(".groupItem").at(1).hasClass("groupItemActive")
    ).toBeTruthy();
    expect(wrapper.find(".menuHeaderText").text()).toBe("menu-group-04-02");
    expect(wrapper.find(".menuItem")).toHaveLength(3);

    wrapper.find(".menuItem").at(1).simulate("click");
    expect(
      wrapper.find(".menuItem").at(1).hasClass("menuItemActive")
    ).toBeTruthy();
  });

  it("should work with selectedKey", () => {
    const wrapper = mount(
      <ThreeLevelMenuPopoverContent
        menuItem={menuItem}
        selectedKey={["3.0.0"]}
      />
    );

    expect(
      wrapper.find(".groupItem").at(0).hasClass("groupItemChecked")
    ).toBeTruthy();
    expect(
      wrapper.find(".groupItem").at(0).hasClass("groupItemActive")
    ).toBeTruthy();

    expect(wrapper.find(".menuItem")).toHaveLength(3);
    expect(
      wrapper.find(".menuItem").at(0).hasClass("menuItemChecked")
    ).toBeTruthy();
    expect(wrapper.find(".menuItemActive")).toHaveLength(0);
  });
});
