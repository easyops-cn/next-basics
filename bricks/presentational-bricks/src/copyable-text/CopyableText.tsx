import React from "react";
import { Typography } from "antd";
import style from "./index.module.css";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";

interface CopyableTextProps {
  text: string;
  tooltips?: string;
  hiddenText?: boolean;
}
export function CopyableText(props: CopyableTextProps): React.ReactElement {
  const { text, tooltips, hiddenText } = props;
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  return (
    <div>
      <Typography.Paragraph
        copyable={{ tooltips: [tooltips ?? t(K.COPY), t(K.COPIED)], text }}
        className={style.nextTypography}
      >
        {hiddenText ? "" : text}
      </Typography.Paragraph>
    </div>
  );
}
