import React from "react";
import ReactDOM from "react-dom";
import { isEqual } from "lodash";
import { UpdatingElement, property, method } from "@next-core/brick-kit";
import { MenuIcon } from "@next-core/brick-types";
import update from "immutability-helper";
import { ButtonType, ButtonShape, ButtonSize } from "antd/lib/button";
import { TooltipPlacement } from "antd/lib/tooltip";
import { GeneralCustomButtons } from "./GeneralCustomButtons";

export interface CustomButton {
  /**
   * 是否收纳成下拉框
   */
  isDropdown?: boolean;
  /**
   * 菜单项分割线，只用在弹出菜单内
   */
  isDivider?: boolean;
  /**
   * 按钮名
   */
  text: string;
  /**
   * 按钮 icon，支持[icon图标库](/next/developers/icon)，可直接复制图标图标的配置（antd、fa 及 easyops 三种库都支持），也可只取 icon 字段的值（仅支持 antd 库）。配置{ "lib": "antd", "icon": "edit" }与 "edit"等价
   */
  icon?: MenuIcon | string;
  /**
   * 按钮点击事件名
   */
  eventName: string;
  /**
   * 按钮字体颜色
   */
  color?: string;
  /**
   * 按钮 ID, updateButton 时使用
   */
  id?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否隐藏
   */
  hide?: boolean;
  /**
   * 样式类型
   */
  buttonType?: ButtonType | "icon";
  /**
   * 形状类型
   */
  buttonShape?: ButtonShape;
  /**
   * 点击跳转的地址，一般站内链接使用此属性
   */
  buttonUrl?: string;
  /**
   * 点击跳转的地址，一般站外链接使用此属性
   */
  buttonHref?: string;
  /**
   * 按钮大小
   */
  buttonSize?: ButtonSize;
  /**
   * 相当于 a 链接的 target 属性，buttonUrl 或 buttonHref 存在时生效
   */
  urlTarget?: string;
  /**
   * 	按钮简单的文字提示气泡框
   */
  tooltip?: string;
  /**
   * 	禁用按钮的 tooltip
   */
  disabledTooltip?: string;
  /**
   * tooltip 位置
   */
  tooltipPlacement?: TooltipPlacement;
  /**
   * 设置按钮载入状态
   */
  loading?: boolean;
  /**
   * 用于测试时定位的 ID
   */
  testId?: string;
  /**
   * 是否显示为危险样式
   */
  danger?: boolean;
}
export type DropdownPlacement =
  | "bottomRight"
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter";
/**
 * @id basic-bricks.general-custom-buttons
 * @name basic-bricks.general-custom-buttons
 * @docKind brick
 * @description 可配置收纳起来的更多按钮，可配置不同事件
 * @groupI18N
 * {
 *   "moreButton": {
 *     "en": "MoreButton",
 *     "zh": "更多按钮"
 *   },
 *   "dropdownButton": {
 *     "en": "DropdownButton",
 *     "zh": "含下拉选框的按钮"
 *   }
 * }
 * @author ice
 * @slots
 * @history
 * 1.72.0:新增属性 `loading`
 * 1.59.0:新增属性 `disableAfterClick`
 * 1.48.0:按钮新增 `hide` 属性
 * 1.45.0:新增 `dropdownPlacement` 属性, 按钮新增 `isDivider` 属性
 * 1.40.0:按钮新增 `buttonHref`, `tooltip`, `tooltipPlacement` 属性
 * 1.35.0:新增 `alignment` 属性
 * 1.30.0:按钮新增 `buttonSize`, `buttonUrl`, `urlTarget` 属性
 * 1.29.0:按钮新增 `buttonType`, `buttonShape` 属性
 * 1.28.0:新增 `updateButton` 方法，按钮新增 `id`, `disabled` 属性
 * @memo
 * @noInheritDoc
 */
export class GeneralCustomButtonsElement extends UpdatingElement {
  /**
   * @kind CustomButton[]
   * @description 自定义按钮组
   * @group basic
   */
  @property({ attribute: false })
  customButtons: CustomButton[];

  /**
   * @default "center"
   * @description 对齐方式
   * @group basic
   */
  @property()
  alignment?: "start" | "center" | "end" | "stretch";

