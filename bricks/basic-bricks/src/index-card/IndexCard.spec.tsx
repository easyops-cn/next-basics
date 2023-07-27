import React from "react";
import { shallow } from "enzyme";
import { IndexCard } from "./IndexCard";

describe("IndexCard", () => {
  it("should work", () => {
    const wrapper = shallow(<IndexCard title="title" />);
    expect(wrapper).toMatchSnapshot();
  });
});
