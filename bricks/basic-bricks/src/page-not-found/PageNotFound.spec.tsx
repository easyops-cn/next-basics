import React from "react";
import { shallow } from "enzyme";
import { PageNotFound } from "./PageNotFound";

describe("PageNotFound", () => {
  it("should work", () => {
    const wrapper = shallow(<PageNotFound url="http://example.com" />);
    expect(wrapper).toMatchSnapshot();
  });
});
