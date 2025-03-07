import React from "react";
import ReactDOM from "react-dom";
import { ModalProps } from "antd/lib/modal";

import {
  BrickWrapper,
  property,
  UpdatingElement,
  method,
  event,
  EventEmitter,
  instantiateModalStack,
} from "@next-core/brick-kit";
import { GeneralModal, positionType } from "./GeneralModal";
import style from "./index.shadow.less";
import { get, pick, forEach, set } from "lodash";
import { MenuIcon } from "@next-core/brick-types";
import { ButtonType } from "antd/lib/button";

export interface OpenCloseOption {
  noEvent?: boolean;
}
/**
 * @id basic-bricks.general-modal
 * @name basic-bricks.general-modal
 * @docKind brick
 * @description 提供插槽以展示其他构件，注意与表单通用模态框 (forms.general-modal) 的不同
 * @groupI18N
 * {
 *    "buttonAndInteract": {"en": "Button/Interact", "zh": "按钮及交互"}
 * }
 * @author ice
 * @slots
 * content:模态框里面的内容
 * headerExtra:模态框头部标题后面的内容
 * @history
 * 1.26.0:新增 `modal.close` 事件
 * 1.34.0:新增 `width` 属性
 * 1.37.0:新增 `okText`, `cancelText` 属性, 新增 `modal.open` 事件
 * 1.53.0:新增 `hideCancelButton` 属性
 * 1.60.0:`open` 和 `close` 方法新增 `noEvent` 选项
 * 1.61.0:新增 `enableFooterSlot` 属性
 * 1.88.0:新增 `titleAlign` 和 `titleIcon` 属性
 * @memo
 * ### OpenCloseOption

* | property | type      | required | default | description |
* | -------- | --------- | -------- | ------- | ----------- |
* | noEvent  | `boolean` | -        | -       | 不触发事件  |
 * @noInheritDoc
 */
export class GeneralModalElement extends UpdatingElement {
  // ----------------------- basic ----------------------------

  /**
   * @kind string
   * @required false
   * @default -
   * @description 模态框标题
   * @group basic
   */
  @property()
  modalTitle: string;

  /**
   * @kind MenuIcon
   * @required false
   * @default -
   * @description 标题图标
   * @group basic
   */
  @property({ attribute: false })
  titleIcon?: MenuIcon;

  /**
   * @required false
   * @default -
   * @description 标题对齐方式
   * @group basic
   */
  @property()
  titleAlign?: string;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 数据来源
   * @group basic
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  // ----------------------- ui ----------------------------

  /**
   * @kind string | number
   * @required false
   * @default -
   * @description 模态框宽度
   * @group ui
   */
  @property({ attribute: false })
  width: string | number;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否启用 footer 插槽
   * @group ui
   */
  @property({ type: Boolean })
  enableFooterSlot: boolean;

  /**
   * @kind string
   * @required false
   * @default right
   * @description 按钮的位置 left | center | right
   * @group ui
   */
  @property()
  footerPosition: positionType;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否需要隐藏弹窗内容的padding
   * @group ui
   */
  @property({ attribute: false })
  isHiddenBodyPadding = false;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否需要隐藏弹窗头部的分割线
   * @group ui
   */
  @property({ attribute: false })
  isHiddenHeaderBorder = false;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否需要隐藏弹窗的title
   * @group ui
   */
  @property({ attribute: false })
  isHiddenModalTitle = false;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否需要隐藏弹窗的footer
   * @group ui
   */
  @property({ attribute: false })
  isHiddenModalFooter = false;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否需要显示自定义顶部header
   * @group ui
   */
  @property({ attribute: false })
  isShowCustomHeader = false;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否需要隐藏底部特殊的颜色
   * @group ui
   */
  @property({ attribute: false })
  isHiddenFooterColor = false;

  /**
   * @default false
   * @description 全屏模式
   * @group ui
   */
  @property({ type: Boolean })
  fullscreen?: boolean;

  // ----------------------- buttonAndInteract ----------------------------

  /**
   * @kind string
   * @required false
   * @default 确认
   * @description 确认按钮文字
   * @group buttonAndInteract
   */
  @property()
  okText: string;

