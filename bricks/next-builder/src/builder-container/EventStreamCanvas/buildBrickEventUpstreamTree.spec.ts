import { HierarchyPointNode } from "d3-hierarchy";
import {
  buildBrickEventUpstreamTree,
  computeEventUpstreamSourceX,
} from "./buildBrickEventUpstreamTree";
import { EventUpstreamNode, EventUpstreamType } from "./interfaces";
import { nodesForEventsView } from "../__fixtures__";

const mockConsoleWarn = jest
  .spyOn(console, "warn")
  .mockImplementation(() => void 0);

describe("buildBrickEventUpstreamTree", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work for node with an empty event tree", () => {
    const eventTree = buildBrickEventUpstreamTree(
      nodesForEventsView[0],
      nodesForEventsView
    );
    expect(eventTree).toEqual({
      type: "upstream-root",
      height: 86,
      node: expect.objectContaining({
        id: "B-001",
      }),
      children: [],
    });
    expect(mockConsoleWarn).toBeCalledTimes(1);
  });

  it("should work for node with event tree", () => {
    const eventTree = buildBrickEventUpstreamTree(
      nodesForEventsView[1],
      nodesForEventsView
    );
    expect(eventTree).toEqual({
      type: "upstream-root",
      height: 86,
      node: expect.objectContaining({
        id: "B-002",
      }),
      children: [
        expect.objectContaining({
          type: "upstream-event",
          node: expect.objectContaining({
            id: "B-004",
          }),
          eventType: "click",
          channel: undefined,
          handler: {
            method: "open",
            target: "my\\.brick-b",
          },
          children: [
            expect.objectContaining({
              type: "upstream-source",
              node: expect.objectContaining({
                id: "B-004",
              }),
              children: [],
              height: 40,
            }),
          ],
          height: 86,
        }),
      ],
    });
  });

  it("should work for node with event tree by targetRef", () => {
    const eventTree = buildBrickEventUpstreamTree(
      nodesForEventsView[5],
      nodesForEventsView
    );
    expect(eventTree).toEqual({
      type: "upstream-root",
      height: 86,
      node: expect.objectContaining({
        id: "B-006",
      }),
      children: [
        expect.objectContaining({
          type: "upstream-event",
          node: expect.objectContaining({
            id: "B-007",
          }),
          eventType: "click",
          channel: undefined,
          handler: {
            method: "open",
            targetRef: "refBrickF",
          },
          children: [
            expect.objectContaining({
              type: "upstream-source",
              node: expect.objectContaining({
                id: "B-007",
              }),
              children: [],
              height: 40,
            }),
          ],
          height: 86,
        }),
      ],
    });
  });

  it("should work for node with event tree with channel", () => {
    const eventTree = buildBrickEventUpstreamTree(
      nodesForEventsView[9],
      nodesForEventsView
    );
    expect(eventTree).toEqual({
      type: "upstream-root",
      height: 86,
      node: expect.objectContaining({
        id: "B-010",
      }),
      children: [
        expect.objectContaining({
          type: "upstream-life-cycle",
          node: expect.objectContaining({
            id: "B-009",
          }),
          eventType: "onMessage",
          channel: "any",
          handler: {
            method: "open",
            target: "#myBrickJ",
          },
          children: [
            expect.objectContaining({
              type: "upstream-source",
              node: expect.objectContaining({
                id: "B-009",
              }),
              children: [],
              height: 40,
            }),
          ],
          height: 110,
        }),
      ],
    });
  });
});

describe("computeEventUpstreamSourceX", () => {
  it.each<[unknown, number]>([
    [
      {
        data: {
          type: EventUpstreamType.UPSTREAM_SOURCE,
        },
        x: 100,
      } as any,
      100,
    ],
    [
      {
        data: {
          type: EventUpstreamType.UPSTREAM_EVENT,
          height: 20,
        },
        x: 100,
      },
      148,
    ],
    [
      {
        data: {
          type: EventUpstreamType.UPSTREAM_LIFE_CYCLE,
          eventType: "onMessage",
          height: 20,
        },
        x: 100,
      },
      172,
    ],
  ])("should work", (source, x) => {
    expect(
      computeEventUpstreamSourceX(
        source as HierarchyPointNode<EventUpstreamNode>
      )
    ).toBe(x);
  });
});
