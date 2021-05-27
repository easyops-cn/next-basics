import React from "react";
import { shallow } from "enzyme";
import { LibraryMenu } from "./LibraryMenu";
import { Menu } from "antd";
import { LibraryMenuItem } from "../interfaces";
import { act } from "react-dom/test-utils";

describe("LibraryMenu", () => {
  it("should work", () => {
    const menuItems = [
      { key: "all", children: [{ key: "all", text: "全部" }] },
      {
        key: "atom",
        title: "原子构件",
        type: "group",
        children: [
          { key: "layout", text: "布局" },
          { key: "card", text: "卡片" },
          { key: "description", text: "描述" },
        ],
      },
    ] as LibraryMenuItem[];

    const mockClick = jest.fn();

    const wrapper = shallow(
      <LibraryMenu menuItems={menuItems} onItemClick={mockClick} />
    );

    expect(wrapper.find("MenuItem").length).toEqual(4);

    act(() => {
      wrapper.find(Menu).invoke("onClick")({ key: "all" } as any);
    });
    expect(mockClick).toHaveBeenCalled();
  });
});
