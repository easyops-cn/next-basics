import React from "react";
import { shallow } from "enzyme";
import { AddPropertyModal } from "./AddPropertyModal";

describe("AddPropertyModal", () => {
  it("should work", () => {
    const wrapper = shallow(<AddPropertyModal />);
    expect(wrapper.find("div").text()).toBe("SHARED_EDITORS works!");
  });
});
