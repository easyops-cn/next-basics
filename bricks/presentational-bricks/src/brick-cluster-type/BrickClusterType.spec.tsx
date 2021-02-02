import React from "react";
import { shallow } from "enzyme";
import { BrickClusterType } from "./BrickClusterType";

describe("BrickClusterType", () => {
  it("should work", () => {
    const wrapper = shallow(<BrickClusterType value="0" />);
    expect(wrapper).toMatchSnapshot();
  });
});
