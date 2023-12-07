import React from "react";
import { shallow } from "enzyme";
import { AppBarSetting } from "./AppBarSetting";

describe("AppBarSetting", () => {
  it("should work", () => {
    const wrapper = shallow(<AppBarSetting />);
    expect(wrapper.find("div")).toBeTruthy();
  });
});
