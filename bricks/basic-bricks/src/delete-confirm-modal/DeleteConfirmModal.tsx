import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";

import { NS_BASIC_BRICKS, K } from "../i18n/constants";

interface DeleteConfirmModalProps {
  name: string;
  visible: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
  title: string;
  message?: string;
}

export function DeleteConfirmModal(
  props: DeleteConfirmModalProps
): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);

  const contentTemplate = () => {
    return props.message ? (
      <div>{props.message}</div>
    ) : (
      <div>
        确定删除<span style={{ color: "#FC5043" }}> {props.name} </span>?
      </div>
    );
  };

  useEffect(() => {
    if (props.visible) {
      Modal.confirm({
        title: props.title,
        content: contentTemplate(),
        okText: "确定",
        okType: "danger",
        onOk: props.handleConfirm,
        cancelText: "取消",
        onCancel: props.handleCancel
      });
    }
  }, [props.visible]);

  return <div></div>;
}
