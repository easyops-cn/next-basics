import { getCurrentTheme } from "@next-core/brick-kit";
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
  const closeBtnRef = React.createRef<HTMLDivElement>();
  const theme = getCurrentTheme();
  const handleClose = (): void => {
    // 1天内不再提示
    storage.setItem(tipKey, moment().unix() + 86400);
    onClose(tipKey);
  };

  React.useEffect(() => {
    const closeBtn = closeBtnRef.current;
    closeBtn?.addEventListener("click", handleClose);

    return () => {
      closeBtn?.removeEventListener("click", handleClose);
    };
  }, [closeBtnRef]);

  return (
    <div
      style={{ backgroundColor: theme === "dark-v2" ? "#29292D" : "#ffffff" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: isCenter ? "center" : "space-between",
          boxSizing: "border-box",
          width: "100%",
          lineHeight: "26px",
          padding: "3px 20px",
          backgroundColor: backgroundColor,
          color: "var(--antd-text-color)",
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
                color: "#1A7AFF",
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
            ref={closeBtnRef}
            style={{
              paddingLeft: "20px",
              cursor: "pointer",
              color: "#8C8C8C",
            }}
          >
            <GeneralIcon
              icon={{ lib: "antd", icon: "close", theme: "outlined" }}
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
