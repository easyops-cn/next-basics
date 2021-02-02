import React from "react";
import { range } from "lodash";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { TableProps } from "antd/lib/table";
import { UseBrickConf } from "@next-core/brick-types";

import styles from "./brick-table.editor.module.css";

interface ColumnsProps {
  dataIndex: string;
  key: string;
  title: string;
  headerBrick: {
    useBrick: UseBrickConf;
  };
}
interface BrickTableProps {
  columns: ColumnsProps[];
  configProps?: TableProps<any>;
}

export function BrickTableEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<BrickTableProps>({ nodeUid });
  const {
    columns: tableColumnsProps,
    configProps = {},
  } = node.$$parsedProperties;

  const rows = 3;
  const columns = tableColumnsProps?.length || 3;

  return (
    <EditorContainer nodeUid={nodeUid} brick={brick}>
      <div className={styles.table}>
        {range(0, rows).map((rowIndex) => (
          <div
            key={rowIndex}
            className={`${styles.row} ${
              rowIndex === 0 ? styles.head : styles.body
            }`}
          >
            {configProps.rowSelection && <span className={styles.checkbox} />}
            {range(0, columns).map((columnIndex) => {
              const curColumn = tableColumnsProps?.[columnIndex];
              const title = curColumn?.title;
              const isUseBrick = curColumn?.headerBrick;
              return (
                <div key={columnIndex} className={styles.cell}>
                  {rowIndex === 0 && title && !isUseBrick ? (
                    <span>{title}</span>
                  ) : (
                    <div className={styles.content}></div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "presentational-bricks.brick-table--editor",
  EditorElementFactory(BrickTableEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
