import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import {
  BrickResult,
  BrickResultStatus,
  IllustrationsConfig,
} from "./BrickResult";
import style from "./index.shadow.less";

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
 * ```typescript
 * export enum BrickResultStatus {
 *   Success = "success",
 *   Error = "error",
 *   Info = "info",
 *   Warning = "warning",
 *   E404 = "404",
 *   E403 = "403",
 *   E500 = "500",
 * }
 *
 * export enum EmptyResultStatus {
 *   BrowserTooOld = "browser-too-old",
 *   Empty = "empty",
 *   NoData = "no-data",
 *   NoHistoryVersion = "no-history-version",
 *   NoVisitRecord = "no-visit-record",
 *   SearchEmpty = "search-empty",
 *   WelcomeToCreate = "welcome-to-create",
 * }
 *
 * export type IllustrationsStatus = "illustrations";
 *
 * export interface IllustrationsConfig {
 *   imageStyle?: CSSProperties;
 *   name?: string;
 *   category?: string;
 * }
 *
 * ```
 * @noInheritDoc
 */
export class BrickResultElement extends UpdatingElement {
  private _mountPoint: HTMLElement;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 主标题文字
   */
  @property()
  customTitle: string;

  /**
   * @kind `BrickResultStatus` | `EmptyResultStatus` | `IllustrationsStatus`
   * @required true
   * @default -
   * @description 结果的状态, 决定图标和颜色
   */
  @property({ attribute: false })
  status: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 次标题文字
   */
  @property()
  subTitle: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description [自定义图标](https://ant.design/components/icon-cn/), 仅当 status 为 `BrickResultStatus` 时有效
   */
  @property()
  icon: string;

  /**
   * @kind IllustrationsConfig
   * @required false
   * @default {}
   * @description 自定义插画配置
   */
  @property({ attribute: false })
  illustrationsConfig: IllustrationsConfig = {};

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
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define("presentational-bricks.brick-result", BrickResultElement);
