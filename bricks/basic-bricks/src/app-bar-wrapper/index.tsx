import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { AppBarWrapper } from "./AppBarWrapper";
import styles from "./AppBarWrapper.shadow.css";

/**
 * @id basic-bricks.app-bar-wrapper
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `basic-bricks.app-bar-wrapper`
 * @docKind brick
 * @noInheritDoc
 */
export class AppBarWrapperElement extends UpdatingElement {
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
    if (this.isConnected) {
      ReactDOM.render(
        <>
          <style>{styles}</style>
          <BrickWrapper>
            <AppBarWrapper />
          </BrickWrapper>
        </>,
        this._shadowRoot
      );
    }
  }
}

customElements.define("basic-bricks.app-bar-wrapper", AppBarWrapperElement);
