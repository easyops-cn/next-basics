import React from "react";
import { shallow, mount } from "enzyme";
import { ExpandedState, SideBar } from "./SideBar";
import { SidebarMenu } from "./SidebarMenu";
import { menuData1 } from "./mockData";

import * as brickKit from "@next-core/brick-kit";
import { act } from "@testing-library/react";

jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {
    pathname: "/page-1",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  listen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createHref: () => {},
} as any);

jest.mock("@next-libs/storage", () => ({
  JsonStorage: jest.fn(() => {
    let mockStorageValue: any;
    return {
      getItem: () => mockStorageValue,
      setItem: (_: string, value: any): void => (mockStorageValue = value),
    };
  }),
}));

describe("SideBar", () => {
  it("should work when ExpandedState is Collapsed", () => {
    const wrapper = shallow(
      <SideBar menu={menuData1} expandedState={ExpandedState.Collapsed} />
    );
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(false);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(false);
    wrapper.find(".sideBarContainer").simulate("mouseenter");
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(true);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(false);
    wrapper.find(".sideBarContainer").simulate("mouseleave");
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(false);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(false);
    wrapper.find(".sideBarContainer").simulate("mouseenter");
    wrapper.find(".fixedIcon").simulate("click");
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(false);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(true);
  });

  it("should work when ExpandedState is Hovered", () => {
    const wrapper = shallow(
      <SideBar menu={menuData1} expandedState={ExpandedState.Hovered} />
    );
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(true);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(false);
    wrapper.find(".sideBarContainer").simulate("mouseenter");
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(true);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(false);
    wrapper.find(".sideBarContainer").simulate("mouseleave");
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(false);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(false);
    wrapper.find(".sideBarContainer").simulate("mouseenter");
    wrapper.find(".fixedIcon").simulate("click");
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(false);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(true);
  });

  it("should work when ExpandedState is Expanded", () => {
    const wrapper = shallow(
      <SideBar menu={menuData1} expandedState={ExpandedState.Expanded} />
    );
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(false);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(true);
    wrapper.find(".sideBarContainer").simulate("mouseenter");
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(false);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(true);
    wrapper.find(".sideBarContainer").simulate("mouseleave");
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(false);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(true);
    wrapper.find(".sideBarContainer").simulate("mouseenter");
    wrapper.find(".fixedIcon").simulate("click");
    expect(wrapper.find(".sideBarContainer").hasClass("hovered")).toBe(false);
    expect(wrapper.find(".sideBarContainer").hasClass("expanded")).toBe(false);
  });

  it("should work with no props", async () => {
    const wrapper = mount(<SideBar />);

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();

    expect(wrapper.find(SidebarMenu).length).toBe(1);

    expect(wrapper).toBeTruthy();
  });

  it("should work while customItem was true", () => {
    const wrapper = mount(
      <SideBar
        menu={{
          title: "",
          menuItems: [
            {
              text: "page-1",
              type: "default",
              to: "/page-1",
            },
          ],
        }}
      />
    );

    expect(wrapper.find(".ant-menu-item").length).toEqual(1);
  });

  it("should hidden content box-shadow if it is scrolled to the bottom", () => {
    const wrapper = mount(<SideBar menu={menuData1} />);
    const e = {
      target: { scrollHeight: 100, scrollTop: 50, offsetHeight: 60 },
    };
    wrapper.find(".sidebarContentContainer").simulate("scroll", e);
    expect(wrapper.find(".hiddenSidebarContentContainerShadow").length).toBe(1);
  });
});
