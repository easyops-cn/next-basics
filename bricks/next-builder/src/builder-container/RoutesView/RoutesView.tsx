import React, { useState, useMemo } from "react";
import { BranchesOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { BuilderRouteNode } from "@next-core/brick-types";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { generateRouteTree } from "../../utils/generateRouteTree";
import { useBuilderUIContext } from "../BuilderUIContext";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { SearchableTree } from "../components/SearchableTree/SearchableTree";

import styles from "./RoutesView.module.css";

export interface RoutesViewProps {
  handleRouteSelect?: (route: BuilderRouteNode) => void;
}

const setParent = (
  node: BuilderRouteNode,
  filteredMap: Map<string, BuilderRouteNode>,
  idToRoute: Map<string, BuilderRouteNode>
): void => {
  if (node.parent?.length) {
    const parentId = node.parent[0].id;
    const parent = idToRoute.get(parentId);
    if (parent) {
      if (!filteredMap.get(parentId)) {
        filteredMap.set(parentId, parent);
      }
      setParent(parent, filteredMap, idToRoute);
    }
  }
};

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

  const filteredRouteTree = useMemo(() => {
    return fullRouteTree;
  }, [fullRouteTree]);

  const routeTreeData = useMemo(() => {
    const idToRoute = new Map<string, BuilderRouteNode>(
      routeList.map((node) => [node.id, node])
    );
    const filteredMap = new Map();
    routeList.forEach((v) => {
      const trimQ = q.trim().toLowerCase() ?? "";
      const matched =
        v.alias?.toLowerCase().includes(trimQ) ||
        v.path?.replace("${APP.homepage}", "")?.toLowerCase()?.includes(trimQ);
      if (matched) {
        filteredMap.set(v.id, idToRoute.get(v.id));
        setParent(v, filteredMap, idToRoute);
      }
    });
    const result = generateRouteTree({
      data: [...filteredMap.values()],
    });
    return result;
  }, [routeList, q]);

  const handleSelect = (selectedProps: BuilderRouteNode): void => {
    onRouteSelect?.(selectedProps);
    handleRouteSelect?.(selectedProps);
  };

  const handleQChange = (q: string): void => {
    setQ(q);
  };

  return (
    <SearchableTree
      list={routeTreeData}
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
