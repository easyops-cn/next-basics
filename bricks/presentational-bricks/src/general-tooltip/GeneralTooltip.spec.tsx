import React from "react";
import { mount, shallow } from "enzyme";
import { GeneralTooltip } from "./GeneralTooltip";
import * as basicComponents from "@next-libs/basic-components";
import { Tooltip, Popover } from "antd";

jest.spyOn(basicComponents, "GeneralIcon").mockImplementation(() => {
  return <div>general icon</div>;
});

describe("GeneralTooltip", () => {
  it("tooltips type should work", () => {
    const wrapper = mount(
      <GeneralTooltip
        content="this is a tooltip"
        icon={{ icon: "cube", lib: "fa" }}
        type="tooltip"
      />
    );
    wrapper.find(".iconContainer").simulate("mouseenter");

    const tooltip = wrapper.find(Tooltip).at(0);

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
    expect(wrapper.find(".text").length).toBe(1);
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
});
