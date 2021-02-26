import React, { useState, useMemo, useEffect } from "react";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import { Tree } from "antd";
import {
  DownOutlined,
  BranchesOutlined
} from "@ant-design/icons";
import styles from "./RoutesView.module.css";
import { BuilderRouteNode } from "@next-core/brick-types";
import { generateRouteTree } from "../../utils/generateRouteTree";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { SearchComponent } from "../SearchComponent/SearchComponent";

export interface RoutesViewProps {
  routeList?: BuilderRouteNode[];
  selectRouteKey?: string;
  onRouteSelect?: (route:BuilderRouteNode)=>void;
}

export function RoutesView({
  routeList,
  onRouteSelect
}: RoutesViewProps): React.ReactElement {
  const rootNode = useBuilderNode({ isRoot: true });
  const [q, setQ] = useState<string>("");
  const routeTreeData = useMemo(()=>{
    const result = generateRouteTree({data:routeList,disableParentNodeSelectable:true});
    return result;
  },[routeList]);
  

  const [selectRouteKey, setSelectRouteKey] = useState(
    rootNode?[rootNode.id]:[]
  );

  useEffect(()=>{
    setSelectRouteKey(rootNode?[rootNode.id]:[]);
  },[rootNode?.id]);

  const handleClick = (
    selectedKeys: React.Key[],
    value: any
  ): void => {
    onRouteSelect?.(value.node.props);
    const select = value?.node?.props?.id ? [value?.node?.props?.id] : [];
    setSelectRouteKey(select);
  };

  const handleSearch = (value: string): void => {
    setQ(value);
  }

  const titleRender = (
    nodeData: BuilderRouteNode
  ): React.ReactElement => {
    let title = (
      <span>
        {nodeData.alias}
      </span>
    );
    if(q){
      const index = nodeData.alias.toLowerCase().indexOf(q.trim().toLowerCase());
      if(index!==-1){
        const [beforeStr,matchStr,afterStr] = [
          nodeData.alias.substr(0, index),
          nodeData.alias.substr(index, q.length),
          nodeData.alias.substr(index + q.length)
        ];
        title = (
          <span>
            {beforeStr}
            <span className={styles.matchedStr}>{matchStr}</span>
            {afterStr}
          </span>
        );
      }
    }
    return (
      <span title={nodeData.path}>{title}</span>
    )
  };

  return (
    <ToolboxPane title="Routes">
      <div
        className={styles.routesViewContainer}
      >
        <SearchComponent 
          placeholder="Search route..."
          onSearch={handleSearch}
        />
        {!!routeTreeData.length && (
          <div 
            className={styles.treeWrapper}
          >
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
    </ToolboxPane>
  );
}
