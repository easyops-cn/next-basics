import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { Modal, Button } from "antd";
import { ModalProps } from "antd/lib/modal";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import { NS_BASIC_BRICKS, K } from "../i18n/constants";
import { useTranslation } from "react-i18next";

const fullscreenMargin = 20;
const titleAlignPropertyMap: Record<string, string> = {
  start: "flex-start",
  left: "flex-start",
  center: "center",
  right: "flex-end",
  end: "flex-end",
};

export type positionType = "left" | "center" | "right";

declare type SrcIcon = {
  imgSrc?: string;
  imgStyle?: React.CSSProperties;
};
interface GeneralModalProps {
  visible: boolean;
  configProps?: ModalProps;
  modalTitle: string;
  hideCancelButton?: boolean;
  enableFooterSlot?: boolean;
  titleAlign?: string;
  titleIcon?: MenuIcon | SrcIcon;
  fullscreen?: boolean;
  okDisabled?: boolean;
  confirmLoading?: boolean;
  footerPosition?: positionType;
  isHiddenBodyPadding?: boolean;
  isHiddenHeaderBorder?: boolean;
  isHiddenFooterColor?: boolean;
  onAfterClose?: () => void;
}

export function GeneralModal(props: GeneralModalProps): React.ReactElement {
  const {
    configProps,
    enableFooterSlot,
    hideCancelButton,
    modalTitle,
    visible,
    titleAlign,
    titleIcon,
    fullscreen,
    okDisabled,
    confirmLoading,
    onAfterClose,
    isHiddenBodyPadding,
    isHiddenHeaderBorder,
    isHiddenFooterColor,
    footerPosition = "right",
  } = props;
  const modalHeaderRef = useRef<HTMLDivElement>();
  const modalFooterRef = useRef<HTMLDivElement>();
  const contentSlotRef = useRef<HTMLSlotElement>();
  const setBodyHeightHandlerRef = useRef<() => void>();
  const [bodyHeight, setBodyHeight] = useState<number>();
  const { t } = useTranslation(NS_BASIC_BRICKS);

  useEffect(() => {
    if (fullscreen && visible && contentSlotRef.current) {
      if (!setBodyHeightHandlerRef.current) {
        if (!modalHeaderRef.current || !modalFooterRef.current) {
          const modalContent = contentSlotRef.current.closest(
            ".ant-modal-content"
          ) as HTMLDivElement;
          modalHeaderRef.current =
            modalContent.querySelector(".ant-modal-header");
          modalFooterRef.current =
            modalContent.querySelector(".ant-modal-footer");
        }
        setBodyHeightHandlerRef.current = () => {
          setTimeout(() => {
            setBodyHeight(
              window.innerHeight -
                fullscreenMargin * 2 -
                modalHeaderRef.current.getBoundingClientRect().height -
                modalFooterRef.current.getBoundingClientRect().height
            );
          });
        };
        setBodyHeightHandlerRef.current();
        window.addEventListener("resize", setBodyHeightHandlerRef.current);
      }
    } else {
      if (setBodyHeightHandlerRef.current) {
        window.removeEventListener("resize", setBodyHeightHandlerRef.current);
        modalHeaderRef.current = undefined;
        modalFooterRef.current = undefined;
        setBodyHeightHandlerRef.current = undefined;
      }
    }

    return () => {
      if (setBodyHeightHandlerRef.current) {
        window.removeEventListener("resize", setBodyHeightHandlerRef.current);
      }
    };
  }, [fullscreen, visible]);

  let footer = undefined;
  const defaultFooter = (
    <div style={{ textAlign: `${footerPosition}` }}>
      <Button type="link" className="cancelBtn">
        {configProps?.cancelText || t(K.CANCEL)}
      </Button>
      <Button
        disabled={okDisabled ?? configProps?.okButtonProps?.disabled}
        loading={confirmLoading}
        className="okBtn"
        type={configProps?.okType || "primary"}
      >
        {configProps?.okText || t(K.OK)}
      </Button>
    </div>
  );

  if (enableFooterSlot) {
    footer = (
      <div
        className="footer-container"
        style={{ justifyContent: titleAlignPropertyMap[footerPosition] }}
      >
        <slot name="footer"></slot>
        <div></div>
        {configProps && configProps.footer !== null && defaultFooter}
      </div>
    );
    delete configProps?.footer;
  }

  let iconNode: JSX.Element = null;
  if (titleIcon) {
    if ("imgSrc" in titleIcon) {
      const mergedIcon: SrcIcon = {
        imgSrc: titleIcon.imgSrc,
        imgStyle: {
          marginRight: "8px",
          ...titleIcon.imgStyle,
        },
      };
      iconNode = <GeneralIcon icon={mergedIcon} size={20} />;
    } else {
      iconNode = (
        <GeneralIcon
          icon={titleIcon}
          style={{
            fontSize: "20px",
            marginRight: "8px",
          }}
          size={20}
        />
      );
    }
  }

  return (
    <Modal
      className={classnames({
        wrapper: hideCancelButton,
        headerWrapper: isHiddenHeaderBorder,
        bodyWrapper: isHiddenBodyPadding,
        footerWrapper: isHiddenFooterColor,
      })}
      title={
        modalTitle && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: titleAlignPropertyMap[titleAlign],
            }}
          >
            {iconNode}
            {modalTitle}
            <span className="headerExtra">
              <slot id="headerExtra" name="headerExtra"></slot>
            </span>
          </div>
        )
      }
      footer={footer || defaultFooter}
      width={fullscreen ? `calc(100% - ${fullscreenMargin * 2}px)` : undefined}
      bodyStyle={fullscreen ? { height: bodyHeight } : undefined}
      wrapClassName={classnames({ fullscreen })}
      {...configProps}
      afterClose={onAfterClose}
      cancelButtonProps={{ type: "link", ...configProps?.cancelButtonProps }}
      visible={visible}
    >
      <slot id="content" name="content" ref={contentSlotRef}></slot>
    </Modal>
  );
}
