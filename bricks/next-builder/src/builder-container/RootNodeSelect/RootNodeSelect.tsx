import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { Dropdown, Button, Menu } from "antd";
import { RoutesView } from "../RoutesView/RoutesView";
import { TemplateList } from "../TemplateList/TemplateList";
import { useBuilderUIContext } from "../BuilderUIContext";

import styles from "./RootNodeSelect.module.css";
import { BuilderDataType } from "../interfaces";
import { SnippetList } from "../SnippetList/SnippetList";
import { find } from "lodash";

export function RootNodeSelect(): React.ReactElement {
  const { dataType, snippetList } = useBuilderUIContext();
  const [visible, setVisible] = useState(false);
  const rootNode = useBuilderNode({ isRoot: true });

  if (!rootNode) {
    return null;
  }

  const onVisibleChange = (v: boolean) => {
    setVisible(v);
  };

  const triggerVisible = () => {
    setVisible(!visible);
  };

  const handleClose = (): void => {
    setVisible(false);
  };

  const route = (
    <Menu>
      <RoutesView handleRouteSelect={handleClose} />
    </Menu>
  );

  const template = (
    <Menu>
      <TemplateList handleTemplateSelect={handleClose} />
    </Menu>
  );

  const snippet = (
    <Menu>
      <SnippetList handleSnippetSelect={handleClose} />
    </Menu>
  );

  const findSnippetTitle = (snippetId: string) =>
    find(snippetList, (i) => i.snippetId === snippetId)?.name;

  return (
    <Dropdown
      overlay={
        dataType === BuilderDataType.CUSTOM_TEMPLATE
          ? template
          : dataType === BuilderDataType.SNIPPET
          ? snippet
          : route
      }
      trigger={["click"]}
      placement="bottomLeft"
      onVisibleChange={onVisibleChange}
      visible={visible}
    >
      <Button
        onClick={triggerVisible}
        type="text"
        className={styles.rootNodeWrapper}
      >
        <span className={styles.alias}>
          {dataType === BuilderDataType.CUSTOM_TEMPLATE
            ? rootNode.templateId
            : dataType === BuilderDataType.SNIPPET
            ? findSnippetTitle(rootNode.snippetId as string) ||
              rootNode.snippetId
            : rootNode.alias}
        </span>{" "}
        <DownOutlined className={styles.downIcon} />
      </Button>
    </Dropdown>
  );
}
