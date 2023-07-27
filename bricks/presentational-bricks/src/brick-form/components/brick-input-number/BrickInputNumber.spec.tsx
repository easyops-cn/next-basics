import React from "react";
import { shallow } from "enzyme";
import { LegacyBrickInputNumber } from "./BrickInputNumber";

describe("BrickInputNumber", () => {
  it("should work", () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<LegacyBrickInputNumber onChange={mockFn} />);
    expect(wrapper).toMatchSnapshot();

    wrapper.simulate("change", { target: { value: 4 } });

    expect(mockFn).toHaveBeenCalled();
  });
});
