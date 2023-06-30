import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property } from "@next-core/brick-kit";
import {
  WorkflowConditionItem,
  ComparatorOption,
} from "./WorkflowConditionItem";
import { FormItemElement } from "@next-libs/forms";
import { TypeFieldItem, WorkflowDataItem } from "../interface";

export class WorkflowConditionItemElement extends FormItemElement {
  @property({
    attribute: false,
  })
  fieldList: TypeFieldItem[];

  @property({
    attribute: false,
  })
  dataList: WorkflowDataItem[];

  @property({
    attribute: false,
  })
  logicTypeList: ComparatorOption[];

  @property({
    attribute: false,
  })
  comparatorList: ComparatorOption[];

  @property({
    attribute: false,
  })
  value: any;

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
          <WorkflowConditionItem
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
            logicTypeList={this.logicTypeList}
            comparatorList={this.comparatorList}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "next-builder.workflow-condition-item",
  WorkflowConditionItemElement
);
