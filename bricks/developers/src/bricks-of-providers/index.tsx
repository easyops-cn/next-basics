import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BricksOfProviders, ServiceData } from "./BricksOfProviders";

class BricksOfProvidersElement extends UpdatingElement {
  @property({
    attribute: false
  })
  dataSource: ServiceData;

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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BricksOfProviders serviceData={this.dataSource} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "developers.bricks-of-providers",
  BricksOfProvidersElement
);
