import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BrickResult } from "./BrickResult";
import style from "./index.shadow.less";
import {
  BrickResultStatus,
  EmptyResultStatus,
  IllustrationsStatus,
  IllustrationsConfig,
} from "../interfaces/brick-result";
import { IconSize } from "./components/IllustrationWrapper";

export interface BrickResultElementProps {
  status?: BrickResultStatus | EmptyResultStatus | IllustrationsStatus;
  customTitle?: string;
  subTitle?: string;
  icon?: string;
  illustrationsConfig?: IllustrationsConfig;
  emptyResultSize?: IconSize;
}

/**
 * @id presentational-bricks.brick-result
 * @name presentational-bricks.brick-result
 * @docKind brick
 * @description 结果页面，支持三种状态类型：基础结果状态（success/error/info/warning/404/403/500）、空结果状态（empty/no-data/search-empty 等）和自定义插画状态（illustrations），可配置主标题、次标题、自定义图标及插画
 * @author ice
 * @slots
 * content: 提供 content 插槽，用于在结果页面下方放置自定义内容（如操作按钮、链接等）
 * @history
 * 1.54.0:新增状态，`EmptyResultStatus`, 与规范对齐
 * @memo
 * @noInheritDoc
 */

export class BrickResultElement
  extends UpdatingElement
  implements BrickResultElementProps
{
  private _mountPoint: HTMLElement;

  /**
   * @required true
   * @default -
   * @description 结果的状态，决定图标和颜色。支持三类值：BrickResultStatus（success/error/info/warning/404/403/500）显示 Ant Design 内置结果图标；EmptyResultStatus（empty/no-data/search-empty 等）显示空状态插画；设为 "illustrations" 时使用 illustrationsConfig 配置自定义插画。设置的值不符合任何类型时返回空元素
   * @group basic
   */
  @property({ type: String })
  status: BrickResultStatus | EmptyResultStatus | IllustrationsStatus;

  /**
   * @required false
   * @description 主标题文字
   * @group basic
   */
  @property()
  customTitle: string;

  /**
   * @required false
   * @description 次标题文字
   * @group basic
   */
  @property()
  subTitle: string;

  /**
   * @required false
   * @default -
   * @description [自定义图标](https://ant.design/components/icon-cn/), 仅当 status 为 `BrickResultStatus` 时有效
   * @group ui
   */
  @property()
  icon: string;

  /**
   * @required false
   * @default {}
   * @description 自定义插画配置，仅当 status 为 "illustrations" 时生效。可通过 name 和 category 指定插画库图片，size 控制尺寸（默认 middle），imageStyle 覆盖样式（不推荐）
   * @group other
   */
  @property({ attribute: false })
  illustrationsConfig: IllustrationsConfig = {};

  /**
   * @default true
   * @required false
   * @description 是否使用新版插画替换插画库 default 分类下的图标，需配合特性开关 support-new-illustrations 及应用配置 supportNewIllustrations 启用
   * @group other
   */
  @property({ attribute: false })
  useNewIllustration = true;

  /**
   * @required false
   * @description 空结果插画的尺寸，仅当 status 为 EmptyResultStatus 类型时生效，可选值：small/middle/large/xlarge/unset，默认 middle
   * @group other
   */
  @property()
  emptyResultSize: IconSize;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    shadowRoot.appendChild(this._mountPoint);
  }

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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickResult
            title={this.customTitle}
            status={this.status as BrickResultStatus}
            subTitle={this.subTitle}
            icon={this.icon}
            illustrationsConfig={this.illustrationsConfig}
            useNewIllustration={this.useNewIllustration}
            emptyResultSize={this.emptyResultSize}
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define("presentational-bricks.brick-result", BrickResultElement);
