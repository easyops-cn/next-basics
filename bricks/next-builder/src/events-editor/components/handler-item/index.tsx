import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { HandlerItem } from "./HandlerItem";

/**
 * @id next-builder.handler-item
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `next-builder.handler-item`
 * @docKind brick
 * @noInheritDoc
 */
export class HandlerItemElement extends UpdatingElement {
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
          <HandlerItem />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.handler-item", HandlerItemElement);
