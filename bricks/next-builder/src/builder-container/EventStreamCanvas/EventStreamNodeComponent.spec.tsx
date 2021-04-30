import React from "react";
import { shallow } from "enzyme";
import {
  EventStreamNodeComponent,
  EventDownstreamNodeComponent,
  EventUpstreamNodeComponent,
} from "./EventStreamNodeComponent";
import { EventDownstreamType, EventUpstreamType } from "./interfaces";
import { EventStreamHandler } from "./EventStreamHandler";

describe("EventStreamNodeComponent", () => {
  it("should work for downstream root", () => {
    const wrapper = shallow(
      <EventStreamNodeComponent
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
      />
    );
    expect(wrapper.find(EventDownstreamNodeComponent).length).toBe(1);
  });

  it("should work for upstream source", () => {
    const wrapper = shallow(
      <EventStreamNodeComponent
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
      />
    );
    expect(wrapper.find(EventUpstreamNodeComponent).length).toBe(1);
  });
});

describe("EventDownstreamNodeComponent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work for downstream root", () => {
    const wrapper = shallow(
      <EventDownstreamNodeComponent
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
      />
    );
    expect(wrapper.find(".eventNode").hasClass("rootNode")).toBe(true);
    expect(wrapper.find(".divider").length).toBe(0);
    expect(wrapper.find(EventStreamHandler).length).toBe(0);
  });

  it("should work for downstream lifeCycle", () => {
    const wrapper = shallow(
      <EventDownstreamNodeComponent
        eventNode={{
          type: EventDownstreamType.LIFE_CYCLE,
          node: {
            type: "brick",
            brick: "my-brick",
            id: "B-001",
            alias: "myBrick",
          },
          children: [],
          eventType: "onMessage",
          channel: "any",
          handlers: [{ action: "console.log" }],
        }}
      />
    );
    expect(wrapper.find(".eventNode").hasClass("rootNode")).toBe(false);
    expect(wrapper.find(".divider").text()).toBe("any");
    expect(wrapper.find(EventStreamHandler).length).toBe(1);
  });
});

describe("EventUpstreamNodeComponent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work for upstream source", () => {
    const setEventStreamNodeId = jest.fn();
    const wrapper = shallow(
      <EventUpstreamNodeComponent
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
        setEventStreamNodeId={setEventStreamNodeId}
      />
    );
    expect(wrapper.find(".eventNode").hasClass("upstreamSource")).toBe(true);
    expect(wrapper.find(".divider").length).toBe(0);
    expect(wrapper.find(".items").length).toBe(0);
    wrapper.find(".eventNode").invoke("onClick")(null);
    expect(setEventStreamNodeId).toBeCalledWith("B-001");
  });

  it("should work for upstream lifeCycle", () => {
    const setEventStreamNodeId = jest.fn();
    const wrapper = shallow(
      <EventUpstreamNodeComponent
        eventNode={{
          type: EventUpstreamType.UPSTREAM_LIFE_CYCLE,
          node: {
            type: "brick",
            brick: "my-brick",
            id: "B-001",
            alias: "myBrick",
          },
          children: [],
          eventType: "onMessage",
          channel: "any",
          handler: { action: "console.log" },
        }}
        setEventStreamNodeId={setEventStreamNodeId}
      />
    );
    expect(wrapper.find(".eventNode").hasClass("upstreamSource")).toBe(false);
    expect(wrapper.find(".divider").text()).toBe("any");
    expect(wrapper.find(".items").length).toBe(1);
    wrapper.find(".eventNode").invoke("onClick")(null);
    expect(setEventStreamNodeId).not.toBeCalled();
  });
});
