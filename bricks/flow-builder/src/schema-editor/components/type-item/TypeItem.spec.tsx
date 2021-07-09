import React from "react";
import { shallow } from "enzyme";
import { TypeItem } from "./TypeItem";

describe("TypeItem", () => {
  it("should work", () => {
    const wrapper = shallow(<TypeItem />);
    expect(wrapper.find("div").text()).toBe("FLOW_BUILDER works!");
  });
});
