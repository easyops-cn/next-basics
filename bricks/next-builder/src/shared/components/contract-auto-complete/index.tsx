import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  property,
  EventEmitter,
} from "@next-core/brick-kit";
import { ContractAutoCompleteLegacyWrapper } from "./ContractAutoComplete";
import { FormItemElement } from "@next-libs/forms";

/**
 * @id next-builder.contract-auto-complete
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `next-builder.contract-auto-complete`
 * @docKind brick
 * @noInheritDoc
 */
export class ContractAutoCompleteElement extends FormItemElement {
  @property()
  value: string;

  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties;

  @event({ type: "contract.change" })
  private _contractChange: EventEmitter<string>;

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

  private _handlerChange = (value: string): void => {
    this.value = value;
    this._contractChange.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <ContractAutoCompleteLegacyWrapper
            formElement={this.getFormElement()}
            onChange={this._handlerChange}
            inputBoxStyle={this.inputBoxStyle}
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
  "next-builder.contract-auto-complete",
  ContractAutoCompleteElement
);
