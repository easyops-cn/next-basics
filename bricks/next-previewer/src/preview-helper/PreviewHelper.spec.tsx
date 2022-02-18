import React from "react";
import { shallow } from "enzyme";
import { PreviewHelper } from "./PreviewHelper";

describe("PreviewHelper", () => {
  it("should work", () => {
    const wrapper = shallow(<PreviewHelper />);
    expect(wrapper.find("div").text()).toBe("NEXT_PREVIEWER works!");
  });
});
