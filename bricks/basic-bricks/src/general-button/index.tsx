import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  UpdatingElement,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { isEmpty } from "lodash";
import { GeneralButton } from "./GeneralButton";
import { ButtonProps } from "antd/lib/button";

declare const ButtonTypes: [
  "default",
  "primary",
  "ghost",
  "dashed",
  "link",
  "text",
  "icon"
];
declare type ButtonType = typeof ButtonTypes[number];

export type TooltipPlacement =
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";
export interface TooltipConfig {
  /**
   * 气泡框位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom`
   */
  placement?: TooltipPlacement;
  /**
   * 箭头是否指向目标元素中心
   */
  arrowPointAtCenter?: boolean;
}

/**
 * @id basic-bricks.general-button
 * @name basic-bricks.general-button
 * @docKind brick
 * @description 可发送点击事件、可配置按钮名称、按钮跳转链接等
 * @author jo
 * @slots
 * @history
 * 1.54.0:新增属性 `buttonHref`
 * 1.55.1:使用 `dataSource` 替代 `detail`
 * 1.59.0:新增属性 `disableAfterClick`
 * 1.97.0:新增属性 `fadedText`
 * @memo
 * 注意，因为按钮是有 margin 的，在`type=link` 时候也一样会有，所以在表格里面放置点击链接的时候，请选用[链接](developers/brick-book/brick/presentational-bricks.brick-link)
 *
 * @noInheritDoc
 */
export class GeneralButtonElement extends UpdatingElement {
  /**
   * @kind `string`
   * @required true
   * @default -
   * @description 按钮名称
   */
  @property()
  buttonName: string;

  @property({
    attribute: false,
  })
  buttonProps: ButtonProps & { icon?: string };

  /**
   * @kind `string | MenuIcon`
   * @required false
   * @default -
   * @description 按钮 icon，支持[icon 图标库](developers/icon)，可直接复制图标图标的配置（antd、fa 及 easyops 三种库都支持），也可只取 icon 字段的值（仅支持 antd 库）。配置{ "lib": "antd", "icon": "edit" }与 "edit"等价
   */
  @property({
    attribute: false,
  })
  buttonIcon: any;

  /**
   * @kind `ButtonType` (`"link" | "default" | "primary" | "ghost" | "dashed" | "danger" | "icon"|"text"`)
   * @required false
   * @default -
   * @description 按钮类型
   */
  @property()
  buttonType: ButtonType;

  /**
   * @kind `"circle" | "round"`
   * @required false
   * @default -
   * @description 按钮形状，支持圆形、椭圆形，不设置为默认方形
   */
  @property()
  buttonShape: "circle" | "round";

  /**
   * @kind `"small" | "large"`
   * @required false
   * @default -
   * @description 按钮大小，支持大、小，不设置为默认中
   */
  @property()
  buttonSize: "small" | "large";

  /**
   * @kind `string`
   * @required false
   * @default -
   * @description 点击按钮跳转的 url
   */
  @property()
  buttonUrl: string;

  /**
   * @kind `string`
   * @required false
   * @default -
   * @description 是否使用原生 <a> 标签，通常用于外链的跳转
   */
  @property()
  buttonHref: string;

  /**
   * @kind `boolean`
   * @required false
   * @default `false`
   * @description 淡化按钮文字，按钮类型为 text 时可以设置。默认 `false` 文字按钮颜色和平台的字体颜色一样，在一些希望弱化文字颜色的场景下可以设置为 `true`。
   */
  @property({ type: Boolean })
  fadedText: boolean;

  /**
   * @kind `boolean`
   * @required false
   * @default `false`
   * @description 是否禁用按钮
   */
  @property({ type: Boolean })
  disabled: boolean;

  /**
   * @kind `string`
   * @required false
   * @default -
   * @description 禁用按钮的 tooltip
   */
  @property()
  disabledTooltip: string;

  /**
   * @kind `string`
   * @required false
   * @default -
   * @description 按钮的 tooltip
   */
  @property()
  tooltip: string;

  /**
   * @kind `TooltipConfig`
   * @required false
   * @default -
   * @description tooltip的配置,配置属性见TooltipConfig
   */
  @property({ attribute: false })
  tooltipConfig: TooltipConfig;

  /**
   * @kind `string`
   * @required false
   * @default -
   * @description 跳转的 target，例如可以设置为"\_blank"
   */
  @property()
  target: string;

  /**
   * @kind `any`
   * @required false
   * @default {}
   * @description [已废弃]按钮点击事件传出的内容。当用于列表类构件，例如 `brick-table` 中，可通过传入传入 `detail` 来识别不通的行进行操作处理。
   */
  @property({
    attribute: false,
  })
  detail: Record<string, any> = {};

  /**
   * @kind `any`
   * @required false
   * @default `{}`
   * @description 替代之前 detail 属性，用法相同。暂存的数据在事件传出时使用
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any> = {};

  /**
   * @kind `boolean`
   * @required false
   * @default `false`
   * @description 点击按钮后自动禁用
   */
  @property({ type: Boolean })
  disableAfterClick: boolean;
  /**
   * @detail `any`
   * @description 按钮被点击时触发, detail 为 dataSource 数据
   */
  @event({ type: "general.button.click", cancelable: true })
  buttonClick: EventEmitter<Record<string, any>>;
  private _handleClick = () => {
    // istanbul ignore if
    if (!isEmpty(this.detail)) {
      // eslint-disable-next-line no-console
      console.warn(
        `\`detail\` of <basic-bricks.general-button> is deprecated, use \`dataSource\` instead`
      );
    }
    this.buttonClick.emit(
      !isEmpty(this.dataSource) ? this.dataSource : this.detail
    );
    if (this.disableAfterClick) {
      this.disabled = true;
    }
  };

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    if (this.buttonProps) {
      // eslint-disable-next-line
      console.warn(
        "The property `buttonProps` will be deprecated,replace it with other properties."
      );
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
          <GeneralButton
            buttonName={this.buttonName}
            buttonType={this.buttonType}
            buttonIcon={this.buttonIcon}
            buttonShape={this.buttonShape}
            buttonSize={this.buttonSize}
            buttonProps={this.buttonProps}
            buttonUrl={this.buttonUrl}
            buttonHref={this.buttonHref}
            onClick={this._handleClick}
            disabled={this.disabled}
            disabledTooltip={this.disabledTooltip}
            tooltip={this.tooltip}
            target={this.target}
            tooltipConfig={this.tooltipConfig}
            fadedText={this.fadedText}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.general-button", GeneralButtonElement);
