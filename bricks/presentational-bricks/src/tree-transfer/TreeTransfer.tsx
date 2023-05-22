import React from "react";
import TreeShuttleBox from "./treeShuttleBox/TreeShuttleBox";
import shareStyle from "./treeShuttleBox/share.module.css";
import { DataNode } from "rc-tree-select/lib/interface";
interface TreeTransferProps {
  dataSource: DataNode[];
  selectedKeys?: string[];
  listStyle?: React.CSSProperties;
  showSearch?: boolean;
  defaultExpandAll?: boolean;
  titles?: string[];
  shownumItem?: boolean;
  replaceFields?: { key: string; title: string };
  handleChange: (targetKeys: Array<DataNode["key"]>) => void;
}
export function TreeTransfer(props: TreeTransferProps): React.ReactElement {
  const {
    dataSource,
    selectedKeys = [],
    showSearch = false,
    shownumItem = true,
    titles = [],
    defaultExpandAll,
    replaceFields,
    handleChange,
  } = props;

  return (
    <div className={shareStyle.TreeShuttleBox} style={props.listStyle}>
      <TreeShuttleBox
        selectedKeys={selectedKeys}
        treeData={dataSource}
        replaceFields={replaceFields}
      >
        <TreeShuttleBox.TreeShuttleBoxLeft
          showSearch={showSearch}
          titles={titles}
          shownumItem={shownumItem}
          defaultExpandAll={defaultExpandAll}
        />
        <TreeShuttleBox.TreeShuttleButton handleChange={handleChange} />
        <TreeShuttleBox.TreeShuttleBoxRight
          showSearch={showSearch}
          titles={titles}
          shownumItem={shownumItem}
          defaultExpandAll={defaultExpandAll}
        />
      </TreeShuttleBox>
    </div>
  );
}
