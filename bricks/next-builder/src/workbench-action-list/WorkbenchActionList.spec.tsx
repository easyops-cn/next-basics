import React from "react";
import { mount } from "enzyme";
import { WorkbenchActionList } from "./WorkbenchActionList";
import { SidebarSubMenu } from "@next-core/brick-types";
import * as brickKit from "@next-core/brick-kit";

jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {
    pathname: "/page-1",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  listen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createHref: () => {},
} as any);

const menuData = {
  title: "二级菜单标题",
  link: "/sailor-test/aaaa",
  menuItems: [
    {
      text: "item1",
      type: "default",
      to: "/page-1",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
    },
    {
      text: "item2",
      type: "default",
      to: "/page-2",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
    },
    {
      text: "item3",
      type: "default",
      to: "/page-3",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
    },
    {
      type: "group",
      title: "group",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
      items: [
        {
          text: "group-item1",
          type: "default",
          icon: {
            color: "geekblue",
            icon: "anchor",
            lib: "fa",
            prefix: "fas",
          },
        },
      ],
    },
    {
      type: "subMenu",
      title: "subMenu",
      icon: {
        color: "geekblue",
        icon: "anchor",
        lib: "fa",
        prefix: "fas",
      },
      items: [
        {
          text: "subMenu-item1",
          type: "default",
          icon: {
            color: "geekblue",
            icon: "anchor",
            lib: "fa",
            prefix: "fas",
          },
        },
      ],
    },
  ],
  defaultCollapsedBreakpoint: 0,
} as SidebarSubMenu;

describe("WorkbenchActionList", () => {
  it("should work", () => {
    const wrapper = mount(<WorkbenchActionList menu={menuData} />);
    expect(wrapper.find("WorkbenchAction").length).toBe(3);
    expect(wrapper.find("WorkbenchAction").at(0).prop("active")).toBe(true);
    expect(wrapper.find("WorkbenchAction").at(1).prop("active")).toBe(false);
    expect(wrapper.find("WorkbenchAction").at(2).prop("active")).toBe(false);
  });
});
