import React from "react";
import { mount, shallow } from "enzyme";
import { BrickCollapseCard } from "./BrickCollapseCard";

describe("BrickCollapseCard", () => {
  it("should work when isActive is false", () => {
    const wrapper = shallow(
      <BrickCollapseCard
        title="工具"
        expandActiveText="收起"
        expandInactiveText="展开"
        expandActiveIcon="up"
        expandInactiveIcon="down"
        isActive={false}
        hasHeaderSlot={false}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should work when isActive is true", () => {
    const wrapper = shallow(
      <BrickCollapseCard
        title="Sleep"
        expandActiveText="收起"
        expandInactiveText="工具详情"
        expandActiveIcon="up"
        expandInactiveIcon="down"
        isActive={true}
        hasHeaderSlot={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should work", () => {
    const wrapper = mount(
      <BrickCollapseCard
        title="标题"
        expandActiveText="收起"
        expandInactiveText="展开"
        expandActiveIcon="up"
        expandInactiveIcon="down"
        isActive={true}
      />
    );
    expect(wrapper.find(".collapseTitle").text()).toEqual("标题");
    expect(wrapper.find(".expandText").text()).toEqual("收起");
    expect(wrapper.find(".ant-collapse-content-active").length).toEqual(1);
    wrapper.setProps({
      isActive: false,
    });
    wrapper.update();
    expect(wrapper.find(".expandText").text()).toEqual("展开");
    expect(wrapper.find(".ant-collapse-content-inactive").length).toEqual(1);
  });
});
