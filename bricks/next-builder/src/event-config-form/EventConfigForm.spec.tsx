import React from "react";
import { shallow } from "enzyme";
import { EventConfigForm } from "./EventConfigForm";

describe("EventConfigForm", () => {
  it("should work", () => {
    const wrapper = shallow(<EventConfigForm />);
    expect(wrapper.find("div").text()).toBe("NEXT_BUILDER works!");
  });
});
