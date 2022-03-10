import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { WorkbenchSidebar } from "./WorkbenchSidebar";
import type { WorkbenchPaneElement } from "../workbench-pane";

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

  @property()
  sizeStorageKey: string;

  @property({ type: Number })
  defaultSize: number;

  @property({ type: Number })
  minSize: number;

  @property({ type: Number })
  minSpace: number;

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

  private _reflowPanes = (): void => {
    const slot = this._getPanesSlot();
    const panes = slot.assignedNodes() as WorkbenchPaneElement[];
    for (const pane of panes) {
      if (pane.active) {
        pane.style.flex = "1";
      } else {
        pane.style.flex = "initial";
      }
    }
  };

  private _onPanesSlotChange = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    const panes = slot.assignedNodes();
    for (const pane of panes) {
      // No re-adding listeners.
      pane.addEventListener("active.change", this._reflowPanes);
    }
  };

  private _getPanesSlot(): HTMLSlotElement {
    return this._shadowRoot.querySelector(
      'slot[name="panes"]'
    ) as HTMLSlotElement;
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <>
          <style>{styles}</style>
          <BrickWrapper>
            <WorkbenchSidebar
              titleLabel={this.titleLabel}
              sizeStorageKey={this.sizeStorageKey}
              defaultSize={this.defaultSize}
              minSize={this.minSize}
              minSpace={this.minSpace}
            />
          </BrickWrapper>
        </>,
        this._shadowRoot,
        () => {
          this._reflowPanes();
          const slot = this._getPanesSlot();
          slot.addEventListener("slotchange", this._onPanesSlotChange);
        }
      );
    }
  }
}

customElements.define(
  "next-builder.workbench-sidebar",
  WorkbenchSidebarElement
);
