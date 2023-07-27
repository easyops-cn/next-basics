import React from "react";
import { shallow } from "enzyme";
import { FoldBrickV2 } from "./FoldBrickV2";

describe("FoldBrickV2", () => {
  it("should work", () => {
    const wrapper = shallow(<FoldBrickV2 foldName={"xxx"} />);
    expect(wrapper.text()).toContain("xxx");
    wrapper.setProps({
      show: true,
    });
    expect(wrapper.find(".foldActive").length).toEqual(1);
    expect(wrapper.find("Divider").length).toBe(0);
    wrapper.setProps({
      showDivider: true,
      dividerOrientation: "left",
      dividerDashed: true,
    });
    wrapper.update();
    expect(wrapper.find("Divider").length).toBe(1);
  });
  it("should work and isShowFoldIcon is  false", () => {
    const wrapper = shallow(
      <FoldBrickV2 foldName={"xxx"} isShowFoldIcon={false} />
    );
    expect(wrapper.text()).toContain("xxx");
    wrapper.setProps({
      show: true,
    });
    expect(wrapper.find("span").length).toEqual(1);
  });
  it("should work and type is  primary", () => {
    const wrapper = shallow(
      <FoldBrickV2 foldName={"xxx"} isShowFoldIcon={false} type={"primary"} />
    );

    expect(wrapper.find(".foldPrimaryActive").length).toEqual(1);
  });
});
