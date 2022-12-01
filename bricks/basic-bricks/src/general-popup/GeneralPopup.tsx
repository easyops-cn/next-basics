import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { JsonStorage, debounceByAnimationFrame } from "@next-core/brick-utils";
import { GeneralIcon } from "@next-libs/basic-components";
import moment from "moment";
import { getCssPropertyValue } from "@next-core/brick-kit";

export enum OpenDirection {
  LeftTop = "leftTop",
  LeftBottom = "leftBottom",
  RightTop = "rightTop",
  RightBottom = "rightBottom",
  Center = "center",
}

export interface GeneralPopupProps {
  popupId?: string;
  visible: boolean;
  popupTitle?: string;
  popupWidth?: React.CSSProperties["width"];
  popupHeight?: React.CSSProperties["height"];
  closePopup?: () => void;
  dragHeaderStyle?: Record<string, any>;
  dragWrapperStyle?: Record<string, any>;
  openDirection?: OpenDirection;
}

let headerHeight = parseInt(getCssPropertyValue("--app-bar-height")) || 56;

export function GeneralPopup({
  popupId,
  popupTitle,
  popupWidth,
  popupHeight,
  visible,
  dragHeaderStyle,
  dragWrapperStyle,
  openDirection,
  closePopup,
}: GeneralPopupProps): React.ReactElement {
  const popupRef = useRef<HTMLDivElement>();
  const headerRef = useRef<HTMLDivElement>();
  const [isMove, setIsMove] = useState(false);
  const curPointRef = useRef({
    offsetX: 0,
    offsetY: 0,
  });
  const [position, setPosition] = useState<Array<number>>([]);
  const jsonStorage = React.useMemo(() => new JsonStorage(localStorage), []);

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

  const handleShowTips = ((e: CustomEvent<NavTip[]>): void => {
    const list = (e.detail ?? []).filter((item) => {
      const isTipClosing =
        item.closable &&
        jsonStorage.getItem(item.tipKey) &&
        moment().unix() <= jsonStorage.getItem(item.tipKey);
      return !isTipClosing;
    });
    headerHeight += list.length * 32;
  }) as EventListener;

  useEffect(() => {
    window.addEventListener("app.bar.tips", handleShowTips);
    return () => {
      window.removeEventListener("app.bar.tips", handleShowTips);
    };
  }, []);

  const debouncedSetPoint = useMemo(
    () => debounceByAnimationFrame(setPosition),
    []
  );

  const handleMouseDown = (e: MouseEvent): void => {
    e.stopPropagation();
    const paths = e.composedPath() as HTMLElement[];
    for (const path of paths) {
      if (path.nodeName) {
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
        if (
          path.nodeName.toLowerCase() === "div" &&
          path.className.includes("general-popup-header")
        ) {
          setIsMove(true);
          curPointRef.current = {
            offsetX: e.offsetX,
            offsetY: e.offsetY,
          };
        }
      }
    }
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
    popupId && storage.setItem(popupId, [position[0], position[1]]);
  };

  const initPos = useCallback(() => {
    let initPostion: Array<number> = [];
    if (visible && popupRef.current) {
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = popupRef.current;

      const map: { [key in OpenDirection]: Array<number> } = {
        [OpenDirection.LeftTop]: [0, headerHeight],
        [OpenDirection.LeftBottom]: [0, innerHeight - offsetHeight],
        [OpenDirection.RightTop]: [innerWidth - offsetWidth, headerHeight],

        [OpenDirection.RightBottom]: [
          innerWidth - offsetWidth,
          innerHeight - offsetHeight,
        ],

        [OpenDirection.Center]: [
          Math.floor((innerWidth - offsetWidth) / 2),
          Math.floor((innerHeight - offsetHeight) / 2),
        ],
      };

      initPostion = map[openDirection || OpenDirection.Center];
      return popupId ? storage.getItem(popupId) ?? initPostion : initPostion;
    }
    return initPostion;
  }, [popupId, storage, headerHeight, popupRef?.current?.offsetHeight]);

  useEffect(() => {
    const popupElement = popupRef.current;
    if (popupElement) {
      setPosition(initPos());
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
          transform: `translate(${position[0]}px, ${position[1]}px)`,
          ...dragWrapperStyle,
        }}
      >
        <div
          className="general-popup-header"
          ref={headerRef}
          style={dragHeaderStyle}
        >
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
