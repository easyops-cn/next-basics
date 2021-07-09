import React from "react";
import { shallow } from "enzyme";
import { RefItem } from "./RefItem";

describe("RefItem", () => {
  it("should work", () => {
    const wrapper = shallow(<RefItem />);
    expect(wrapper.find("div").text()).toBe("FLOW_BUILDER works!");
  });
});
