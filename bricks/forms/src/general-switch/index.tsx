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
export interface GeneralSwitchElementProps {
  name?: string;
  label?: string;
}


export class GeneralSwitchElement extends FormItemElement  implements GeneralSwitchElementProps {
  /* =========================== Group: basic =========================== */

  /**
   * @required true
   * @description 表单项字段名
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @description 初始值
   * @group basic
   */
  @property({ type: Boolean })
  value?: boolean;

  /* =========================== Group: formLabel =========================== */

  /**
   * @required false
   * @description 表单项字段说明
   * @group formLabel
   */
  @property({ attribute: false }) declare label: string;

  /* =========================== Group: ui =========================== */

  /**
   * @default false
   * @description 是否禁用
   * @group ui
   */
  @property({ type: Boolean })
  disabled?: boolean;

  /**
   * @description 开关大小
   * @enums "default"|"small"
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "Default",
   *       "value": "default"
   *     },
   *     {
   *       "label": "Small",
   *       "value": "small"
   *     }
   *   ]
   * }
   * @group ui
   */
  @property({ attribute: false })
  size?: "default" | "small" = "default";

  /**
   * @description 选中时的图标
   * @group ui
   */
  @property({ attribute: false })
  checkedIcon?: MenuIcon;

  /**
   * @description 非选中时的图标
   * @group ui
   */
  @property({ attribute: false })
  unCheckedIcon?: MenuIcon;

  /**
   * @description 选中时的文本
   * @group ui
   */
  @property({ attribute: false })
  checkedText?: string;

  /**
   * @description 非选中时的文本
   * @group ui
   */
  @property({ attribute: false })
  unCheckedText?: string;

  /* =========================== events =========================== */

  /**
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
            labelColor={this.labelColor}
            labelBold={this.labelBold}
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
