import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { UseSingleBrickConf } from "@next-core/brick-types";
import { ButtonType, ButtonProps } from "antd/lib/button";

import { FormModal } from "./FormModal";

/**
 * @id forms.form-modal
 * @name forms.form-modal
 * @docKind brick
 * @description 表单模态框。要作为表单项，请使用 forms.general-form。
 * @author
 * @slots
 * @history
 * 1.94.0:新增构件 `forms.form-modal`
 * 1.95.0:新增属性 `dataSource`
 * 1.98.0:新增属性 `form`、`items`
 * @memo
 * @noInheritDoc
 */
export class FormModalElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 模态框标题
   */
  @property() modalTitle: string;
  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 确定按钮 loading
   */
  @property({ type: Boolean }) confirmLoading: boolean;
  /**
   * @kind boolean
   * @required false
   * @default `true`
   * @description 是否显示右上角的关闭按钮
   */
  @property({ attribute: false }) closable = true;
  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 垂直居中展示模态框
   */
  @property({ type: Boolean }) centered: boolean;
  /**
   * @kind `string | number`
   * @required false
   * @default `520`
   * @description 模态框宽度
   */
  @property({ attribute: false }) width: string | number;
  /**
   * @kind string
   * @required false
   * @default `"确定"`
   * @description 确认按钮文字
   */
  @property({ attribute: false }) okText: string;
  /**
   * @kind `"default" | "primary" | "ghost" | "dashed" | "danger" | "link"`
   * @required false
   * @default `"primary"`
   * @description 确认按钮类型
   */
  @property({ attribute: false }) okType: ButtonType;
  /**
   * @kind string
   * @required false
   * @default `"取消"`
   * @description 取消按钮文字
   */
  @property({ attribute: false }) cancelText: string;
  /**
   * @kind boolean
   * @required false
   * @default `true`
   * @description 点击蒙层是否允许关闭
   */
  @property({ type: Boolean }) maskClosable: boolean;
  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 强制渲染模态框
   */
  @property({ type: Boolean }) forceRender: boolean;
  /**
   * @kind `ButtonProps`
   * @required false
   * @default -
   * @description 确认按钮 props，详细属性参见 <https://3x.ant.design/components/button-cn/>
   */
  @property({ attribute: false }) okButtonProps: ButtonProps;
  /**
   * @kind `ButtonProps`
   * @required false
   * @default -
   * @description 取消按钮 props，详细属性参见 <https://3x.ant.design/components/button-cn/>
   */
  @property({ attribute: false }) cancelButtonProps: ButtonProps;
  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 关闭时销毁模态框里的子元素
   */
  @property({ type: Boolean }) destroyOnClose: boolean;
  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否展示遮罩
   */
  @property({ attribute: false }) mask = true;
  /**
   * @kind `{ useBrick: Omit<UseSingleBrickConf, 'brick'> }`
   * @required false
   * @default `{ useBrick: { brick: "forms.general-form", properties: { layout: "vertical" } } }`
   * @description 表单构件配置
   */
  @property({ attribute: false }) form: {
    useBrick: Omit<UseSingleBrickConf, "brick">;
  };
  /**
   * @kind `Omit<UseSingleBrickConf, 'brick'>`
   * @required false
   * @default `useBrick: { brick: "forms.general-form" { properties: { layout: "vertical" } } }`
   * @description [已废弃]表单构件配置，请使用 `form` 属性
   */
  @property({ attribute: false }) formBrick: Omit<UseSingleBrickConf, "brick">; // Deprecated
  /**
   * @kind `{ useBrick: UseSingleBrickConf[] }`
   * @required false
   * @default -
   * @description 表单构件的 items 插槽的构件配置
   */
  @property({ attribute: false }) items: { useBrick: UseSingleBrickConf[] };
  /**
   * @kind `{ useBrick: UseSingleBrickConf[] }`
   * @required false
   * @default -
   * @description [已废弃]表单构件的 items 插槽的构件配置，请使用 `items` 属性
   */
  @property({ attribute: false }) itemBricks: UseSingleBrickConf[]; // Deprecated
  /**
   * @kind `any`
   * @required false
   * @default -
   * @description 用于 `formBrick` 和 `itemBricks` 的 `transform` 的 `DATA` 上下文
   */
  @property({ attribute: false }) dataSource: any;
  private _visible = false;

  connectedCallback(): void {
    // Don't override user's style settings.
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
   * @description 模态框打开
   */
  @event({ type: "formModal.open" }) openEvent: EventEmitter;
  /**
   * @description 打开模态框
   */
  @method() open(): void {
    this._visible = true;
    this._render();
    this.openEvent.emit();
  }
  /**
   * @description 模态框关闭
   */
  @event({ type: "formModal.close" }) closeEvent: EventEmitter;
  /**
   * @description 关闭模态框
   */
  @method() close(): void {
    this._visible = false;
    this._render();
    this.closeEvent.emit();
  }
  /**
   * @description 模态框确定，默认自动关闭模态框，可以通过 `action: 'preventDefault'` 阻止
   */
  @event({ type: "formModal.ok", cancelable: true }) okEvent: EventEmitter;
  private _handleOk = (): void => {
    const defaultAction = this.okEvent.emit();
    if (defaultAction) {
      this.close();
    }
  };
  /**
   * @description 模态框取消，默认自动关闭模态框，可以通过 `action: 'preventDefault'` 阻止
   */
  @event({ type: "formModal.cancel", cancelable: true })
  cancelEvent: EventEmitter;
  private _handleCancel = (): void => {
    const defaultAction = this.cancelEvent.emit();
    if (defaultAction) {
      this.close();
    }
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <FormModal
            visible={this._visible}
            title={this.modalTitle}
            confirmLoading={this.confirmLoading}
            closable={this.closable}
            centered={this.centered}
            width={this.width}
            okText={this.okText}
            okType={this.okType}
            cancelText={this.cancelText}
            maskClosable={this.maskClosable}
            forceRender={this.forceRender}
            okButtonProps={this.okButtonProps}
            cancelButtonProps={this.cancelButtonProps}
            destroyOnClose={this.destroyOnClose}
            mask={this.mask}
            form={this.form}
            formBrick={this.formBrick}
            items={this.items}
            itemBricks={this.itemBricks}
            dataSource={this.dataSource}
            onOk={this._handleOk}
            onCancel={this._handleCancel}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.form-modal", FormModalElement);
