import React from "react";
import ReactDOM from "react-dom";

import { BrickWrapper } from "@next-core/brick-kit";

import { BrickCollectionInstanceExecution } from "./BrickCollectionInstanceExecution";

class BrickCollectionInstanceExecutionElement extends HTMLElement {
  private _ids: string[] = [];

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

  private _handleClick = () => {
    this.dispatchEvent(
      new CustomEvent("collection-instance-execution.click", {
        detail: {
          collectionInstanceIds: this._ids
        }
      })
    );
  };

  updateSelectedCollectionInstances(event: CustomEvent) {
    this._ids = event.detail;
    this._render();
  }

  private _render(): void {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickCollectionInstanceExecution
            ids={this._ids}
            onClick={this._handleClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-collection-instance-execution",
  BrickCollectionInstanceExecutionElement
);