  /**
   * @description 按钮事件的 detail
   * @group basic
   */
  @property({ attribute: false }) dataSource?: any;

  /**
   * @description 点击按钮后自动禁用
   * @group basic
   */
  @property({ type: Boolean })
  disableAfterClick?: boolean;

  /**
   * @default false
   * @description 按钮组中 isDropdown 为 true 的按钮收纳成 dropdown。isMoreButton 为 true 时更多按钮显示纯icon样式，为 false 时显示icon+文字样式。
   * @group moreButton
   */
  @property({
    type: Boolean,
  })
  isMoreButton?: boolean;

  /**
   * @description isMoreButton 为 true 时更多按钮的图标，默认为`...`
   * @group moreButton
   */
  @property({ attribute: false }) moreBtnIcon?: MenuIcon | string;

  /**
   * @description 更多按钮的类型
   * @group moreButton
   */
  @property()
  moreButtonType?: ButtonType;

  /**
   * @description isMoreButton 为 true 时更多按钮的样式，通常使用 icon 类型
   * @group moreButton
   */
  @property() moreButtonShape?: "circle" | "no" | "rectangle" | "icon";

  /**
   * @default "管理"
   * @description isMoreButton 为 false 时，按钮组中 isDropdown 为 true 的按钮收纳成 dropdown，收纳起来的按钮文字
   * @group dropdownButton
   */
  @property() dropdownBtnText?: string;

  /**
   * @description dropdown按钮的类型
   * @group dropdownButton
   */
  @property({ attribute: false })
  dropdownBtnType?: "default" | "link" = "default";

  /**
   * @description isMoreButton 为 false 时，按钮组中 isDropdown 为 true 的按钮收纳成 dropdown，收纳起来的按钮 icon，支持[icon 图标库](/next/developers/icon)，可直接复制图标图标的配置（antd、fa 及 easyops 三种库都支持），也可只取 icon 字段的值（仅支持 antd 库）。配置{ "lib": "antd", "icon": "edit" }与 "edit"等价
   * @group dropdownButton
   */
  @property({ attribute: false }) dropdownBtnIcon?: MenuIcon | string =
    "setting";

  /**
   * @default "bottomRight"
   * @description dropdown 的弹出位置
   * @group dropdownButton
   */
  @property()
  dropdownPlacement?: DropdownPlacement;

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick(eventName: string, button: CustomButton): void {
    this.dispatchEvent(new CustomEvent(eventName, { detail: this.dataSource }));

    if (this.disableAfterClick) {
      this.customButtons = update(this.customButtons, {
        [this.customButtons.indexOf(button)]: {
          disabled: { $set: true },
        },
      });
    }
  }

  connectedCallback(): void {
    this._render();
  }

  /**
   * @description 更新按钮
   */
  @method() updateButton(id: string, btn: Partial<CustomButton>) {
    const customButton = this.customButtons.find((btn) => btn.id === id);
    if (customButton && btn) {
      const keys = Object.keys(btn);
      for (const key of keys) {
        if (
          !isEqual(
            customButton[key as keyof CustomButton],
            btn[key as keyof CustomButton]
          )
        ) {
          Object.assign(customButton, btn);
          this.customButtons = [...this.customButtons];
          break;
        }
      }
    }
  }

  protected _render() {
    this.style.display = "block";
    // istanbul ignore else
    if (this.isConnected && this.customButtons) {
      ReactDOM.render(
        <GeneralCustomButtons
          buttons={this.customButtons}
          handleClick={this.handleClick}
          dropdownBtnText={this.dropdownBtnText}
          dropdownBtnIcon={this.dropdownBtnIcon}
          isMoreButton={this.isMoreButton}
          moreBtnIcon={this.moreBtnIcon}
          moreButtonShape={this.moreButtonShape}
          moreButtonType={this.moreButtonType}
          alignment={this.alignment}
          dropdownPlacement={this.dropdownPlacement}
          dropdownBtnType={this.dropdownBtnType}
        />,
        this
      );
    }
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }
}

customElements.define(
  "basic-bricks.general-custom-buttons",
  GeneralCustomButtonsElement
);
