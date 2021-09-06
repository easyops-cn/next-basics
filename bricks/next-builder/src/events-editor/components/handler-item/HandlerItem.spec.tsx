import React from "react";
import { shallow } from "enzyme";
import { HandlerItem } from "./HandlerItem";

describe("HandlerItem", () => {
  it("should work", () => {
    const wrapper = shallow(<HandlerItem />);
    expect(wrapper.find("div").text()).toBe("NEXT_BUILDER works!");
  });
});
