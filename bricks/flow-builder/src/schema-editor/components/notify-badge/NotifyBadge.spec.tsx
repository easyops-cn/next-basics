import React from "react";
import { shallow } from "enzyme";
import { NotifyBadge } from "./NotifyBadge";

describe("NotifyBadge", () => {
  it("should work", () => {
    const wrapper = shallow(<NotifyBadge />);
    expect(wrapper.find("div").text()).toBe("FLOW_BUILDER works!");
  });
});
