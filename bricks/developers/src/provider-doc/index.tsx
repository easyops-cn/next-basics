import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { ProviderDoc } from "./ProviderDoc";
import { ProcessedProviderDoc } from "../provider-provider-doc/interfaces";

class ProviderDocElement extends UpdatingElement {
  @property({
    attribute: false,
  })
  dataSource: ProcessedProviderDoc;

  @property({
    attribute: false,
  })
  showCard = true;

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
          <ProviderDoc docData={this.dataSource} showCard={this.showCard} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("developers.provider-doc", ProviderDocElement);
