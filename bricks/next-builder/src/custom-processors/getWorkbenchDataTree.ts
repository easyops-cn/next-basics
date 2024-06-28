import { getRuntime } from "@next-core/brick-kit";
import { computeConstantCondition, isEvaluable } from "@next-core/brick-utils";
import {
  BuilderCustomTemplateNode,
  BuilderRouteNode,
  ContextConf,
  BuilderSnippetNode,
  MenuIcon,
} from "@next-core/brick-types";
import { pipes } from "@next-core/pipes";
import { uniqueId } from "lodash";
import { WorkbenchNodeData } from "../shared/workbench/interfaces";
import { StoryboardType } from "../shared/storyboard/interfaces";

interface PartialProject {
  storyboardType: StoryboardType;
}

interface ExtendedContextConf extends ContextConf {
  path?: string;
  expose?: boolean;
}

function isNonExpression(value: unknown): boolean {
  switch (typeof value) {
    case "string":
      return !isEvaluable(value) && !value.includes("${");
    case "boolean":
    case "number":
      return true;
    case "object":
      return value === null
        ? true
        : (Array.isArray(value) ? value : Object.entries(value).flat()).every(
            (item) => isNonExpression(item)
          );
    default:
      return false;
  }
}

export function getWorkbenchDataTree(
  node: BuilderRouteNode | BuilderCustomTemplateNode | BuilderSnippetNode,
  projectDetail?: PartialProject,
  options?: {
    distinguishExposedStates?: boolean;
  }
): WorkbenchNodeData[] {
  return (
    (
      (node.type === "snippet"
        ? projectDetail?.storyboardType === "theme-template"
          ? node.context
          : node.snippetData
        : node.type === "custom-template"
        ? pipes.json((node as { state?: string }).state)
        : node.context) as ExtendedContextConf[]
    )?.map((item) => {
      const key = uniqueId("context-key-");
      let unreachable = false;
      if (item.if !== undefined) {
        const check = { if: item.if };
        computeConstantCondition(check);
        if (check.if === false) {
          unreachable = true;
        }
      }

      let icon: MenuIcon;
      if (item.resolve) {
        icon = {
          lib: "antd",
          icon: "link",
          theme: "outlined",
          color: "orange",
        };
      } else {
        icon = isNonExpression(item.value)
          ? {
              lib: "fa",
              prefix: "fas",
              icon: "dollar-sign",
              color: "blue",
            }
          : {
              lib: "antd",
              icon: "code",
              theme: "outlined",
              color: "cyan",
            };
      }

      return {
        key,
        name: item.name,
        path: item.path,
        icon,
        labelPrefix:
          node.type === "custom-template" &&
          options?.distinguishExposedStates &&
          !(item.expose ?? true)
            ? {
                text: "# ",
                style: {
                  color: "var(--palette-purple-7)",
                },
              }
            : undefined,
        data: {
          ...item,
          $key: key,
        },
        unreachable,
      };
    }) ?? []
  );
}

getRuntime().registerCustomProcessor(
  "nextBuilder.getWorkbenchDataTree",
  getWorkbenchDataTree
);
