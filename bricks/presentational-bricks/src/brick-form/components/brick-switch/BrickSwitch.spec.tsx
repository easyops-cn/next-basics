import React from "react";
import { shallow } from "enzyme";
import { LegacyBrickSwitch } from "./BrickSwitch";

describe("BrickSwitch", () => {
  it("should work", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<LegacyBrickSwitch onChange={onChange} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should trigger change event", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<LegacyBrickSwitch onChange={onChange} />);
    wrapper.simulate("change");
    expect(onChange).toHaveBeenCalled();
  });
});
