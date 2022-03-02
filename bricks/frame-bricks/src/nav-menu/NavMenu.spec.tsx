import React from "react";
import { Menu } from "antd";
import { mount } from "enzyme";
import { NavMenu } from "./NavMenu";
import { SidebarMenuItem } from "@next-core/brick-types";
import * as brickKit from "@next-core/brick-kit";
import { act } from "react-dom/test-utils";

jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {
    pathname: "/page-1",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  listen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createHref: () => {},
} as any);

let menuItems = [
  {
    text: "page-1",
    type: "default",
    key: "0",
    to: "/page-1",
  },
  {
    text: "page-2",
    type: "default",
    key: "1",
    to: "/page-2",
  },
];

jest.spyOn(brickKit, "getRuntime").mockReturnValue({
  fetchMenu: () => {
    return {
      menuItems: menuItems,
    };
  },
  getCurrentRoute: () => {
    return {
      menu: {
        menuId: "123",
      },
    };
  },
} as any);

const sideBarMenuItem = [
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
] as SidebarMenuItem[];

describe("NavMenu", () => {
  it("should work", () => {
    const wrapper = mount(
      <NavMenu
        menuItems={sideBarMenuItem}
        isCustom={true}
        selectedKeys={["3"]}
      />
    );

    expect(wrapper.find(Menu).prop("selectedKeys")).toEqual(["3"]);

    expect(wrapper.find(Menu.SubMenu).length).toBe(2);

    expect(wrapper.find(Menu.Item).length).toBe(1);

    wrapper.find(Menu.Item).last().simulate("click");

    wrapper.update();

    expect(wrapper.find(Menu).prop("selectedKeys")).toEqual(["4"]);
  });

  it("should work while customItem was true", () => {
    const wrapper = mount(
      <NavMenu menuItems={[]} isCustom={true} selectedKeys={["3"]} />
    );

    expect(wrapper.find(Menu).prop("selectedKeys")).toEqual(["3"]);

    expect(wrapper.find(Menu.SubMenu).length).toBe(0);
  });

  it("should work while use getRuntime menu", async () => {
    const wrapper = mount(<NavMenu />);

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();

    expect(wrapper.find(Menu.Item).length).toBe(2);

    wrapper.find(Menu.Item).last().simulate("click");

    wrapper.update();

    expect(wrapper.find(Menu).prop("selectedKeys")).toEqual(["1"]);
  });

  it("should work while use getRuntime  was null", async () => {
    menuItems = [];
    const wrapper = mount(<NavMenu />);

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();

    expect(wrapper.find(Menu.Item).length).toBe(0);
  });
});
