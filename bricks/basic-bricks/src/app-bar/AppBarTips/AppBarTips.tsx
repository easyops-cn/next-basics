import { JsonStorage } from "@next-core/brick-utils";
import { GeneralIcon } from "@next-libs/basic-components";
import moment from "moment";
import React from "react";

interface AppBarTipsProps {
  text: string;
  tipKey: string;
  info?: {
    label: string;
    url: string;
  };
  isCenter?: boolean;
  backgroundColor?: string;
  closable?: boolean;
  onClose: (targetKey: string) => void;
}
const storage = new JsonStorage(localStorage);

export function AppBarTips({
  text,
  tipKey,
  info,
  isCenter,
  backgroundColor,
  closable,
  onClose,
}: AppBarTipsProps): React.ReactElement {
  const handleClose = () => {
    // 1天内不再提示
    storage.setItem(tipKey, moment().unix() + 86400);
    onClose(tipKey);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isCenter ? "center" : "space-between",
        boxSizing: "border-box",
        width: "100%",
        lineHeight: "26px",
        padding: "6px 20px",
        backgroundColor: backgroundColor,
        color: "var(--color-strong-text)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      <div>
        {text}
        {info ? (
          <a
            style={{
              marginLeft: 10,
            }}
            href={info.url}
            target="_blank"
            rel="noreferrer"
          >
            {info.label}
          </a>
        ) : null}
      </div>
      {closable ? (
        <div
          onClick={handleClose}
          style={{
            paddingLeft: "20px",
            cursor: "pointer",
          }}
        >
          <GeneralIcon
            icon={{ lib: "antd", icon: "close", theme: "outlined" }}
          />
        </div>
      ) : null}
    </div>
  );
}
