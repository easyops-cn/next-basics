import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";
import { SearchTree } from "./SearchTree";

/**
 * @id next-builder.search-tree
 * @author SailorF
 * @history
 * 1.x.0: 新增构件 `next-builder.search-tree`
 * @docKind brick
 * @noInheritDoc
 */
export class SearchTreeElement extends UpdatingElement {
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
          <SearchTree />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.search-tree", SearchTreeElement);
