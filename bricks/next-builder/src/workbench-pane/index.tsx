import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { WorkbenchPane } from "./WorkbenchPane";
import styles from "./WorkbenchPane.shadow.css";
import sharedStyles from "../shared/scrollbar.shadow.css";

/**
 * @id next-builder.workbench-pane
 * @author steve
 * @history
 * 1.x.0: 新增构件 `next-builder.workbench-pane`
 * @docKind brick
 * @noInheritDoc
 */
export class WorkbenchPaneElement extends UpdatingElement {
  @property()
  titleLabel: string;

  @property({ type: Boolean })
  active: boolean;

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
