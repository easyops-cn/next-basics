import { getRuntime } from "@next-core/brick-kit";
import { computeConstantCondition } from "@next-core/brick-utils";
import {
  BuilderCustomTemplateNode,
  BuilderRouteNode,
  ContextConf,
  BuilderSnippetNode,
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
      return {
        key,
        name: item.name,
        path: item.path,
        icon: {
          lib: "antd",
          theme: "outlined",
          icon: item.resolve ? "link" : "code",
          color: item.resolve ? "orange" : "cyan",
        },
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
