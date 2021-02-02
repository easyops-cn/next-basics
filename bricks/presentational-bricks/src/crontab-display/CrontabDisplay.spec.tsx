import React from "react";
import { shallow } from "enzyme";
import { CrontabDisplay } from "./CrontabDisplay";

describe("CrontabDisplay", () => {
  it("should work", () => {
    const wrapper = shallow(<CrontabDisplay value="5 1 3 * *" />);
    expect(wrapper.find("div").text()).toBe(
      "5 1 3 * *（在 01:05 AM, 每月的 3 号）"
    );
  });
});
