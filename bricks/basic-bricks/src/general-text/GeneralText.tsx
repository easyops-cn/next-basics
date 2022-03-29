import React, { CSSProperties } from "react";

interface GeneralTextProps {
  text: string;
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
  color?: CSSProperties["color"];
  lineHeight?: CSSProperties["lineHeight"];
  customStyle?: CSSProperties;
}

export function GeneralText(props: GeneralTextProps): React.ReactElement {
  return (
    <span
      style={{
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        color: props.color,
        lineHeight: props.lineHeight,
        ...props.customStyle,
      }}
    >
      {props.text}
    </span>
  );
}
