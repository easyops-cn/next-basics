import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { AlertConf, WorkbenchPane } from "./WorkbenchPane";

import styles from "./WorkbenchPane.shadow.css";
import sharedStyles from "../shared/scrollbar.shadow.css";

export interface WorkbenchPaneProps {
  titleLabel?: string;
  active?: boolean;
  badge?: number;
  alerts?: AlertConf[];
  onActiveChange?: (event: CustomEvent) => void;
  onActiveFirstactivated?: (event: CustomEvent) => void;
}

export interface WorkbenchPaneElementProps {
  titleLabel?: string;
  active?: boolean;
  badge?: number;
  alerts?: AlertConf[];
  onActiveChange?: (event: CustomEvent<boolean>) => void;
  onActiveFirstactivated?: (event: CustomEvent<any>) => void;
}

/**
 * @id next-builder.workbench-pane
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-pane`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchPaneElement extends UpdatingElement implements WorkbenchPaneProps {
  @property()
  titleLabel: string;

  @property({ type: Boolean })
  active: boolean;

  @property({ type: Number })
  badge: number;

  @property({ attribute: false })
  alerts: AlertConf[];

  @event({ type: "active.change" })
  private _onActiveChangeEvent: EventEmitter<boolean>;

  private _onActiveChange = (active: boolean): void => {
    if (active !== this.active) {
      this.active = active;
      this._onActiveChangeEvent.emit(active);
    }
  };

  @event({ type: "active.firstActivated" })
  private _onFirstActivatedEvent: EventEmitter<void>;

  private _onFirstActivated = (): void => {
    this._onFirstActivatedEvent.emit();
  };

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
          <style>
            {styles}
            {sharedStyles}
          </style>
          <BrickWrapper>
            <WorkbenchPane
              titleLabel={this.titleLabel}
              active={this.active}
              badge={this.badge}
              alerts={this.alerts}
              onActiveChange={this._onActiveChange}
              onFirstActivated={this._onFirstActivated}
            />
          </BrickWrapper>
        </>,
        this._shadowRoot
      );
    }
  }
}

customElements.define("next-builder.workbench-pane", WorkbenchPaneElement);
