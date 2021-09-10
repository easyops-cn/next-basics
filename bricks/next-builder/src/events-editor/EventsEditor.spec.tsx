import React from "react";
import { shallow } from "enzyme";
import { EventsEditor } from "./EventsEditor";

describe("EventsEditor", () => {
  it("should work", () => {
    const wrapper = shallow(<EventsEditor eventList={[]} />);
    expect(wrapper.find(".brickName").length).toEqual(1);
  });
});
