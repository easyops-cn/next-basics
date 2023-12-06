import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { LaunchpadButton } from "../app-bar/LaunchpadButton/LaunchpadButton";

/**
 * @id basic-bricks.launchpad-button
 * @author SailorF
 * @history
 * 1.x.0: 新增构件 `basic-bricks.launchpad-button`
 * @deprecated
 * @memo
 *  该构件已迁移至 `nav-legacy` 包中维护，后续版本将不再维护该构件，请使用 `nav-legacy.launchpad-button` 构件
 * @noInheritDoc
 */
export class LaunchpadButtonElement extends UpdatingElement {
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
          <LaunchpadButton />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.launchpad-button", LaunchpadButtonElement);
