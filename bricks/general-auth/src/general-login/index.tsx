import React from "react";
import ReactDOM from "react-dom";
import { GeneralLogin, LoginEvent } from "./GeneralLogin";
import { loginByLegacy } from "./loginByLegacy";

class GeneralLoginElement extends HTMLElement {
  private _handleLogin = (e: LoginEvent): void => {
    this.dispatchEvent(
      new CustomEvent("login.success", {
        detail: e.redirect
      })
    );
  };

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

  private _render(forceRender = false): void {
    if (this.isConnected) {
      if (loginByLegacy()) {
        return;
      }

      ReactDOM.render(
        <GeneralLogin
          onLogin={this._handleLogin}
          key={forceRender ? String(Math.random()) : undefined}
        />,
        this
      );
    }
  }

  reset(): void {
    this._render(true);
  }
}

customElements.define("general-auth.general-login", GeneralLoginElement);
