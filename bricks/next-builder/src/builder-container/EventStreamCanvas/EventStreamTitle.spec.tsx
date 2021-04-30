import React from "react";
import { shallow } from "enzyme";
import { EventStreamTitle } from "./EventStreamTitle";
import { EventDownstreamType, EventUpstreamType } from "./interfaces";

describe("EventStreamTitle", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work for upstream source", () => {
    const onEventNodeClick = jest.fn();
    const wrapper = shallow(
      <EventStreamTitle
        eventNode={{
          type: EventUpstreamType.UPSTREAM_SOURCE,
          node: {
            type: "brick",
            brick: "my-brick",
            id: "B-001",
            alias: "myBrick",
          },
          children: [],
        }}
        onEventNodeClick={onEventNodeClick}
      />
    );
    expect(wrapper.text()).toBe("myBrick");
    expect(wrapper.find(".title").hasClass("upstreamSource")).toBe(true);
    wrapper.find(".title").invoke("onClick")(null);
    expect(onEventNodeClick).not.toBeCalled();
  });

  it("should work for downstream root", () => {
    const onEventNodeClick = jest.fn();
    const wrapper = shallow(
      <EventStreamTitle
        eventNode={{
          type: EventDownstreamType.ROOT,
          node: {
            type: "brick",
            brick: "my-brick",
            id: "B-001",
            alias: "myBrick",
          },
          children: [],
        }}
        onEventNodeClick={onEventNodeClick}
      />
    );
    expect(wrapper.text()).toBe("myBrick");
    expect(wrapper.find(".title").hasClass("upstreamSource")).toBe(false);
    wrapper.find(".title").invoke("onClick")(null);
    expect(onEventNodeClick).toBeCalled();
  });

  it("should work for downstream event", () => {
    const onEventNodeClick = jest.fn();
    const wrapper = shallow(
      <EventStreamTitle
        eventNode={{
          type: EventDownstreamType.EVENT,
          node: {
            type: "brick",
            brick: "my-brick",
            id: "B-001",
            alias: "myBrick",
          },
          children: [],
          eventType: "click",
          handlers: [{ action: "console.log" }],
        }}
        onEventNodeClick={onEventNodeClick}
      />
    );
    expect(wrapper.text()).toBe("event: click");
    expect(wrapper.find(".title").hasClass("upstreamSource")).toBe(false);
    wrapper.find(".title").invoke("onClick")(null);
    expect(onEventNodeClick).toBeCalled();
  });

  it("should work for downstream callback", () => {
    const onEventNodeClick = jest.fn();
    const wrapper = shallow(
      <EventStreamTitle
        eventNode={{
          type: EventDownstreamType.CALLBACK,
          node: {
            type: "brick",
            brick: "my-brick",
            id: "B-001",
            alias: "myBrick",
          },
          children: [],
          eventType: "success",
          handlers: [{ action: "console.log" }],
          parentHandlerIndex: 0,
        }}
        onEventNodeClick={onEventNodeClick}
      />
    );
    expect(wrapper.text()).toBe("callback: success");
    expect(wrapper.find(".title").hasClass("upstreamSource")).toBe(false);
    wrapper.find(".title").invoke("onClick")(null);
    expect(onEventNodeClick).toBeCalled();
  });

  it("should work for downstream lifeCycle", () => {
    const onEventNodeClick = jest.fn();
    const wrapper = shallow(
      <EventStreamTitle
        eventNode={{
          type: EventDownstreamType.LIFE_CYCLE,
          node: {
            type: "brick",
            brick: "my-brick",
            id: "B-001",
            alias: "myBrick",
          },
          children: [],
          eventType: "onPageLoad",
          handlers: [{ action: "console.log" }],
        }}
        onEventNodeClick={onEventNodeClick}
      />
    );
    expect(wrapper.text()).toBe("lifeCycle: onPageLoad");
    expect(wrapper.find(".title").hasClass("upstreamSource")).toBe(false);
    wrapper.find(".title").invoke("onClick")(null);
    expect(onEventNodeClick).toBeCalled();
  });
});
