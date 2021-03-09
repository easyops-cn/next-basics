import React, { useState } from "react";
import {
  BlockOutlined,
  BranchesOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { Dropdown, Button, Menu } from "antd";
import { RoutesView } from "../RoutesView/RoutesView";

import styles from "./RootNodeSelect.module.css";

export function RootNodeSelect(): React.ReactElement {
  const [visible, setVisible] = useState(false);
  const rootNode = useBuilderNode({ isRoot: true });
  if (!rootNode) {
    return null;
  }
  if (rootNode.type === "custom-template") {
    return (
      <div className={styles.rootNodeBox}>
        <BlockOutlined />
        <span>{rootNode.templateId}</span>
      </div>
    );
  }

  const onVisibleChange = (v: boolean) => {
    setVisible(v);
  };

  const handleRouteClick = () => {
    setVisible(!visible);
  };

  const handleRouteSelect = (): void => {
    setVisible(false);
  };

  const route = (
    <Menu data-override-theme="dark">
      <RoutesView
        contentStyle={{
          height: "400px",
          width: "220px",
        }}
        handleRouteSelect={handleRouteSelect}
      />
    </Menu>
  );

  return (
    <Dropdown
      overlay={route}
      trigger={["click"]}
      placement="bottomLeft"
      onVisibleChange={onVisibleChange}
      visible={visible}
    >
      <Button
        onClick={handleRouteClick}
        size="small"
        className={styles.rootNodeWrapper}
      >
        <BranchesOutlined />{" "}
        <span className={styles.alias}>{rootNode.alias}</span> <DownOutlined />
      </Button>
    </Dropdown>
  );
}
