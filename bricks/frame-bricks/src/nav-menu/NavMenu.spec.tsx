import React from "react";
import { Menu } from "antd";
import { mount } from "enzyme";
import { NavMenu } from "./NavMenu";
import { SidebarSubMenu } from "@next-core/brick-types";
import * as brickKit from "@next-core/brick-kit";

jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  listen: () => {},
} as any);

jest.spyOn(brickKit, "getRuntime").mockReturnValue({} as any);

const mockData = {
  title: "二级菜单标题",
  link: "/nlicro-test/aaaa",
  menuItems: [
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
          type: "group",
          title: "group-1",
          icon: {
            color: "geekblue",
            icon: "anchor",
            lib: "fa",
            prefix: "fas",
          },
          items: [
            {
              text: "subMenu-group-item-1",
              type: "default",
              key: "1",
              icon: {
                color: "geekblue",
                icon: "anchor",
                lib: "fa",
                prefix: "fas",
              },
            },
            {
              text: "subMenu-group-item-2",
              type: "default",
              key: "2",
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
    },
    {
      type: "group",
      title: "group-2",
      items: [
        {
          type: "default",
          text: "group-2-item-1",
          key: "3",
        },
      ],
    },
    {
      type: "default",
      text: "page-3",
      key: "4",
    },
  ],
} as SidebarSubMenu;

describe("NavMenu", () => {
  it("should work", () => {
    const wrapper = mount(
      <NavMenu menuItems={mockData.menuItems} selectedKeys={["3"]} />
    );

    expect(wrapper.find(Menu).prop("selectedKeys")).toEqual(["3"]);

    expect(wrapper.find(Menu.SubMenu).length).toBe(2);

    expect(wrapper.find(Menu.Item).length).toBe(1);

    wrapper.find(Menu.Item).last().simulate("click");

    wrapper.update();

    expect(wrapper.find(Menu).prop("selectedKeys")).toEqual(["4"]);
  });
});
