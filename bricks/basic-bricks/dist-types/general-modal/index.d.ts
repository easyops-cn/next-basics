import type { ModalProps } from "antd/lib/modal";
import type { MenuIcon } from "@next-core/brick-types";
import type { ButtonType } from "antd/lib/button";

export type positionType = "left" | "center" | "right";

export interface OpenCloseOption {
  noEvent?: boolean;
}

export interface GeneralModalProps {
  modalTitle?: string;
  titleIcon?: MenuIcon;
  titleAlign?: string;
  dataSource?: Record<string, any>;
  width?: string | number;
  enableFooterSlot?: boolean;
  footerPosition?: positionType;
  isHiddenBodyPadding?: boolean;
  isHiddenHeaderBorder?: boolean;
  isHiddenModalTitle?: boolean;
  isHiddenModalFooter?: boolean;
  isShowCustomHeader?: boolean;
  isHiddenFooterColor?: boolean;
  fullscreen?: boolean;
  okText?: string;
  okType?: ButtonType;
  okDisabled?: boolean;
  closeWhenOk?: boolean;
  confirmLoading?: boolean;
  cancelText?: string;
  hideCancelButton?: boolean;
  closeWhenCancel?: boolean;
  maskClosable?: boolean;
  configProps?: ModalProps;
  fields?: {
    modalTitle: string;
  };
  stackable?: boolean;
}

export interface GeneralModalEvents {
  "modal.open": CustomEvent<Record<string, any>>;
  "modal.close": CustomEvent<Record<string, any>>;
  "model.after.close": CustomEvent<void>;
  "basic-bricks.general-modal.cancel": CustomEvent<Record<string, any>>;
  "modal.cancel": CustomEvent<void>;
  "basic-bricks.general-modal.confirm": CustomEvent<void>;
  "modal.confirm": CustomEvent<void>;
}

export interface GeneralModalEventsMap {
  onModalOpen: "modal.open";
  onModalClose: "modal.close";
  onModelAfterClose: "model.after.close";
  onBasicBricksGeneralModalCancel: "basic-bricks.general-modal.cancel";
  onModalCancel: "modal.cancel";
  onBasicBricksGeneralModalConfirm: "basic-bricks.general-modal.confirm";
  onModalConfirm: "modal.confirm";
}

export declare class GeneralModalElement extends HTMLElement {
  modalTitle: string | undefined;
  titleIcon: MenuIcon | undefined;
  titleAlign: string | undefined;
  dataSource: Record<string, any> | undefined;
  width: string | number | undefined;
  enableFooterSlot: boolean | undefined;
  footerPosition: positionType | undefined;
  isHiddenBodyPadding: boolean | undefined;
  isHiddenHeaderBorder: boolean | undefined;
  isHiddenModalTitle: boolean | undefined;
  isHiddenModalFooter: boolean | undefined;
  isShowCustomHeader: boolean | undefined;
  isHiddenFooterColor: boolean | undefined;
  fullscreen: boolean | undefined;
  okText: string | undefined;
  okType: ButtonType | undefined;
  okDisabled: boolean | undefined;
  closeWhenOk: boolean | undefined;
  confirmLoading: boolean | undefined;
  cancelText: string | undefined;
  hideCancelButton: boolean | undefined;
  closeWhenCancel: boolean | undefined;
  maskClosable: boolean | undefined;
  configProps: ModalProps | undefined;
  fields:
    | {
        modalTitle: string;
      }
    | undefined;
  stackable: boolean | undefined;
  open(option?: OpenCloseOption): void;
  close(option?: OpenCloseOption): void;
}
