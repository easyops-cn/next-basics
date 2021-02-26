import React from "react";
import { shallow } from "enzyme";
import { BrickWithEventsItem } from "./BrickWithEventsItem";
import { useBuilderUIContext } from "../BuilderUIContext";

jest.mock("../BuilderUIContext");

const mockUseBuilderUIContext = useBuilderUIContext as jest.MockedFunction<
  typeof useBuilderUIContext
>;

describe("BrickWithEventsItem", () => {
  const setEventStreamActiveNodeUid = jest.fn();
  beforeEach(() => {
    mockUseBuilderUIContext.mockReturnValue({
      setEventStreamActiveNodeUid,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it("should toggle active node", () => {
    const wrapper = shallow(
      <BrickWithEventsItem
        node={{
          $$uid: 1,
          type: "brick",
          brick: "my.any-brick",
          id: "B-001",
          alias: "my-brick",
        }}
        hasEvents
        isTargetOfEvents
      />
    );
    expect(wrapper.find(".brickWithEventsItem").hasClass("active")).toBe(false);
    wrapper.find(".brickWithEventsItem").simulate("click");
    expect(setEventStreamActiveNodeUid).toBeCalledWith(1);
  });
});
