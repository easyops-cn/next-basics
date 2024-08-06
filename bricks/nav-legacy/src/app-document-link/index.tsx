import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { AppDocumentLink } from "./AppDocumentLink";

/**
 * @id nav-legacy.app-bar-document-link
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `nav-legacy.app-bar-document-link`
 * @docKind brick
 * @noInheritDoc
 */
export class AppBarDocumentLinkElement extends UpdatingElement {
  @property({
    attribute: false,
  })
  iconStyle: React.CSSProperties;
  /**
   * @default false
   * @required false
   * @description 是否在导航栏中显示，为true时显示为nav类型的通用按钮（高度为24px,圆角3px,hover颜色为灰色））
   */
  @property({
    type: Boolean,
  })
  isInNavbar: boolean;

  @property({
    attribute: false,
  })
  showHover = true;

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
          <AppDocumentLink
            iconStyle={this.iconStyle}
            isInNavbar={this.isInNavbar}
            showHover={this.showHover}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "nav-legacy.app-document-link",
  AppBarDocumentLinkElement
);
