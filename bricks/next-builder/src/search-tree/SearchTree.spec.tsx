import React from "react";
import { shallow } from "enzyme";
import { SearchTree } from "./SearchTree";

describe("SearchTree", () => {
  it("should work", () => {
    const wrapper = shallow(<SearchTree />);
    expect(wrapper.find("div").text()).toBe("NEXT_BUILDER works!");
  });
});
