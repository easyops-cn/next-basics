import React from "react";
import { Typography, Input, Button } from "antd";
import style from "./index.module.css";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
const { Text } = Typography;
interface CopyableTextProps {
  text: string;
  tooltips?: string;
  hiddenText?: boolean;
  type?: "custom" | "input" | "text";
  dataSource?: Record<string, any>;
  textClick?: (detail: any) => void;
  suffixCount?: number;
}
export function CopyableText(props: CopyableTextProps): React.ReactElement {
  const { text, tooltips, hiddenText, type, dataSource, suffixCount } = props;
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  const ParagraphCom = () => (
    <Typography.Paragraph
      copyable={{ tooltips: [tooltips ?? t(K.COPY), t(K.COPIED)], text }}
      className={style.nextTypography}
    >
      <span className={style.text} onClick={() => props?.textClick(dataSource)}>
        {hiddenText ? "" : text}
      </span>
    </Typography.Paragraph>
  );
  const InputCom = () => (
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
  );
  const TextCom = () => {
    const _suffixCount = text.length < suffixCount ? text.length : suffixCount;
    const start = text.slice(0, text.length - _suffixCount).trim();
    const suffix = text?.slice(-_suffixCount).trim();
    return (
      <Text
        style={{ maxWidth: "100%" }}
        ellipsis={{ suffix }}
        copyable={{ tooltips: [tooltips ?? t(K.COPY), t(K.COPIED)], text }}
      >
        {start}
      </Text>
    );
  };
  const componentMap = {
    custom: ParagraphCom,
    input: InputCom,
    text: TextCom,
  };
  return <div>{type && componentMap[type]()}</div>;
}
