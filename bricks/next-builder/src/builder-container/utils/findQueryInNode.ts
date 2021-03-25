import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import { findQueryInObjectValues } from "./utils";

export function findQueryInNode(
  node: BuilderRuntimeNode,
  query: string | RegExp
): boolean {
  const fieldsToSearch = [
    "id",
    "type",
    "alias",
    "mountPoint",
    "path",
    "menu",
    "providers",
    "defineResolves",
    "redirect",
    "context",
    "permissionsPreCheck",
    "segues",
    "properties",
    "events",
    "lifeCycle",
    "params",
    "if",
    "ref",
    "brick",
    "templateId",
    "proxy",
  ];
  return findQueryInObjectValues(node, query, fieldsToSearch);
}
