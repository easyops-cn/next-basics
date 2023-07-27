import React from "react";
import { shallow } from "enzyme";
import { BrickDivider } from "./BrickDivider";
import { Divider } from "antd";

describe("BrickDivider", () => {
  it("should work", () => {
    const wrapper = shallow(
      <BrickDivider type="horizontal" dashed={false} dividerStyle={{}} />
    );
    expect(wrapper.find(Divider).length).toBe(1);
    expect(wrapper.find(Divider).prop("type")).toBe("horizontal");
  });
  it("should work and type is radiation", () => {
    const wrapper = shallow(<BrickDivider type="radiation" />);
    expect(wrapper.find(".DividerRadiationText").length).toBe(1);
    expect(wrapper.find(".DividerRadiation").length).toBe(1);
    wrapper.setProps({
      dividerTitle: "标题",
      proportion: [1, 3],
    });
    wrapper.update();
    expect(wrapper.find(".DividerRadiationTitle").length).toBe(1);
    expect(wrapper.find(".ProportionText").length).toBe(1);
  });
});
