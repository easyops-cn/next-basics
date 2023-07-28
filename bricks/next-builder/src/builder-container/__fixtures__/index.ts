import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";

export const nodesForEventsView: BuilderRuntimeNode[] = [
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
  {
    // This brick has both lifeCycle and events.
    type: "brick",
    brick: "my.brick-h",
    id: "B-008",
    $$matchedSelectors: ["my\\.brick-h"],
    $$parsedLifeCycle: {
      onBeforePageLoad: {
        target: "#myBrickI",
        method: "open",
      },
    },
    $$parsedEvents: {
      click: {
        target: "#myBrickK",
        method: "open",
      },
    },
  },
  {
    type: "brick",
    brick: "my.brick-i",
    id: "B-009",
    $$matchedSelectors: ["my\\.brick-i", "#myBrickI"],
    $$parsedLifeCycle: {
      onMessage: {
        channel: "any",
        handlers: {
          target: "#myBrickJ",
          method: "open",
        },
      },
    },
  },
  {
    // This brick has an unknown lifeCycle.
    type: "brick",
    brick: "my.brick-j",
    id: "B-010",
    $$matchedSelectors: ["my\\.brick-j", "#myBrickJ"],
    $$parsedLifeCycle: {
      onOthers: {
        target: "#myBrickX",
        method: "open",
      },
    } as any,
  },
  {
    type: "brick",
    brick: "my.brick-k",
    id: "B-011",
    $$matchedSelectors: ["my\\.brick-k", "#myBrickK"],
  },
];
