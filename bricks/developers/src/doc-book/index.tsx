import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper } from "@next-core/brick-kit";
import { DocBook } from "./DocBook";

const ATTR_DOC_ID = "doc-id";

class DocBookElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return [ATTR_DOC_ID];
  }

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

  attributeChangedCallback(): void {
    this._render();
  }

  private _render(): void {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <DocBook docId={this.docId} />
        </BrickWrapper>,
        this
      );
    }
  }

  set docId(value: string) {
    const newValue = String(value);
    if (newValue !== this.docId) {
      this.setAttribute(ATTR_DOC_ID, newValue);
    }
  }

  get docId(): string {
    return this.getAttribute(ATTR_DOC_ID);
  }
}

customElements.define("developers.doc-book", DocBookElement);
