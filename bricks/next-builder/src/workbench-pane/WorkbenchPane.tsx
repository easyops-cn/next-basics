import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { debounceByAnimationFrame } from "@next-core/brick-utils";
import { GeneralIcon } from "@next-libs/basic-components";

export interface WorkbenchPaneProps {
  titleLabel?: string;
  active?: boolean;
  badge?: number;
  alerts?: AlertConf[];
  onActiveChange?(active: boolean): void;
  onFirstActivated?(): void;
}

export interface AlertConf {
  type?: "success" | "info" | "warning" | "error";
  message: string;
}

export function WorkbenchPane({
  titleLabel,
  active,
  badge,
  alerts,
  onActiveChange,
  onFirstActivated,
}: WorkbenchPaneProps): React.ReactElement {
  const [internalActive, setInternalActive] = useState(active);
  const [activatedOnce, setActivatedOnce] = useState(false);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  useEffect(() => {
    onActiveChange?.(internalActive);
  }, [internalActive, onActiveChange]);

  const handleClick = useCallback(() => {
    setInternalActive((previousActive) => !previousActive);
    if (!activatedOnce && !internalActive) {
      setActivatedOnce(true);
      onFirstActivated?.();
    }
  }, [activatedOnce, internalActive, onFirstActivated]);

  const scrollBodyRef = useRef<HTMLDivElement>();

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useMemo(
    () =>
      debounceByAnimationFrame((): void => {
        setScrolled(scrollBodyRef.current.scrollTop > 0);
      }),
    []
  );

  return (
    <div
      className={classNames("pane", {
        scrolled,
      })}
    >
      <div className="pane-header" tabIndex={0} onClick={handleClick}>
        <div className="pane-title">
          <span className="title-icon">
            {internalActive ? <DownOutlined /> : <RightOutlined />}
          </span>
          <div className="title-label">{titleLabel}</div>
          <slot name="title" />
        </div>
        <slot name="actions" />
        {badge !== null && <div className="badge">{badge}</div>}
        <div className="pane-scroll-shadow"></div>
      </div>

      {Array.isArray(alerts) &&
        alerts.map((item, index) => (
          <div key={index} className={classNames("alert", item.type)}>
            {item.type && (
              <GeneralIcon
                icon={{
                  lib: "antd",
                  theme: "filled",
                  icon:
                    item.type === "warning"
                      ? "exclamation-circle"
                      : item.type === "error"
                      ? "close-circle"
                      : item.type === "success"
                      ? "check-circle"
                      : "info-circle",
                }}
                iconClassName="icon"
              />
            )}
            {item.message}
          </div>
        ))}

      <div
        className="pane-body custom-scrollbar-container"
        onScroll={handleScroll}
        ref={scrollBodyRef}
      >
        <slot name="content">
          <div
            style={{
              padding: "10px 20px",
              color: "var(--text-color-secondary)",
            }}
          >
            No content
          </div>
        </slot>
      </div>
    </div>
  );
}
