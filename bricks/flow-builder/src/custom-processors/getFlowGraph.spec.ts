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
            src: "step2",
            dst: "step2.1",
          },
          {
            dst: "step3",
            src: "branch2",
          },
          {
            dst: "step5",
            src: "step1",
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
            type: "switch",
            name: "step1",
            next: "step5",
            children: ["branch1", "branch2"],
          },
          {
            id: "branch1",
            name: "branch1",
            type: "branch",
            children: ["step2", "step2.1"],
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
            next: "step2.1",
          },
          {
            id: "step2.1",
            type: "task",
            name: "step2.1",
            end: true,
          },
          {
            id: "step3",
            type: "task",
            name: "step3",
            end: true,
          },
          {
            id: "step5",
            name: "step5",
            type: "task",
            end: true,
          },
        ],
      },
      "start",
      {
        edges: [
          { source: "root", target: "start", type: "include" },
          { source: "root", target: "step1", type: "include" },
          { source: "root", target: "step5", type: "include" },
          { source: "start", target: "step1", type: "dagre" },
          { source: "step2", target: "step2.1", type: "dagre" },
          { source: "step1", target: "step5", type: "dagre" },
          { source: "step1", target: "branch1", type: "container" },
          { source: "step1", target: "branch2", type: "container" },
          { source: "branch1", target: "step2", type: "group" },
          { source: "branch1", target: "step2.1", type: "group" },
          { source: "branch2", target: "step3", type: "group" },
        ],
        nodes: [
          { id: "root", type: "node" },
          {
            data: { id: "start", name: "start", next: "step1", type: "task" },
            id: "start",
            name: "start",
            type: "node",
          },
          {
            data: {
              children: ["branch1", "branch2"],
              id: "step1",
              name: "step1",
              next: "step5",
              type: "switch",
            },
            id: "step1",
            name: "step1",
            type: "container",
          },
          {
            data: {
              children: ["step2", "step2.1"],
              id: "branch1",
              name: "branch1",
              type: "branch",
            },
            id: "branch1",
            name: "branch1",
            type: "group",
          },
          {
            data: {
              children: ["step3"],
              id: "branch2",
              name: "branch2",
              type: "branch",
            },
            id: "branch2",
            name: "branch2",
            type: "group",
          },
          {
            data: { id: "step2", name: "step2", next: "step2.1", type: "task" },
            id: "step2",
            name: "step2",
            type: "node",
          },
          {
            data: { end: true, id: "step2.1", name: "step2.1", type: "task" },
            id: "step2.1",
            name: "step2.1",
            type: "node",
          },
          {
            data: { end: true, id: "step3", name: "step3", type: "task" },
            id: "step3",
            name: "step3",
            type: "node",
          },
          {
            data: { end: true, id: "step5", name: "step5", type: "task" },
            id: "step5",
            name: "step5",
            type: "node",
          },
        ],
        root: "root",
      },
    ],
  ])("should work", (data, startId, result) => {
    expect(getFlowGraph(data, startId)).toEqual(result);
  });
});
