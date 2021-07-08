import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MessageFilled } from "@ant-design/icons";
import classNames from "classnames";
import {
  useBuilderData,
  useBuilderGroupedChildNodes,
  useCanvasList,
  useHighlightNodes,
  useHoverNodeUid,
} from "@next-core/editor-bricks-helper";
import { useBuilderUIContext } from "../BuilderUIContext";
import { K, NS_NEXT_BUILDER } from "../../i18n/constants";

import styles from "./BuilderCanvasTabs.module.css";

export function BuilderCanvasTabs(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { canvasIndex, setCanvasIndex } = useBuilderUIContext();
  const { edges } = useBuilderData();
  const groupedRootChildNodes = useBuilderGroupedChildNodes({
    isRoot: true,
    doNotExpandTemplates: true,
  });
  const rootChildNodes = groupedRootChildNodes.flatMap(
    (group) => group.childNodes
  );
  const canvasList = useCanvasList(rootChildNodes);
  const hoverNodeUid = useHoverNodeUid();
  const highlightedNodes = useHighlightNodes();

  const nodeUidToCanvasIndexMap: Map<number, number> = useMemo(() => {
    const map = new Map<number, number>();
    canvasList.forEach((nodes, index) => {
      const walk = (ids: number[]): void => {
        for (const nodeUid of ids) {
          map.set(nodeUid, index);
          walk(
            edges
              .filter((edge) => edge.parent === nodeUid)
              .map((edge) => edge.child)
          );
        }
      };
      walk(nodes.map((node) => node.$$uid));
    });
    return map;
  }, [canvasList, edges]);

  const tabs = useMemo(
    () =>
      // The first canvas should always be the main canvas.
      // And the last canvas should always be an empty portal canvas.
      canvasList.map((nodes, index) => (
        <li
          key={index}
          className={classNames({
            [styles.active]: canvasIndex === index,
            [styles.isPortalCanvas]: index > 0,
            [styles.hover]:
              hoverNodeUid &&
              canvasIndex !== index &&
              nodeUidToCanvasIndexMap.get(hoverNodeUid) === index,
            [styles.highlighted]:
              canvasIndex !== index &&
              Array.from(highlightedNodes).some(
                (uid) => nodeUidToCanvasIndexMap.get(uid) === index
              ),
          })}
          onClick={canvasIndex === index ? null : () => setCanvasIndex(index)}
          title={index === 0 ? null : t(K.CANVAS_TYPE_PORTAL)}
        >
          <span className={styles.tab}>
            {index > 0 && <MessageFilled />}
            {index === 0
              ? t(K.CANVAS_TYPE_MAIN)
              : nodes.length > 0 && (
                  <span className={styles.portalAlias}>{nodes[0].alias}</span>
                )}
          </span>
        </li>
      )),
    [
      canvasIndex,
      canvasList,
      highlightedNodes,
      hoverNodeUid,
      nodeUidToCanvasIndexMap,
      setCanvasIndex,
      t,
    ]
  );

  return (
    <div className={styles.builderCanvasTabsWrapper}>
      <ul className={styles.builderCanvasTabs}>{tabs}</ul>
    </div>
  );
}
