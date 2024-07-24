import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  EventEmitter,
  event,
  property,
} from "@next-core/brick-kit";
import { ApiRequestLegacyWrapper } from "./ApiRequestFormItem";
import { FormItemElement } from "@next-libs/forms";

export interface ApiRequestValue {
  type: "flowApi" | "http";
  params: {
    useProvider: string;
    args: Record<string, any>;
  };
}

/**
 * @id next-builder.api-request-form-item
 * @author SheRunFeng
 * @history
 * 1.x.0: 新增构件 `next-builder.api-request-form-item`
 * @docKind brick
 * @noInheritDoc
 */
export class ApiRequestFormItemElement extends FormItemElement {
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

  @property({
    attribute: false,
  })
  value: ApiRequestValue;

  @event({
    type: "api.change",
  })
  _apiChangeEvent: EventEmitter<ApiRequestValue>;

  _handlerChange = (value: ApiRequestValue): void => {
    this._apiChangeEvent.emit(value);
  };

  @event({
    type: "type.change",
  })
  _typeChangeEvent: EventEmitter<string>;

  _typeChange = (type: string): void => {
    this._typeChangeEvent.emit(type);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <ApiRequestLegacyWrapper
            formElement={this.getFormElement()}
            onChange={this._handlerChange}
            typeChange={this._typeChange}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            placeholder={this.placeholder}
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
  "next-builder.api-request-form-item",
  ApiRequestFormItemElement
);
