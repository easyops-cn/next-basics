import { Parser } from "html-to-react";
import { getFlowConfigDagre } from "./getFlowConfigDagre";
import { FlowConfig } from "./interfaces";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

const root: FlowConfig = {
  id: "__EasyopsFlowConfigRoot__",
  type: "node",
  flowType: "__EasyopsFlowConfigStart__",
  action: null,
  children: [],
};

const flowConfig = [
  {
    id: "a",
    action: {
      type: "function",
    },
  },
  {
    id: "b",
    parents: [],
    action: {
      type: "function",
    },
  },
  {
    id: "c",
    parents: ["a", "b"],
    action: {
      type: "function",
    },
  },
  {
    id: "d",
    parents: ["a", "c"],
    action: {
      type: "function",
    },
  },
  {
    id: "e",
    parents: ["d", "non-exist"],
    action: {
      type: "response",
    },
  },
];

describe("getFlowConfigDagre", () => {
  it("should work", () => {
    expect(getFlowConfigDagre(flowConfig)).toMatchObject({
      nodes: [
        root,
        {
          id: "a",
          action: {
            type: "function",
          },
          flowType: "function",
          type: "node",
          parents: ["__EasyopsFlowConfigRoot__"],
        },
        {
          id: "b",
          parents: ["__EasyopsFlowConfigRoot__"],
          action: {
            type: "function",
          },
          flowType: "function",
          type: "node",
        },
        {
          id: "c",
          parents: ["a", "b"],
          action: {
            type: "function",
          },
          flowType: "function",
          type: "node",
        },
        {
          id: "d",
          parents: ["a", "c"],
          action: {
            type: "function",
          },
          flowType: "function",
          type: "node",
        },
        {
          id: "e",
          parents: ["d", "non-exist"],
          action: {
            type: "response",
          },
          flowType: "response",
          type: "node",
        },
      ],
      edges: [
        {
          source: "__EasyopsFlowConfigRoot__",
          target: "a",
          type: "link",
        },
        {
          source: "__EasyopsFlowConfigRoot__",
          target: "b",
          type: "link",
        },
        {
          source: "a",
          target: "c",
          type: "link",
        },
        {
          source: "b",
          target: "c",
          type: "link",
        },
        {
          source: "a",
          target: "d",
          type: "link",
        },
        {
          source: "c",
          target: "d",
          type: "link",
        },
        {
          source: "d",
          target: "e",
          type: "link",
        },
      ],
    });
  });
});
