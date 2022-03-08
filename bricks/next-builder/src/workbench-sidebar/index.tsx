import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { WorkbenchSidebar } from "./WorkbenchSidebar";

import styles from "./WorkbenchSidebar.shadow.css";

/**
 * @id next-builder.workbench-sidebar
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-sidebar`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchSidebarElement extends UpdatingElement {
  @property()
  titleLabel: string;

  private _shadowRoot: ShadowRoot;

  constructor() {
    super();

    // ** Create a shadow root to encapsulate styles. **
    // ** Create your shadow root in the constructor. **
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this._shadowRoot);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <>
          <style>{styles}</style>
          <BrickWrapper>
            <WorkbenchSidebar titleLabel={this.titleLabel} />
          </BrickWrapper>
        </>,
        this._shadowRoot
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-sidebar",
  WorkbenchSidebarElement
);
