import React from "react";
import { useTranslation } from "react-i18next";
import { NS_BASIC_BRICKS, K } from "../i18n/constants";

interface PageNotFoundProps {
  url: string;
}

export function PageNotFound(props: PageNotFoundProps): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <p style={{ fontSize: "150%" }}>{t(K.PAGE_NOT_FOUND_TITLE)}</p>
      <p>
        {t(K.PAGE_NOT_FOUND_DESC, {
          url: props.url
        })}
      </p>
    </div>
  );
}
