import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useBuilderGroupedChildNodes } from "@next-core/editor-bricks-helper";
import { StoryboardTreeNodeList } from "../StoryboardTreeNodeList/StoryboardTreeNodeList";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import { useBuilderUIContext } from "../BuilderUIContext";
import { BuilderDataType } from "../interfaces";
import { K, NS_NEXT_BUILDER } from "../../i18n/constants";

import styles from "./StoryboardTreeView.module.css";

export function StoryboardTreeView(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const groups = useBuilderGroupedChildNodes({ isRoot: true });
  const { dataType } = useBuilderUIContext();
  const mountPoint = "bricks";
  const childNodes = React.useMemo(
    () =>
      dataType === BuilderDataType.ROUTE_OF_BRICKS ||
      dataType === BuilderDataType.CUSTOM_TEMPLATE
        ? groups.find((group) => group.mountPoint === mountPoint)?.childNodes ??
          []
        : [],
    [groups, dataType]
  );

  return (
    <ToolboxPane
      title="Storyboard"
      tooltips={
        childNodes.length > 0 && (
          <>
            <p>
              <Trans
                t={t}
                i18nKey={
                  dataType === BuilderDataType.CUSTOM_TEMPLATE
                    ? K.STORYBOARD_VIEW_TIPS_1_TEMPLATE
                    : K.STORYBOARD_VIEW_TIPS_1_ROUTE
                }
              />
            </p>
            <p>
              <Trans t={t} i18nKey={K.STORYBOARD_VIEW_TIPS_2} />
            </p>
          </>
        )
      }
    >
      <div className={styles.treeView}>
        <div className={styles.treeWrapper}>
          {childNodes.length > 0 && (
            <StoryboardTreeNodeList
              level={1}
              mountPoint={mountPoint}
              childNodes={childNodes}
            />
          )}
        </div>
      </div>
    </ToolboxPane>
  );
}
