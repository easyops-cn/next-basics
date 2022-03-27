import React from "react";
import { shallow } from "enzyme";
import { MoreOption } from "./MoreOption";

describe("MoreOption", () => {
  it("should work", () => {
    const wrapper = shallow(<MoreOption />);
    expect(wrapper.find("div").text()).toBe("FLOW_BUILDER works!");
  });
});
