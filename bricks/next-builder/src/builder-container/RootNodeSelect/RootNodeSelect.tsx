import React, { useState } from "react";
import { Dropdown, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { i18nText } from "@next-core/brick-kit";
import { I18nData } from "@next-core/brick-types";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { RoutesView } from "../RoutesView/RoutesView";
import { TemplateList } from "../TemplateList/TemplateList";
import { useBuilderUIContext } from "../BuilderUIContext";
import { BuilderDataType } from "../interfaces";
import { SnippetList } from "../SnippetList/SnippetList";

import styles from "./RootNodeSelect.module.css";

export function RootNodeSelect(): React.ReactElement {
  const { dataType } = useBuilderUIContext();
  const [visible, setVisible] = useState(false);
  const rootNode = useBuilderNode({ isRoot: true });

  if (!rootNode) {
    return null;
  }

  const onVisibleChange = (v: boolean): void => {
    setVisible(v);
  };

  const triggerVisible = (): void => {
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
            ? i18nText(rootNode.text as I18nData) || rootNode.snippetId
            : rootNode.alias}
        </span>{" "}
        <DownOutlined className={styles.downIcon} />
      </Button>
    </Dropdown>
  );
}
