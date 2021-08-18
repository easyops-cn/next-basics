import { getRuntime } from "@next-core/brick-kit";

interface FieldItem {
  name: string;
  type: string;
}

interface RefData {
  stepId: string;
  type: string;
  name: string;
}

interface StepItem {
  id: string;
  name: string;
  parent?: string[];
  input?: FieldItem[];
  output?: FieldItem[];
}

interface FieldRelation {
  source: RefData;
  target: RefData;
}

export interface StepParams {
  stepList: StepItem[];
  fieldRelations: FieldRelation[];
}

interface CollectNode {
  type: string;
  id: string;
  name?: string;
  [key: string]: unknown;
}

interface GraphEdge {
  source: string;
  target: string;
  type?: string;
  [key: string]: unknown;
}

interface GraphFunctionStep {
  root: string;
  nodes: CollectNode[];
  edges: GraphEdge[];
}

interface FlowOption {
  type?: string;
}

function _calcDepth(
  parents: string[],
  stepList: StepItem[],
  obj: { curDepth: number; depthArr: number[] }
): void {
  if (!parents) {
    obj.depthArr.push(obj.curDepth);
    obj.curDepth = 0;
  }
  parents?.forEach((parentId) => {
    obj.curDepth += 1;
    const find = stepList.find((item) => item.id === parentId);
    find && _calcDepth(find.parent, stepList, obj);
  });
}

function calcDepth(item: StepItem, stepList: StepItem[]): number {
  const obj = {
    curDepth: 0,
    depthArr: [],
  } as { curDepth: number; depthArr: number[] };
  _calcDepth(item.parent, stepList, obj);

  return Math.max(...obj.depthArr);
}

function processFunctionStep(stepList: StepItem[]): Array<StepItem[]> {
  const list = [] as Array<StepItem[]>;
  stepList.forEach((step) => {
    const depth = calcDepth(step, stepList);
    if (!list[depth]) {
      list[depth] = [step];
    } else {
      list[depth].push(step);
    }
  });

  return list;
}

export function getFunctionStep(
  data: StepParams,
  options: FlowOption = {}
): GraphFunctionStep {
  const rootId = "root";
  const rootNode = {
    id: rootId,
    type: "flow",
  };
  const stepNodes: CollectNode[] = [];
  const functionNodes: CollectNode[] = [];
  const containerGroupNodes: CollectNode[] = [];
  const inputNodes: CollectNode[] = [];
  const outputNodes: CollectNode[] = [];

  const stepEdges: GraphEdge[] = [];
  const functionEdges: GraphEdge[] = [];
  const inputEdges: GraphEdge[] = [];
  const outputEdges: GraphEdge[] = [];
  const fieldLinksEdges: GraphEdge[] = [];
  const functionLinksEdges: GraphEdge[] = [];

  if (data.stepList) {
    const processedSteps = processFunctionStep(data.stepList);
    processedSteps.forEach((steps, index) => {
      const stepId = `step-${index}`;
      stepNodes.push({
        type: "step",
        id: stepId,
      });

      stepEdges.push({
        source: rootId,
        target: stepId,
        type: "layer",
      });

      steps.forEach((step) => {
        stepEdges.push({
          source: stepId,
          target: `${step.id}.${step.name}`,
          type: "step",
        });
      });
    });

    for (const step of data.stepList) {
      const functionId = `${step.id}.${step.name}`;
      const inputGroupId = `${step.id}.${step.name}.input.group`;
      const outputGroupId = `${step.id}.${step.name}.output.group`;

      functionNodes.push({
        type: "function",
        id: functionId,
        name: step.name,
      });

      if (step.input) {
        containerGroupNodes.push({
          name: "input",
          id: inputGroupId,
          type: "group",
        });

        for (const input of step.input) {
          const inputId = `${step.id}.${step.name}.${input.name}`;
          inputNodes.push({
            id: inputId,
            type: "input",
            name: input.name,
            valueType: input.type,
          });

          inputEdges.push({
            source: inputGroupId,
            target: inputId,
            type: "input",
          });
        }

        functionEdges.push({
          source: functionId,
          target: inputGroupId,
          type: "group",
        });
      }

      if (step.output) {
        containerGroupNodes.push({
          name: "output",
          id: outputGroupId,
          type: "group",
        });

        for (const output of step.output) {
          const outputId = `${step.id}.${step.name}.${output.name}`;
          outputNodes.push({
            id: outputId,
            type: "output",
            name: output.name,
            valueType: output.type,
          });

          outputEdges.push({
            source: outputGroupId,
            target: outputId,
            type: "output",
          });
        }

        functionEdges.push({
          source: functionId,
          target: outputGroupId,
          type: "group",
        });
      }

      if (step.parent) {
        step.parent.forEach((parentId) => {
          const find = data.stepList.find((item) => item.id === parentId);
          find &&
            functionLinksEdges.push({
              source: `${find.id}.${find.name}`,
              target: functionId,
              type: "function-link",
            });
        });
      }
    }

    if (data.fieldRelations) {
      for (const relation of data.fieldRelations) {
        const sourceStepData = data.stepList.find(
          (item) => item.id === relation.source.stepId
        );
        const targetStepData = data.stepList.find(
          (item) => item.id === relation.target.stepId
        );
        fieldLinksEdges.push({
          source: `${relation.source.stepId}.${sourceStepData.name}.${relation.source.name}`,
          target: `${relation.target.stepId}.${targetStepData.name}.${relation.target.name}`,
          type: "link",
        });
      }
    }
  }

  const edges = stepEdges.concat(
    functionEdges,
    inputEdges,
    outputEdges,
    functionLinksEdges,
    fieldLinksEdges
  );

  const filtersEdges = edges.filter((item) => {
    if (options.type === "function") {
      return item.type !== "link";
    } else if (options.type === "params") {
      return item.type !== "function-link";
    }

    return true;
  });

  return {
    root: rootId,
    nodes: [rootNode].concat(
      stepNodes,
      functionNodes,
      containerGroupNodes,
      inputNodes,
      outputNodes
    ),
    edges: filtersEdges,
  };
}

getRuntime().registerCustomProcessor(
  "flowBuilder.getFunctionStep",
  getFunctionStep
);
