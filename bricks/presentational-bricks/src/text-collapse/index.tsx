import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { TextCollapse } from "./TextCollapse";

/**
 * @id presentational-bricks.text-collapse
 * @author julielai
 * @history
 * @description 展示可折叠文本
 * 1.x.0: 新增构件 `presentational-bricks.text-collapse`
 * @docKind brick
 * @noInheritDoc
 */
export class TextCollapseElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 文本
   */
  @property()
  text: string;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 行数
   */
  @property()
  line: number;

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
          <TextCollapse text={this.text} line={this.line} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.text-collapse",
  TextCollapseElement
);
