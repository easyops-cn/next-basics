import React from "react";
import { DatabaseFilled, GoldenFilled, MessageFilled } from "@ant-design/icons";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  SlotContainer,
  useBuilderNode,
  useBuilderNodeMountPoints,
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
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode({ nodeUid });
  const mountPoints = useBuilderNodeMountPoints({ nodeUid });

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
    <EditorContainer nodeUid={nodeUid}>
      <div
        className={`${styles.wrapper} ${styles[displayType]} ${
          mountPoints.length > 0 ? styles.hasChildren : styles.noChildren
        }`}
      >
        {mountPoints.length > 0 ? (
          mountPoints.map((mountPoint) => (
            <SlotContainer
              key={mountPoint}
              nodeUid={nodeUid}
              slotName={mountPoint}
            />
          ))
        ) : (
          <>
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={styles.name}>{node.alias}</div>
          </>
        )}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.any-brick--editor",
  EditorElementFactory(AnyBrickEditor)
);
