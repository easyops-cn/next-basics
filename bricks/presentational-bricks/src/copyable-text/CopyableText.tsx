import React from "react";
import { Typography, Input, Button } from "antd";
import style from "./index.module.css";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";

interface CopyableTextProps {
  text: string;
  tooltips?: string;
  hiddenText?: boolean;
  type?: string;
  dataSource?: Record<string, any>;
  textClick?: (detail: any) => void;
}
export function CopyableText(props: CopyableTextProps): React.ReactElement {
  const { text, tooltips, hiddenText, type, dataSource } = props;
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  return (
    <div>
      {type !== "input" && (
        <Typography.Paragraph
          copyable={{ tooltips: [tooltips ?? t(K.COPY), t(K.COPIED)], text }}
          className={style.nextTypography}
        >
          <span
            className={style.text}
            onClick={() => props?.textClick(dataSource)}
          >
            {hiddenText ? "" : text}
          </span>
        </Typography.Paragraph>
      )}
      {type === "input" && (
        <Input.Group compact style={{ width: "100%", whiteSpace: "nowrap" }}>
          <Button>
            <Typography.Paragraph
              copyable={{
                tooltips: [tooltips ?? t(K.COPY), t(K.COPIED)],
                text,
              }}
              className={style.nextTypography}
            ></Typography.Paragraph>
          </Button>
          <Input readOnly value={text} />
        </Input.Group>
      )}
    </div>
  );
}
