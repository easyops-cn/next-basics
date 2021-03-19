import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import { isNil } from "lodash";

export function findQueryInNode(
  node: BuilderRuntimeNode,
  query: string
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
  let found = false;
  for (const field in node) {
    if (fieldsToSearch.includes(field)) {
      const value = node[field];
      if (isNil(value)) {
        continue;
      }
      const strValue =
        typeof value === "string" ? value : JSON.stringify(value);
      if (strValue?.toLowerCase().includes(query)) {
        found = true;
        break;
      }
    }
  }
  return found;
}
