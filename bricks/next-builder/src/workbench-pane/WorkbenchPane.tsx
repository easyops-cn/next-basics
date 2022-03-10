import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { SimpleFunction } from "@next-core/brick-types";

// The debounce function receives our function as a parameter
const debounce = (fn: SimpleFunction): SimpleFunction => {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame: number;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      // Call our function and pass any params we received
      fn(...params);
    });
  };
};

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
      debounce((): void => {
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
