import { WorkFlowNode } from "../interface";
import { traverseWorkflowNode } from "./traverseNodeFromStepId";
describe("traverseNodeFromStepId", () => {
  it.each([
    [
      [
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
        {
          name: "approval7",
          id: "approval7",
          next: [],
          pre: ["condition5"],
          type: "approval",
          children: [],
        },
        {
          name: "普通请假",
          id: "workflow-demo-day-off-normal",
          next: ["workflow-demo-normal-approve"],
          pre: [],
          type: "condition",
          children: [],
        },
        {
          name: "condition5",
          id: "condition5",
          next: ["approval7"],
          pre: [],
          type: "condition",
          children: [],
        },
        {
          name: "年假",
          id: "workflow-demo-day-off-paid",
          next: ["workflow-demo-paid-approve"],
          pre: [],
          type: "condition",
          children: [],
        },
        {
          name: "开始",
          id: "workflow-demo-day-off_start",
          next: ["create_data"],
          pre: [],
          type: "start",
          children: [],
        },
        {
          name: "",
          id: "workflow-demo-day-off-type-gateway",
          next: ["approval_end"],
          pre: ["create_data"],
          type: "gateway",
          children: [
            "workflow-demo-day-off-paid",
            "workflow-demo-day-off-normal",
            "workflow-demo-paid-approve",
            "workflow-demo-normal-approve",
            "condition5",
            "approval7",
          ],
        },
        {
          name: "年假审批",
          id: "workflow-demo-paid-approve",
          next: [],
          pre: ["workflow-demo-day-off-paid"],
          type: "approval",
          children: [],
        },
        {
          name: "结束",
          id: "workflow-demo-day-off_end",
          next: [],
          pre: ["approval_end"],
          type: "end",
          children: [],
        },
        {
          name: "create_data",
          id: "create_data",
          next: ["workflow-demo-day-off-type-gateway"],
          pre: ["workflow-demo-day-off_start"],
          type: "cmdb_create",
          children: [],
        },
      ],
      "workflow-demo-day-off_end",
      [
        "workflow-demo-day-off_end",
        "approval_end",
        "workflow-demo-day-off-type-gateway",
        "workflow-demo-day-off-paid",
        "workflow-demo-day-off-normal",
        "workflow-demo-paid-approve",
        "workflow-demo-normal-approve",
        "condition5",
        "approval7",
        "create_data",
        "workflow-demo-day-off_start",
      ],
    ],
    [
      [
        {
          id: "start",
          name: "start",
          type: "start",
          next: ["step1"],
        },
        {
          id: "step1",
          name: "step1",
          type: "start_approve",
          children: ["create", "step_gateway"],
          pre: ["start"],
          next: ["step3"],
        },
        {
          id: "create",
          name: "create",
          type: "cmdb_create",
          parent: "step1",
          next: ["step_gateway"],
          children: ["create_children"],
        },
        {
          id: "create_children",
          name: "create_children",
          type: "cmdb_search",
          parent: "create",
          children: ["cmdb_grandchildren"],
        },
        {
          id: "cmdb_grandchildren",
          name: "cmdb_grandchildren",
          type: "cmdb_search",
          parent: "create_children",
        },
        {
          id: "step_gateway",
          name: "step_gateway",
          type: "gateway",
          parent: "step1",
          children: ["condition", "step2"],
          pre: ["create"],
        },
        {
          id: "condition",
          name: "condition",
          type: "condition",
          parent: "step_gateway",
          next: ["step2"],
        },
        {
          id: "step2",
          name: "step2",
          type: "approve",
          parent: "step_gateway",
          pre: ["condition"],
        },
        {
          id: "step3",
          name: "step3",
          type: "approve",
          pre: ["step1"],
        },
      ],
      "step2",
      [
        "step2",
        "condition",
        "step_gateway",
        "create",
        "create_children",
        "cmdb_grandchildren",
        "step1",
        "start",
      ],
    ],
  ])("should work", (stepList, id, result) => {
    const stepMap = new Map();
    stepList?.forEach((item) => {
      stepMap.set(item.id, item);
    });

    const list: string[] = [];
    const nodeCallback = (stepData: WorkFlowNode): void => {
      list.push(stepData.id);
    };

    traverseWorkflowNode(id, nodeCallback, { stepMap });

    expect(list).toEqual(result);
  });
});
