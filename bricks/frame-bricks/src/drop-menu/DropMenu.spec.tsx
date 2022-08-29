import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  DropMenu,
  filterBySearch,
  matchSearchValue,
  SubCategory,
} from "./DropMenu";
import { mount, shallow } from "enzyme";
import { DownOutlined, UpOutlined, TagOutlined } from "@ant-design/icons";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import { Button, Input, Popover } from "antd";

describe("DropMenu", () => {
  const menuData = [
    {
      title: "xxx",
      children: [{ name: "xxx", to: "/ddd" }],
      subCategory: [
        {
          title: "xxx",
          children: [
            {
              name: "xxx",
              to: "/ddd",
            },
          ],
        },
      ],
    },
  ];
  const menuDataTwo = [
    {
      title: "xxx",
      children: [{ name: "xxx", to: "/ddd" }],
      subCategory: [
        {
          title: "xxx",
          children: [
            {
              name: "xxx",
              to: "/ddd",
            },
          ],
        },
      ],
    },
    {
      title: "xxx",
      children: [{ name: "aaa", to: "/ddd" }],
      subCategory: [
        {
          title: "xxx",
          children: [
            {
              name: "aaa",
              to: "/ddd",
            },
          ],
        },
      ],
    },
  ];
  it("should work", () => {
    const wrapper = mount(<DropMenu menuData={menuData} title="xxx" />);
    const handleToggle = jest.fn();
    const div = wrapper.find("#menuPopover");
    expect(wrapper.find(DownOutlined)).toHaveLength(0);
    expect(wrapper.find(UpOutlined)).toHaveLength(0);
    expect(wrapper.find(Popover)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(0);
    expect(wrapper.find("#menuPopover")).toHaveLength(1);
    expect(wrapper.find(Popover).invoke("getPopupContainer")(null)).toEqual(
      null
    );
  });

  it("should work with SubCategory", () => {
    const subCategory = [
      {
        title: "xxx",
        children: [
          {
            name: "aaa",
            to: "/ddd",
          },
        ],
      },
    ];
    const wrapper = mount(<SubCategory {...subCategory} />);
    // expect(wrapper).toMatchSnapshot();
    const toggleBtn = wrapper.find(Button);
    expect(wrapper.find(DownOutlined)).toHaveLength(0);
    expect(wrapper.find(UpOutlined)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(0);
    toggleBtn.simulate("click");
    expect(wrapper.find(DownOutlined)).toHaveLength(1);
    expect(wrapper.find(UpOutlined)).toHaveLength(0);
  });

  it("should toMatchSnapshot work", () => {
    const wrapper = mount(<DropMenu menuData={menuData} title="xxx" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should work with matchSearchValue", () => {
    expect(matchSearchValue({ to: "/APP", name: "app" }, "app")).toBe(true);
    expect(matchSearchValue({ to: "/APP", name: "应用" }, "应用2")).toBe(false);
  });

  it("should work with filterBySearch", () => {
    expect(filterBySearch(menuDataTwo, "xxx")).toEqual([
      {
        title: "xxx",
        children: [{ name: "xxx", to: "/ddd" }],
        subCategory: [
          {
            title: "xxx",
            children: [
              {
                name: "xxx",
                to: "/ddd",
              },
            ],
          },
        ],
      },
    ]);
    expect(filterBySearch(menuData, "")).toEqual(menuData);
  });
});
