import React from "react";
import { shallow } from "enzyme";
import { LegacyBrickTimePicker } from "./BrickTimePicker";

describe("BrickTimePicker", () => {
  it("should work", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<LegacyBrickTimePicker onChange={onChange} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should trigger change event", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<LegacyBrickTimePicker onChange={onChange} />);
    wrapper.simulate("change");
    expect(onChange).toHaveBeenCalled();
  });
});
