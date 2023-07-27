import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
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
  /**
   * @kind string
   * @required true
   * @default -
   * @description 立即登录跳转的url
   */
  @property()
  loginUrl: string;
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
          <GeneralSignup loginUrl={this.loginUrl} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("general-auth.general-signup", GeneralSignupElement);
