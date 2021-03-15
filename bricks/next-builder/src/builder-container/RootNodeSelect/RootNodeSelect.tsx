import React, { useState } from "react";
import { BlockOutlined, DownOutlined } from "@ant-design/icons";
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
    <Menu>
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
        type="text"
        className={styles.rootNodeWrapper}
      >
        <span className={styles.alias}>{rootNode.alias}</span>{" "}
        <DownOutlined className={styles.downIcon} />
      </Button>
    </Dropdown>
  );
}
