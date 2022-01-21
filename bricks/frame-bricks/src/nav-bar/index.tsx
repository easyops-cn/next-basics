import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { NavBar } from "./NavBar";
import styles from "./NavBar.shadow.css";

/**
 * @id frame-bricks.nav-bar
 * @author nlicroshan
 * @history
 * 1.x.0: 新增构件 `frame-bricks.nav-bar`
 * @docKind brick
 * @noInheritDoc
 */
export class NavBarElement extends UpdatingElement {
  private _mountPoint: HTMLElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    shadowRoot.appendChild(this._mountPoint);
  }

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
          <NavBar />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define("frame-bricks.nav-bar", NavBarElement);
