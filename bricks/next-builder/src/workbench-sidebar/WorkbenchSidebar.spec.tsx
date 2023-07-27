import React from "react";
import { shallow } from "enzyme";
import { WorkbenchSidebar } from "./WorkbenchSidebar";

describe("WorkbenchSidebar", () => {
  it("should work", () => {
    const wrapper = shallow(<WorkbenchSidebar titleLabel="Hello" />);
    expect(wrapper.find(".title-label").text()).toBe("Hello");
  });
});
