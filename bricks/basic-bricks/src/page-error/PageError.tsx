import React from "react";
import { useTranslation } from "react-i18next";
import { NS_BASIC_BRICKS, K } from "../i18n/constants";

interface PageErrorProps {
  error: string;
}

export function PageError(props: PageErrorProps): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <p style={{ fontSize: "150%" }}>{t(K.PAGE_ERROR_TITLE)}</p>
      <p>{props.error}</p>
    </div>
  );
}
