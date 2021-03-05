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

export function RoutesView({
  contentStyle,
  handleRouteSelect,
}: RoutesViewProps): React.ReactElement {
  const routeList = useRouteList();
  const rootNode = useBuilderNode({ isRoot: true });
  const { onRouteSelect } = useBuilderUIContext();
  const [q, setQ] = useState<string>("");
  const routeTreeData = useMemo(() => {
    const result = generateRouteTree({
      data: routeList,
      disableParentNodeSelectable: true,
    });
    return result;
  }, [routeList]);

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
      const index = nodeData.alias
        .toLowerCase()
        .indexOf(q.trim().toLowerCase());
      if (index !== -1) {
        const [beforeStr, matchStr, afterStr] = [
          nodeData.alias.substr(0, index),
          nodeData.alias.substr(index, q.length),
          nodeData.alias.substr(index + q.length),
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
    return <span title={nodeData.path}>{title}</span>;
  };

  return (
    <div className={styles.routesViewContainer} style={contentStyle}>
      <SearchComponent placeholder="Search route..." onSearch={handleSearch} />
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
