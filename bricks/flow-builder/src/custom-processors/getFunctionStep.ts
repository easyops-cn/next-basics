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
  const stageNodes: CollectNode[] = [];
  const stepNodes: CollectNode[] = [];
  const containerGroupNodes: CollectNode[] = [];
  const inputNodes: CollectNode[] = [];
  const outputNodes: CollectNode[] = [];

  const stageEdges: GraphEdge[] = [];
  const stepEdges: GraphEdge[] = [];
  const inputEdges: GraphEdge[] = [];
  const outputEdges: GraphEdge[] = [];
  const fieldLinksEdges: GraphEdge[] = [];
  const functionLinksEdges: GraphEdge[] = [];

  if (data.stepList) {
    const processedSteps = processFunctionStep(data.stepList);
    processedSteps.forEach((steps, index) => {
      const stageId = `stage-${index}`;
      stageNodes.push({
        type: "stage",
        id: stageId,
      });

      stageEdges.push({
        source: rootId,
        target: stageId,
        type: "layer",
      });

      steps.forEach((step) => {
        stageEdges.push({
          source: stageId,
          target: `${step.id}.${step.name}`,
          type: "stage",
        });
      });
    });

    for (const step of data.stepList) {
      const functionId = `${step.id}.${step.name}`;
      const inputGroupId = `${step.id}.${step.name}.input.group`;
      const outputGroupId = `${step.id}.${step.name}.output.group`;

      stepNodes.push({
        type: "step",
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

        stepEdges.push({
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

        stepEdges.push({
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
              type: "step-link",
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

  const edges = stageEdges.concat(
    stepEdges,
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
      stageNodes,
      stepNodes,
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
