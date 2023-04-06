import { getWorkflowGraph } from "./getWorkflowGraph";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getWorkflowGraph", () => {
  it.each([
    [
      {
        nodes: [
          {
            name: "start",
            id: "start",
            type: "start",
            next: ["fistNode"],
          },
          {
            name: "firstNode",
            id: "fistNode",
            type: "approval",
            pre: ["start"],
            next: ["secondNode"],
          },
          {
            name: "secondNode",
            id: "secondNode",
            type: "start_approval",
            pre: ["firstNode"],
            next: ["end"],
            children: ["testNode", "calcNode"],
          },
          {
            name: "testNode",
            id: "testNode",
            type: "approval",
            next: ["testNode"],
          },
          {
            name: "testNode",
            id: "testNode",
            type: "approval",
            pre: ["testNode"],
          },
          {
            name: "end",
            id: "end",
            type: "end",
            pre: ["secondNode"],
          },
        ],
        relations: [
          {
            src: "start",
            dst: "fistNode",
            type: "line",
          },
          {
            src: "fistNode",
            dst: "secondNode",
            type: "line",
          },
          {
            src: "secondNode",
            dst: "testNode",
            type: "container",
          },
          {
            src: "testNode",
            dst: "calcNode",
            type: "line",
          },
          {
            src: "secondNode",
            dst: "end",
            type: "line",
          },
        ],
      },
      {
        edges: [
          { source: "root", target: "start", type: "include" },
          { source: "root", target: "fistNode", type: "include" },
          { source: "root", target: "secondNode", type: "include" },
          { source: "root", target: "end", type: "include" },
          {
            source: "secondNode",
            target: "secondNodeLayout",
            type: "container",
          },
          {
            source: "secondNodeLayout",
            target: "testNode",
            type: "childrenLayout",
          },
          { source: "testNode", target: "calcNode", type: "childrenDagre" },
          {
            source: "secondNodeLayout",
            target: "calcNode",
            type: "childrenLayout",
          },
          { source: "start", target: "fistNode", type: "dagre" },
          { source: "fistNode", target: "secondNode", type: "dagre" },
          {
            source: "secondNode",
            target: "end",
            type: "dagre",
          },
        ],
        nodes: [
          { id: "root", type: "node" },
          {
            data: {
              id: "start",
              name: "start",
              next: ["fistNode"],
              type: "start",
            },
            id: "start",
            name: "start",
            type: "start",
          },
          {
            data: {
              id: "fistNode",
              name: "firstNode",
              next: ["secondNode"],
              pre: ["start"],
              type: "approval",
            },
            id: "fistNode",
            name: "firstNode",
            type: "node",
          },
          {
            data: {
              children: ["testNode", "calcNode"],
              id: "secondNode",
              name: "secondNode",
              next: ["end"],
              pre: ["firstNode"],
              type: "start_approval",
            },
            id: "secondNode",
            name: "secondNode",
            type: "container",
          },
          { id: "secondNodeLayout", name: "secondNodeLayout", type: "node" },
          {
            data: {
              id: "testNode",
              name: "testNode",
              next: ["testNode"],
              type: "approval",
            },
            id: "testNode",
            name: "testNode",
            type: "node",
          },
          {
            data: {
              id: "testNode",
              name: "testNode",
              pre: ["testNode"],
              type: "approval",
            },
            id: "testNode",
            name: "testNode",
            type: "node",
          },
          {
            data: { id: "end", name: "end", pre: ["secondNode"], type: "end" },
            id: "end",
            name: "end",
            type: "end",
          },
        ],
        root: "root",
      },
    ],
  ])("should work", (flowData, result) => {
    expect(getWorkflowGraph(flowData)).toEqual(result);
  });
});
