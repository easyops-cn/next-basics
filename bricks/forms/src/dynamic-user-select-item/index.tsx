import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property } from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { RowProps } from "../dynamic-common-item/DynamicCommonItem";
import { DynamicUserSelectItem } from "./DynamicUserSelectItem";

export const columns = [
  {
    name: "dstObjectId",
    selectProps: {
      allowClear: true,
      placeholder: "关联资源",
      showSearch: true,
      optionFilterProp: "children",
      dropdownMatchSelectWidth: false,
      filterOption: (input, option) =>
        (option.props.children as string)
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0,
    },
    rules: [
      {
        required: true,
        message: "请选择关联资源",
      },
    ],
  },
  {
    name: "reverseQueryKey",
    selectProps: {
      allowClear: true,
      placeholder: "关系路径",
      showSearch: true,
      dropdownMatchSelectWidth: false,
      optionFilterProp: "children",
      filterOption: (input, option) =>
        (option.props.children as string)
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0,
    },
    rules: [
      {
        required: true,
        message: "请选择关系路径",
      },
    ],
  },
  {
    name: "receiverFields",
    rules: [
      {
        required: true,
        message: "请选择负责人",
      },
    ],
    selectProps: {
      placeholder: "负责人",
      mode: "multiple",
      allowClear: true,
      dropdownMatchSelectWidth: false,
      optionFilterProp: "children",
      filterOption: (input, option) =>
        (option.props.children as string)
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0,
    },
  },
];

/**
 * @id forms.dynamic-user-select-item
 * @name forms.dynamic-user-select-item
 * @docKind brick
 * @description
 * @author
 * @slots
 * @history
 * 1.x.0:新增构件 `forms.dynamic-user-select-item`
 * @memo
 */
export class DynamicUserSelectItemElement extends FormItemElement {
  private manualEditedValue: any[];

  @property({
    attribute: false,
  })
  value: any;

  @property({
    type: Boolean,
  })
  disabledAddButton: boolean;

  @property({
    type: Boolean,
  })
  disabledDeleteButton: boolean;

  @property({
    type: String,
  })
  srcObjectId: string;

  clearAll = () => {
    this.manualEditedValue = [];
    this._render();
  };
  private _handleAdd = () => {
    this.dispatchEvent(new CustomEvent("item.add"));
  };

  private _handleRemove = (data: RowProps) => {
    this.dispatchEvent(
      new CustomEvent("item.remove", {
        detail: data,
      })
    );
  };

  private _handleChange = (data: RowProps[]) => {
    this.dispatchEvent(
      new CustomEvent("item.change", {
        detail: data,
      })
    );
  };

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
          <DynamicUserSelectItem
            asyncForceRerender={true}
            formElement={this.getFormElement()}
            name={this.name}
            srcObjectId={this.srcObjectId}
            label={this.label}
            labelTooltip={this.labelTooltip}
            value={this.value}
            required={this.required}
            message={this.message}
            columns={columns}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            notRender={this.notRender}
            onAdd={this._handleAdd}
            onRemove={this._handleRemove}
            onChange={this._handleChange}
            disabledAddButton={this.disabledAddButton}
            disabledDeleteButton={this.disabledDeleteButton}
            manualEditedValue={this.manualEditedValue}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "forms.dynamic-user-select-item",
  DynamicUserSelectItemElement
);
