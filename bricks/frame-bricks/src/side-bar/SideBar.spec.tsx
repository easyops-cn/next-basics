import React from "react";
import { shallow } from "enzyme";
import { ExpandedState, SideBar } from "./SideBar";
import { menuData1, menuData2 } from "./mockData";
import { Tooltip } from "antd";

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

  it("should work when first used", () => {
    const mouseEnter = jest.fn();
    const mouseLeave = jest.fn();
    const wrapper = shallow(
      <SideBar
        menu={menuData1}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      />
    );
    expect(
      wrapper.find(Tooltip).prop("color").startsWith("linear-gradient")
    ).toBe(true);

    wrapper.simulate("mouseenter");
    expect(mouseEnter).toBeCalledTimes(1);
    wrapper.simulate("mouseleave");
    expect(mouseLeave).toBeCalledTimes(1);

    wrapper.simulate("mouseenter");
    expect(mouseEnter).toBeCalledTimes(2);

    wrapper.find(".fixedIcon").simulate("click");
    expect(
      wrapper.find(Tooltip).prop("color").startsWith("linear-gradient")
    ).not.toBe(true);

    wrapper.simulate("mouseleave");
    expect(mouseLeave).toBeCalledTimes(1);

    wrapper.simulate("mouseenter");
    expect(mouseEnter).toBeCalledTimes(3);

    wrapper.find(".fixedIcon").simulate("click");

    wrapper.simulate("mouseleave");
    expect(mouseLeave).toBeCalledTimes(2);
  });

  it("should work with no props", () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper).toBeTruthy();
  });
});
