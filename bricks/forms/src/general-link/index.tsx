import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { GeneralLink } from "./GeneralLink";
import { MenuIcon } from "@next-core/brick-types";

/**
 * @id forms.general-link
 * @name forms.general-link
 * @docKind brick
 * @description 链接
 * @author frankshi
 * @history
 * 1.x.0: 新增构件 `forms.general-link`
 * @excludesInherit
 * placeholder
 * pattern
 */
export class GeneralLinkElement extends FormItemElement {
  /**
   * @group basicFormItem
   * @required true
   * @description 表单项字段名
   */
  @property({ attribute: false }) declare name: string;
  /**
   * @group basicFormItem
   * @required false
   * @description 表单项字段说明
   */
  @property({ attribute: false }) declare label: string;
  /**
   * @group basicFormItem
   * @default false
   * @description 链接的文字
   */
  @property({
    attribute: false,
  })
  value: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 链接的文字
   * @group basicFormItem
   */
  @property()
  text: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 链接的 URL
   * @group basicFormItem
   */
  @property()
  url: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 是否使用原生 <a> 标签，通常用于外链的跳转
   * @group basicFormItem
   */
  @property()
  href: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 当将其配置成 `_blank` 时，默认在 label 后添加 external-link-alt icon
   * @group basicFormItem
   */
  @property()
  target: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 提示
   * @group basicFormItem
   */
  @property()
  tooltip: string;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description `link.click` 事件传出的数据， 替代之前的 `detail`
   * @group basicFormItem
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind string
   * @required false
   * @default -
   * @description label颜色
   * @group ui
   */
  @property()
  labelColor: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 鼠标进入label时显示下划线
   * @group ui
   */
  @property({ type: Boolean })
  underLine: boolean;

  /**
   * @kind MenuIcon
   * @required false
   * @default -
   * @description 图标 [MenuIcon](http://docs.developers.easyops.cn/docs/brick-next/icon)
   * @group ui
   */
  @property({
    attribute: false,
  })
  icon: MenuIcon;

  /**
   * @group basicFormItem
   * @default false
   * @description 是否禁止
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否隐藏target为_blank时label后的icon
   * @group ui
   */
  @property({
    type: Boolean,
  })
  hideExternalIcon: boolean;
  /**
   * @kind boolean
   * @required false
   * @default false
   * @description url 为空时不跳转，但是会发出`link.click`点击事件
   * @group basicFormItem
   */
  @property({
    type: Boolean,
  })
  notToJumpWhenEmpty: boolean;

  /**
   * @default link
   * @required false
   * @description 链接类型：默认链接 - link 和 文本链接 - text
   * @group ui
   */
  @property({
    attribute: false,
  })
  type: "link" | "text" = "link";

  /**
   * @default left
   * @required false
   * @description 链接图标位置：左边 - left 右边 - right
   * @group ui
   */
  @property({
    attribute: false,
  })
  iconAlign: "left" | "right" = "left";

  /**
   * @detail Record<string, any>
   * @description 点击 link 触发的事件，事件 detail 为传入的 dataSource
   */
  @event({ type: "link.click", cancelable: true }) linkClick: EventEmitter<any>;

  // istanbul ignore next
  private _handleClick = (): void => {
    this.linkClick.emit(this.dataSource);
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
          <GeneralLink
            formElement={this.getFormElement()}
            name={this.name}
            value={this.value}
            text={this.text}
            label={this.label}
            url={this.url}
            target={this.target}
            href={this.href}
            handleClick={this._handleClick}
            disabled={this.disabled}
            tooltip={this.tooltip}
            notToJumpWhenEmpty={this.notToJumpWhenEmpty}
            icon={this.icon}
            type={this.type}
            iconAlign={this.iconAlign}
            hideExternalIcon={this.hideExternalIcon}
            underLine={this.underLine}
            labelColor={this.labelColor}
            labelTooltip={this.labelTooltip}
            notRender={this.notRender}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-link", GeneralLinkElement);
