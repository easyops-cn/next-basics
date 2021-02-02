import React from "react";
import { shallow } from "enzyme";
import { LegacyBrickInput, LegacyBrickInputType } from "./BrickInput";

describe("BrickInput", () => {
  const onChange = jest.fn();
  it("should work", () => {
    const wrapper = shallow(<LegacyBrickInput onChange={onChange} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should trigger change event", () => {
    const wrapper = shallow(
      <LegacyBrickInput
        onChange={onChange}
        type={LegacyBrickInputType.TextArea}
      />
    );
    wrapper.simulate("change", { target: { value: "x" } });
    expect(onChange).toHaveBeenCalled();
  });
});
