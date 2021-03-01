import { getBricksWithEvents } from "./getBricksWithEvents";

describe("getBricksWithEvents", () => {
  it("should work", () => {
    expect(
      getBricksWithEvents([
        {
          type: "brick",
          brick: "my.brick-a",
          id: "B-001",
          $$matchedSelectors: ["my\\.brick-a"],
          $$parsedEvents: {},
        },
        {
          type: "brick",
          brick: "my.brick-b",
          id: "B-002",
          $$matchedSelectors: ["my\\.brick-b"],
          $$parsedEvents: {},
        },
        {
          type: "brick",
          brick: "my.brick-c",
          id: "B-003",
          $$matchedSelectors: ["my\\.brick-c", "#myBrickC"],
          $$parsedEvents: {},
        },
        {
          type: "brick",
          brick: "my.brick-d",
          id: "B-004",
          $$matchedSelectors: ["my\\.brick-d"],
          $$parsedEvents: {
            ignored: {
              action: "console.log",
            },
            click: {
              target: "my\\.brick-b",
              method: "open",
            },
            dblclick: [
              {
                useProvider: "my.any-provider",
                callback: {
                  success: {
                    action: "console.log",
                  },
                  error: [
                    {
                      target: "#myBrickC",
                      method: "open",
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          type: "brick",
          brick: "my.brick-e",
          id: "B-005",
          $$matchedSelectors: ["my\\.brick-e"],
          $$parsedEvents: {
            click: {
              target: "_self",
              method: "open",
            },
          },
        },
        {
          type: "brick",
          brick: "my.brick-f",
          id: "B-006",
          ref: "refBrickF",
          $$matchedSelectors: ["my\\.brick-f"],
          $$parsedEvents: {},
        },
        {
          type: "brick",
          brick: "my.brick-g",
          id: "B-007",
          $$matchedSelectors: ["my\\.brick-g"],
          $$parsedEvents: {
            click: [
              {
                targetRef: "refBrickF",
                method: "open",
              },
              {
                target: "<% oops %>",
                method: "open",
              },
            ],
          },
        },
      ])
    ).toEqual([
      {
        node: expect.objectContaining({ id: "B-002" }),
        hasEvents: false,
        isTargetOfEvents: true,
      },
      {
        node: expect.objectContaining({ id: "B-003" }),
        hasEvents: false,
        isTargetOfEvents: true,
      },
      {
        node: expect.objectContaining({ id: "B-004" }),
        hasEvents: true,
        isTargetOfEvents: false,
      },
      {
        node: expect.objectContaining({ id: "B-005" }),
        hasEvents: true,
        isTargetOfEvents: true,
      },
      {
        node: expect.objectContaining({ id: "B-006" }),
        hasEvents: false,
        isTargetOfEvents: true,
      },
      {
        node: expect.objectContaining({ id: "B-007" }),
        hasEvents: true,
        isTargetOfEvents: false,
      },
    ]);
  });
});
