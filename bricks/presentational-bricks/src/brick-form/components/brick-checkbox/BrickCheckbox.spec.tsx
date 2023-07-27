import React from "react";
import { shallow } from "enzyme";
import { LegacyBrickCheckbox } from "./BrickCheckbox";

describe("BrickCheckbox", () => {
  it("should work", () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<LegacyBrickCheckbox onChange={mockFn} />);
    expect(wrapper).toBeTruthy();

    wrapper.setProps({
      optionList: [{ name: "a", id: "23ba2" }],
    });
    wrapper.simulate("change", { target: { value: ["a"] } });
    expect(mockFn).toHaveBeenCalled();
  });
});
