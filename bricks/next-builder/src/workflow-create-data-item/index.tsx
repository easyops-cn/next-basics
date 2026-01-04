import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property } from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { WorkflowCreateDataItem } from "./WorkflowCreateDataItem";
import { TypeFieldItem, WorkflowDataItem } from "../interface";

export interface WorkflowCreateDataItemProps {
  value?: any;
  dataList?: WorkflowDataItem[];
  fieldList?: TypeFieldItem[];
}

export interface WorkflowCreateDataItemElementProps {
  value?: any;
  dataList?: WorkflowDataItem[];
  fieldList?: TypeFieldItem[];
}

export class WorkflowCreateDataItemElement extends FormItemElement implements WorkflowCreateDataItemProps {
  @property({
    attribute: false,
  })
  value: any;

  @property({
    attribute: false,
  })
  dataList: WorkflowDataItem[];

  @property({
    attribute: false,
  })
  fieldList: TypeFieldItem[];

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
          <WorkflowCreateDataItem
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
  "next-builder.workflow-create-data-item",
  WorkflowCreateDataItemElement
);
