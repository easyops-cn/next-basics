import React from "react";
import { shallow } from "enzyme";
import { LegacyBrickDatePicker } from "./BrickDatePicker";

const onChange = jest.fn();

describe("BrickDatePicker", () => {
  it("should work when componentType undefined", () => {
    const wrapper = shallow(<LegacyBrickDatePicker onChange={onChange} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should work when componentType is 'MonthPicker'", () => {
    const wrapper = shallow(
      <LegacyBrickDatePicker componentType="MonthPicker" onChange={onChange} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should work when componentType is 'RangePicker'", () => {
    const wrapper = shallow(
      <LegacyBrickDatePicker componentType="RangePicker" onChange={onChange} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should work when componentType is 'WeekPicker'", () => {
    const wrapper = shallow(
      <LegacyBrickDatePicker componentType="WeekPicker" onChange={onChange} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should trigger change event", () => {
    const wrapper = shallow(<LegacyBrickDatePicker onChange={onChange} />);
    wrapper.simulate("change");
    expect(onChange).toHaveBeenCalled();
  });
});