  /**
   * @kind ButtonType
   * @required false
   * @default primary
   * @description 模态框确认按钮类型 ButtonType("link" | "default" | "primary" | "ghost" | "dashed" | "danger")
   * @group buttonAndInteract
   */
  @property()
  okType: ButtonType;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁用确认按钮
   * @group buttonAndInteract
   */
  @property({ type: Boolean })
  okDisabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 点击确定时，是否立即关闭模态框，如果设为`false`，则需要自行关闭。
   * @group basic
   */
  @property({ attribute: false })
  closeWhenOk = true;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 确定按钮 loading
   * @group buttonAndInteract
   */
  @property({ type: Boolean })
  confirmLoading: boolean;

  /**
   * @kind string
   * @required false
   * @default 取消
   * @description 取消按钮文字
   * @group buttonAndInteract
   */
  @property()
  cancelText: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否隐藏取消按钮
   * @group buttonAndInteract
   */
  @property({ type: Boolean })
  hideCancelButton: boolean;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 点击取消时，是否立即关闭模态框，如果设为`false`，则需要自行关闭。
   * @group buttonAndInteract
   */
  @property({ attribute: false })
  closeWhenCancel = true;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否点击背景关闭模态框
   * @group buttonAndInteract
   */
  @property({
    attribute: false,
  })
  maskClosable: boolean;

  // ----------------------- other ----------------------------

  /**
   * @kind object
   * @required false
   * @default -
   * @description 完全透传给 antd 的 Modal 属性，详见 [文档](https://ant.design/components/modal-cn#API)
   * @group other
   */
  @property({ attribute: false })
  configProps: ModalProps;

  /**
   * @kind {modalTitle: string}
   * @deprecated true
   * @required false
   * @default -
   * @description `已废弃` 字段映射, 跟 dataSource 一起使用来获得运行时 modalTitle
   * @group other
   */
  @property({
    attribute: false,
    __deprecated_and_for_compatibility_only: true,
  })
  fields: {
    modalTitle: string;
  };

  /**
   * @description 是否可堆叠，开启后每次打开抽屉会将新的抽屉置于上层（zIndex ++）。注意：仅初始设置有效。
   */
  @property({ type: Boolean })
  stackable: boolean;

  private _stack = instantiateModalStack?.();

