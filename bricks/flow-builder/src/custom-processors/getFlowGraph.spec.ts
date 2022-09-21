import { getFlowGraph } from "./getFlowGraph";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getFlowGraph", () => {
  it.each([
    [
      {
        relations: [
          {
            dst: "step1",
            src: "start",
          },
          {
            dst: "branch1",
            src: "step1",
          },
          {
            dst: "branch2",
            src: "step1",
          },
          {
            dst: "step2",
            src: "branch1",
          },
          {
            dst: "step3",
            src: "branch2",
          },
          {
            dst: "step1End",
            src: "step2",
          },
          {
            dst: "step1End",
            src: "step3",
          },
          {
            src: "step1End",
            dst: "step5",
          },
        ],
        steps: [
          {
            id: "start",
            type: "task",
            name: "start",
            next: "step1",
          },
          {
            id: "step1",
            type: "choice",
            name: "step1",
            next: "step5",
            children: ["branch1", "branch2"],
          },
          {
            id: "branch1",
            name: "branch1",
            type: "branch",
            children: ["step2"],
          },
          {
            id: "branch2",
            name: "branch2",
            type: "branch",
            children: ["step3"],
          },
          {
            id: "step2",
            type: "task",
            name: "step2",
            end: true,
          },
          {
            id: "step3",
            type: "task",
            name: "step3",
            end: true,
          },
          {
            id: "step1End",
            type: "task",
            name: "end",
            next: "step5",
          },
          {
            id: "step5",
            name: "step5",
            type: "task",
            end: true,
          },
        ],
      },
      {
        edges: [
          { source: "root", target: "start", type: "include" },
          { source: "root", target: "step1", type: "include" },
          { source: "root", target: "branch1", type: "include" },
          { source: "root", target: "branch2", type: "include" },
          { source: "root", target: "step2", type: "include" },
          { source: "root", target: "step3", type: "include" },
          { source: "root", target: "step1End", type: "include" },
          { source: "root", target: "step5", type: "include" },
          { source: "start", target: "step1", type: "dagre" },
          { source: "step1", target: "branch1", type: "dagre" },
          { source: "step1", target: "branch2", type: "dagre" },
          { source: "branch1", target: "step2", type: "dagre" },
          { source: "branch2", target: "step3", type: "dagre" },
          { source: "step2", target: "step1End", type: "dagre" },
          { source: "step3", target: "step1End", type: "dagre" },
          { source: "step1End", target: "step5", type: "dagre" },
        ],
        nodes: [
          { id: "root", type: "node" },
          {
            data: { id: "start", name: "start", next: "step1", type: "task" },
            id: "start",
            type: "node",
          },
          {
            data: {
              children: ["branch1", "branch2"],
              id: "step1",
              name: "step1",
              next: "step5",
              type: "choice",
            },
            id: "step1",
            type: "node",
          },
          {
            data: {
              children: ["step2"],
              id: "branch1",
              name: "branch1",
              type: "branch",
            },
            id: "branch1",
            type: "node",
          },
          {
            data: {
              children: ["step3"],
              id: "branch2",
              name: "branch2",
              type: "branch",
            },
            id: "branch2",
            type: "node",
          },
          {
            data: { end: true, id: "step2", name: "step2", type: "task" },
            id: "step2",
            type: "node",
          },
          {
            data: { end: true, id: "step3", name: "step3", type: "task" },
            id: "step3",
            type: "node",
          },
          {
            data: { id: "step1End", name: "end", next: "step5", type: "task" },
            id: "step1End",
            type: "node",
          },
          {
            data: { end: true, id: "step5", name: "step5", type: "task" },
            id: "step5",
            type: "node",
          },
        ],
        root: "root",
      },
    ],
  ])("should work", (data, result) => {
    expect(getFlowGraph(data)).toEqual(result);
  });
});
