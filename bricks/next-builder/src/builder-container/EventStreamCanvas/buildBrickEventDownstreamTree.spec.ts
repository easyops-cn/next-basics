import { HierarchyPointLink } from "d3-hierarchy";
import {
  buildBrickEventDownstreamTree,
  computeEventDownstreamSourceX,
} from "./buildBrickEventDownstreamTree";
import { EventDownstreamNode, EventDownstreamType } from "./interfaces";
import { nodesForEventsView } from "../__fixtures__";

const mockConsoleWarn = jest
  .spyOn(console, "warn")
  .mockImplementation(() => void 0);

describe("buildBrickEventDownstreamTree", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work for node with an empty event tree", () => {
    const eventTree = buildBrickEventDownstreamTree(nodesForEventsView[0]);
    expect(eventTree).toEqual({
      type: "root",
      height: 40,
      node: expect.objectContaining({
        id: "B-001",
      }),
      children: [],
    });
  });

  it("should work for node with event tree", () => {
    const eventTree = buildBrickEventDownstreamTree(nodesForEventsView[3]);
    expect(eventTree).toEqual({
      type: "root",
      height: 40,
      node: expect.objectContaining({
        id: "B-004",
      }),
      children: [
        expect.objectContaining({
          type: "event",
          eventType: "ignored",
          channel: undefined,
          handlers: [{ action: "console.log" }],
          height: 86,
          children: [],
        }),
        expect.objectContaining({
          type: "event",
          eventType: "click",
          channel: undefined,
          handlers: [
            {
              method: "open",
              target: "my\\.brick-b",
            },
          ],
          height: 86,
          children: [],
        }),
        expect.objectContaining({
          type: "event",
          eventType: "dblclick",
          channel: undefined,
          handlers: [
            expect.objectContaining({
              useProvider: "my.any-provider",
            }),
          ],
          height: 86,
          children: [
            expect.objectContaining({
              type: "callback",
              eventType: "success",
              channel: undefined,
              handlers: [{ action: "console.log" }],
              height: 86,
              children: [],
            }),
            expect.objectContaining({
              type: "callback",
              eventType: "error",
              channel: undefined,
              handlers: [
                {
                  method: "open",
                  target: "#myBrickC",
                },
              ],
              height: 86,
              children: [],
            }),
          ],
        }),
      ],
    });
  });

  it("should work for node with event tree with life cycle", () => {
    const eventTree = buildBrickEventDownstreamTree(nodesForEventsView[7]);
    expect(eventTree).toEqual({
      type: "root",
      height: 40,
      node: expect.objectContaining({
        id: "B-008",
      }),
      children: [
        expect.objectContaining({
          type: "event",
          eventType: "click",
          channel: undefined,
          handlers: [
            {
              method: "open",
              target: "#myBrickK",
            },
          ],
          children: [],
          height: 86,
        }),
        expect.objectContaining({
          type: "life-cycle",
          eventType: "onBeforePageLoad",
          channel: undefined,
          handlers: [
            {
              method: "open",
              target: "#myBrickI",
            },
          ],
          children: [],
          height: 86,
        }),
      ],
    });
  });

  it("should work for node with event tree with channel", () => {
    const eventTree = buildBrickEventDownstreamTree(nodesForEventsView[8]);
    expect(eventTree).toEqual({
      type: "root",
      height: 40,
      node: expect.objectContaining({
        id: "B-009",
      }),
      children: [
        expect.objectContaining({
          type: "life-cycle",
          eventType: "onMessage",
          channel: "any",
          handlers: [
            {
              method: "open",
              target: "#myBrickJ",
            },
          ],
          children: [],
          height: 110,
        }),
      ],
    });
  });

  it("should work for node with missed life cycle", () => {
    const eventTree = buildBrickEventDownstreamTree(nodesForEventsView[9]);
    expect(eventTree).toEqual({
      type: "root",
      height: 40,
      node: expect.objectContaining({
        id: "B-010",
      }),
      children: [],
    });
    expect(mockConsoleWarn).toBeCalledTimes(1);
  });
});

describe("computeEventDownstreamSourceX", () => {
  it.each<[unknown, number]>([
    [
      {
        source: {
          data: {
            type: EventDownstreamType.ROOT,
            height: 20,
          },
          x: 100,
        },
        target: {
          data: {
            type: EventDownstreamType.EVENT,
          },
        },
      },
      100,
    ],
    [
      {
        source: {
          data: {
            type: EventDownstreamType.EVENT,
            height: 20,
          },
          x: 100,
        },
        target: {
          data: {
            type: EventDownstreamType.CALLBACK,
            parentHandlerIndex: 0,
          },
        },
      },
      148,
    ],
    [
      {
        source: {
          data: {
            type: EventDownstreamType.LIFE_CYCLE,
            eventType: "onMessage",
            height: 20,
          },
          x: 100,
        },
        target: {
          data: {
            type: EventDownstreamType.CALLBACK,
            parentHandlerIndex: 1,
          },
        },
      },
      219,
    ],
  ])("should work", (source, x) => {
    expect(
      computeEventDownstreamSourceX(
        source as HierarchyPointLink<EventDownstreamNode>
      )
    ).toBe(x);
  });
});
