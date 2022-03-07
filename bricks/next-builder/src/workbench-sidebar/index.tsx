import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { WorkbenchSidebar } from "./WorkbenchSidebar";
import styles from "./WorkbenchSidebar.shadow.css";
import type { WorkbenchPaneElement } from "../workbench-pane";

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

  private _onPaneActivated = (event: Event): void => {
    const slot = this._getPanesSlot();
    const panes = slot.assignedNodes() as WorkbenchPaneElement[];
    // Make other panes inactive.
    for (const pane of panes) {
      if (pane !== event.target) {
        pane.active = false;
      }
    }
  };

  private _onPanesSlotChange = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    const panes = slot.assignedNodes();
    for (const pane of panes) {
      // No re-adding listeners.
      pane.addEventListener("pane.activated", this._onPaneActivated);
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
            <WorkbenchSidebar titleLabel={this.titleLabel} />
          </BrickWrapper>
        </>,
        this._shadowRoot,
        () => {
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
