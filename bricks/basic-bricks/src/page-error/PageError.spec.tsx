import React from "react";
import { shallow } from "enzyme";
import { PageError } from "./PageError";

describe("PageError", () => {
  it("should work", () => {
    const wrapper = shallow(<PageError error="oops" />);
    expect(wrapper).toMatchSnapshot();
  });
});
