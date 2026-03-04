import type { ButtonProps, ButtonType } from "antd/lib/button";
import type { UseBrickConf } from "@next-core/brick-types";

export interface ModalConfirmProps {
  visible: boolean;
  dataSource?: Record<string, any>;
  title?: string;
  width?: string | number;
  content?: string;
  extraContent?: string;
  okText?: string;
  okType?: ButtonType;
  okButtonProps?: ButtonProps;
  cancelText?: string;
  cancelButtonProps?: ButtonProps;
  isDelete?: boolean;
  onOk?(): void;
  onCancel?(): void;
  type?: "info" | "success" | "error" | "warning" | "confirm";
  closeWhenOk?: boolean;
  confirmLoading?: boolean;
  expect?: string;
  contentBrick?: { useBrick: UseBrickConf };
  extraContentSuffixBrick?: { useBrick: UseBrickConf };
}

export interface ModalConfirmElementProps {
  modalTitle?: string;
  content?: string;
  type?: ModalConfirmProps["type"];
  dataSource?: Record<string, any>;
  contentBrick?: { useBrick: UseBrickConf };
  extraContentSuffixBrick?: { useBrick: UseBrickConf };
  expect?: string;
  isDelete?: boolean;
  okText?: string;
  okType?: ButtonType;
  okButtonProps?: ButtonProps;
  closeWhenOk?: boolean;
  confirmLoading?: boolean;
  cancelText?: string;
  cancelButtonProps?: ButtonProps;
  extraContent?: string;
  visible?: boolean;
  width?: string | number;
  title?: string;
}

export interface ModalConfirmEvents {
  "confirm.ok": CustomEvent<any>;
  "confirm.cancel": CustomEvent<any>;
}

export interface ModalConfirmEventsMap {
  onConfirmOk: "confirm.ok";
  onConfirmCancel: "confirm.cancel";
}

export declare class ModalConfirmElement extends HTMLElement {
  modalTitle: string | undefined;
  content: string | undefined;
  type: ModalConfirmElementProps["type"] | undefined;
  dataSource: Record<string, any> | undefined;
  contentBrick: { useBrick: UseBrickConf } | undefined;
  extraContentSuffixBrick: { useBrick: UseBrickConf } | undefined;
  expect: string | undefined;
  isDelete: boolean | undefined;
  okText: string | undefined;
  okType: ButtonType | undefined;
  okButtonProps: ButtonProps | undefined;
  closeWhenOk: boolean | undefined;
  confirmLoading: boolean | undefined;
  cancelText: string | undefined;
  cancelButtonProps: ButtonProps | undefined;
  extraContent: string | undefined;
  visible: boolean | undefined;
  width: string | number | undefined;
  title: string;
  open(event?: CustomEvent): void;
  openWithArgs(args?: ModalConfirmProps): void;
  close(): void;
}
