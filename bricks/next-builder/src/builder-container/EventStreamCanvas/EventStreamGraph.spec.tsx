import ReactDOM from "react-dom";
import { nodesForEventsView } from "../__fixtures__";
import { EventStreamGraph } from "./EventStreamGraph";
import {
  EventDownstreamNodeOfRoot,
  EventDownstreamType,
  EventUpstreamNodeOfRoot,
  EventUpstreamType,
} from "./interfaces";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => void 0);

let mockOffsetWidth: number;
let mockOffsetHeight: number;

Object.defineProperties(window.HTMLElement.prototype, {
  offsetWidth: {
    get() {
      return mockOffsetWidth;
    },
  },
  offsetHeight: {
    get() {
      return mockOffsetHeight;
    },
  },
});

const node008 = nodesForEventsView.find((node) => node.id === "B-008");
const node009 = nodesForEventsView.find((node) => node.id === "B-009");
const node010 = nodesForEventsView.find((node) => node.id === "B-010");

describe("EventStreamGraph", () => {
  let graph: EventStreamGraph;

  beforeEach(() => {
    graph = new EventStreamGraph();
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockOffsetWidth = 800;
    mockOffsetHeight = 320;
  });

  it("should work for wheel event", () => {
    const canvas = graph.getDOMNode();
    expect(canvas.classList.contains("canvas")).toBe(true);

    const wheelEvent = new WheelEvent("wheel", {
      deltaX: 10,
      deltaY: 20,
    });
    const preventDefault = jest.spyOn(wheelEvent, "preventDefault");
    const stopPropagation = jest.spyOn(wheelEvent, "stopPropagation");
    canvas.dispatchEvent(wheelEvent);
    expect(preventDefault).toBeCalled();
    expect(stopPropagation).toBeCalled();
    expect(canvas.querySelector(".linksLayer").getAttribute("transform")).toBe(
      "translate(0,0) scale(1)"
    );
    expect(
      (canvas.querySelector(".nodesLayer") as HTMLElement).style.transform
    ).toBe("translate(0px, 0px)");
  });

  it("should work for wheel event with ctrlKey", () => {
    const canvas = graph.getDOMNode();

    const wheelEvent = new WheelEvent("wheel", {
      ctrlKey: true,
    });
    const preventDefault = jest.spyOn(wheelEvent, "preventDefault");
    const stopPropagation = jest.spyOn(wheelEvent, "stopPropagation");
    canvas.dispatchEvent(wheelEvent);
    expect(preventDefault).toBeCalled();
    expect(stopPropagation).toBeCalled();
  });

  it("should work for drag event", () => {
    const canvas = graph.getDOMNode();
    document.createElement("div").appendChild(canvas);

    const mousedownEvent = new MouseEvent("mousedown", {
      view: window,
      clientX: 100,
      clientY: 200,
    });
    canvas.dispatchEvent(mousedownEvent);
    expect(canvas.classList.contains("grabbing")).toBe(true);

    const mousemoveEvent = new MouseEvent("mousemove", {
      view: window,
      clientX: 110,
      clientY: 220,
    });
    window.dispatchEvent(mousemoveEvent);

    expect(canvas.querySelector(".linksLayer").getAttribute("transform")).toBe(
      "translate(10,20) scale(1)"
    );
    expect(
      (canvas.querySelector(".nodesLayer") as HTMLElement).style.transform
    ).toBe("translate(10px, 20px)");

    const mouseupEvent = new MouseEvent("mouseup", {
      view: window,
    });
    window.dispatchEvent(mouseupEvent);
    expect(canvas.classList.contains("grabbing")).toBe(false);
  });

  it("should work for two-way stream", () => {
    const eventDownstreamTree: EventDownstreamNodeOfRoot = {
      type: EventDownstreamType.ROOT,
      height: 40,
      node: node009,
      children: [
        {
          type: EventDownstreamType.LIFE_CYCLE,
          eventType: "onMessage",
          channel: "any",
          handlers: [
            {
              method: "open",
              target: "#myBrickJ",
            },
          ],
          children: [],
          node: node010,
          height: 110,
        },
      ],
    };

    const eventUpstreamTree: EventUpstreamNodeOfRoot = {
      type: EventUpstreamType.UPSTREAM_ROOT,
      height: 86,
      node: node009,
      children: [
        {
          type: EventUpstreamType.UPSTREAM_LIFE_CYCLE,
          eventType: "onBeforePageLoad",
          handler: {
            target: "#myBrickI",
            method: "open",
          },
          children: [
            {
              type: EventUpstreamType.UPSTREAM_SOURCE,
              node: node008,
              children: [],
              height: 40,
            },
          ],
          node: node008,
          height: 110,
        },
      ],
    };

    graph.render(eventDownstreamTree, eventUpstreamTree, {
      targetMap: new Map(),
      targetRefMap: new Map(),
    });

    expect(spyOnRender).toBeCalledTimes(4);
    const canvas = graph.getDOMNode();
    expect(canvas.querySelector(".linksLayer").getAttribute("transform")).toBe(
      "translate(0,65) scale(1)"
    );
    expect(
      (canvas.querySelector(".nodesLayer") as HTMLElement).style.transform
    ).toBe("translate(0px, 65px)");
  });

  it("should work for downstream only", () => {
    const eventDownstreamTree: EventDownstreamNodeOfRoot = {
      type: EventDownstreamType.ROOT,
      height: 40,
      node: node008,
      children: [
        {
          type: EventDownstreamType.EVENT,
          eventType: "click",
          handlers: [
            {
              method: "open",
              target: "#myBrickK",
            },
          ],
          children: [
            {
              type: EventDownstreamType.CALLBACK,
              eventType: "success",
              handlers: [{ action: "console.log" }],
              children: [],
              node: node008,
              parentHandlerIndex: 0,
              height: 86,
            },
          ],
          node: node008,
          height: 86,
        },
        {
          type: EventDownstreamType.LIFE_CYCLE,
          eventType: "onBeforePageLoad",
          handlers: [
            {
              method: "open",
              target: "#myBrickI",
            },
          ],
          children: [],
          node: node008,
          height: 86,
        },
      ],
    };

    const eventUpstreamTree: EventUpstreamNodeOfRoot = {
      type: EventUpstreamType.UPSTREAM_ROOT,
      height: 40,
      node: node008,
      children: [],
    };

    graph.render(eventDownstreamTree, eventUpstreamTree, {
      targetMap: new Map(),
      targetRefMap: new Map(),
    });

    expect(spyOnRender).toBeCalledTimes(4);
    const canvas = graph.getDOMNode();
    expect(canvas.querySelector(".linksLayer").getAttribute("transform")).toBe(
      "translate(10,14) scale(1)"
    );
    expect(
      (canvas.querySelector(".nodesLayer") as HTMLElement).style.transform
    ).toBe("translate(10px, 14px)");
  });

  it("should work for upstream only", () => {
    const eventDownstreamTree: EventDownstreamNodeOfRoot = {
      type: EventDownstreamType.ROOT,
      height: 40,
      node: node009,
      children: [],
    };

    const eventUpstreamTree: EventUpstreamNodeOfRoot = {
      type: EventUpstreamType.UPSTREAM_ROOT,
      height: 86,
      node: node009,
      children: [
        {
          type: EventUpstreamType.UPSTREAM_LIFE_CYCLE,
          eventType: "onBeforePageLoad",
          handler: {
            target: "#myBrickI",
            method: "open",
          },
          children: [
            {
              type: EventUpstreamType.UPSTREAM_SOURCE,
              node: node008,
              children: [],
              height: 40,
            },
          ],
          node: node008,
          height: 110,
        },
        {
          type: EventUpstreamType.UPSTREAM_LIFE_CYCLE,
          eventType: "onBeforePageLoad",
          handler: {
            target: "#myBrickI",
            method: "close",
          },
          children: [
            {
              type: EventUpstreamType.UPSTREAM_SOURCE,
              node: node008,
              children: [],
              height: 40,
            },
          ],
          node: node008,
          height: 110,
        },
      ],
    };

    graph.render(eventDownstreamTree, eventUpstreamTree, {
      targetMap: new Map(),
      targetRefMap: new Map(),
    });

    expect(spyOnRender).toBeCalledTimes(5);
    const canvas = graph.getDOMNode();
    expect(canvas.querySelector(".linksLayer").getAttribute("transform")).toBe(
      "translate(10,0) scale(1)"
    );
    expect(
      (canvas.querySelector(".nodesLayer") as HTMLElement).style.transform
    ).toBe("translate(10px, 0px)");
  });
});
