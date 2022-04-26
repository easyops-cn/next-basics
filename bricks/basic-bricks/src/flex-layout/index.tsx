import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  method,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";

/**
 * @id basic-bricks.flex-layout
 * @author kehua
 * @history
 * 1.x.0: 新增构件 `basic-bricks.flex-layout`
 * @docKind brick
 * @noInheritDoc
 */

export class FlexLayoutElement extends UpdatingElement {
  /**
   * @description 定义[flex-direction]:设置主轴方向
   */
  @property({ attribute: false })
  flexDirection = "row";

  /**
   * @description 定义[justify-content]:设置主轴上子元素的排列方式
   */
  @property({ attribute: false })
  justifyContent = "flex-start";

  /**
   * @description 定义[align-items]:设置侧轴上的子元素排列方式（单行）
   */
  @property({ attribute: false })
  alignItems = "stretch";

  /**
   * @description 定义[align-content]:设置侧轴上的子元素排列方式（多行）
   */
  @property({ attribute: false })
  alignContent = "stretch";

  /**
   * @description 定义[flex-wrap]:设置换行方式
   */
  @property({ attribute: false })
  flexWrap = "nowrap";

  @method()
  escapeHTML(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  private _shadowRoot: ShadowRoot;

  constructor() {
    super();

    // ** Create a shadow root to encapsulate styles. **
    // ** Create your shadow root in the constructor. **
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this._shadowRoot);
  }

  protected _render(): void {
    // istanbul ignore else
    const _styles = `:host { display: flex; flex-direction: ${this.escapeHTML(
      this.flexDirection
    )}; flex-wrap: ${this.escapeHTML(
      this.flexWrap
    )}; justify-content: ${this.escapeHTML(
      this.justifyContent
    )}; align-items: ${this.escapeHTML(
      this.alignItems
    )}; align-content: ${this.escapeHTML(this.alignContent)}}`;
    if (this.isConnected) {
      ReactDOM.render(
        <>
          <style>{_styles}</style>
          <BrickWrapper>
            <slot name="content" />
          </BrickWrapper>
        </>,
        this._shadowRoot
      );
    }
  }
}

customElements.define("basic-bricks.flex-layout", FlexLayoutElement);
