import React, { useCallback, useEffect, useMemo, useState } from "react";
import { JsonStorage } from "@next-core/brick-utils";
import classNames from "classnames";

export interface WorkbenchSidebarProps {
  titleLabel?: string;
  sizeStorageKey?: string;
  defaultSize?: number;
  minSize?: number;
  minSpace?: number;
}

interface ResizerStatus {
  startWidth: number;
  startX: number;
}

export function WorkbenchSidebar({
  titleLabel,
  sizeStorageKey,
  defaultSize,
  minSize,
  minSpace,
}: WorkbenchSidebarProps): React.ReactElement {
  const storage = useMemo(
    () =>
      sizeStorageKey
        ? new JsonStorage<Record<string, number>>(localStorage)
        : null,
    [sizeStorageKey]
  );
  const refinedDefaultSize = useMemo(() => defaultSize ?? 200, [defaultSize]);
  const refinedMinSize = useMemo(
    () => minSize ?? refinedDefaultSize,
    [minSize, refinedDefaultSize]
  );
  const refinedMinSpace = useMemo(() => minSpace ?? 300, [minSpace]);

  const initSize = useCallback(() => {
    return sizeStorageKey
      ? storage.getItem(sizeStorageKey) ?? refinedDefaultSize
      : null;
  }, [refinedDefaultSize, sizeStorageKey, storage]);

  const [size, setSize] = useState<number>(initSize());
  const [resized, setResized] = useState(false);
  const [resizerStatus, setResizerStatus] = useState<ResizerStatus>(null);

  useEffect(() => {
    setSize(initSize());
  }, [initSize]);

  const handleResizerMouseDown = useCallback(
    (event: React.MouseEvent) => {
      // Prevent text selecting.
      event.preventDefault();
      setResizerStatus({
        startWidth: size,
        startX: event.clientX,
      });
      setResized(false);
    },
    [size]
  );

  useEffect(() => {
    if (!resizerStatus) {
      return;
    }

    const handleResizerMouseMove = (event: MouseEvent): void => {
      setResized(true);
      setSize(
        Math.max(
          refinedMinSize,
          Math.min(
            document.documentElement.clientWidth - refinedMinSpace,
            resizerStatus.startWidth + event.clientX - resizerStatus.startX
          )
        )
      );
    };

    const handleResizerMouseUp = (): void => {
      setResizerStatus(null);
    };

    window.addEventListener("mousemove", handleResizerMouseMove);
    window.addEventListener("mouseup", handleResizerMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleResizerMouseMove);
      window.removeEventListener("mouseup", handleResizerMouseUp);
    };
  }, [refinedMinSize, refinedMinSpace, resizerStatus]);

  useEffect(() => {
    if (!resizerStatus && resized) {
      storage.setItem(sizeStorageKey, size);
    }
  }, [resized, resizerStatus, storage, size, sizeStorageKey]);

  return (
    <div className="sidebar" style={{ width: size }}>
      <div className="title-container">
        <div className="title-label">{titleLabel}</div>
      </div>
      <div className="pane-container">
        <slot name="panes" />
      </div>
      {sizeStorageKey ? (
        <div
          className={classNames("resizer", {
            active: !!resizerStatus,
          })}
          onMouseDown={handleResizerMouseDown}
        >
          {/* Use a fullscreen mask to keep cursor status when dragging the resizer. */}
          <div className="resizer-mask" />
        </div>
      ) : null}
    </div>
  );
}
