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
            src: "start",
            dst: "step1",
          },
          {
            src: "step1",
            dst: "branch1",
          },
          {
            src: "step1",
            dst: "branch2",
          },
          {
            src: "branch1",
            dst: "step2",
          },
          {
            src: "step2",
            dst: "step2.1",
          },
          {
            dst: "step2.5",
            src: "branch2",
          },
          {
            src: "step2.5",
            dst: "step3",
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
            pre: "start",
            next: "step5",
            children: ["branch1", "branch2"],
          },
          {
            id: "branch1",
            name: "branch1",
            type: "branch",
            parent: "step1",
            children: ["step2", "step2.1"],
          },
          {
            id: "branch2",
            name: "branch2",
            type: "branch",
            parent: "step1",
            children: ["step3", "step2.5"],
            config: {
              startAt: "step2.5",
            },
          },
          {
            id: "step2",
            type: "task",
            name: "step2",
            parent: "branch1",
            next: "step2.1",
          },
          {
            id: "step2.1",
            type: "task",
            parent: "branch1",
            name: "step2.1",
            end: true,
          },
          {
            id: "step2.5",
            type: "task",
            parent: "branch2",
            name: "step2.5",
            next: "step3",
          },
          {
            id: "step3",
            type: "task",
            parent: "branch2",
            name: "step3",
            end: true,
          },
          {
            id: "step5",
            name: "step5",
            type: "task",
            pre: "step1",
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
          { source: "step1", target: "step5", type: "dagre" },
          { source: "step1", target: "branch1", type: "container" },
          { source: "step1", target: "branch2", type: "container" },
          { source: "branch1", target: "branch1_layout", type: "group" },
          {
            source: "branch1_layout",
            target: "step2",
            type: "childrenLayout",
          },
          {
            source: "step2",
            target: "step2.1",
            type: "childrenDagre",
          },
          {
            source: "branch1_layout",
            target: "step2.1",
            type: "childrenLayout",
          },
          {
            source: "branch2",
            target: "branch2_layout",
            type: "group",
          },
          {
            source: "branch2_layout",
            target: "step2.5",
            type: "childrenLayout",
          },
          {
            source: "step2.5",
            target: "step3",
            type: "childrenDagre",
          },
          {
            source: "branch2_layout",
            target: "step3",
            type: "childrenLayout",
          },
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
              pre: "start",
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
              parent: "step1",
              type: "branch",
            },
            id: "branch1",
            name: "branch1",
            type: "group",
          },
          { id: "branch1_layout", name: "branch1_layout", type: "node" },
          {
            data: {
              children: ["step3", "step2.5"],
              config: { startAt: "step2.5" },
              id: "branch2",
              name: "branch2",
              parent: "step1",
              type: "branch",
            },
            id: "branch2",
            name: "branch2",
            type: "group",
          },
          { id: "branch2_layout", name: "branch2_layout", type: "node" },
          {
            data: {
              id: "step2",
              name: "step2",
              next: "step2.1",
              parent: "branch1",
              type: "task",
            },
            id: "step2",
            name: "step2",
            type: "node",
          },
          {
            data: {
              end: true,
              id: "step2.1",
              name: "step2.1",
              parent: "branch1",
              type: "task",
            },
            id: "step2.1",
            name: "step2.1",
            type: "node",
          },
          {
            data: {
              id: "step2.5",
              name: "step2.5",
              next: "step3",
              parent: "branch2",
              type: "task",
            },
            id: "step2.5",
            name: "step2.5",
            type: "node",
          },
          {
            data: {
              end: true,
              id: "step3",
              name: "step3",
              parent: "branch2",
              type: "task",
            },
            id: "step3",
            name: "step3",
            type: "node",
          },
          {
            data: {
              end: true,
              id: "step5",
              name: "step5",
              pre: "step1",
              type: "task",
            },
            id: "step5",
            name: "step5",
            type: "node",
          },
        ],
        root: "root",
      },
    ],
    [
      {
        relations: [
          {
            dst: "task1",
            src: "ch1",
          },
          {
            dst: "ch2",
            src: "ch1",
          },
          {
            dst: "task2",
            src: "ch2",
          },
        ],
        steps: [
          {
            id: "ch1",
            type: "choice",
            name: "ch1",
          },
          {
            id: "task1",
            type: "task",
            name: "task1",
          },
          {
            id: "ch2",
            type: "choice",
            name: "ch2",
          },
          {
            id: "task2",
            type: "task",
            name: "task2",
          },
        ],
      },
      "ch1",
      {
        edges: [
          { source: "root", target: "ch1", type: "include" },
          { source: "root", target: "task1", type: "include" },
          { source: "root", target: "ch2", type: "include" },
          { source: "root", target: "task2", type: "include" },
          { source: "ch1", target: "task1", type: "dagre" },
          { source: "ch1", target: "ch2", type: "dagre" },
          { source: "ch2", target: "task2", type: "dagre" },
        ],
        nodes: [
          { id: "root", type: "node" },
          {
            data: { id: "ch1", name: "ch1", type: "choice" },
            id: "ch1",
            name: "ch1",
            type: "node",
          },
          {
            data: { id: "task1", name: "task1", type: "task" },
            id: "task1",
            name: "task1",
            type: "node",
          },
          {
            data: { id: "ch2", name: "ch2", type: "choice" },
            id: "ch2",
            name: "ch2",
            type: "node",
          },
          {
            data: { id: "task2", name: "task2", type: "task" },
            id: "task2",
            name: "task2",
            type: "node",
          },
        ],
        root: "root",
      },
    ],
    [
      {
        relations: [
          {
            src: "name",
            dst: "stepabc",
          },
          {
            src: "stepabc",
            dst: "stepabc1",
          },
          {
            dst: "step02",
            src: "step01",
          },
          {
            dst: "step03",
            src: "step02",
          },
        ],
        steps: [
          {
            name: "name",
            next: "stepabc",
            type: "pass",
            id: "name",
          },
          {
            id: "stepabc",
            name: "stepabc",
            pre: "name",
            next: "stepabc1",
            type: "pass",
          },
          {
            id: "stepabc1",
            name: "stepabc1",
            pre: "stepabc",
            type: "pass",
          },
          {
            id: "step01",
            name: "步骤01",
            next: "step02",
            type: "pass",
          },
          {
            id: "step02",
            name: "步骤02",
            next: "step03",
            pre: "step01",
            type: "pass",
          },
          {
            id: "step03",
            name: "步骤03",
            pre: "step02",
            next: "",
            type: "pass",
          },
        ],
      },
      "name",
      {
        edges: [
          { source: "root", target: "name", type: "include" },
          { source: "root", target: "stepabc", type: "include" },
          { source: "root", target: "stepabc1", type: "include" },
          { source: "root", target: "step01", type: "include" },
          { source: "root", target: "step02", type: "include" },
          { source: "root", target: "step03", type: "include" },
          { source: "name", target: "stepabc", type: "dagre" },
          { source: "stepabc", target: "stepabc1", type: "dagre" },
          { source: "step01", target: "step02", type: "dagre" },
          { source: "step02", target: "step03", type: "dagre" },
        ],
        nodes: [
          { id: "root", type: "node" },
          {
            data: { id: "name", name: "name", next: "stepabc", type: "pass" },
            id: "name",
            name: "name",
            type: "node",
          },
          {
            data: {
              id: "stepabc",
              name: "stepabc",
              next: "stepabc1",
              pre: "name",
              type: "pass",
            },
            id: "stepabc",
            name: "stepabc",
            type: "node",
          },
          {
            data: {
              id: "stepabc1",
              name: "stepabc1",
              pre: "stepabc",
              type: "pass",
            },
            id: "stepabc1",
            name: "stepabc1",
            type: "node",
          },
          {
            data: {
              id: "step01",
              name: "步骤01",
              next: "step02",
              type: "pass",
            },
            id: "step01",
            name: "步骤01",
            type: "node",
          },
          {
            data: {
              id: "step02",
              name: "步骤02",
              next: "step03",
              pre: "step01",
              type: "pass",
            },
            id: "step02",
            name: "步骤02",
            type: "node",
          },
          {
            data: {
              id: "step03",
              name: "步骤03",
              next: "",
              pre: "step02",
              type: "pass",
            },
            id: "step03",
            name: "步骤03",
            type: "node",
          },
        ],
        root: "root",
      },
    ],
    [
      {
        relations: [
          {
            src: "step1",
            dst: "branch",
          },
          {
            src: "branch",
            dst: "ch1",
          },
        ],
        steps: [
          {
            name: "step1",
            type: "switch",
            id: "step1",
            children: ["branch"],
          },
          {
            id: "branch",
            name: "branch",
            type: "branch",
            children: ["ch1", "step2"],
            config: { startAt: "ch1" },
            parent: "step1",
          },
          {
            id: "ch1",
            name: "ch1",
            type: "choice",
            parent: "branch",
          },
          {
            id: "step2",
            name: "step2",
            type: "pass",
            parent: "branch",
          },
        ],
      },
      "step1",
      {
        edges: [
          { source: "root", target: "step1", type: "include" },
          { source: "step1", target: "branch", type: "container" },
          { source: "branch", target: "branch_layout", type: "group" },
          { source: "branch_layout", target: "ch1", type: "childrenLayout" },
          { source: "branch_layout", target: "step2", type: "childrenLayout" },
        ],
        nodes: [
          { id: "root", type: "node" },
          {
            data: {
              children: ["branch"],
              id: "step1",
              name: "step1",
              type: "switch",
            },
            id: "step1",
            name: "step1",
            type: "container",
          },
          {
            data: {
              children: ["ch1", "step2"],
              config: { startAt: "ch1" },
              id: "branch",
              name: "branch",
              parent: "step1",
              type: "branch",
            },
            id: "branch",
            name: "branch",
            type: "group",
          },
          { id: "branch_layout", name: "branch_layout", type: "node" },
          {
            data: { id: "ch1", name: "ch1", parent: "branch", type: "choice" },
            id: "ch1",
            name: "ch1",
            type: "node",
          },
          {
            data: {
              id: "step2",
              name: "step2",
              parent: "branch",
              type: "pass",
            },
            id: "step2",
            name: "step2",
            type: "node",
          },
        ],
        root: "root",
      },
    ],
    [
      {
        relations: [],
        steps: [],
      },
      undefined,
      { edges: [], nodes: [{ id: "root", type: "node" }], root: "root" },
    ],
  ])("should work", (data, startId, result) => {
    expect(getFlowGraph(data, startId)).toEqual(result);
  });
});
