import React from "react";
import { shallow } from "enzyme";
import { SchemaEditor } from "./SchemaEditor";

describe("SchemaEditor", () => {
  it("should work", () => {
    const wrapper = shallow(<SchemaEditor />);
    expect(wrapper.find("div").text()).toBe("SHARED_EDITORS works!");
  });
});
