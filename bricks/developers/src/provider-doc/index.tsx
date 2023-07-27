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
  /**
   * @kind ProcessedProviderDoc
   * @required true
   * @default -
   * @description 文档的数据源
   */
  @property({
    attribute: false,
  })
  dataSource: ProcessedProviderDoc;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示外层卡片
   */
  @property({
    attribute: false,
  })
  showCard = true;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否展开调试所对应的面板
   */
  @property({
    attribute: false,
  })
  debuggerPanelExpand = false;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 文档构件的 key，默认无需填写，当 dockey 变化时，构件下的相应组件会重新渲染
   */
  @property()
  docKey: string;

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
            docKey={this.docKey}
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