  private _mountPoint: HTMLElement;
  private isVisible = false;
  private modalProps: ModalProps = {};

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    shadowRoot.appendChild(this._mountPoint);
  }

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this.listenOnClose();
    this._render();
  }

  handleAfterClose = (): void => {
    this.afterCloseModel.emit();
  };

  // istanbul ignore next
  listenOnClose() {
    this.addEventListener("click", (e) => {
      const paths = e.composedPath() as HTMLElement[];
      const clickNode = paths[0];
      const nodeName = clickNode.nodeName.toLowerCase();
      const buttonNode =
        nodeName === "button" ? clickNode : clickNode.closest("button");

      if (
        ((this.maskClosable !== undefined
          ? this.maskClosable
          : this.modalProps.maskClosable !== false) &&
          nodeName === "div" &&
          clickNode.className.includes("ant-modal-wrap")) ||
        (buttonNode && buttonNode.className.includes("ant-modal-close")) ||
        // 如果cascader在modal，点击关闭按钮会误关闭弹窗，这里过滤掉cascader.
        (clickNode.closest("svg")?.getAttribute("data-icon") ===
          "close-circle" &&
          !(
            (clickNode.parentNode as HTMLSpanElement)?.classList.contains(
              "ant-cascader-picker-clear"
            ) ||
            (
              clickNode.parentNode.parentNode as HTMLSpanElement
            )?.classList.contains("ant-cascader-picker-clear")
          ))
      ) {
        this.close();
        return;
      }

      if (buttonNode && buttonNode.closest(".ant-modal-footer") !== null) {
        const isInFooterContainer =
          buttonNode.closest(".footer-container") !== null;

        if (
          buttonNode.className.includes("okBtn") ||
          (!isInFooterContainer &&
            buttonNode.className.includes("ant-btn-primary"))
        ) {
          this.generalModalConfirm.emit(this.dataSource);
          if (this.closeWhenOk) {
            this.close();
          }
        } else if (
          buttonNode.className.includes("cancelBtn") ||
          !isInFooterContainer
        ) {
          this.generalModalCancel.emit();
          if (this.closeWhenCancel) {
            this.close();
          }
        }
        return;
      }
    });
  }

  disconnectedCallback(): void {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    ReactDOM.unmountComponentAtNode(this);
    this._stack?.pull();
  }

  private initData(mutableProps: { modalTitle: string }): void {
    const pickFields = pick(this.fields, ["modalTitle"]);
    forEach(pickFields, (fieldKey, field: string) => {
      set(mutableProps, field, get(this.dataSource, fieldKey));
    });
  }
  protected _render(): void {
    if (this.configProps) {
      this.modalProps = { ...this.configProps };
    }
    this.modalProps.getContainer = this._mountPoint;
    if (this.isConnected) {
      const mutableProps = {
        modalTitle: this.modalTitle,
      };
      if (this.fields && this.dataSource) {
        this.initData(mutableProps);
      }
      if (this.width) {
        set(this.modalProps, "width", this.width);
      }
      if (this.okText) {
        set(this.modalProps, "okText", this.okText);
      }
      if (this.cancelText) {
        set(this.modalProps, "cancelText", this.cancelText);
      }
      if (this.okType) {
        set(this.modalProps, "okType", this.okType);
      }
      ReactDOM.render(
        <BrickWrapper>
          <GeneralModal
            visible={this.isVisible}
            configProps={this.modalProps}
            modalTitle={mutableProps.modalTitle}
            hideCancelButton={this.hideCancelButton}
            enableFooterSlot={this.enableFooterSlot}
            titleAlign={this.titleAlign}
            titleIcon={this.titleIcon}
            fullscreen={this.fullscreen}
            okDisabled={this.okDisabled}
            confirmLoading={this.confirmLoading}
            onAfterClose={this.handleAfterClose}
            footerPosition={this.footerPosition}
            isHiddenBodyPadding={this.isHiddenBodyPadding}
            isHiddenHeaderBorder={this.isHiddenHeaderBorder}
            isHiddenFooterColor={this.isHiddenFooterColor}
            isHiddenModalTitle={this.isHiddenModalTitle}
            isHiddenModalFooter={this.isHiddenModalFooter}
            isShowCustomHeader={this.isShowCustomHeader}
            stack={this._stack}
            stackable={this.stackable}
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
  /**
   *
   * @description 弹出模态框
   */
  @method() open(option?: OpenCloseOption): void {
    this.isVisible = true;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    if (!option?.noEvent) {
      this.openModal.emit(this.dataSource);
    }

    this._render();
  }
  /**
   * @params option?: OpenCloseOption
   * @description 打开 modal 时发出该事件
   */
  @event({ type: "modal.open" }) openModal: EventEmitter<Record<string, any>>;
  /**
   * @params `option?: OpenCloseOption`
   * @description 关闭模态框
   */
  @method() close(option?: OpenCloseOption): void {
    this.isVisible = false;
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    if (!option?.noEvent) {
      this.closeModal.emit(this.dataSource);
    }

    this._render();
  }
  /**
   * @detail -
   * @description 关闭 modal 时发出该事件
   */
  @event({ type: "modal.close" }) closeModal: EventEmitter<Record<string, any>>;

  /**
   * @detail -
   * @description 当 modal 完全关闭后发出该事件
   */
  @event({ type: "model.after.close" }) afterCloseModel: EventEmitter;

  /**
   * @detail `Record<string, any>`
   * @description 当点击 modal 自带的取消按钮时发出该事件，detail来源为当前的dataSource属性值
   */
  @event({ type: "basic-bricks.general-modal.cancel" })
  generalModalCancel: EventEmitter;
  /**
   * @detail `Record<string, any>`
   * @description 当点击 modal 自带的确认按钮时发出该事件，detail来源为当前的dataSource属性值
   */
  @event({ type: "basic-bricks.general-modal.confirm" })
  generalModalConfirm: EventEmitter;
}

customElements.define("basic-bricks.general-modal", GeneralModalElement);
