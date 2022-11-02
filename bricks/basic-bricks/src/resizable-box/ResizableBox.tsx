// istanbul ignore file: working in progress
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { JsonStorage, debounceByAnimationFrame } from "@next-core/brick-utils";
import classNames from "classnames";
import { SimpleFunction } from "@next-core/brick-types";

export interface ResizableBoxProps {
  resizeDirection: ResizeDirection;
  storageKey?: string;
  defaultSize?: number;
  minSize?: number;
  minSpace?: number;
  boxStyle?: React.CSSProperties;
  boxStyleWhenNotResizing?: React.CSSProperties;
  disableResize?: boolean;
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
  disableResize,
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
  const refBar = useRef<HTMLDivElement>();

  const initSize = useCallback(() => {
    return storageKey
      ? storage.getItem(storageKey) ?? refinedDefaultSize
      : null;
  }, [refinedDefaultSize, storageKey, storage]);

  const [size, setSize] = useState<number>(initSize());
  const [resized, setResized] = useState(false);
  const [resizeStatus, setResizerStatus] = useState<ResizerStatus>(null);
  const debouncedSetSize = useMemo(
    () => debounceByAnimationFrame(setSize as SimpleFunction),
    []
  );

  const handleResizerMouseDown = useCallback(
    (event: MouseEvent) => {
      if (disableResize) return;
      // Prevent text selecting.
      event.preventDefault();
      setResizerStatus({
        startWidth: size,
        startX: event.clientX,
      });
      setResized(false);
    },
    [size, disableResize]
  );

  useEffect(() => {
    const refBarCurrent = refBar.current;
    // shadowRoot 中不能直接在组件中绑定React事件, 会导致子节点事件冲突
    refBarCurrent.addEventListener("mousedown", handleResizerMouseDown);
    return () => {
      refBarCurrent.removeEventListener("mousedown", handleResizerMouseDown);
    };
  }, [handleResizerMouseDown]);

  useEffect(() => {
    setSize(initSize());
  }, [initSize]);

  useEffect(() => {
    if (!resizeStatus) {
      return;
    }

    const handleResizerMouseMove = (event: MouseEvent): void => {
      if (disableResize) return;
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
      if (disableResize) return;
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
    disableResize,
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
        className={classNames("bar", resizeDirection, {
          hoverBar: !disableResize,
        })}
        ref={refBar}
      >
        {/* Use a fullscreen mask to keep cursor status when dragging the resizer. */}
        <div className="mask" />
      </div>
    </>
  );
}
