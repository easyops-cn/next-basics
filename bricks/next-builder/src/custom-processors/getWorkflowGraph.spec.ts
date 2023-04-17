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
            next: ["calcNode"],
          },
          {
            name: "calcNode",
            id: "calcNode",
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
            target: "testNodeGroup",
            type: "group",
          },
          {
            source: "testNodeGroup",
            target: "testNode",
            type: "childrenLayout",
          },
          { source: "testNode", target: "calcNode", type: "childrenDagre" },
          {
            source: "testNodeGroup",
            target: "calcNode",
            type: "childrenLayout",
          },
          { source: "start", target: "fistNode", type: "dagre" },
          { source: "fistNode", target: "secondNode", type: "dagre" },
          { source: "secondNode", target: "end", type: "dagre" },
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
          { id: "testNodeGroup", name: "testNodeGroup", type: "node" },
          {
            data: {
              id: "testNode",
              name: "testNode",
              next: ["calcNode"],
              type: "approval",
            },
            id: "testNode",
            name: "testNode",
            type: "node",
          },
          {
            data: {
              id: "calcNode",
              name: "calcNode",
              pre: ["testNode"],
              type: "approval",
            },
            id: "calcNode",
            name: "calcNode",
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
            type: "gateway",
            pre: ["start"],
            next: ["end"],
            children: ["branch1", "branch2", "step1", "step2"],
          },
          {
            name: "branch1",
            id: "branch1",
            type: "condition",
            parent: "firstNode",
            next: ["step1"],
          },
          {
            name: "branch2",
            id: "branch2",
            type: "condition",
            parent: "firstNode",
            next: ["step2"],
          },
          {
            name: "step1",
            id: "step1",
            type: "condition",
            pre: ["branch1"],
          },
          {
            name: "step2",
            id: "step2",
            type: "condition",
            pre: ["branch2"],
          },
          {
            name: "end",
            id: "end",
            type: "end",
            pre: ["firstNode"],
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
            dst: "branch1",
            type: "container",
          },
          {
            src: "fistNode",
            dst: "step1",
            type: "container",
          },
          {
            src: "fistNode",
            dst: "step2",
            type: "container",
          },
          {
            src: "branch1",
            dst: "step1",
            type: "line",
          },
          {
            src: "branch2",
            dst: "step2",
            type: "line",
          },
          {
            src: "fistNode",
            dst: "end",
            type: "line",
          },
        ],
      },
      {
        edges: [
          { source: "root", target: "start", type: "include" },
          { source: "root", target: "fistNode", type: "include" },
          { source: "root", target: "end", type: "include" },
          { source: "fistNode", target: "fistNodeLayout", type: "container" },
          { source: "fistNodeLayout", target: "branch1Group", type: "group" },
          { source: "fistNodeLayout", target: "branch2Group", type: "group" },
          { source: "fistNodeLayout", target: "step1Group", type: "group" },
          { source: "fistNodeLayout", target: "step2Group", type: "group" },
          { source: "branch1Group", target: "branch1", type: "childrenLayout" },
          { source: "branch1", target: "step1", type: "childrenDagre" },
          { source: "branch1Group", target: "step1", type: "childrenLayout" },
          { source: "branch2Group", target: "branch2", type: "childrenLayout" },
          { source: "branch2", target: "step2", type: "childrenDagre" },
          { source: "branch2Group", target: "step2", type: "childrenLayout" },
          { source: "step1Group", target: "step1", type: "childrenLayout" },
          { source: "step2Group", target: "step2", type: "childrenLayout" },
          { source: "start", target: "fistNode", type: "dagre" },
          { source: "fistNode", target: "end", type: "dagre" },
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
              children: ["branch1", "branch2", "step1", "step2"],
              id: "fistNode",
              name: "firstNode",
              next: ["end"],
              pre: ["start"],
              type: "gateway",
            },
            id: "fistNode",
            name: "firstNode",
            type: "gateway",
          },
          { id: "fistNodeLayout", name: "fistNodeLayout", type: "node" },
          { id: "branch1Group", name: "branch1Group", type: "node" },
          { id: "branch2Group", name: "branch2Group", type: "node" },
          { id: "step1Group", name: "step1Group", type: "node" },
          { id: "step2Group", name: "step2Group", type: "node" },
          {
            data: {
              id: "branch1",
              name: "branch1",
              next: ["step1"],
              parent: "firstNode",
              type: "condition",
            },
            id: "branch1",
            name: "branch1",
            type: "node",
          },
          {
            data: {
              id: "branch2",
              name: "branch2",
              next: ["step2"],
              parent: "firstNode",
              type: "condition",
            },
            id: "branch2",
            name: "branch2",
            type: "node",
          },
          {
            data: {
              id: "step1",
              name: "step1",
              pre: ["branch1"],
              type: "condition",
            },
            id: "step1",
            name: "step1",
            type: "node",
          },
          {
            data: {
              id: "step2",
              name: "step2",
              pre: ["branch2"],
              type: "condition",
            },
            id: "step2",
            name: "step2",
            type: "node",
          },
          {
            data: {
              id: "end",
              name: "end",
              pre: ["firstNode"],
              type: "end",
            },
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
