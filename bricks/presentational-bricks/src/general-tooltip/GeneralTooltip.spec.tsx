import React from "react";
import { mount, shallow } from "enzyme";
import { GeneralTooltip } from "./GeneralTooltip";
import { Tooltip, Popover } from "antd";

jest.mock("@next-libs/basic-components", () => {
  return {
    GeneralIcon: function GeneralIcon() {
      return <div>general icon</div>;
    },
  };
});

const displayBrick = {
  useBrick: {
    brick: "div",
    properties: {
      id: "story-point-display",
    },
    transform: {
      textContent: "@{storyPoint}",
    },
  },
};

describe("GeneralTooltip", () => {
  it("tooltips type should work", () => {
    const wrapper = mount(
      <GeneralTooltip
        content="this is a tooltip"
        icon={{ icon: "cube", lib: "fa" }}
        type="tooltip"
        tooltipConfig={{ placement: "topRight", arrowPointAtCenter: true }}
      />
    );
    wrapper.find(".iconContainer").simulate("mouseenter");
    const tooltip = wrapper.find(Tooltip).at(0);
    expect(tooltip.props().align).toEqual({ offset: [20, 1] });
    expect(tooltip.props().title).toEqual("this is a tooltip");
  });

  it("should work with text", () => {
    const wrapper = shallow(
      <GeneralTooltip
        text="text"
        content="this is a tooltip"
        icon={{ icon: "cube", lib: "fa" }}
        type="tooltip"
      />
    );
    expect(wrapper.find(".text").text()).toBe("text");
  });

  it("popover type should work", () => {
    const wrapper = mount(
      <GeneralTooltip
        title="custom title"
        content="this is a popover"
        icon={{ icon: "cube", lib: "fa" }}
        type="popover"
      />
    );
    wrapper.find(".iconContainer").simulate("mouseenter");
    const popover = wrapper.find(Popover).at(0);
    expect(popover.props().content).toEqual("this is a popover");
    expect(popover.props().title).toEqual("custom title");
  });

  it("should work with triggerByIcon", () => {
    const wrapper = shallow(
      <GeneralTooltip
        text="text"
        content={["line 1", "line 2", "line 3"]}
        icon={{ icon: "cube", lib: "fa" }}
        type="tooltip"
        triggerByIcon={true}
      />
    );
    const title = wrapper.find(Tooltip).props().title as React.ReactElement;
    expect(title.props?.className).toBe("descContainer");
    expect(title.props?.children.length).toBe(3);

    expect(wrapper.find(".text").parent().is(Tooltip)).toEqual(false);
    expect(wrapper.find(Tooltip).children().length).toBe(1);
    wrapper.setProps({
      triggerByIcon: false,
    });
    wrapper.update();
    expect(wrapper.find(".text").parent().is(Tooltip)).toEqual(true);
    expect(wrapper.find(Tooltip).children().length).toBe(2);
  });

  it("should pass data", () => {
    const wrapper = mount(
      <GeneralTooltip
        title="custom title"
        content={["name: jack", "age:18", "hobby: sport"]}
        icon={{ icon: "cube", lib: "fa" }}
        type="popover"
      />
    );

    wrapper.find(".iconContainer").simulate("mouseenter");
    const popover = wrapper.find(Popover).at(0);

    expect(popover.props().title).toEqual("custom title");
  });

  it("should work with displayBrick", () => {
    const wrapper = mount(
      <GeneralTooltip
        displayBrick={displayBrick}
        content="this is a tooltip"
        type="tooltip"
      />
    );
    expect(wrapper.find("BrickAsComponent").length).toBe(1);
    wrapper.find(".contentContainer").simulate("mouseenter");
    const tooltip = wrapper.find(Tooltip).at(0);
    expect(tooltip.props().title).toEqual("this is a tooltip");
  });
});
