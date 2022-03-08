// istanbul ignore file
// For temporary usage only, will change soon.
import React, { type ReactElement } from "react";
import classNames, { type Argument as ClassNamesArgument } from "classnames";
import {
  EnterOutlined,
  BranchesOutlined,
  BuildOutlined,
  DatabaseOutlined,
  DownOutlined,
  GoldOutlined,
  MessageOutlined,
  QuestionOutlined,
  SisternodeOutlined,
} from "@ant-design/icons";
import { Link } from "@next-libs/basic-components";

import styles from "./WorkbenchTree.module.css";

const treeLevelPadding = 10;

export type WorkbenchNodeType =
  | "bricks"
  | "routes"
  | "redirect"
  | "brick"
  | "template"
  | "provider"
  | "portal"
  | "mount-point";

export interface WorkbenchNodeData {
  key: string | number;
  name: string;
  type: WorkbenchNodeType;
  link?:
    | {
        to: string;
      }
    | {
        href: string;
      };
  active?: boolean;
  children?: WorkbenchNodeData[];
}

export interface WorkbenchTreeProps {
  nodes: WorkbenchNodeData[];
  placeholder?: string;
}

export interface TreeListProps {
  nodes: WorkbenchNodeData[];
  level: number;
}

export function WorkbenchTree({
  nodes,
  placeholder,
}: WorkbenchTreeProps): ReactElement {
  return nodes?.length ? (
    <div className={styles.container}>
      <TreeList nodes={nodes} level={1} />
    </div>
  ) : (
    <div className={styles.placeholder}>{placeholder}</div>
  );
}

function TreeList({ nodes, level }: TreeListProps): ReactElement {
  return (
    <ul className={styles.tree}>
      {nodes.map((node) => (
        <TreeNode key={node.key} node={node} level={level} />
      ))}
    </ul>
  );
}

export interface TreeNodeProps {
  node: WorkbenchNodeData;
  level: number;
}

function TreeNode({ node, level }: TreeNodeProps): ReactElement {
  const isLeaf = !node.children?.length;
  return (
    <li>
      <Link
        className={classNames(styles.nodeLabel, getNodeClass(node, isLeaf))}
        style={{
          paddingLeft: level * treeLevelPadding + 5,
        }}
        tabIndex={0}
        {...node.link}
      >
        <span className={styles.nodeIcon}>{getNodeIcon(node, isLeaf)}</span>
        <span className={styles.nodeName}>{node.name}</span>
      </Link>
      {isLeaf || <TreeList nodes={node.children} level={level + 1} />}
    </li>
  );
}

function getNodeClass(
  node: WorkbenchNodeData,
  isLeaf: boolean
): ClassNamesArgument {
  return {
    [styles.active]: node.active,
    [styles.blue]: node.type === "bricks" || (isLeaf && node.type === "routes"),
    [styles.cyan]: node.type === "redirect",
    [styles.green]: node.type === "brick",
    [styles.gray]: node.type === "mount-point",
    [styles.orange]: node.type === "provider",
    [styles.purple]: node.type === "portal",
    [styles.red]: node.type === "template",
  };
}

function getNodeIcon(
  node: WorkbenchNodeData,
  isLeaf: boolean
): React.ReactElement {
  switch (node.type) {
    case "routes":
      return isLeaf ? <BranchesOutlined /> : <DownOutlined />;
    case "mount-point":
      return <DownOutlined />;
    case "bricks":
      return <BranchesOutlined />;
    case "redirect":
      return <EnterOutlined style={{ transform: "rotate(180deg)" }} />;
    case "brick":
      return <BuildOutlined />;
    case "provider":
      return <DatabaseOutlined />;
    case "portal":
      return <MessageOutlined />;
    case "template":
      return <GoldOutlined />;
    default:
      return <QuestionOutlined />;
  }
}
