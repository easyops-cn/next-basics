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

export interface WorkbenchTabsProps {
  tabs?: WorkbenchTabConf[];
  activeTabKey?: string | number;
  historyBlocked?: boolean;
  closeDisabled?: boolean;
  onTabClose?: (event: CustomEvent) => void;
  onTabClick?: (event: CustomEvent) => void;
}

export interface WorkbenchTabsElementProps {
  tabs?: WorkbenchTabConf[];
  activeTabKey?: string | number;
  historyBlocked?: boolean;
  closeDisabled?: boolean;
  onTabClose?: (event: CustomEvent<WorkbenchTabConf>) => void;
  onTabClick?: (event: CustomEvent<WorkbenchTabConf>) => void;
}

/**
 * @id next-builder.workbench-tabs
 * @author steve
 * @history
 * 1.137.0: 新增构件 `next-builder.workbench-tabs`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchTabsElement extends UpdatingElement implements WorkbenchTabsProps {
  @property({ attribute: false })
  tabs: WorkbenchTabConf[];

  @property({ attribute: false })
  activeTabKey: string | number;

  @property({ type: Boolean })
  historyBlocked: boolean;

  @property({ type: Boolean })
  closeDisabled: boolean;

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
            historyBlocked={this.historyBlocked}
            closeDisabled={this.closeDisabled}
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
