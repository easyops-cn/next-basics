import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { Modal, Button } from "antd";
import { ModalProps } from "antd/lib/modal";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";

const fullscreenTopOffset = 40;

const titleAlignPropertyMap: Record<string, string> = {
  start: "flex-start",
  left: "flex-start",
  center: "center",
  right: "flex-end",
  end: "flex-end",
};

interface GeneralModalProps {
  visible: boolean;
  configProps?: ModalProps;
  modalTitle: string;
  hideCancelButton?: boolean;
  enableFooterSlot?: boolean;
  titleAlign?: string;
  titleIcon?: MenuIcon;
  fullscreen?: boolean;
  okDisabled?: boolean;
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
  } = props;
  const modalHeaderRef = useRef<HTMLDivElement>();
  const modalFooterRef = useRef<HTMLDivElement>();
  const contentSlotRef = useRef<HTMLSlotElement>();
  const setBodyHeightHandlerRef = useRef<() => void>();
  const [bodyHeight, setBodyHeight] = useState<number>();

  useEffect(() => {
    if (fullscreen && visible && contentSlotRef.current) {
      if (!setBodyHeightHandlerRef.current) {
        if (!modalHeaderRef.current || !modalFooterRef.current) {
          const modalContent = contentSlotRef.current.closest(
            ".ant-modal-content"
          ) as HTMLDivElement;
          modalHeaderRef.current = modalContent.querySelector(
            ".ant-modal-header"
          );
          modalFooterRef.current = modalContent.querySelector(
            ".ant-modal-footer"
          );
        }
        setBodyHeightHandlerRef.current = () => {
          setTimeout(() => {
            setBodyHeight(
              window.innerHeight -
                fullscreenTopOffset -
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
    <div>
      <Button type="link" className="cancelBtn">
        {configProps?.cancelText || "取消"}
      </Button>
      <Button
        disabled={okDisabled ?? configProps?.okButtonProps?.disabled}
        className="okBtn"
        type={configProps?.okType || "primary"}
      >
        {configProps?.okText || "确定"}
      </Button>
    </div>
  );

  if (enableFooterSlot) {
    footer = (
      <div className="footer-container">
        <slot name="footer"></slot>
        {configProps && configProps.footer !== null && defaultFooter}
      </div>
    );
    delete configProps.footer;
  }

  return (
    <Modal
      className={classnames({ wrapper: hideCancelButton })}
      title={
        modalTitle && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: titleAlignPropertyMap[titleAlign],
            }}
          >
            {titleIcon && (
              <GeneralIcon icon={titleIcon} style={{ marginRight: 8 }} />
            )}
            {modalTitle}
            <span className="headerExtra">
              <slot id="headerExtra" name="headerExtra"></slot>
            </span>
          </div>
        )
      }
      footer={footer || defaultFooter}
      width={fullscreen ? "100%" : undefined}
      style={fullscreen ? { top: fullscreenTopOffset } : undefined}
      bodyStyle={fullscreen ? { height: bodyHeight } : undefined}
      wrapClassName={classnames({ fullscreen })}
      {...configProps}
      cancelButtonProps={{ type: "link", ...configProps?.cancelButtonProps }}
      visible={visible}
    >
      <slot id="content" name="content" ref={contentSlotRef}></slot>
    </Modal>
  );
}
