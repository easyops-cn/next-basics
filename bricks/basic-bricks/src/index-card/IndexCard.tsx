import React from "react";
import { useTranslation } from "react-i18next";

import { NS_BASIC_BRICKS, K } from "../i18n/constants";

interface IndexCardProps {
  title?: string;
  contentGridGap?: number;
}

export function IndexCard(props: IndexCardProps): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);

  return (
    <div>
      {props.title && (
        <div className="indexCardHeader">
          <div className="indexCardTitle">{props.title}</div>
          <div className="indexCardToolbar">
            <slot id="toolbarSlot" name="toolbar" />
          </div>
        </div>
      )}
      <div className="indexCardBody" style={{ gridGap: props.contentGridGap }}>
        <slot id="contentSlot" name="content" />
      </div>
    </div>
  );
}
