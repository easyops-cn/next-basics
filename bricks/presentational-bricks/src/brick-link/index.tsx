import React from "react";
import ReactDOM from "react-dom";
import { isNil, get, isEmpty } from "lodash";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { parseTemplate } from "@next-libs/cmdb-utils";
import { BrickLink } from "./BrickLink";
import { MenuIcon } from "@next-core/brick-types";

/**
 * @id presentational-bricks.brick-link
 * @name presentational-bricks.brick-link
 * @docKind brick
 * @description 将值渲染成跳转链接，支持url模板配置
 * @author lynette
 * @slots
 * @history
 * 1.169.0:新增属性`type`
 * 1.89.11:使用 `dataSource` 代替之前 `detail`
 * 1.78.0:新增属性`detail`
 * 1.73.0:新增属性`disabled`,`tooltip`,`notToJumpWhenEmpty`，新增事件`link.click`
 * @groupI8N
 * {
 *  "basic": {"en": "Basic", "zh": "常用"},
 *  "ui": {"en": "UI", "zh": "外观"}
 * }
 * @memo
 * @noInheritDoc
 */
export class BrickLinkElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 链接的文字
   * @group basic
   */
  @property()
  label: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 链接的 URL
   * @group basic
   */
  @property()
  url: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 是否使用原生 <a> 标签，通常用于外链的跳转
   * @group basic
   */
  @property()
  href: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 当将其配置成 `_blank` 时，默认在 label 后添加 external-link-alt icon
   * @group basic
   */
  @property()
  target: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 提示
   * @group basic
   */
  @property()
  tooltip: string;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description `link.click` 事件传出的数据， 替代之前的 `detail`
   * @group basic
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
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁用
   * @group basic
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
   * @group basic
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
   * @kind boolean
   * @required false
   * @default false
   * @description [已废弃]是否使用原生 <a> 标签, 为了跟平台规范一致准备废弃该属性，统一采用 href 属性表示原生标签跳转。
   * @deprecated
   * @group basic
   */
  @property({
    type: Boolean,
  })
  native: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description [已废弃]链接的文字在数据源上的字段
   * @deprecated
   * @group basic
   */
  @property()
  labelField: string;

  /**
   * @kind any
   * @required false
   * @default false
   * @description [已废弃]`link.click`事件的详情
   * @deprecated
   * @group basic
   */
  @property({
    attribute: false,
  })
  detail: any;

  /**
   * @kind string
   * @required false
   * @default -
   * @description [已废弃]链接的 URL 的模板，可使用 #{a.b} 的标记使用数据源里的属性值
   * @deprecated
   * @group basic
   */
  @property()
  urlTemplate: string;

  /**
   * @detail Record<string, any>
   * @description 点击 link 触发的事件，事件 detail 为传入的 dataSource
   */
  @event({ type: "link.click", cancelable: true }) linkClick: EventEmitter<any>;

  connectedCallback(): void {
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  // istanbul ignore next
  private _handleClick = (): void => {
    // istanbul ignore if
    if (!isEmpty(this.detail)) {
      // eslint-disable-next-line no-console
      console.warn(
        `\`detail\` of <presentational-bricks.brick-link> is deprecated, use \`dataSource\` instead`
      );
    }
    this.linkClick.emit(this.dataSource ?? this.detail);
  };

  protected _render(): void {
    if (this.isConnected) {
      const mutableProps = {
        url: this.url,
        label: this.label,
      };
      // istanbul ignore next
      if (isNil(mutableProps.url) && this.dataSource && this.urlTemplate) {
        mutableProps.url = parseTemplate(this.urlTemplate, this.dataSource);
      }
      // istanbul ignore next
      if (isNil(mutableProps.label) && this.dataSource && this.labelField) {
        mutableProps.label = get(this.dataSource, this.labelField);
      }
      ReactDOM.render(
        <BrickWrapper>
          <BrickLink
            native={this.native}
            label={mutableProps.label}
            url={mutableProps.url}
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
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.brick-link", BrickLinkElement);
