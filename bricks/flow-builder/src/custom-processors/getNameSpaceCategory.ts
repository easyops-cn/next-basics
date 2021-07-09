import { getRuntime } from "@next-core/brick-kit";
import { CategoryNode } from "./interfaces";

/**
 *
 * 将命名空间按.号分割、分层，并返回树形结构数据
 * @export
 * @param {{ id: string }[]} namespaces
 * @return {*}  {CategoryNode[]}
 */
export function getNameSpaceCategory(
  namespaces: { id: string }[]
): CategoryNode[] {
  const rootKeys: string[] = [];
  const nodes: CategoryNode[] = [];
  namespaces.forEach((namespace) => {
    const splitedNamespace = namespace.id.split(".");
    for (let i = 0; i < splitedNamespace.length; i++) {
      const key = splitedNamespace.slice(0, i + 1).join(".");
      // store root keys
      if (i === 0 && !rootKeys.includes(key)) {
        rootKeys.push(key);
      }

      // push nodes (including roots)
      const node: CategoryNode = {
        title: splitedNamespace[i], // eg. instance
        key: key, // eg. easyops.cmdb.instance
        category: i < splitedNamespace.length - 1 ? "category" : "item",
      };
      if (!nodes.find((n) => n.key === key)) {
        nodes.push(node);
      }

      // add child to parent
      if (i > 0) {
        const parentKey = splitedNamespace.slice(0, i).join(".");
        const parent = nodes.find((n) => n.key === parentKey);
        if (!parent.children) {
          parent.children = [node];
        } else if (!parent.children.find((n) => n.key === key)) {
          parent.children.push(node);
        }
      }
    }
  });
  return nodes.filter((n) => rootKeys.includes(n.key));
}

getRuntime().registerCustomProcessor(
  "flowBuilder.getNameSpaceCategory",
  getNameSpaceCategory
);
