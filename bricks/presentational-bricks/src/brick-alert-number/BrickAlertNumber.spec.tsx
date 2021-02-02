import React from "react";
import { shallow } from "enzyme";
import { BrickAlertNumber } from "./BrickAlertNumber";

describe("BrickAlertNumber", () => {
  it("should work, 0", () => {
    const wrapper = shallow(<BrickAlertNumber alertNumber={0} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should work, 1", () => {
    const wrapper = shallow(<BrickAlertNumber alertNumber={1} />);
    expect(wrapper).toMatchSnapshot();
  });
});
