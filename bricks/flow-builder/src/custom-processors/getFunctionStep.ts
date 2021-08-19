import { getRuntime } from "@next-core/brick-kit";
import { range } from "lodash";

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
  type: string;
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

function getStageNodesAndEdges(
  functionLinksEdges: GraphEdge[],
  firstStepId: string,
  rootId: string
): [
  stageNodes: CollectNode[],
  stageEdges: GraphEdge[],
  stepDescendantsMap: Map<string, Set<string>>
] {
  const stepLevelMap = new Map<string, number>();
  let maxLevel = 0;
  const stepDescendantsMap = new Map<string, Set<string>>();
  const walk = (
    id: string,
    level: number,
    descendantsCarry?: Set<Set<string>>
  ): void => {
    if (level > (stepLevelMap.get(id) ?? -1)) {
      // Take every step's max level.
      stepLevelMap.set(id, level);
    }
    if (level > maxLevel) {
      maxLevel = level;
    }
    let selfDesc = stepDescendantsMap.get(id);
    if (!selfDesc) {
      selfDesc = new Set();
      stepDescendantsMap.set(id, selfDesc);
    }
    const newDescendantsCarry = new Set(descendantsCarry);
    newDescendantsCarry.add(selfDesc);
    for (const edge of functionLinksEdges) {
      if (edge.source === id) {
        for (const desc of newDescendantsCarry) {
          desc.add(edge.target);
        }
        walk(edge.target, level + 1, newDescendantsCarry);
      }
    }
  };
  walk(firstStepId, 0, new Set());

  const stageNodes: CollectNode[] = range(0, maxLevel + 1).map(
    (level) =>
      ({
        type: "stage",
        id: `stage.${level}`,
      } as CollectNode)
  );

  const stageEdges: GraphEdge[] = stageNodes.map((node) => ({
    source: rootId,
    target: node.id,
    type: "layer",
  }));

  for (const [id, level] of stepLevelMap.entries()) {
    stageEdges.push({
      source: `stage.${level}`,
      target: id,
      type: "stage",
    });
  }

  return [stageNodes, stageEdges, stepDescendantsMap];
}

export function getFunctionStep(
  { stepList, fieldRelations }: StepParams,
  options: FlowOption = {}
): GraphFunctionStep {
  const rootId = "root";
  const rootNode = {
    id: rootId,
    type: "flow",
  };
  let stageNodes: CollectNode[] = [];
  const stepNodes: CollectNode[] = [];
  const containerGroupNodes: CollectNode[] = [];
  const inputNodes: CollectNode[] = [];
  const outputNodes: CollectNode[] = [];

  let stageEdges: GraphEdge[] = [];
  const stepEdges: GraphEdge[] = [];
  const inputEdges: GraphEdge[] = [];
  const outputEdges: GraphEdge[] = [];
  const fieldLinksEdges: GraphEdge[] = [];
  const functionLinksEdges: GraphEdge[] = [];

  let stepDescendantsMap: Map<string, Set<string>>;

  if (stepList) {
    let firstStepId: string;
    for (const step of stepList) {
      const stepId = step.id;
      if (step.parent?.length) {
        for (const parentId of step.parent) {
          const parentStep = stepList.find((item) => item.id === parentId);
          if (parentStep) {
            functionLinksEdges.push({
              source: parentStep.id,
              target: stepId,
              type: "step-link",
            });
          }
        }
      } else {
        firstStepId = stepId;
      }
    }

    [stageNodes, stageEdges, stepDescendantsMap] = getStageNodesAndEdges(
      functionLinksEdges,
      firstStepId,
      rootId
    );

    for (const step of stepList) {
      const functionId = step.id;
      const inputGroupId = `${step.id}.group.input`;
      const outputGroupId = `${step.id}.group.output`;

      stepNodes.push({
        type: "step",
        id: functionId,
        name: step.id,
        stepType: step.type,
        descendants: Array.from(stepDescendantsMap.get(step.id)),
      });

      if (step.input) {
        containerGroupNodes.push({
          name: "input",
          id: inputGroupId,
          type: "group",
          stepType: step.type,
        });

        for (const input of step.input) {
          const inputId = `${step.id}.input.${input.name}`;
          inputNodes.push({
            id: inputId,
            type: "input",
            name: input.name,
            valueType: input.type,
            stepData: {
              id: step.id,
            },
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
          stepType: step.type,
        });

        for (const output of step.output) {
          const outputId = `${step.id}.output.${output.name}`;
          outputNodes.push({
            id: outputId,
            type: "output",
            name: output.name,
            valueType: output.type,
            stepData: {
              id: step.id,
            },
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
    }

    if (fieldRelations) {
      for (const relation of fieldRelations) {
        fieldLinksEdges.push({
          source: `${relation.source.stepId}.${relation.source.type}.${relation.source.name}`,
          target: `${relation.target.stepId}.${relation.target.type}.${relation.target.name}`,
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
