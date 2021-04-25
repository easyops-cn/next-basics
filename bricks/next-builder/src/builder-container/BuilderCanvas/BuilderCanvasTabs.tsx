import React from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { BuilderCanvasType } from "../interfaces";
import { useBuilderUIContext } from "../BuilderUIContext";
import { K, NS_NEXT_BUILDER } from "../../i18n/constants";

import styles from "./BuilderCanvasTabs.module.css";

export function BuilderCanvasTabs(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { canvasType, setCanvasType } = useBuilderUIContext();
  const tabs = React.useMemo(
    () =>
      [
        {
          value: BuilderCanvasType.MAIN,
          text: t(K.CANVAS_TYPE_MAIN),
        },
        {
          value: BuilderCanvasType.PORTAL,
          text: t(K.CANVAS_TYPE_PORTAL),
        },
      ].map((tab) => (
        <li
          key={tab.value}
          className={classNames({
            [styles.active]: canvasType === tab.value,
          })}
          onClick={
            canvasType === tab.value ? null : () => setCanvasType(tab.value)
          }
        >
          {tab.text}
        </li>
      )),
    [canvasType, setCanvasType, t]
  );

  return (
    <div className={styles.builderCanvasTabsWrapper}>
      <ul className={styles.builderCanvasTabs}>{tabs}</ul>
    </div>
  );
}
