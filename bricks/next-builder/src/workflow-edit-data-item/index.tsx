import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property } from "@next-core/brick-kit";
import { WorkflowEditDataItem } from "./WorkflowEditDataItem";
import { FormItemElement } from "@next-libs/forms";
import { TypeFieldItem, WorkflowDataItem } from "../interface";

export class WorkflowEditDataItemElement extends FormItemElement {
  @property({
    attribute: false,
  })
  value: any;

  @property({
    attribute: false,
  })
  fieldList: TypeFieldItem[];

  @property({
    attribute: false,
  })
  dataList: WorkflowDataItem[];

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
          <WorkflowEditDataItem
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            value={this.value}
            required={this.required}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            fieldList={this.fieldList}
            dataList={this.dataList}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workflow-edit-data-item",
  WorkflowEditDataItemElement
);
