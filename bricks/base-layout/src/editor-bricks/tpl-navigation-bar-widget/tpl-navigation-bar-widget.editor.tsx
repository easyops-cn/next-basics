import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
  SlotContainer,
  EditorSlotContentLayout,
} from "@next-core/editor-bricks-helper";
import styles from "./tpl-navigation-bar-widget.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TplNavigationBarWidgetProperties {
  isShowLogo?: boolean;
  isShowAppName?: boolean;
  isShowLaunchpadButton?: boolean;
  displayCenter?: boolean;
}

export function TplNavigationBarWidgetEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<TplNavigationBarWidgetProperties>({ nodeUid });
  const {
    isShowLogo = true,
    isShowAppName = true,
    isShowLaunchpadButton = true,
    displayCenter = false,
  } = node.$$parsedProperties;
  return (
    <EditorContainer nodeUid={nodeUid}>
      <div
        className={styles.wrapper}
        style={{
          ...(displayCenter
            ? {
                justifyContent: "center",
              }
            : {}),
        }}
      >
        <div className={styles.leftContainer}>
          {isShowLogo && <div className={styles.logo} />}
          {isShowLaunchpadButton && <div className={styles.lanuchpadButton} />}
          {isShowAppName && <div className={styles.appName}>app name</div>}
          <div className={styles.menus} />
        </div>
        <div
          className={styles.rightContainer}
          style={{
            ...(displayCenter
              ? {}
              : {
                  flex: 1,
                }),
          }}
        >
          <div className={styles.slotContainer}>
            <SlotContainer
              nodeUid={nodeUid}
              slotName="toolbar"
              slotContainerStyle={{
                flex: 1,
              }}
              slotContentLayout={EditorSlotContentLayout.BLOCK}
            />
          </div>
          <div className={styles.avatar} />
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "base-layout.tpl-navigation-bar-widget--editor",
  EditorElementFactory(TplNavigationBarWidgetEditor, {
    selfLayout: EditorSelfLayout.CONTAINER,
  })
);
