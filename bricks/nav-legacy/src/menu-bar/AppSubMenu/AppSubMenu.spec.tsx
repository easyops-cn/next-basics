import React from "react";
import { mount } from "enzyme";
import { AppSubMenu } from "./AppSubMenu";

jest.mock("@next-libs/basic-components");

describe("AppSubMenu", () => {
  it("should work", () => {
    expect(document.body.classList.contains("has-sub-menu")).toBe(false);
    const wrapper = mount(
      <AppSubMenu
        subMenu={{
          title: "For Test",
          menuItems: [],
        }}
      />
    );
    expect(document.body.classList.contains("has-sub-menu")).toBe(true);
    expect(wrapper.find(".appSubMenuTitle").text()).toBe("For Test");

    wrapper.unmount();
    expect(document.body.classList.contains("has-sub-menu")).toBe(false);
  });
});
