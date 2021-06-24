import React from "react";
import { mount } from "enzyme";
import { HeaderBar } from "./HeaderBar";

describe("HeaderBar", () => {
  it("should work", () => {
    const logClick = jest.fn();
    const props = {
      logoUrl:
        "http://localhost:8081/micro-apps/micro-apps-management/icons/large.png",
      headerBackgroundColor: "#2d3040",
    };
    const wrapper = mount(<HeaderBar />);
    expect(wrapper.find(".headerBar").length).toEqual(1);
    wrapper.setProps(props);
    wrapper.update();
  });
});
