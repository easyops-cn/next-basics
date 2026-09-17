import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { LogDisplay } from "./LogDisplay";


export interface LogDisplayElementProps {
  value?: string;
  loadingIcon?: boolean;
  hasBackspace?: boolean;
  containerStyle?: React.CSSProperties;
}

/**
 * @id presentational-bricks.log-display
 * @name presentational-bricks.log-display
 * @editor shared-editors.general-code--editor
 * @docKind brick
 * @description 显示日志相关信息
 * @description.en Displays log-related information
 * @author jo
 * @slots
 * @history
 * 1.93.0:新增属性 `hasBackspace`
 * @memo
 * @noInheritDoc
 */
export class LogDisplayElement extends UpdatingElement implements LogDisplayElementProps {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 日志的信息
   * @description.en Log information
   */
  @property()
  value: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否显示信息拉取中的状态图标
   * @description.en Whether to display the status icon while the information is being fetched
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
   * @description.en Whether the information may contain backspace characters; when `true`, backspace characters are handled automatically to match the actual console output
   */
  @property({ type: Boolean }) hasBackspace: boolean;

  /**
   * @kind React.CSSProperties
   * @required false
   * @default -
   * @description 容器的样式
   * @description.en Style of the container
   */
  @property({ attribute: false })
  containerStyle: React.CSSProperties;
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
            containerStyle={this.containerStyle}
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
