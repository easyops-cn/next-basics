import React from "react";
import { shallow } from "enzyme";
import { BrickButton } from "./BrickButton";

describe("BrickButton", () => {
  it("should work", () => {
    const text = "保存";
    const wrapper = shallow(<BrickButton text={text} />);
    expect(wrapper).toBeTruthy();
  });
});
