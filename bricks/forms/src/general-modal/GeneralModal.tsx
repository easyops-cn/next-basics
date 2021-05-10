import React from "react";
import { Button, Modal } from "antd";
import { ButtonType } from "antd/lib/button";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";

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
}

export function GeneralModal(props: GeneralModalProps): React.ReactElement {
  const footer = (
    <>
      <Button className="cancelBtn" type="link" >{props.cancelText || "取消"}</Button>
      <Button
        disabled={props.okDisabled}
        className="okBtn"
        type={props.okType || "primary"}
      >
        {props.okText || "确定"}
      </Button>
    </>
  );

  return (
    <FormItemWrapper {...props}>
      <>
        <a role="button" className="openBtn">
          {props.btnText}
        </a>
        <Modal
          width={props.modalWidth}
          title={props.modalTitle}
          visible={props.visible}
          forceRender={true}
          getContainer={props.container}
          footer={footer}
          destroyOnClose={true}
        >
          <slot id="content" name="content"></slot>
        </Modal>
      </>
    </FormItemWrapper>
  );
}
