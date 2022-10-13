import React from "react";

interface AppBarTipsProps {
  text: string;
  info?: {
    label: string;
    url: string;
  };
}

export function AppBarTips({
  text,
  info,
}: AppBarTipsProps): React.ReactElement {
  return (
    <div
      style={{
        width: "100%",
        lineHeight: "26px",
        padding: "6px 20px",
        background: "#f1f5c5",
        color: "#000",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {text}
      {info ? (
        <a
          style={{
            marginLeft: 10,
          }}
          href={info.url}
        >
          {info.label}
        </a>
      ) : null}
    </div>
  );
}
