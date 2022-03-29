import React, { CSSProperties } from "react";

interface GeneralTextProps {
  text: string;
  color?: CSSProperties["color"];
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
  lineHeight?: CSSProperties["lineHeight"];
  customStyle?: CSSProperties;
}

export function GeneralText(props: GeneralTextProps): React.ReactElement {
  return (
    <span
      style={{
        color: props.color,
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        lineHeight: props.lineHeight,
        ...props.customStyle,
      }}
    >
      {props.text}
    </span>
  );
}
