import React from "react";
import ReactDOM from "react-dom";
import { property, UpdatingElement } from "@next-core/brick-kit";

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
  @property({ type: String })
  flexDirection?: string;

  /**
   * @description 定义[justify-content]:设置主轴上子元素的排列方式
   */
  @property({ type: String })
  justifyContent?: string;

  /**
   * @description 定义[align-items]:设置侧轴上的子元素排列方式（单行）
   */
  @property({ type: String })
  alignItems?: string;

  /**
   * @description 定义[align-content]:设置侧轴上的子元素排列方式（多行）
   */
  @property({ type: String })
  alignContent?: string;

  /**
   * @description 定义[flex-wrap]:设置换行方式
   */
  @property({ type: String })
  flexWrap?: string;

  /**
   * @description 定义[gap]:设置元素间间隙
   */
  @property({ type: String })
  gap?: string;

  /**
   * @description 定义[column-gap]:设置元素列之间间隙
   */
  @property({ type: String })
  columnGap?: string;

  /**
   * @description 定义[row-gap]:设置元素行之间间隙
   */
  @property({ type: String })
  rowGap?: string;

  // Process user's input
  processString(str: string): string {
    return str.split(";")[0];
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
    const _styles = `:host { display: flex; flex-direction: ${this.processString(
      this.flexDirection ?? "row"
    )}; flex-wrap: ${this.processString(
      this.flexWrap ?? "nowrap"
    )}; justify-content: ${this.processString(
      this.justifyContent ?? "flex-start"
    )}; align-items: ${this.processString(
      this.alignItems ?? "stretch"
    )}; align-content: ${this.processString(
      this.alignContent ?? "stretch"
    )}; gap: ${this.processString(
      this.gap ?? "0"
    )}; column-gap: ${this.processString(
      this.columnGap ?? "0"
    )}; row-gap: ${this.processString(this.rowGap ?? "0")}}`;

    if (this.isConnected) {
      ReactDOM.render(
        <>
          <style>{_styles}</style>
          <slot />
        </>,
        this._shadowRoot
      );
    }
  }
}

customElements.define("basic-bricks.flex-layout", FlexLayoutElement);
