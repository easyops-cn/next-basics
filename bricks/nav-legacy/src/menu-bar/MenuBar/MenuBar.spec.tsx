import React from "react";
import { mount } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { SidebarMenu } from "@next-core/brick-types";
import { MenuBar } from "./MenuBar";
import { AppSubMenu } from "../AppSubMenu/AppSubMenu";

jest.mock("../LogoBar/LogoBar");
jest.mock("../AppMenu/AppMenu");
jest.mock("../CollapseBar/CollapseBar");
jest.mock("../AppSubMenu/AppSubMenu");

jest.spyOn(kit, "useCurrentApp").mockReturnValue(null);

describe("MenuBar", () => {
  it("should toggle collapsed", () => {
    const menu: SidebarMenu = {
      title: "Great",
      menuItems: [],
    };
    const wrapper = mount(<MenuBar menu={menu} subMenu={null} />);
    expect(document.body.classList.contains("menu-bar-collapsed")).toBe(false);
    wrapper.setProps({
      collapsed: true,
    });
    expect(document.body.classList.contains("menu-bar-collapsed")).toBe(true);
    expect(wrapper.find(AppSubMenu).length).toBe(0);

    wrapper.setProps({
      subMenu: {
        title: "For Test",
        menuItems: [],
      },
    });
    expect(wrapper.find(AppSubMenu).length).toBe(1);
  });
});
