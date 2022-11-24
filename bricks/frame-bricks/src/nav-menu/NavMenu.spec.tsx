import React from "react";
import { Menu } from "antd";
import { mount } from "enzyme";
import { NavMenu } from "./NavMenu";
import { SidebarMenuItem } from "@next-core/brick-types";
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
    useBrick: {
      brick: "span",
      properties: {
        textContent: "subMenu",
      },
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
        useBrick: {
          brick: "span",
          properties: {
            textContent: "group-1",
          },
        },
        items: [
          {
            text: "subMenu-group-item-1",
            type: "default",
            to: "/page-1-1",
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
            to: "/page-1-2",
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
      },
    ],
  },
  {
    type: "group",
    title: "empty-group-should-not-render",
    items: [],
  },
  {
    type: "default",
    text: "page-3",
  },
  {
    type: "default",
    text: "page-4",
  },
  {
    type: "default",
    text: "page-5",
    divider: true,
  },
] as SidebarMenuItem[];

describe("NavMenu", () => {
  it("should work", () => {
    const wrapper = mount(<NavMenu menuItems={sideBarMenuItem} />);

    expect(wrapper.find(Menu).prop("selectedKeys")).toEqual(["0.0.1"]);

    expect(wrapper.find(Menu.SubMenu).length).toBe(2);

    expect(wrapper.find(Menu.Item).length).toBe(2);
  });

  it("should work while customItem was true", () => {
    const wrapper = mount(<NavMenu menuItems={[]} />);

    expect(wrapper.find(Menu.SubMenu).length).toBe(0);
  });

  it("should be rendered as divider when item property `divider` is true", () => {
    const wrapper = mount(<NavMenu menuItems={sideBarMenuItem} />);

    expect(wrapper.find(Menu.Divider).length).toBe(1);
  });
});
