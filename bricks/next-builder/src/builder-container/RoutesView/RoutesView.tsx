import React, { useState, useMemo } from "react";
import { BranchesOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { BuilderRouteNode } from "@next-core/brick-types";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { generateRouteTree } from "../../utils/generateRouteTree";
import { useBuilderUIContext } from "../BuilderUIContext";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { SearchableTree } from "../components/SearchableTree/SearchableTree";
import { RouteTreeNode } from "../../interface";

import styles from "./RoutesView.module.css";

export interface RoutesViewProps {
  handleRouteSelect?: (route: BuilderRouteNode) => void;
}

export function RoutesView({
  handleRouteSelect,
}: RoutesViewProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const rootNode = useBuilderNode({ isRoot: true });
  const { routeList, onRouteSelect } = useBuilderUIContext();
  const [q, setQ] = useState<string>("");

  const fullRouteTree = useMemo(
    () =>
      generateRouteTree({
        data: routeList,
      }),
    [routeList]
  );

  const filteredRouteTree = useMemo(
    () => filterNodesFactory(q.trim().toLowerCase())(fullRouteTree),
    [fullRouteTree, q]
  );

  const handleSelect = (selectedProps: BuilderRouteNode): void => {
    onRouteSelect?.(selectedProps);
    handleRouteSelect?.(selectedProps);
  };

  const handleQChange = (q: string): void => {
    setQ(q);
  };

  return (
    <SearchableTree
      list={filteredRouteTree}
      defaultSelectedKeys={rootNode ? [rootNode.id] : []}
      icon={<BranchesOutlined />}
      field="alias"
      searchPlaceholder={t(K.SEARCH_ROUTE)}
      onSelect={handleSelect}
      onQChange={handleQChange}
      customClassName={styles.customTree}
    />
  );
}

function filterNodesFactory(
  normalizedQuery: string
): (nodes: RouteTreeNode[]) => RouteTreeNode[] {
  const matchNode = (node: RouteTreeNode): boolean => {
    return (
      !normalizedQuery ||
      node.alias?.toLowerCase().includes(normalizedQuery) ||
      node.path
        ?.replace("${APP.homepage}", "")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  };

  const filterNodes = (nodes: RouteTreeNode[]): RouteTreeNode[] =>
    nodes
      ?.map((node) => {
        const matchedChildren = filterNodes(node.children);
        const matched = matchedChildren.length > 0 || matchNode(node);
        return (
          matched && {
            ...node,
            children: matchedChildren,
          }
        );
      })
      .filter(Boolean) ?? [];

  return filterNodes;
}
