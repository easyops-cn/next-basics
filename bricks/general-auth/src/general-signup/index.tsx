import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { GeneralSignup } from "./GeneralSignup";

/**
 * @id general-auth.general-signup
 * @author qimengwu
 * @history
 * 1.x.0: 新增构件 `general-auth.general-signup`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralSignupElement extends UpdatingElement {
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
          <GeneralSignup />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("general-auth.general-signup", GeneralSignupElement);
