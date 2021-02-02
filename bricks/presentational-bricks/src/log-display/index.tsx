import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { LogDisplay } from "./LogDisplay";

/**
 * @id presentational-bricks.log-display
 * @name presentational-bricks.log-display
 * @docKind brick
 * @description 显示日志相关信息
 * @author jo
 * @slots
 * @history
 * 1.93.0:新增属性 `hasBackspace`
 * @memo
 * @noInheritDoc
 */
export class LogDisplayElement extends UpdatingElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 日志的信息
   */
  @property()
  value: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否显示信息拉取中的状态图标
   */
  @property({
    type: Boolean,
  })
  loadingIcon: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 信息是否可能包含退格键，为 `true` 时自动处理退格键，以符合控制台的实际输出
   */
  @property({ type: Boolean }) hasBackspace: boolean;

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
          <LogDisplay
            value={this.value}
            loadingIcon={this.loadingIcon}
            hasBackspace={this.hasBackspace}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.log-display", LogDisplayElement);
