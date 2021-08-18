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
        { source: "root", target: "stage-0", type: "layer" },
        { source: "stage-0", target: "1.createInstance", type: "stage" },
        { source: "root", target: "stage-1", type: "layer" },
        { source: "stage-1", target: "2.getDetail", type: "stage" },
        { source: "stage-1", target: "3.deleteInstance", type: "stage" },
        {
          source: "1.createInstance",
          target: "1.createInstance.input.group",
          type: "group",
        },
        {
          source: "1.createInstance",
          target: "1.createInstance.output.group",
          type: "group",
        },
        {
          source: "2.getDetail",
          target: "2.getDetail.input.group",
          type: "group",
        },
        {
          source: "2.getDetail",
          target: "2.getDetail.output.group",
          type: "group",
        },
        {
          source: "3.deleteInstance",
          target: "3.deleteInstance.input.group",
          type: "group",
        },
        {
          source: "3.deleteInstance",
          target: "3.deleteInstance.output.group",
          type: "group",
        },
        {
          source: "1.createInstance.input.group",
          target: "1.createInstance.name",
          type: "input",
        },
        {
          source: "2.getDetail.input.group",
          target: "2.getDetail.instanceId",
          type: "input",
        },
        {
          source: "2.getDetail.input.group",
          target: "2.getDetail.fields",
          type: "input",
        },
        {
          source: "3.deleteInstance.input.group",
          target: "3.deleteInstance.instanceId",
          type: "input",
        },
        {
          source: "1.createInstance.output.group",
          target: "1.createInstance.instanceData",
          type: "output",
        },
        {
          source: "2.getDetail.output.group",
          target: "2.getDetail.data",
          type: "output",
        },
        {
          source: "3.deleteInstance.output.group",
          target: "3.deleteInstance.result",
          type: "output",
        },
        {
          source: "1.createInstance",
          target: "2.getDetail",
          type: "step-link",
        },
        {
          source: "1.createInstance",
          target: "3.deleteInstance",
          type: "step-link",
        },
        {
          source: "1.createInstance.instanceData",
          target: "2.getDetail.instanceId",
          type: "link",
        },
        {
          source: "1.createInstance.instanceData",
          target: "3.deleteInstance.instanceId",
          type: "link",
        },
      ],
      nodes: [
        { id: "root", type: "flow" },
        { id: "stage-0", type: "stage" },
        { id: "stage-1", type: "stage" },
        { id: "1.createInstance", name: "createInstance", type: "step" },
        { id: "2.getDetail", name: "getDetail", type: "step" },
        { id: "3.deleteInstance", name: "deleteInstance", type: "step" },
        { id: "1.createInstance.input.group", name: "input", type: "group" },
        { id: "1.createInstance.output.group", name: "output", type: "group" },
        { id: "2.getDetail.input.group", name: "input", type: "group" },
        { id: "2.getDetail.output.group", name: "output", type: "group" },
        { id: "3.deleteInstance.input.group", name: "input", type: "group" },
        { id: "3.deleteInstance.output.group", name: "output", type: "group" },
        {
          id: "1.createInstance.name",
          name: "name",
          type: "input",
          valueType: "string",
        },
        {
          id: "2.getDetail.instanceId",
          name: "instanceId",
          type: "input",
          valueType: "string",
        },
        {
          id: "2.getDetail.fields",
          name: "fields",
          type: "input",
          valueType: "string",
        },
        {
          id: "3.deleteInstance.instanceId",
          name: "instanceId",
          type: "input",
          valueType: "string",
        },
        {
          id: "1.createInstance.instanceData",
          name: "instanceData",
          type: "output",
          valueType: "object",
        },
        {
          id: "2.getDetail.data",
          name: "data",
          type: "output",
          valueType: "string",
        },
        {
          id: "3.deleteInstance.result",
          name: "result",
          type: "output",
          valueType: "object",
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
        { source: "root", target: "stage-0", type: "layer" },
        { source: "stage-0", target: "1.createInstance", type: "stage" },
      ],
      nodes: [
        { id: "root", type: "flow" },
        { id: "stage-0", type: "stage" },
        { id: "1.createInstance", name: "createInstance", type: "step" },
      ],
      root: "root",
    });
  });
});
