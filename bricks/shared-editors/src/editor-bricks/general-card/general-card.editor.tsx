import React, { useMemo } from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
  SlotContainer,
} from "@next-core/editor-bricks-helper";
import { isEmpty, range } from "lodash";
import styles from "./general-card.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralCardProperties {}

interface EditorProperties extends EditorComponentProps {
  editorProps?: {
    slots?: string[];
    editorStyle?: React.CSSProperties;
    hasHeader?: boolean;
    hasIcon?: boolean;
  };
}

export function GeneralCardEditor({
  nodeUid,
  editorProps = {},
}: EditorProperties): React.ReactElement {
  const node = useBuilderNode<GeneralCardProperties>({ nodeUid });
  const { editorStyle, hasHeader, slots, hasIcon } = editorProps;
  const hasSlots = useMemo(() => !isEmpty(slots), [slots]);

  const noSlotContent = useMemo(
    () => (
      <div className={styles.noSlots}>
        {hasIcon ? (
          <>
            <div>
              {range(0, 2).map((_, index) => (
                <div key={index} className={styles.text}></div>
              ))}
            </div>
            <div className={styles.icon}></div>
          </>
        ) : (
          <div className={styles.content}></div>
        )}
      </div>
    ),
    [hasIcon]
  );

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.cardContainer} style={editorStyle}>
        {hasHeader && <div className={styles.header}></div>}
        <div className={styles.body}>
          {hasSlots
            ? slots.map((slot, index) => (
                <SlotContainer
                  key={index}
                  nodeUid={nodeUid}
                  slotName={slot}
                  slotContainerStyle={{ marginBottom: 20 }}
                ></SlotContainer>
              ))
            : noSlotContent}
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "shared-editors.general-card--editor",
  EditorElementFactory(GeneralCardEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
