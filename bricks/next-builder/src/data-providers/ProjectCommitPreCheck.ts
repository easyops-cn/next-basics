import { createProviderClass } from "@next-core/brick-utils";
import { GitApi_CodeDiffResponseBody_diffs_item } from "@next-sdk/next-builder-sdk";
import { ModelGitDiffTree } from "@next-sdk/next-builder-sdk/dist/types/model/next_builder";
import { walkTree } from "./utils/processDataWithDiff";

export interface ProjectCommitPreCheckParams {
  diffs: GitApi_CodeDiffResponseBody_diffs_item[];
  selectedDiffs: string[];
}

interface CheckedError {
  node: Partial<ModelGitDiffTree>;
  parentNode?: Partial<ModelGitDiffTree>;
  category: string;
  type: string;
}

export function ProjectCommitPreCheck({
  diffs,
  selectedDiffs,
}: ProjectCommitPreCheckParams): CheckedError[] {
  const selectedDiffsSet = new Set(selectedDiffs);
  const errors: CheckedError[] = [];

  diffs.map((diffItem) => {
    switch (diffItem.category) {
      case "basic_info": {
        diffItem.root?.forEach((node) => {
          if (
            node.actions.some((ac) => ac.action === "add") &&
            !selectedDiffsSet.has(node.id)
          ) {
            errors.push({
              category: diffItem.category,
              node: node,
              type: "NOT_ADD_PROJECT_INFO",
            });
          }
          if (
            node.actions.some((ac) => ac.action === "delete") &&
            selectedDiffsSet.has(node.id)
          ) {
            errors.push({
              category: diffItem.category,
              node: node,
              type: "DELETE_PROJECT_INFO",
            });
          }
        });
        break;
      }
      case "routes":
      case "templates":
      case "menus": {
        walkTree(diffItem.root, null, (node, parent) => {
          if (
            node.actions.some((ac) => ac.action === "add") &&
            selectedDiffsSet.has(node.id) &&
            parent &&
            parent.actions.some((ac) => ac.action === "add") &&
            !selectedDiffsSet.has(parent.id)
          ) {
            errors.push({
              category: diffItem.category,
              node: node,
              parentNode: parent,
              type: "ADD_NODE_BUT_NOT_ADD_PARENT",
            });
          }
          if (
            node.actions.some((ac) => ac.action === "delete") &&
            !selectedDiffsSet.has(node.id) &&
            parent &&
            parent.actions.some((ac) => ac.action === "delete") &&
            selectedDiffsSet.has(parent.id)
          ) {
            errors.push({
              category: diffItem.category,
              node: node,
              parentNode: parent,
              type: "DELETE_PARENT_BUT_NOT_DELETE_NODE",
            });
          }
          const moveAction = node.actions.find((ac) => ac.action === "move");
          if (
            moveAction &&
            moveAction.curRootInstanceId === (parent?.id || "") &&
            selectedDiffsSet.has(node.id) &&
            parent &&
            parent.actions.some((ac) => ac.action === "add") &&
            !selectedDiffsSet.has(parent.id)
          ) {
            errors.push({
              category: diffItem.category,
              node: node,
              parentNode: parent,
              type: "MOVE_NODE_BUT_NOT_ADD_PARENT",
            });
          }
        });
        break;
      }
    }
  });

  return errors;
}

customElements.define(
  "next-builder.provider-project-commit-pre-check",
  createProviderClass(ProjectCommitPreCheck)
);
