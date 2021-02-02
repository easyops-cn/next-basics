import { cloneDeep } from "lodash";
import { createProviderClass } from "@next-core/brick-utils";
import {
  BuilderRouteNode,
  BuilderBrickNode,
  BuilderRouteOrBrickNode,
} from "@next-core/brick-types";

export interface BuilderGraphDataParams {
  routeList: BuilderRouteNode[];
  brickList: BuilderBrickNode[];
  root?: string;
  highlightNodes?: Partial<BuilderRouteOrBrickNode>[];
}

type ProcessedRouteOrBrickNode = BuilderRouteOrBrickNode & {
  _hasView?: boolean;
  _highlight?: boolean;
};

export function BuilderGraphData(
  params: BuilderGraphDataParams
): { list: ProcessedRouteOrBrickNode[] } {
  const [routeList, brickList, root] = [
    cloneDeep(params.routeList ?? []),
    cloneDeep(params.brickList ?? []),
    params.root,
  ];

  const fullList: BuilderRouteOrBrickNode[] = (routeList as BuilderRouteOrBrickNode[]).concat(
    brickList
  );

  // A map from id to node.
  const idToNode = new Map<string, BuilderRouteOrBrickNode>(
    fullList.map((node) => [node.id, node])
  );

  const rootNode = root ? idToNode.get(root) : undefined;

  if (!rootNode) {
    return {
      list: [],
    };
  }

  params.highlightNodes?.forEach((n) => {
    const nodeToHighlight = idToNode.get(n.id);
    if (nodeToHighlight) {
      nodeToHighlight._highlight = true;
    }
  });

  //恢复父子节点关系、补全别名
  for (const item of fullList) {
    if (
      (item.type === "brick" ||
        item.type === "template" ||
        item.type === "provider") &&
      !item.alias
    ) {
      item.alias = item.brick.split(".").pop();
    }

    if (item.parent?.length) {
      const parentId = item.parent[0].id;
      const parentNode = idToNode.get(parentId);
      if (parentNode) {
        if (!parentNode.children) {
          parentNode.children = [];
        }
        parentNode.children.push(item);
      }
    }
  }

  // 标识出有子路由的构件
  routeList.forEach(function (item) {
    let p = item.parent?.length ? idToNode.get(item.parent[0].id) : undefined;
    let loop = 1;
    while (p && loop < 1000) {
      if (p.brick) {
        p._hasView = true;
      }
      p = p.parent?.length ? idToNode.get(p.parent[0].id) : undefined;
      loop = loop + 1;
    }
  });

  return {
    list: [rootNode],
  };
}

customElements.define(
  "next-builder.provider-builder-graph-data",
  createProviderClass(BuilderGraphData)
);
