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

export function getWorkbenchDataTree(
  node: BuilderRouteNode | BuilderCustomTemplateNode | BuilderSnippetNode,
  projectDetail?: PartialProject
): WorkbenchNodeData[] {
  return (
    (node.type === "snippet"
      ? projectDetail?.storyboardType === "theme-template"
        ? node.context
        : node.snippetData
      : node.type === "custom-template"
      ? (pipes.json((node as { state?: string }).state) as ContextConf[])
      : node.context
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
        path: (item as { path?: string }).path,
        icon: {
          lib: "antd",
          theme: "outlined",
          icon: item.resolve ? "link" : "code",
          color: item.resolve ? "orange" : "cyan",
        },
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
