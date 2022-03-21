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

export interface WorkbenchPaneProps {
  titleLabel?: string;
  active?: boolean;
  badge?: number;
  onActiveChange?(active: boolean): void;
  onFirstActivated?(): void;
}

export function WorkbenchPane({
  titleLabel,
  active,
  badge,
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
    <div className="pane">
      <div className="pane-header" tabIndex={0} onClick={handleClick}>
        <div className="pane-title">
          <span className="title-icon">
            {internalActive ? <DownOutlined /> : <RightOutlined />}
          </span>
          <div className="title-label">{titleLabel}</div>
        </div>
        <slot name="actions" />
        {badge !== null && <div className="badge">{badge}</div>}
      </div>
      <div
        className={classNames("pane-body", "custom-scrollbar-container", {
          scrolled,
        })}
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
