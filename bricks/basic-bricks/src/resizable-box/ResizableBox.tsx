// istanbul ignore file: working in progress
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { JsonStorage } from "@next-core/brick-utils";
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

export interface ResizableBoxProps {
  resizeDirection: ResizeDirection;
  storageKey?: string;
  defaultSize?: number;
  minSize?: number;
  minSpace?: number;
  boxStyle?: React.CSSProperties;
  boxStyleWhenNotResizing?: React.CSSProperties;
}

export type ResizeDirection = "left" | "right";

interface ResizerStatus {
  startWidth: number;
  startX: number;
}

export function ResizableBox({
  resizeDirection,
  storageKey,
  defaultSize,
  minSize,
  minSpace,
  boxStyle,
  boxStyleWhenNotResizing,
}: ResizableBoxProps): React.ReactElement {
  const storage = useMemo(
    () =>
      storageKey ? new JsonStorage<Record<string, number>>(localStorage) : null,
    [storageKey]
  );
  const refinedDefaultSize = useMemo(() => defaultSize ?? 200, [defaultSize]);
  const refinedMinSize = useMemo(
    () => minSize ?? refinedDefaultSize,
    [minSize, refinedDefaultSize]
  );
  const refinedMinSpace = useMemo(() => minSpace ?? 300, [minSpace]);

  const initSize = useCallback(() => {
    return storageKey
      ? storage.getItem(storageKey) ?? refinedDefaultSize
      : null;
  }, [refinedDefaultSize, storageKey, storage]);

  const [size, setSize] = useState<number>(initSize());
  const [resized, setResized] = useState(false);
  const [resizeStatus, setResizerStatus] = useState<ResizerStatus>(null);
  const debouncedSetSize = useMemo(
    () => debounce(setSize as SimpleFunction),
    []
  );

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
    if (!resizeStatus) {
      return;
    }

    const handleResizerMouseMove = (event: MouseEvent): void => {
      setResized(true);
      debouncedSetSize(
        Math.max(
          refinedMinSize,
          Math.min(
            document.documentElement.clientWidth - refinedMinSpace,
            resizeStatus.startWidth +
              (event.clientX - resizeStatus.startX) *
                (resizeDirection === "left" ? -1 : 1)
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
  }, [
    resizeDirection,
    refinedMinSize,
    refinedMinSpace,
    resizeStatus,
    debouncedSetSize,
  ]);

  useEffect(() => {
    if (!resizeStatus && resized) {
      storage.setItem(storageKey, size);
    }
  }, [resized, resizeStatus, storage, size, storageKey]);

  return (
    <>
      <div
        className={classNames("box", {
          resizing: !!resizeStatus,
        })}
        style={{
          width: size,
          ...boxStyle,
          ...(resizeStatus ? null : boxStyleWhenNotResizing),
        }}
      >
        <slot name="content" />
      </div>
      <div
        className={classNames("bar", resizeDirection)}
        onMouseDown={handleResizerMouseDown}
      >
        {/* Use a fullscreen mask to keep cursor status when dragging the resizer. */}
        <div className="mask" />
      </div>
    </>
  );
}
