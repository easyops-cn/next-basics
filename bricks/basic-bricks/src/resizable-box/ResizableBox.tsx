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
  resizable?: boolean;
}

export type ResizeDirection = "left" | "right" | "top" | "bottom";

interface ResizerStatus {
  startWidth: number;
  startHeigh: number;
  startX: number;
  startY: number;
}

export function ResizableBox({
  resizeDirection,
  storageKey,
  defaultSize,
  minSize,
  minSpace,
  boxStyle,
  boxStyleWhenNotResizing,
  resizable,
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

  const isVerticalDirection = useMemo(
    () => ["top", "bottom"].includes(resizeDirection),
    [resizeDirection]
  );

  const handleResizerMouseDown = useCallback(
    (event: MouseEvent) => {
      if (!resizable) return;
      // Prevent text selecting.
      event.preventDefault();
      setResizerStatus({
        startWidth: size,
        startHeigh: size,
        startX: event.clientX,
        startY: event.clientY,
      });
      setResized(false);
    },
    [size, resizable]
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
      if (!resizable) return;

      const modifiedSize = isVerticalDirection
        ? Math.min(
            document.documentElement.clientHeight - refinedMinSpace,
            resizeStatus.startHeigh +
              (event.clientY - resizeStatus.startY) *
                (resizeDirection === "top" ? -1 : 1)
          )
        : Math.min(
            document.documentElement.clientWidth - refinedMinSpace,
            resizeStatus.startWidth +
              (event.clientX - resizeStatus.startX) *
                (resizeDirection === "left" ? -1 : 1)
          );
      setResized(true);
      debouncedSetSize(Math.max(refinedMinSize, modifiedSize));
    };

    const handleResizerMouseUp = (): void => {
      if (!resizable) return;
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
    resizable,
    isVerticalDirection,
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
          ...(isVerticalDirection ? { height: size } : { width: size }),
          ...boxStyle,
          ...(resizeStatus ? null : boxStyleWhenNotResizing),
        }}
      >
        <slot name="content" />
      </div>
      <div
        className={classNames("bar", resizeDirection, {
          hoverBar: resizable,
        })}
        ref={refBar}
      >
        {/* Use a fullscreen mask to keep cursor status when dragging the resizer. */}
        <div className="mask" />
      </div>
    </>
  );
}
