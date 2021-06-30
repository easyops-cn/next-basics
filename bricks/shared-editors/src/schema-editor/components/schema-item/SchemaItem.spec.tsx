import React from "react";
import { shallow } from "enzyme";
import { SchemaItem } from "./SchemaItem";

describe("SchemaItem", () => {
  it("should work", () => {
    const wrapper = shallow(<SchemaItem />);
    expect(wrapper.find("div").text()).toBe("SHARED_EDITORS works!");
  });
});
