import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { LaunchpadButton } from "../app-bar/LaunchpadButton/LaunchpadButton";

export interface LaunchpadButtonElementProps {
  // No props
}

/**
 * @id nav-legacy.launchpad-button
 * @author SailorF
 * @history
 * 1.x.0: 新增构件 `nav-legacy.launchpad-button`
 * @docKind brick
 * @noInheritDoc
 */
export class LaunchpadButtonElement extends UpdatingElement implements LaunchpadButtonElementProps {
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

customElements.define("nav-legacy.launchpad-button", LaunchpadButtonElement);
