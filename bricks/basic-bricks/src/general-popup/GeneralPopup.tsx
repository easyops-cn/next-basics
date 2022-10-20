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
  closePopup?: () => void;
}

export function GeneralPopup({
  popupId,
  popupTitle,
  popupWidth,
  popupHeight,
  visible,
  closePopup,
}: GeneralPopupProps): React.ReactElement {
  const popupRef = useRef<HTMLDivElement>();
  const headerRef = useRef<HTMLDivElement>();
  const [isMove, setIsMove] = useState(false);
  const curPointRef = useRef({
    offsetX: 0,
    offsetY: 0,
  });
  const [pointerPosition, setPointerPosition] = useState<Array<number>>([]);

  const storage = useMemo(
    () =>
      popupId
        ? new JsonStorage<Record<string, Array<number>>>(
            localStorage,
            "general-popup-postion-"
          )
        : null,
    [popupId]
  );

  const debouncedSetPoint = useMemo(
    () => debounceByAnimationFrame(setPointerPosition),
    []
  );

  const handleMouseDown = (e: MouseEvent): void => {
    e.stopPropagation();
    const paths = e.composedPath() as HTMLElement[];
    for (const path of paths) {
      if (path.nodeName.toLowerCase() === "#document-fragment") {
        break;
      }
      if (
        path.nodeName.toLowerCase() === "span" &&
        path.className.includes("anticon anticon-close")
      ) {
        closePopup?.();
        return;
      }
    }
    setIsMove(true);
    curPointRef.current = {
      offsetX: e.offsetX,
      offsetY: e.offsetY,
    };
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (isMove) {
      const { width, height } = popupRef.current.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;
      const maxX = innerWidth - width;
      const maxY = innerHeight - height;
      const pointX = e.clientX - curPointRef.current.offsetX;
      const pointY = e.clientY - curPointRef.current.offsetY;
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
    const popupElement = popupRef.current;
    if (popupElement) {
      setPointerPosition(initPos());
      /**
       * Antd Select构件在shadow dom会出现异常的情况
       * 具体可参见: https://github.com/ant-design/ant-design/issues/28012
       * 采用原生事件监听可避免该种情况发生
       */
      popupElement.addEventListener("mousedown", handleMouseDown);
    }
    return () => {
      popupElement?.removeEventListener("mousedown", handleMouseDown);
    };
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
        <div className="header" ref={headerRef}>
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
            maxHeight: popupHeight,
          }}
        >
          <slot name="content" />
        </div>
      </div>
    )
  );
}
