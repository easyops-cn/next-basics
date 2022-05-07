import React, { useState, useEffect, useMemo, useRef } from "react";
import { debounceByAnimationFrame } from "@next-core/brick-utils";
import { GeneralIcon } from "@next-libs/basic-components";

export interface GeneralPopupProps {
  visible: boolean;
  popupTitle?: string;
  popupWidth?: React.CSSProperties["width"];
  popupHeight?: React.CSSProperties["height"];
}

export function GeneralPopup({
  popupTitle,
  popupWidth,
  popupHeight,
  visible,
}: GeneralPopupProps): React.ReactElement {
  const popupRef = useRef<HTMLDivElement>();
  const [isMove, setIsMove] = useState(false);
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });
  const [curPoint, setCurPoint] = useState({ x: 0, y: 0 });
  const [pointerPosition, setPointerPosition] = useState<
    Array<number | string>
  >([]);

  const debouncedSetPoint = useMemo(
    () => debounceByAnimationFrame(setPointerPosition),
    []
  );

  const handleMouseDown = (e: React.MouseEvent): void => {
    setIsMove(true);
    const { pageX, pageY } = e;
    setCurPoint({ x: pageX, y: pageY });
    if (lastPoint.x === 0 && lastPoint.y === 0) {
      const { width, height } = popupRef.current.getBoundingClientRect();
      setLastPoint({ x: Number(`-${width / 2}`), y: Number(`-${height / 2}`) });
    }
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (isMove) {
      const { pageX, pageY } = e;
      const pointX = pageX - curPoint.x + lastPoint.x;
      const pointY = pageY - curPoint.y + lastPoint.y;
      debouncedSetPoint([`${pointX}px`, `${pointY}px`]);
    }
  };

  const handleMouseUp = (e: MouseEvent): void => {
    setIsMove(false);
    const { pageX, pageY } = e;
    const lastX = pageX - curPoint.x + lastPoint.x;
    const lastY = pageY - curPoint.y + lastPoint.y;
    setLastPoint({ x: lastX, y: lastY });
  };

  useEffect(() => {
    if (!isMove) {
      return;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMove]);

  return (
    visible && (
      <div
        className="GeneralPopup"
        ref={popupRef}
        style={{
          transform: `translate(${pointerPosition[0]}, ${pointerPosition[1]})`,
        }}
      >
        <div className="header" onMouseDown={handleMouseDown}>
          <span className="title">{popupTitle}</span>
          <span className="close">
            <GeneralIcon
              icon={{
                icon: "close",
                lib: "antd",
                theme: "outlined",
              }}
            />
          </span>
        </div>
        <div
          className="content"
          style={{
            width: popupWidth ?? "500px",
            height: popupHeight,
          }}
        >
          <slot name="content" />
        </div>
      </div>
    )
  );
}
