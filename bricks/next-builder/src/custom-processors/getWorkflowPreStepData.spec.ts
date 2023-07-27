import { getWorkflowPreStepData } from "./getWorkflowPreStepData";

jest.mock("../utils/traverseNodeFromStepId", () => ({
  traverseWorkflowNode: (data, cb) => cb(),
}));

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getWorkflowPreStepData", () => {
  it("should work", () => {
    const stepList = [
      {
        name: "approval_end",
        id: "approval_end",
        next: ["workflow-demo-day-off_end"],
        pre: ["workflow-demo-day-off-type-gateway"],
        type: "approval",
        children: [],
      },
      {
        name: "普通审批",
        id: "workflow-demo-normal-approve",
        next: [],
        pre: ["workflow-demo-day-off-normal"],
        type: "approval",
        children: [],
      },
    ];

    const callback = (data, arr): void => arr.push("approval_end");

    expect(
      getWorkflowPreStepData(stepList, "workflow-demo-normal-approve", callback)
    ).toEqual(["approval_end"]);
  });
});
