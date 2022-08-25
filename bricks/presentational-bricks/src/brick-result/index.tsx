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
/**
 * @id presentational-bricks.brick-result
 * @name presentational-bricks.brick-result
 * @docKind brick
 * @description 结果页面，可配置其状态，标题，次要标题和自定义图标
 * @author ice
 * @slots
 * content: 提供 content 插槽
 * @history
 * 1.54.0:新增状态，`EmptyResultStatus`, 与规范对齐
 * @memo
 * @noInheritDoc
 */

export class BrickResultElement extends UpdatingElement {
  private _mountPoint: HTMLElement;

  /**
   * @required false
   * @description 主标题文字
   * @group basic
   */
  @property()
  customTitle: string;

  /**
   * @required true
   * @default -
   * @description 结果的状态, 决定图标和颜色
   * @group basic
   */
  @property({ attribute: false })
  status: BrickResultStatus | EmptyResultStatus | IllustrationsStatus;

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
   * @description 自定义插画配置，size默认为middle，推荐使用size控制插画尺寸，可通过imageStyle覆盖size实现自定义大小（不推荐）
   * @group other
   */
  @property({ attribute: false })
  illustrationsConfig: IllustrationsConfig = {};

  /**
   * @default true
   * @required false
   * @description 在插画库的default分类下，使用新版本的图标替换default分类下图标
   */
  @property({ attribute: false })
  useNewIllustration = true;

  /**
   * @required false
   * @description status为EmptyResultStatus时，设置插画的尺寸
   * @group basic
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
