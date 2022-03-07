// istanbul ignore file
// For temporary usage only, will change soon.
import { BranchesOutlined, DownOutlined } from "@ant-design/icons";
import classNames from "classnames";
import React, { type ReactElement } from "react";
import styles from "./WorkbenchTree.module.css";

const treeLevelPadding = 10;

export interface NodeData {
  id: string;
  path: string;
  alias?: string;
  children?: NodeData[];
}

export interface WorkbenchTreeProps {
  nodes: NodeData[];
}

export interface TreeListProps {
  nodes: NodeData[];
  level: number;
}

export function WorkbenchTree({ nodes }: WorkbenchTreeProps): ReactElement {
  return (
    <div className={styles.container}>
      <TreeList nodes={nodes} level={1} />
    </div>
  );
}

function TreeList({ nodes, level }: TreeListProps): ReactElement {
  return (
    <ul className={styles.tree}>
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} level={level} />
      ))}
    </ul>
  );
}

export interface TreeNodeProps {
  node: NodeData;
  level: number;
}

function TreeNode({ node, level }: TreeNodeProps): ReactElement {
  const isLeaf = !node.children?.length;
  return (
    <li>
      <div
        className={styles.nodeLabel}
        style={{
          paddingLeft: level * treeLevelPadding + 5,
        }}
        tabIndex={0}
      >
        <span
          className={classNames(styles.nodeIcon, {
            [styles.leaf]: isLeaf,
          })}
        >
          {isLeaf ? <BranchesOutlined /> : <DownOutlined />}
        </span>
        <span className={styles.nodeName}>{node.alias || node.path}</span>
      </div>
      {isLeaf || <TreeList nodes={node.children} level={level + 1} />}
    </li>
  );
}
