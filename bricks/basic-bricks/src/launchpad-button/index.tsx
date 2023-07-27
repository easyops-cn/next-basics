import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { LaunchpadButton } from "./LaunchpadButton";

/**
 * @id basic-bricks.launchpad-button
 * @author SailorF
 * @history
 * 1.x.0: 新增构件 `basic-bricks.launchpad-button`
 * @docKind brick
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
