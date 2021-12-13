import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { ProviderDoc } from "./ProviderDoc";
import { ProcessedProviderDoc } from "../provider-provider-doc/interfaces";

class ProviderDocElement extends UpdatingElement {
  @property({
    attribute: false,
  })
  dataSource: ProcessedProviderDoc;

  @property({
    attribute: false,
  })
  showCard = true;

  @property({
    attribute: false,
  })
  debuggerPanelExpand = false;

  @event({ type: "debugger.expand.change" })
  debuggerExpandChangeEvent: EventEmitter;

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

  private handlerDebuggerExpand = (flag: boolean): void => {
    this.debuggerExpandChangeEvent.emit(flag);
    this.debuggerPanelExpand = flag;
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <ProviderDoc
            docData={this.dataSource}
            showCard={this.showCard}
            debuggerPanelExpand={this.debuggerPanelExpand}
            onDebuggerExpand={this.handlerDebuggerExpand}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("developers.provider-doc", ProviderDocElement);
