import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { BrickError } from "./BrickError";

/**
 * @id basic-bricks.brick-error
 * @description 用于当构件发生允许单独 crash 的错误时显示的替代构件
 * @author steve
 * @history
 * 1.84.0: 新增构件 `basic-bricks.brick-error`
 * @docKind brick
 * @noInheritDoc
 */
export class BrickErrorElement extends UpdatingElement {
  /**
   * @description 错误类型
   */
  @property()
  errorType: string;

  /**
   * @description 错误信息
   */
  @property()
  errorMessage: string;

  /**
   * @description 发生错误的构件名称
   */
  @property()
  brickName: string;

  /**
   * @description 发生错误的是否是老模板
   */
  @property({
    type: Boolean,
  })
  isLegacyTemplate: boolean;

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
          <BrickError
            errorType={this.errorType}
            errorMessage={this.errorMessage}
            brickName={this.brickName}
            isLegacyTemplate={this.isLegacyTemplate}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.brick-error", BrickErrorElement);
