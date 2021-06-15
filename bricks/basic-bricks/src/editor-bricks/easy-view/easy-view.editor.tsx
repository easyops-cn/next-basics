import React from "react";
import { pick } from "lodash";
import classnames from "classnames";
import {
  EditorBrickType,
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  SlotContainer,
  useBuilderGroupedChildNodes,
  useBuilderNode,
  useOutlineEnabled,
} from "@next-core/editor-bricks-helper";
import styles from "./easy-view.editor.module.css";

interface EasyViewProperties {
  gridAreas?: Record<string, (string | number)[]>;
  gridTemplateAreas?: string[][];
  gridTemplateColumns?: string | string[];
  gridTemplateRows?: string | string[];
  containerStyle?: React.CSSProperties;
  styleByAreas?: Record<string, React.CSSProperties>;
}

export function EasyViewEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<EasyViewProperties>({ nodeUid });
  const outlineEnabled = useOutlineEnabled(node.instanceId);
  const {
    gridAreas,
    gridTemplateAreas,
    gridTemplateColumns,
    gridTemplateRows,
    containerStyle,
    styleByAreas,
  } = node.$$parsedProperties;
  const childNodesByMountPoint = useBuilderGroupedChildNodes({ nodeUid });

  const areas = gridAreas
    ? Object.keys(gridAreas)
    : Array.from(new Set(gridTemplateAreas?.flat?.() ?? [])).filter(
        (area) => area !== "."
      );

  const pickedContainerStyle = pick(containerStyle, ["gap", "gridGap"]);

  return (
    <EditorContainer
      nodeUid={nodeUid}
      type={EditorBrickType.TRANSPARENT_CONTAINER}
      editorContainerStyle={{
        height: "100%",
        minHeight: "100%",
      }}
      editorBodyStyle={{
        height: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className={classnames(styles.wrapper, {
          [styles.outlineEnabled]: outlineEnabled,
          [styles.empty]: areas.length === 0,
        })}
        style={{
          gridTemplateAreas: gridTemplateAreas
            ?.map((row) => `"${row.join(" ")}"`)
            .join(" "),
          gridTemplateColumns: Array.isArray(gridTemplateColumns)
            ? gridTemplateColumns.join(" ")
            : gridTemplateColumns,
          gridTemplateRows: Array.isArray(gridTemplateRows)
            ? gridTemplateRows.join(" ")
            : gridTemplateRows,
          ...pickedContainerStyle,
        }}
      >
        {areas.map((area) => (
          <div
            className={classnames(styles.areaContainer, {
              [styles.empty]: !(
                childNodesByMountPoint.find(
                  (group) => group.mountPoint === area
                )?.childNodes.length > 0
              ),
            })}
            key={area}
            style={{
              gridArea: gridAreas ? gridAreas[area].join(" / ") : area,
              ...styleByAreas?.[area],
            }}
            // This is used in css as `content: attr(data-area-id)`.
            data-area-id={area}
          >
            <SlotContainer
              nodeUid={nodeUid}
              slotName={area}
              slotContainerStyle={{ height: "100%", minHeight: "100%" }}
              dropZoneStyle={{ height: "100%", minHeight: "100%" }}
            />
          </div>
        ))}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.easy-view--editor",
  EditorElementFactory(EasyViewEditor, {
    brickStyle: {
      height: "100%",
      minHeight: "100%",
    },
    selfLayout: EditorSelfLayout.CONTAINER,
  })
);
