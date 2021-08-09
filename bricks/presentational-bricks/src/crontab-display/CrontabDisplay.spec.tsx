import React from "react";
import { shallow } from "enzyme";
import { CrontabDisplay } from "./CrontabDisplay";

describe("CrontabDisplay", () => {
  it("should work", () => {
    const wrapper = shallow(<CrontabDisplay value={null} />);
    wrapper.setProps({
      value: "5 1 3 * *",
    });
    wrapper.update();
    expect(wrapper.find("div").text()).toBe(
      "5 1 3 * *（在上午 01:05, 限每月 3 号）"
    );
  });
});
