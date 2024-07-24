import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  property,
  EventEmitter,
} from "@next-core/brick-kit";
import { APIProxyRequestLegacyWrapper } from "./APIProxyRequest";
import { FormItemElement } from "@next-libs/forms";

export interface APIProxyRequestValue {
  useProvider: string;
  args: Record<string, any>;
}

/**
 * @id next-builder.api-proxy-request
 * @author sailorshe
 * @history
 * 1.x.0: 新增构件 `next-builder.api-proxy-request`
 * @docKind brick
 * @noInheritDoc
 */
export class ContractAutoCompleteElement extends FormItemElement {
  @property({
    attribute: false,
  })
  value: APIProxyRequestValue;

  @event({ type: "api.change" })
  private _apiChange: EventEmitter<APIProxyRequestValue>;

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

  private _handlerChange = (value: APIProxyRequestValue): void => {
    this.value = value;
    this._render();
    Promise.resolve().then(() => {
      this._apiChange.emit(value);
    });
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <APIProxyRequestLegacyWrapper
            formElement={this.getFormElement()}
            onChange={this._handlerChange}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            notRender={this.notRender}
            value={this.value}
            required={this.required}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.api-proxy-request",
  ContractAutoCompleteElement
);
