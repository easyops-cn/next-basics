import React, { useState, useMemo } from "react";
import { BranchesOutlined } from "@ant-design/icons";
import styles from "./RoutesView.module.css";
import { BuilderRouteNode } from "@next-core/brick-types";
import { generateRouteTree } from "../../utils/generateRouteTree";
import { useBuilderNode, useRouteList } from "@next-core/editor-bricks-helper";
import { useBuilderUIContext } from "../BuilderUIContext";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { SearchableTree } from "../components/SearchableTree/SearchableTree";

export interface RoutesViewProps {
  handleRouteSelect?: (route: BuilderRouteNode) => void;
}

const setParent = (node: BuilderRouteNode,filteredMap: Map<string, BuilderRouteNode>,idToRoute:Map<string, BuilderRouteNode>): void => {
  if(node.parent?.length){
    const parentId = node.parent[0].id;
    const parent = idToRoute.get(parentId);
    if(parent){
      if(!filteredMap.get(parentId)){
        filteredMap.set(parentId,parent)
      }
      setParent(parent,filteredMap,idToRoute);
    }
  }
}

export function RoutesView({
  handleRouteSelect,
}: RoutesViewProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const routeList = useRouteList();
  const rootNode = useBuilderNode({ isRoot: true });
  const { onRouteSelect } = useBuilderUIContext();
  const [q, setQ] = useState<string>("");

  const routeTreeData = useMemo(() => {
    const idToRoute = new Map<string, BuilderRouteNode>(
      routeList.map((node) => [node.id, node])
    );
    const filteredMap = new Map();
    routeList.forEach(v=>{
      const matched = v.alias?.toLowerCase().includes(q.trim().toLowerCase() ?? "");
      if(matched){
        filteredMap.set(v.id,idToRoute.get(v.id));
        setParent(v,filteredMap,idToRoute);
      }
    });
    const result = generateRouteTree({
      data: [...filteredMap.values()],
    });
    return result;
  }, [routeList,q]);

  const handleSelect = (selectedProps: any) => {
    onRouteSelect?.(selectedProps);
    handleRouteSelect?.(selectedProps);
  }

  const handleQChange = (q: string) => {
    setQ(q)
  }

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
  )
}
