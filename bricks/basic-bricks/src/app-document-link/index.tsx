import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { AppDocumentLink } from "./AppDocumentLink";

/**
 * @id basic-bricks.app-bar-document-link
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `basic-bricks.app-bar-document-link`
 * @docKind brick
 * @noInheritDoc
 */
export class AppBarDocumentLinkElement extends UpdatingElement {
  @property({
    attribute: false,
  })
  iconStyle: React.CSSProperties;

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
          <AppDocumentLink iconStyle={this.iconStyle} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "basic-bricks.app-document-link",
  AppBarDocumentLinkElement
);
