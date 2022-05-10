import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { JsonStorage, debounceByAnimationFrame } from "@next-core/brick-utils";
import { GeneralIcon } from "@next-libs/basic-components";

export interface GeneralPopupProps {
  popupId?: string;
  visible: boolean;
  popupTitle?: string;
  popupWidth?: React.CSSProperties["width"];
  popupHeight?: React.CSSProperties["height"];
}

export function GeneralPopup({
  popupId,
  popupTitle,
  popupWidth,
  popupHeight,
  visible,
}: GeneralPopupProps): React.ReactElement {
  const popupRef = useRef<HTMLDivElement>();
  const [isMove, setIsMove] = useState(false);
  const [curPoint, setCurPoint] = useState({
    offsetX: 0,
    offsetY: 0,
  });
  const [pointerPosition, setPointerPosition] = useState<Array<number>>([]);

  const storage = useMemo(
    () =>
      popupId
        ? new JsonStorage<Record<string, Array<number>>>(localStorage)
        : null,
    [popupId]
  );

  const debouncedSetPoint = useMemo(
    () => debounceByAnimationFrame(setPointerPosition),
    []
  );

  const handleMouseDown = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIsMove(true);
    setCurPoint({
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (isMove) {
      const { width, height } = popupRef.current.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;
      const maxX = innerWidth - width;
      const maxY = innerHeight - height;
      const pointX = e.clientX - curPoint.offsetX;
      const pointY = e.clientY - curPoint.offsetY;
      debouncedSetPoint([
        pointX <= 0 ? 0 : pointX >= maxX ? maxX : pointX,
        pointY <= 0 ? 0 : pointY >= maxY ? maxY : pointY,
      ]);
    }
  };

  const handleMouseUp = (): void => {
    setIsMove(false);
    popupId &&
      storage.setItem(popupId, [pointerPosition[0], pointerPosition[1]]);
  };

  const initPos = useCallback(() => {
    const { innerWidth, innerHeight } = window;
    const initPostion = [
      innerWidth / 2 - popupRef.current.offsetWidth / 2,
      innerHeight / 2 - popupRef.current.offsetHeight / 2,
    ];
    return popupId ? storage.getItem(popupId) ?? initPostion : initPostion;
  }, [popupId, storage]);

  useEffect(() => {
    if (popupRef.current) {
      setPointerPosition(initPos());
    }
  }, [visible, initPos]);

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
          transform: `translate(${pointerPosition[0]}px, ${pointerPosition[1]}px)`,
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
