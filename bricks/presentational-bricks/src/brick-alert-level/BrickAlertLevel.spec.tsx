import React from "react";
import { shallow } from "enzyme";
import { BrickAlertLevel } from "./BrickAlertLevel";

describe("BrickAlertLevel", () => {
  it("should work", () => {
    const wrapper = shallow(<BrickAlertLevel value={1} />);
    expect(wrapper).toMatchSnapshot();
  });
});
