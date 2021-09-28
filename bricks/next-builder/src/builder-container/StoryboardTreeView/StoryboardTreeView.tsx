import React, { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  useBuilderGroupedChildNodes,
  useBuilderData,
} from "@next-core/editor-bricks-helper";
import { StoryboardTreeNodeList } from "../StoryboardTreeNodeList/StoryboardTreeNodeList";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import { useBuilderUIContext } from "../BuilderUIContext";
import { BuilderDataType } from "../interfaces";
import { K, NS_NEXT_BUILDER } from "../../i18n/constants";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { deepMatch } from "../utils";

import styles from "./StoryboardTreeView.module.css";
import sharedStyles from "../../shared/scrollbar.module.css";

export function StoryboardTreeView(): React.ReactElement {
  const { nodes } = useBuilderData();
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const groups = useBuilderGroupedChildNodes({
    isRoot: true,
    doNotExpandTemplates: true,
  });
  const { dataType, setHighlightNodes, storyboardQuery, setStoryboardQuery } =
    useBuilderUIContext();
  const mountPoint = "bricks";
  const childNodes = React.useMemo(
    () =>
      dataType === BuilderDataType.ROUTE_OF_BRICKS ||
      dataType === BuilderDataType.CUSTOM_TEMPLATE ||
      dataType === BuilderDataType.SNIPPET
        ? groups.find((group) => group.mountPoint === mountPoint)?.childNodes ??
          []
        : [],
    [groups, dataType]
  );
  const [q, setQ] = React.useState<string>(storyboardQuery);

  const handleSearch = (value: string): void => {
    setQ(value);
    setStoryboardQuery(value);
  };

  useEffect(() => {
    const nodesToHighlight = new Set<number>();
    const trimmedQ = q?.trim().toLowerCase();
    if (trimmedQ) {
      nodes?.forEach((node) => {
        if (deepMatch(node.$$normalized, trimmedQ)) {
          nodesToHighlight.add(node.$$uid);
        }
      });
    }
    setHighlightNodes(nodesToHighlight);
  }, [q, nodes, setHighlightNodes]);

  return (
    <ToolboxPane
      title="Storyboard"
      tooltips={
        childNodes.length > 0 && (
          <>
            <p>
              {
                // Use `<Trans>` to integrate HTML element in translated text.
                // See https://react.i18next.com/latest/trans-component
                //
                // However, we cannot nest elements in translated text.
                // See https://react.i18next.com/latest/trans-component#using-for-less-than-br-greater-than-and-other-simple-html-elements-in-translations-v-10-4-0
              }
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
            <p>
              <Trans t={t} i18nKey={K.STORYBOARD_VIEW_TIPS_3} />
            </p>
          </>
        )
      }
    >
      <SearchComponent
        placeholder={t(K.FIND_BRICKS_BY_CONFIGURATION)}
        onSearch={handleSearch}
        defaultValue={storyboardQuery}
      />
      <div
        className={`${styles.treeView} ${sharedStyles.customScrollbarContainer}`}
      >
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
