import React from "react";
import { shallow } from "enzyme";
import { Tooltip } from "antd";
import { MenuTooltip } from "./MenuTooltip";

describe("MenuTooltip", () => {
  it("should render as visible is false when not collapsed", () => {
    const wrapper = shallow(<MenuTooltip title="hello" collapsed={false} />);
    expect(wrapper.find(Tooltip).prop("visible")).toBe(false);
    expect(wrapper.find(Tooltip).prop("title")).toBe(null);
  });

  it("should render tooltip when collapsed", () => {
    const wrapper = shallow(<MenuTooltip title="hello" collapsed={true} />);
    expect(wrapper.find(Tooltip).prop("visible")).toBe(undefined);
    expect(wrapper.find(Tooltip).prop("title")).toBe("hello");
  });
});
