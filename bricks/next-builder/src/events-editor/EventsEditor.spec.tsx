import React from "react";
import { shallow } from "enzyme";
import { EventsEditor } from "./EventsEditor";

describe("EventsEditor", () => {
  it("should work", () => {
    const wrapper = shallow(<EventsEditor />);
    expect(wrapper.find("div").text()).toBe("NEXT_BUILDER works!");
  });
});
