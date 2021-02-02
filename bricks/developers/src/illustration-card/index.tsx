import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { IllustrationCard, IllustrationCardList } from "./IllustrationCard";

/**
 * @id developers.illustration-card
 * @author alexchen
 * @history
 * 1.x.0: 新增构件 `developers.illustration-card`
 * @docKind brick
 * @noInheritDoc
 */
export class IllustrationCardElement extends UpdatingElement {
  @property({ attribute: false })
  dataSource: { name: string; category: string; color: string }[];

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
          <IllustrationCardList illustrations={this.dataSource} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "developers.illustration-card-list",
  IllustrationCardElement
);
