import React from "react";
import { shallow, mount } from "enzyme";
import { SidebarMenu } from "./SidebarMenu";
import { createHistory } from "@next-core/brick-kit";
import { GeneralIcon } from "@next-libs/basic-components";
import { Menu } from "antd";
import { menuData1, menuData2 } from "./mockData";

createHistory();

describe("SidebarMenu", () => {
  it("should render GeneralIcon correctly", () => {
    const wrapper = mount(
      <SidebarMenu menuItems={menuData1.menuItems} collapsed={true} />
    );
    // Menu.Item in Menu.SubMenu should not render GeneralIcon
    // Menu.SubMenu only render title's GeneralIcon
    expect(wrapper.find(Menu.SubMenu).find(GeneralIcon)).toHaveLength(1);
    expect(wrapper.find(GeneralIcon)).toHaveLength(6); // 3 + 2 + 1
  });

  it("should work", () => {
    const wrapper = mount(<SidebarMenu menuItems={menuData2.menuItems} />);
    expect(wrapper.find(GeneralIcon)).toHaveLength(3);
  });
});
