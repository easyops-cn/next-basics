import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { AppBarWrapper } from "./AppBarWrapper";
import styles from "./AppBarWrapper.shadow.css";

/**
 * @id nav-legacy.app-bar-wrapper
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `nav-legacy.app-bar-wrapper`
 * @docKind brick
 * @noInheritDoc
 */
export class AppBarWrapperElement extends UpdatingElement {
  private _shadowRoot: ShadowRoot;

  @property({
    type: Boolean,
  })
  isFixed: boolean;

  @property({
    type: Boolean,
  })
  displayCenter: boolean;

  @property({
    attribute: false,
  })
  extraAppBarContentStyle: React.CSSProperties;

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
            <AppBarWrapper
              isFixed={this.isFixed}
              displayCenter={this.displayCenter}
              extraAppBarContentStyle={this.extraAppBarContentStyle}
            />
          </BrickWrapper>
        </>,
        this._shadowRoot
      );
    }
  }
}

customElements.define("nav-legacy.app-bar-wrapper", AppBarWrapperElement);
