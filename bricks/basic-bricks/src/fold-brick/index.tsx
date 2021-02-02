import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { FoldBrick } from "./FoldBrick";
import { UseBrickConf } from "@next-core/brick-types";

/**
 * @id basic-bricks.fold-brick
 * @name basic-bricks.fold-brick
 * @docKind brick
 * @description 已废弃，请使用basic-bricks.fold-brick-v2
 * @author momo
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class FoldBrickElement extends UpdatingElement {
  @property({
    attribute: false,
  })
  useBrick: UseBrickConf;

  @property({
    attribute: false,
  })
  foldName: string;

  @property({
    attribute: false,
  })
  foldStyle: Record<string, string>;

  @property({
    attribute: false,
  })
  defaultShow?: boolean;

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
          <FoldBrick
            foldName={this.foldName}
            foldStyle={this.foldStyle}
            defaultShow={this.defaultShow}
            useBrick={this.useBrick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.fold-brick", FoldBrickElement);
