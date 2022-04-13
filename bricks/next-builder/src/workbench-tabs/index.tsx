import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  type EventEmitter,
  property,
  UpdatingElement,
  event,
} from "@next-core/brick-kit";
import { type WorkbenchTabConf, WorkbenchTabs } from "./WorkbenchTabs";

/**
 * @id next-builder.workbench-tabs
 * @author steve
 * @history
 * 1.137.0: 新增构件 `next-builder.workbench-tabs`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchTabsElement extends UpdatingElement {
  @property({ attribute: false })
  tabs: WorkbenchTabConf[];

  @property({ attribute: false })
  activeTabKey: string | number;

  @event({ type: "tab.close" })
  private _tableCloseEvent: EventEmitter<WorkbenchTabConf>;

  private _handleTabClose = (tab: WorkbenchTabConf): void => {
    this._tableCloseEvent.emit(tab);
  };

  @event({ type: "tab.click" })
  private _tableClickEvent: EventEmitter<WorkbenchTabConf>;

  private _handleTabClick = (tab: WorkbenchTabConf): void => {
    this._tableClickEvent.emit(tab);
  };

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
          <WorkbenchTabs
            tabs={this.tabs}
            activeTabKey={this.activeTabKey}
            onTabClose={this._handleTabClose}
            onTabClick={this._handleTabClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.workbench-tabs", WorkbenchTabsElement);
