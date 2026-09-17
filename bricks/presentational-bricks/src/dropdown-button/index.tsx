import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { DropdownButton } from "./DropdownButton";
import { MenuIcon } from "@next-core/brick-types";
import { Option } from "../interfaces";

export interface DropdownButtonElementProps {
  options?: Option[];
  leftButtonIcon?: MenuIcon | string;
  rightButtonIcon?: MenuIcon | string;
  buttonName?: string;
  disabled?: boolean;
  textPlacement?: "right" | "left";
  tooltip?: string;
  value?: any[];
}

/**
 * @id presentational-bricks.dropdown-button
 * @author astrid
 * @history
 * 1.212.0: 新增构件 `presentational-bricks.dropdown-button`
 * @docKind brick
 * @noInheritDoc
 */
export class DropdownButtonElement extends UpdatingElement implements DropdownButtonElementProps {
  /**
   * @kind Option[]
   * @required false
   * @default -
   * @description 下拉菜单
   * @description.en Dropdown menu
   * @group basic
   */
  @property({ attribute: false })
  options: Option[];
  /**
   * @kind MenuIcon|string
   * @required false
   * @default -
   * @description 左边按钮 icon，支持[icon 图标库](developers/icon)，可直接复制图标图标的配置（antd、fa 及 easyops 三种库都支持），也可只取 icon 字段的值（仅支持 antd 库）。配置{ "lib": "antd", "icon": "edit" }与 "edit"等价
   * @description.en Left button icon, supports the [icon library](developers/icon). You can directly copy the icon configuration (all three libraries antd, fa and easyops are supported), or take only the value of the icon field (only the antd library is supported). The configuration { "lib": "antd", "icon": "edit" } is equivalent to "edit"
   * @group basic
   */
  @property()
  leftButtonIcon: MenuIcon | string;

  /**
   * @kind MenuIcon|string
   * @required false
   * @default -
   * @description 右边边按钮 icon，支持[icon 图标库](developers/icon)，可直接复制图标图标的配置（antd、fa 及 easyops 三种库都支持），也可只取 icon 字段的值（仅支持 antd 库）。配置{ "lib": "antd", "icon": "edit" }与 "edit"等价
   * @description.en Right button icon, supports the [icon library](developers/icon). You can directly copy the icon configuration (all three libraries antd, fa and easyops are supported), or take only the value of the icon field (only the antd library is supported). The configuration { "lib": "antd", "icon": "edit" } is equivalent to "edit"
   * @group basic
   */
  @property()
  rightButtonIcon: MenuIcon | string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 配置左边按钮名称
   * @description.en Configure the name of the left button
   * @group basic
   */
  @property()
  buttonName: string;
  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 是否禁用按钮
   * @description.en Whether to disable the button
   * @group basic
   */
  @property({ type: Boolean })
  disabled: boolean;

  /**
   * @kind "right"| "left"
   * @required false
   * @default `right`
   * @description 选择下拉菜单的选项值出现在左边按钮还是右边按钮，为`left` buttonName不生效
   * @description.en Whether the selected value of the dropdown menu appears on the left button or the right button. When it is `left`, buttonName does not take effect
   * @group basic
   */
  @property({ attribute: false })
  textPlacement: "right" | "left";
  /**
   * @kind string
   * @required false
   * @default -
   * @description 按钮的 tooltip
   * @description.en Tooltip of the button
   * @group basic
   */
  @property()
  tooltip: string;

  /**
   * @kind any
   * @required false
   * @default -
   * @description 选中项的值
   * @description.en Value of the selected item
   */
  @property({ attribute: false }) value: any[];

  /**
   * @detail {value: any; item: any}
   * @description 选项改变事件
   * @description.en Option change event
   */
  @event({ type: "select.change", cancelable: true })
  selectChange: EventEmitter<{ value: any; item: any }>;

  /**
   * @detail {item: any}
   * @description 点击左边按钮发出的事件
   * @description.en Event emitted when the left button is clicked
   */
  @event({ type: "left.button.click", cancelable: true })
  handleClick: EventEmitter<{ item: any }>;

  private _handleChange = (value: any, item: any) => {
    this.value = value;
    this.selectChange.emit({ value, item });
  };
  private _handleClick = (item: any) => {
    this.handleClick.emit(item);
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
          <DropdownButton
            options={this.options}
            leftButtonIcon={this.leftButtonIcon}
            rightButtonIcon={this.rightButtonIcon}
            buttonName={this.buttonName}
            tooltip={this.tooltip}
            disabled={this.disabled}
            onChange={this._handleChange}
            value={this.value}
            textPlacement={this.textPlacement}
            handleClick={this._handleClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.dropdown-button",
  DropdownButtonElement
);
