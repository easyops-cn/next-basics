import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { ButtonType } from "antd/lib/button";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import i18n from "i18next";
import { NS_FORMS, K } from "../i18n/constants";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import type { ModalStack } from "@next-core/brick-kit";

declare type SrcIcon = {
  imgSrc?: string;
  imgStyle?: React.CSSProperties;
};

interface GeneralModalProps extends FormItemWrapperProps {
  visible: boolean;
  modalTitle: string;
  modalWidth?: string | number;
  container?: any;
  okText?: string;
  cancelText?: string;
  okType?: ButtonType;
  btnText?: string;
  okDisabled?: boolean;
  titleIcon?: MenuIcon | SrcIcon;
  stack: ModalStack;
  stackable?: boolean;
}

export function GeneralModal(props: GeneralModalProps): React.ReactElement {
  const { stack, stackable } = props;
  const footer = (
    <>
      <Button className="cancelBtn" type="text">
        {props.cancelText || i18n.t(`${NS_FORMS}:${K.CANCEL}`)}
      </Button>
      <Button
        disabled={props.okDisabled}
        className="okBtn"
        type={props.okType || "primary"}
      >
        {props.okText || i18n.t(`${NS_FORMS}:${K.CONFIRM}`)}
      </Button>
    </>
  );

  let iconNode: JSX.Element = null;
  if (props.titleIcon) {
    if ("imgSrc" in props.titleIcon) {
      const mergedIcon: SrcIcon = {
        imgSrc: props.titleIcon.imgSrc,
        imgStyle: {
          marginRight: "8px",
          borderRadius: "50%",
          objectFit: "cover",
          ...props.titleIcon.imgStyle,
        },
      };
      iconNode = <GeneralIcon icon={mergedIcon} size={20} />;
    } else {
      iconNode = (
        <GeneralIcon
          icon={props.titleIcon}
          style={{
            fontSize: "20px",
            marginRight: "8px",
          }}
        />
      );
    }
  }

  const [zIndex, setZIndex] = useState<number>(undefined);
  useEffect(
    () => {
      if (stack && stackable) {
        if (props.visible) {
          setZIndex(stack.push());
        } else {
          stack.pull();
          setZIndex(undefined);
        }
      }
    },
    // Only re-run the effect if visible changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.visible]
  );

  return (
    <FormItemWrapper {...props}>
      <>
        <a role="button" className="openBtn">
          {props.btnText}
        </a>
        <Modal
          width={props.modalWidth}
          title={
            props.modalTitle && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                className="formsGeneralModalTitle"
              >
                {iconNode}
                {props.modalTitle}
              </div>
            )
          }
          visible={props.visible}
          forceRender={true}
          getContainer={props.container}
          footer={footer}
          destroyOnClose={true}
          zIndex={zIndex}
        >
          <slot id="content" name="content"></slot>
        </Modal>
      </>
    </FormItemWrapper>
  );
}
