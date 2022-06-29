import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralSwitch } from "./GeneralSwitch";
import { FormItemElement } from "@next-libs/forms";
import { MenuIcon } from "@next-core/brick-types";

/**
 * @id forms.general-switch
 * @name forms.general-switch
 * @docKind brick
 * @description 通用的开关
 * @author ice
 * @slots
 * @history
 * 1.28.0:新增 `general.switch.change` 事件
 * @excludesInherit
 *  placeholder
 *  pattern
 * @memo
 */
export class GeneralSwitchElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 表单项字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 初始值
   */
  @property({ type: Boolean })
  value: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁用
   */
  @property({ type: Boolean })
  disabled: boolean;

  /**
   * @kind `'default' | 'small'`
   * @required false
   * @default 'default'
   * @description 开关大小
   */
  @property({ attribute: false })
  size: "default" | "small" = "default";

  /**
   * @required false
   * @description 选中时的图标
   */
  @property({ attribute: false })
  checkedIcon: MenuIcon;

  /**
   * @required false
   * @description 非选中时的图标
   */
  @property({ attribute: false })
  unCheckedIcon: MenuIcon;

  /**
   * @required false
   * @description 选中时的文本
   */
  @property({ attribute: false })
  checkedText: string;

  /**
   * @required false
   * @description 非选中时的文本
   */
  @property({ attribute: false })
  unCheckedText: string;

  /**
   * @detail `boolean`
   * @description 开关改变时触发, `event.detail` 为当前选择的值
   */
  @event({ type: "general.switch.change" }) changeEvent: EventEmitter<boolean>;

  private _handleChange = (value: boolean): void => {
    this.value = value;
    this.changeEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralSwitch
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            size={this.size}
            required={this.required}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            value={this.value}
            onChange={this._handleChange}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            disabled={this.disabled}
            checkedIcon={this.checkedIcon}
            unCheckedIcon={this.unCheckedIcon}
            checkedText={this.checkedText}
            unCheckedText={this.unCheckedText}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-switch", GeneralSwitchElement);
