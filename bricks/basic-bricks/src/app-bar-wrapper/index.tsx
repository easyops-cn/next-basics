import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { AppBarWrapper } from "./AppBarWrapper";
import styles from "./AppBarWrapper.shadow.css";

/**
 * @id basic-bricks.app-bar-wrapper
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `basic-bricks.app-bar-wrapper`
 * @docKind brick
 * @deprecated
 * @memo
 *  该构件已迁移至 `nav-legacy` 包中维护，后续版本将不再维护该构件，请使用 `nav-legacy.app-bar-wrapper` 构件
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

customElements.define("basic-bricks.app-bar-wrapper", AppBarWrapperElement);
