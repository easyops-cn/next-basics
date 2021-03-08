import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  UpdatingElement,
  method,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { ModalConfirm, ModalConfirmProps } from "./ModalConfirm";
import { ButtonProps, ButtonType } from "antd/lib/button";
import { pick } from "lodash";

/**
 * @id presentational-bricks.modal-confirm
 * @name presentational-bricks.modal-confirm
 * @docKind brick
 * @description 用于提示和二次确认的场景
 * @author jo
 * @slots
 * @history
 * 1.84.0:新增 `expect` 属性
 * 1.90.0:新增 `openWithArgs` 方法
 * 1.95.0:新增 `modalTitle` 属性代替原先的 title
 * @memo
 * @noInheritDoc
 */
export class ModalConfirmElement extends UpdatingElement {
  /**
   * @detail -
   * @description 点击确定按钮的事件，事件的 detail 为传入的 dataSource
   */
  @event({ type: "confirm.ok", cancelable: true })
  confirmOk: EventEmitter<any>;

  /**
   * @detail -
   * @description 点击取消按钮的事件
   */
  @event({ type: "confirm.cancel", cancelable: true })
  confirmCancel: EventEmitter<any>;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 模态框标题，代替之前 title 属性, 支持模板(即通过 #{xxx} 方式获取数据源字段的上值，由于框架目前提供了 transform 机制也可以达到此需求，推荐使用框架提供的能力)
   */
  @property() modalTitle: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 模态框内容，支持模板和 HTML（自动消毒）
   */
  @property() content: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 模态框的额外内容，支持模板和 HTML（自动消毒）
   */
  @property() extraContent: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否是删除模式的模态框（确定按钮的文本为删除，并红色高亮显示）
   */
  @property() isDelete: boolean;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 点击确定按钮是否关闭模态框
   */
  @property({
    attribute: false,
  })
  closeWhenOk = true;

  /**
   * @kind "info" | "success" | "error" | "warning" | "confirm"
   * @required false
   * @default confirm
   * @description 对话框类型
   */
  @property({
    attribute: false,
  })
  type: ModalConfirmProps["type"] = "confirm";

  /**
   * @kind string
   * @required false
   * @default -
   * @description 支持模板，若设置，需输入该文本方可删除
   */
  @property() expect: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 确定按钮是否为 loading 状态，在发起后台请求并且请求较慢的情况下可以设置 loading 状态优化用户体验
   */
  @property({ type: Boolean }) confirmLoading: boolean;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description 解析模板时的数据源
   */
  @property({ attribute: false }) dataSource: Record<string, any>;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 模态框是否可见
   * @group advanced
   */
  @property({ type: Boolean }) visible: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 确定按钮文字
   * @group advanced
   */
  @property() okText: string;

  /**
   * @kind ButtonType ("link" | "default" | "primary" | "ghost" | "dashed" | "danger")
   * @required false
   * @default -
   * @description 确定按钮类型
   * @group advanced
   */
  @property() okType: ButtonType;

  /**
   * @kind ButtonProps
   * @required false
   * @default -
   * @description 确定按钮属性，同 ant design 的 Modal 的 [okButtonProps](https://ant.design/components/modal-cn/#API)
   * @group advanced
   */
  @property({ attribute: false }) okButtonProps?: ButtonProps;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 取消按钮文字
   * @group advanced
   */
  @property() cancelText: string;

  /**
   * @kind ButtonProps
   * @required false
   * @default -
   * @description 取消按钮属性，同 ant design 的 Modal 的 [cancelButtonProps](https://ant.design/components/modal-cn/#API)
   * @group advanced
   */
  @property({ attribute: false }) cancelButtonProps?: ButtonProps;

  /**
   * @kind string
   * @required false
   * @default -
   * @description [已废弃]请使用 modalTitle 代替
   * @deprecated
   * @group advanced
   */
  @property({ __deprecated_and_for_compatibility_only: true }) title: string;

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  /**
   * @params CustomEvent
   * @description 打开模态框，如果需要同时更新参数，推荐使用 `openWithArgs` 方法
   */
  @method()
  open(event?: CustomEvent): void {
    if (event && event.detail) {
      // eslint-disable-next-line no-console
      console.warn(
        "please use `openWithArgs` method instead when open `presentational-bricks.modal-confirm` with args."
      );
      const props = pick(event.detail, [
        "visible",
        "title",
        "modalTitle",
        "content",
        "extraContent",
        "okText",
        "expect",
        "okType",
        "cancelText",
        "isDelete",
        "confirmLoading",
        "dataSource",
        "okButtonProps",
        "cancelButtonProps",
      ]);

      const okButtonProps = props.okButtonProps;
      okButtonProps &&
        (props.okButtonProps = {
          ...this.okButtonProps,
          ...okButtonProps,
        });

      const cancelButtonProps = props.cancelButtonProps;
      cancelButtonProps &&
        (props.cancelButtonProps = {
          ...this.cancelButtonProps,
          ...cancelButtonProps,
        });

      Object.assign(this, props);
    }
    this.visible = true;
  }

  /**
   * @params Record<string, any>
   * @description 打开模态框的同时更新模态框相关属性
   */
  @method()
  openWithArgs(args?: ModalConfirmProps): void {
    const props = pick(args, [
      "visible",
      "title",
      "modalTitle",
      "content",
      "extraContent",
      "okText",
      "expect",
      "okType",
      "cancelText",
      "isDelete",
      "confirmLoading",
      "dataSource",
      "okButtonProps",
      "cancelButtonProps",
    ]);

    const okButtonProps = props.okButtonProps;
    okButtonProps &&
      (props.okButtonProps = {
        ...this.okButtonProps,
        ...okButtonProps,
      });

    const cancelButtonProps = props.cancelButtonProps;
    cancelButtonProps &&
      (props.cancelButtonProps = {
        ...this.cancelButtonProps,
        ...cancelButtonProps,
      });

    Object.assign(this, props);
    this.visible = true;
  }

  /**
   * @params -
   * @description 关闭模态框
   */
  @method()
  close(): void {
    this.visible = false;
  }

  handleOk = () => {
    const defaultAction = this.confirmOk.emit(this.dataSource);
    if (defaultAction && this.closeWhenOk) {
      this.close();
    }
  };

  handleCancel = () => {
    const defaultAction = this.confirmCancel.emit(this.dataSource);
    if (defaultAction) {
      this.close();
    }
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <ModalConfirm
            visible={this.visible}
            dataSource={this.dataSource}
            title={this.modalTitle || this.title}
            content={this.content}
            extraContent={this.extraContent}
            okText={this.okText}
            okType={this.okType}
            okButtonProps={this.okButtonProps}
            cancelText={this.cancelText}
            cancelButtonProps={this.cancelButtonProps}
            isDelete={this.isDelete}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            type={this.type}
            closeWhenOk={this.closeWhenOk}
            confirmLoading={this.confirmLoading}
            expect={this.expect}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.modal-confirm",
  ModalConfirmElement
);
