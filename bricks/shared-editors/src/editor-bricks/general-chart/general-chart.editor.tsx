import React from "react";
import { range } from "lodash";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import {
  LineChartOutlined,
  BarChartOutlined,
  PieChartFilled,
  AreaChartOutlined,
} from "@ant-design/icons";
import styles from "./general-chart.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralChartProperties {}

export function GeneralChartEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralChartProperties>({ nodeUid });

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.chartContainer}>
        <div className={styles.layout}>
          <BarChartOutlined className={styles.chartIcon} />
        </div>
        <div className={styles.layout}>
          <LineChartOutlined className={styles.chartIcon} />
        </div>
        <div className={styles.layout}>
          <PieChartFilled className={styles.chartIcon} />
        </div>
        <div className={styles.layout}>
          <AreaChartOutlined className={styles.chartIcon} />
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "shared-editors.general-chart--editor",
  EditorElementFactory(GeneralChartEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
