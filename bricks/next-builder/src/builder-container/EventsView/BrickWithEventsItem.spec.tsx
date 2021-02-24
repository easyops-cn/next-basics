import React from "react";
import { shallow } from "enzyme";
import { BrickWithEventsItem } from "./BrickWithEventsItem";

describe("BrickWithEventsItem", () => {
  it("should work when the brick has events", () => {
    const wrapper = shallow(
      <BrickWithEventsItem
        node={{
          type: "brick",
          brick: "my.any-brick",
          id: "B-001",
          alias: "my-brick",
        }}
        hasEvents
        isTargetOfEvents={false}
      />
    );
    expect(wrapper.find(".nodeAlias").text()).toBe("my-brick");
    expect(wrapper.find(".icon").at(0).hasClass("activeIcon")).toBe(true);
    expect(wrapper.find(".icon").at(1).hasClass("activeIcon")).toBe(false);
  });

  it("should work when the brick is target of events", () => {
    const wrapper = shallow(
      <BrickWithEventsItem
        node={{
          type: "brick",
          brick: "my.any-brick",
          id: "B-001",
          alias: "my-brick",
        }}
        hasEvents={false}
        isTargetOfEvents
      />
    );
    expect(wrapper.find(".nodeAlias").text()).toBe("my-brick");
    expect(wrapper.find(".icon").at(0).hasClass("activeIcon")).toBe(false);
    expect(wrapper.find(".icon").at(1).hasClass("activeIcon")).toBe(true);
  });
});
