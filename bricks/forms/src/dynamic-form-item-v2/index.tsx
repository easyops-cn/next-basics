import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { DynamicFormItemV2 } from "./DynamicFormItemV2";
import { FormItemElement } from "@next-libs/forms";
import { Column } from "../interfaces";

/**
 * @id forms.dynamic-form-item-v2
 * @name forms.dynamic-form-item-v2
 * @author nlicroshan
 * @history
 * 1.x.0: 新增构件 `forms.dynamic-form-item-v2`
 * @excludesInherit
 *  placeholder
 *  pattern
 * @docKind brick
 */
export class DynamicFormItemV2Element extends FormItemElement {
  /**
   * @kind Record<string, any>[]
   * @required false
   * @default -
   * @description 动态表单项的初始值
   * @group basic
   */
  @property({
    attribute: false,
  })
  value: Record<string, any>[];

  /**
   * @kind Column[]
   * @required true
   * @default -
   * @description 每一列表单项的配置
   * @group basic
   */
  @property({
    attribute: false,
  })
  columns: Column[];

  /**
   * @kind boolean | ((row: Record<string, any>, index: number) => boolean)
   * @required false
   * @default -
   * @description 是否隐藏每一行删除的按钮
   * @group basic
   */
  @property({
    attribute: false,
  })
  hideRemoveButton:
    | boolean
    | ((row: Record<string, any>, index: number) => boolean);

  /**
   * @kind boolean | ((row: Record<string, any>, index: number) => boolean)
   * @required false
   * @default -
   * @description 是否禁止每一行删除的按钮
   * @group basic
   */
  @property({
    attribute: false,
  })
  disabledRemoveButton:
    | boolean
    | ((row: Record<string, any>, index: number) => boolean);

  /**
   * @kind boolean | ((value: Record<string, any>[]) => boolean)
   * @required false
   * @default -
   * @description 是否隐藏添加的按钮
   * @group basic
   */
  @property({
    attribute: false,
  })
  hideAddButton: boolean | ((value: Record<string, any>[]) => boolean);

  /**
   * @kind boolean | ((value: Record<string, any>[]) => boolean)
   * @required false
   * @default -
   * @description 是否禁止添加的按钮
   * @group basic
   */
  @property({
    attribute: false,
  })
  disabledAddButton: boolean | ((value: Record<string, any>[]) => boolean);

  /**
   * @detail Record<string, any>[]
   * @description 表单项值改变时触发
   */
  @event({ type: "item.change" }) changeEvent: EventEmitter;
  private _handleChange = (detail: Record<string, any>[]): void => {
    this.changeEvent.emit(detail);
  };

  /**
   * @detail value: { detail: Record<string, any>, index: number }
   * @description 增加一行时触发，detail为该行的默认值，index为该行的位置
   */
  @event({ type: "row.add" }) addEvent: EventEmitter;
  private _handleAdd = (value: {
    detail: Record<string, any>;
    index: number;
  }): void => {
    this.addEvent.emit(value);
  };

  /**
   * @detail value: { detail: Record<string, any>, index: number }
   * @description 移除一行时触发，detail为该行的值，index为该行的位置
   */
  @event({ type: "row.remove" }) removeEvent: EventEmitter;
  private _handleRemove = (value: {
    detail: Record<string, any>;
    index: number;
  }): void => {
    this.removeEvent.emit(value);
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
          <DynamicFormItemV2
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            value={this.value}
            required={this.required}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            columns={this.columns}
            onChange={this._handleChange}
            onAdd={this._handleAdd}
            onRemove={this._handleRemove}
            hideRemoveButton={this.hideRemoveButton}
            disabledRemoveButton={this.disabledRemoveButton}
            hideAddButton={this.hideAddButton}
            disabledAddButton={this.disabledAddButton}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.dynamic-form-item-v2", DynamicFormItemV2Element);
