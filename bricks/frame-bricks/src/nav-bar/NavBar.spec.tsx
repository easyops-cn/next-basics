import React from "react";
import { shallow } from "enzyme";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
  it("should work", () => {
    const wrapper = shallow(<NavBar />);

    expect(wrapper).toMatchSnapshot();
  });
});
