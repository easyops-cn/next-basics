import React from "react";
import { shallow } from "enzyme";
import { ButtonWrapper } from "./ButtonWrapper";

describe("ButtonWrapper", () => {
  it("should work", () => {
    const wrapper = shallow(<ButtonWrapper />);
    expect(wrapper).toMatchSnapshot();
  });
});
