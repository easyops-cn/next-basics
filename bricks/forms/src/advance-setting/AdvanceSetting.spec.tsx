import React from "react";
import { shallow } from "enzyme";
import { AdvanceSetting } from "./AdvanceSetting";

describe("AdvanceSetting", () => {
  it("should work", () => {
    const wrapper = shallow(<AdvanceSetting foldName={"xxx"} />);
    wrapper.setProps({
      showDivider: true,
      dividerOrientation: "left",
      dividerDashed: true,
      show: true,
    });
    expect(wrapper.find(".foldActive").length).toEqual(1);
    expect(wrapper.find("Divider").length).toBe(1);
  });
});
