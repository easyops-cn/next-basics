import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { IconSelect } from "./IconSelect";
import { FormItemElement } from "@next-libs/forms";
import { MenuIcon } from "@next-core/brick-types";
import { Colors } from "@next-libs/basic-components";

export type Size = number | "large" | "small" | "default";

/**
 * @id forms.icon-select
 * @name forms.icon-select
 * @docKind brick
 * @description 支持选择图标并且输出特定格式的数据
 * @author lynette
 * @slots
 * @history
 * 1.145.0:新增属性 `message`
 * 1.102.0:新增属性 `bg`,`setColor`，支持选择颜色
 * 1.67.0:新增构件 `forms.icon-select`
 * @memo
 */
export class IconSelectElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind MenuIcon
   * @required false
   * @default -
   * @description 值[MenuIcon]((http://docs.developers.easyops.cn/docs/brick-next/icon))
   */
  @property({
    attribute: false,
  })
  value: MenuIcon;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否禁用
   */
  @property({ type: Boolean })
  disabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind `Record<string,string>`
   * @required false
   * @default -
   * @description 校验文本信息
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否可见
   */
  @property({ type: Boolean })
  visible: boolean;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示背景。当 bg 为 false 时，选择颜色的输出为icon的字体颜色，数值为平台颜色变量，形如 `var(--theme-red-color)`。当 bg 为 true 时，选择颜色的输出为颜色描述字符串，形如 "green" | "red" | "blue" | "orange" | "cyan" | "purple" | "geekblue" | "gray"，可搭配 [card-item](developers/brick-book/brick/presentational-bricks.card-item) 等构件使用。
   * @group advanced
   */
  @property({ attribute: false })
  bg = true;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否支持设置颜色
   * @group advanced
   */
  @property({ attribute: false })
  setColor = true;

  /**
   * @kind Colors
   * @required false
   * @default -
   * @description 默认颜色
   * @group advanced
   */
  @property({ attribute: false })
  defaultColor?: Colors;

  /**
   * @description 打开图标选择模态框
   */
  @method()
  open(): void {
    if (this.disabled) {
      return;
    }
    this.visible = true;
  }

  _openModal = (): void => {
    this.open();
  };

  /**
   * @description 关闭图标选择模态框
   */
  @method()
  close(): void {
    this.visible = false;
  }

  _closeModal = (): void => {
    this.close();
  };

  /**
   * @detail [MenuIcon](http://docs.developers.easyops.cn/docs/brick-next/icon)
   * @description 	图标选择变化触发的事件
   */
  @event({ type: "icon.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;

  private _handleChange = (value: MenuIcon) => {
    this.value = value;
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
    this.close();
  };

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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <IconSelect
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            required={this.required}
            message={this.message}
            placeholder={this.placeholder}
            disabled={this.disabled}
            visible={this.visible}
            value={this.value}
            openModal={this._openModal}
            onChange={this._handleChange}
            handleCancel={this._closeModal}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            bg={this.bg}
            setColor={this.setColor}
            defaultColor={this.defaultColor}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.icon-select", IconSelectElement);
