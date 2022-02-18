import React from "react";
import { useTranslation } from "react-i18next";
import { NS_NEXT_PREVIEWER, K } from "../i18n/constants";

export function PreviewHelper(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_PREVIEWER);

  return <div>{t(K.NEXT_PREVIEWER)} works!</div>;
}
