import React, { createRef } from "react";
import ReactDOM from "react-dom";
import { FormInstance } from "antd";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";

import {
  MultipleFilesForm,
  FileField,
  UploadFormData,
  ProcessedUploadFormData,
} from "./MultipleFilesForm";

/**
 * @id flow-builder.multiple-files-form
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `flow-builder.multiple-files-form`
 * @docKind brick
 * @noInheritDoc
 */
export class MultipleFilesFormElement extends UpdatingElement {
  private _form = createRef<FormInstance>();
  @property({
    attribute: false,
  })
  fieldList: FileField[];

  @event({ type: "validate.success" }) successEvent: EventEmitter<
    Record<string, any>
  >;

  @event({ type: "validate.error" }) errorEvent: EventEmitter<
    Record<string, any>
  >;
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

  @method()
  validate(): void {
    this._form.current.submit();
  }

  private handleFinish = (data: ProcessedUploadFormData): void => {
    const formData = new FormData();
    this.successEvent.emit({ data, formData });
  };

  private handleError = (data: UploadFormData): void => {
    this.errorEvent.emit(data);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <MultipleFilesForm
            ref={this._form}
            fieldList={this.fieldList}
            onFinish={this.handleFinish}
            onFinishFailed={this.handleError}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "flow-builder.multiple-files-form",
  MultipleFilesFormElement
);
