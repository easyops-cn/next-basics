import { getFunctionStep, StepParams } from "./getFunctionStep";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getFunctionStep", () => {
  it("should work", () => {
    const data = {
      stepList: [
        {
          id: "1",
          name: "createInstance",
          input: [
            {
              name: "name",
              type: "string",
            },
          ],
          output: [
            {
              name: "instanceData",
              type: "object",
            },
          ],
        },
        {
          id: "2",
          parent: ["1"],
          name: "getDetail",
          input: [
            { name: "instanceId", type: "string" },
            { name: "fields", type: "string" },
          ],
          output: [{ name: "data", type: "string" }],
        },
        {
          id: "3",
          parent: ["1"],
          name: "deleteInstance",
          input: [{ name: "instanceId", type: "string" }],
          output: [{ name: "result", type: "object" }],
        },
      ],
      fieldRelations: [
        {
          source: {
            stepId: "1",
            type: "output",
            name: "instanceData",
          },
          target: {
            stepId: "2",
            type: "input",
            name: "instanceId",
          },
        },
        {
          source: {
            stepId: "1",
            type: "output",
            name: "instanceData",
          },
          target: {
            stepId: "3",
            type: "output",
            name: "instanceId",
          },
        },
      ],
    };
    expect(getFunctionStep(data)).toEqual({
      edges: [
        { source: "root", target: "stage.0", type: "layer" },
        { source: "root", target: "stage.1", type: "layer" },
        { source: "stage.0", target: "1", type: "stage" },
        { source: "stage.1", target: "2", type: "stage" },
        { source: "stage.1", target: "3", type: "stage" },
        {
          source: "1",
          target: "1.group.input",
          type: "group",
        },
        {
          source: "1",
          target: "1.group.output",
          type: "group",
        },
        {
          source: "2",
          target: "2.group.input",
          type: "group",
        },
        {
          source: "2",
          target: "2.group.output",
          type: "group",
        },
        {
          source: "3",
          target: "3.group.input",
          type: "group",
        },
        {
          source: "3",
          target: "3.group.output",
          type: "group",
        },
        {
          source: "1.group.input",
          target: "1.input.name",
          type: "input",
        },
        {
          source: "2.group.input",
          target: "2.input.instanceId",
          type: "input",
        },
        {
          source: "2.group.input",
          target: "2.input.fields",
          type: "input",
        },
        {
          source: "3.group.input",
          target: "3.input.instanceId",
          type: "input",
        },
        {
          source: "1.group.output",
          target: "1.output.instanceData",
          type: "output",
        },
        {
          source: "2.group.output",
          target: "2.output.data",
          type: "output",
        },
        {
          source: "3.group.output",
          target: "3.output.result",
          type: "output",
        },
        {
          source: "1",
          target: "2",
          type: "step-link",
        },
        {
          source: "1",
          target: "3",
          type: "step-link",
        },
        {
          source: "1.output.instanceData",
          target: "2.input.instanceId",
          type: "link",
        },
        {
          source: "1.output.instanceData",
          target: "3.output.instanceId",
          type: "link",
        },
      ],
      nodes: [
        { id: "root", type: "flow" },
        { id: "stage.0", type: "stage" },
        { id: "stage.1", type: "stage" },
        {
          id: "1",
          name: "1",
          stepType: undefined,
          type: "step",
          descendants: ["2", "3"],
        },
        {
          id: "2",
          name: "2",
          stepType: undefined,
          type: "step",
          descendants: [],
        },
        {
          id: "3",
          name: "3",
          stepType: undefined,
          type: "step",
          descendants: [],
        },
        {
          id: "1.group.input",
          name: "input",
          stepType: undefined,
          type: "group",
        },
        {
          id: "1.group.output",
          name: "output",
          stepType: undefined,
          type: "group",
        },
        {
          id: "2.group.input",
          name: "input",
          stepType: undefined,
          type: "group",
        },
        {
          id: "2.group.output",
          name: "output",
          stepType: undefined,
          type: "group",
        },
        {
          id: "3.group.input",
          name: "input",
          stepType: undefined,
          type: "group",
        },
        {
          id: "3.group.output",
          name: "output",
          stepType: undefined,
          type: "group",
        },
        {
          id: "1.input.name",
          name: "name",
          type: "input",
          valueType: "string",
          stepData: {
            id: "1",
          },
        },
        {
          id: "2.input.instanceId",
          name: "instanceId",
          type: "input",
          valueType: "string",
          stepData: {
            id: "2",
          },
        },
        {
          id: "2.input.fields",
          name: "fields",
          type: "input",
          valueType: "string",
          stepData: {
            id: "2",
          },
        },
        {
          id: "3.input.instanceId",
          name: "instanceId",
          type: "input",
          valueType: "string",
          stepData: {
            id: "3",
          },
        },
        {
          id: "1.output.instanceData",
          name: "instanceData",
          type: "output",
          valueType: "object",
          stepData: {
            id: "1",
          },
        },
        {
          id: "2.output.data",
          name: "data",
          type: "output",
          valueType: "string",
          stepData: {
            id: "2",
          },
        },
        {
          id: "3.output.result",
          name: "result",
          type: "output",
          valueType: "object",
          stepData: {
            id: "3",
          },
        },
      ],
      root: "root",
    });
    expect(
      getFunctionStep({
        stepList: [
          {
            id: "request",
            name: "request",
            type: "request",
          },
          {
            id: "create",
            name: "createInstance",
            type: "function",
            parent: ["request"],
          },

          {
            id: "response",
            name: "response",
            type: "response",
            parent: ["create"],
          },
        ],
        fieldRelations: [],
      })
    ).toEqual({
      edges: [
        { source: "root", target: "stage.0", type: "layer" },
        { source: "root", target: "stage.1", type: "layer" },
        { source: "root", target: "stage.2", type: "layer" },
        { source: "stage.0", target: "request", type: "stage" },
        { source: "stage.1", target: "create", type: "stage" },
        { source: "stage.2", target: "response", type: "stage" },
        { source: "request", target: "request.empty.group", type: "group" },
        { source: "response", target: "response.empty.group", type: "group" },
        { source: "request", target: "create", type: "step-link" },
        { source: "create", target: "response", type: "step-link" },
      ],
      nodes: [
        { id: "root", type: "flow" },
        { id: "stage.0", type: "stage" },
        { id: "stage.1", type: "stage" },
        { id: "stage.2", type: "stage" },
        {
          descendants: ["create", "response"],
          id: "request",
          name: "request",
          stepType: "request",
          type: "step",
        },
        {
          descendants: ["response"],
          id: "create",
          name: "create",
          stepType: "function",
          type: "step",
        },
        {
          descendants: [],
          id: "response",
          name: "response",
          stepType: "response",
          type: "step",
        },
        { id: "request.empty.group", stepType: "request", type: "empty.group" },
        {
          id: "response.empty.group",
          stepType: "response",
          type: "empty.group",
        },
      ],
      root: "root",
    });
    expect(getFunctionStep({} as StepParams)).toEqual({
      edges: [],
      nodes: [{ id: "root", type: "flow" }],
      root: "root",
    });
    expect(
      getFunctionStep({
        stepList: [{ name: "createInstance", id: "1" }],
      } as StepParams)
    ).toEqual({
      edges: [
        { source: "root", target: "stage.0", type: "layer" },
        { source: "stage.0", target: "1", type: "stage" },
      ],
      nodes: [
        { id: "root", type: "flow" },
        { id: "stage.0", type: "stage" },
        {
          id: "1",
          name: "1",
          stepType: undefined,
          type: "step",
          descendants: [],
        },
      ],
      root: "root",
    });
  });
});
