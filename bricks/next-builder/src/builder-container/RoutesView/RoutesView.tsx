import React, { useState, useMemo, useEffect, CSSProperties } from "react";
import { Tree } from "antd";
import { DownOutlined, BranchesOutlined } from "@ant-design/icons";
import styles from "./RoutesView.module.css";
import { BuilderRouteNode } from "@next-core/brick-types";
import { generateRouteTree } from "../../utils/generateRouteTree";
import { useBuilderNode, useRouteList } from "@next-core/editor-bricks-helper";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { useBuilderUIContext } from "../BuilderUIContext";

export interface RoutesViewProps {
  contentStyle?: CSSProperties;
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
  contentStyle,
  handleRouteSelect,
}: RoutesViewProps): React.ReactElement {
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

  const [selectRouteKey, setSelectRouteKey] = useState(
    rootNode ? [rootNode.id] : []
  );

  useEffect(() => {
    setSelectRouteKey(rootNode ? [rootNode.id] : []);
  }, [rootNode?.id]);

  const handleClick = (selectedKeys: React.Key[], value: any): void => {
    const selectedProps = value.node.props;
    onRouteSelect?.(selectedProps);
    handleRouteSelect?.(selectedProps);
    const select = selectedProps.id ? [selectedProps.id] : [];
    setSelectRouteKey(select);
  };

  const handleSearch = (value: string): void => {
    setQ(value);
  };

  const titleRender = (nodeData: BuilderRouteNode): React.ReactElement => {
    let title = <span>{nodeData.alias}</span>;
    if (q) {
      const trimQ = q.trim();
      const index = nodeData.alias.toLowerCase().indexOf(trimQ.toLowerCase());
      if (index !== -1) {
        const [beforeStr, matchStr, afterStr] = [
          nodeData.alias.substr(0, index),
          nodeData.alias.substr(index, trimQ.length),
          nodeData.alias.substr(index + trimQ.length),
        ];
        title = (
          <span>
            {beforeStr}
            {!!matchStr && (
              <span className={styles.matchedStr}>{matchStr}</span>
            )}
            {afterStr}
          </span>
        );
      }
    }
    return <span title={nodeData.path}>{title}</span>;
  };

  return (
    <div className={styles.routesViewContainer} style={contentStyle}>
      <SearchComponent placeholder="Search route" onSearch={handleSearch} />
      {!!routeTreeData.length && (
        <div className={styles.treeWrapper}>
          <Tree
            showIcon
            defaultExpandAll={true}
            treeData={routeTreeData}
            selectedKeys={selectRouteKey}
            switcherIcon={<DownOutlined />}
            onSelect={handleClick}
            titleRender={titleRender}
            icon={<BranchesOutlined />}
            blockNode={true}
          ></Tree>
        </div>
      )}
    </div>
  );
}
