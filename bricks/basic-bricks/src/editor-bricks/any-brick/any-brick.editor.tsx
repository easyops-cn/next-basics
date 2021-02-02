import React from "react";
import { DatabaseFilled, GoldenFilled, MessageFilled } from "@ant-design/icons";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import styles from "./any-brick.editor.module.css";

export enum DisplayType {
  DEFAULT = "default",
  PROVIDER = "provider",
  TEMPLATE = "template",
  PORTAL = "portal",
}

export function AnyBrickEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode({ nodeUid });

  let icon: JSX.Element;
  let displayType = DisplayType.DEFAULT;

  if (node.type === "provider" || node.bg) {
    displayType = DisplayType.PROVIDER;
    icon = <DatabaseFilled />;
  } else if (node.type === "template") {
    displayType = DisplayType.TEMPLATE;
    icon = <GoldenFilled />;
  } else if (node.portal) {
    displayType = DisplayType.PORTAL;
    icon = <MessageFilled />;
  }

  return (
    <EditorContainer nodeUid={nodeUid} brick={brick}>
      <div className={`${styles.wrapper} ${styles[displayType]}`}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.name}>{node.alias}</div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.any-brick--editor",
  EditorElementFactory(AnyBrickEditor)
);
