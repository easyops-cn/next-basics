import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  method,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { pick, merge } from "lodash";
import { ValidationRule } from "@ant-design/compatible/lib/form";
import { AutoSizeType } from "rc-textarea/lib/ResizableTextArea";

import { SingleFieldEdit } from "./SingleFieldEdit";

export enum ControlType {
  Text = "text",
  Textarea = "textarea",
  Number = "number",
  Radio = "radio",
  Select = "select",
  Checkbox = "checkbox",
}

/**
 * @id presentational-bricks.single-field-edit
 * @name presentational-bricks.single-field-edit
 * @docKind brick
 * @description
 * @author william
 * @slots
 * @history
 * 1.97.0:新增属性 `modalTitle`，废弃属性 `title`
 * @memo
 * @noInheritDoc
 */
export class SingleFieldEditElement extends UpdatingElement {
  /**
   * @detail any
   * @description 点击确定按钮的事件，detail 为当前值
   */
  @event({ type: "single-field-edit.ok", cancelable: true })
  editOk: EventEmitter<any>;

  /**
   * @detail -
   * @description 点击取消按钮的事件
   */
  @event({ type: "single-field-edit.cancel", cancelable: true })
  editCancel: EventEmitter<any>;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 模态框是否可见
   */
  @property({ type: Boolean }) visible: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description [已废弃]请使用 modalTitle 代替
   */
  @property({ __deprecated_and_for_compatibility_only: true }) title: string; // Deprecated
  /**
   * @kind string
   * @required false
   * @default -
   * @description 模态框标题
   */
  @property() modalTitle: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 字段的 label
   */
  @property() label: string;
  /**
   * @kind ControlType
   * @required false
   * @default -
   * @description 输入控件的类型，其他类型待后续扩展
   */
  @property() type: ControlType;
  /**
   * @kind string
   * @required false
   * @default -
   * @description placeholder
   */
  @property() placeholder: string;
  /**
   * @kind any
   * @required false
   * @default -
   * @description 初始值
   */
  @property({ attribute: false }) initialValue: any;
  /**
   * @kind Record<string, any>[]
   * @required false
   * @default -
   * @description 输入控件类型为 radio 和 select 时使用，选项数据
   */
  @property({ attribute: false }) options: Record<string, any>[];
  /**
   * @kind string
   * @required false
   * @default "label"
   * @description 输入控件类型为 radio 和 select 时使用，选项的 label 的 key
   */
  @property() labelKey: string;
  /**
   * @kind string
   * @required false
   * @default "value"
   * @description 输入控件类型为 radio 和 select 时使用，选项的值的 key
   */
  @property() valueKey: string;
  /**
   * @kind ValidationRule[]
   * @required false
   * @default -
   * @description 校验规则，同[校验规则](https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)
   */
  @property({ attribute: false }) rules: ValidationRule[];
  /**
   * @kind boolean | AutoSizeType
   * @required false
   * @default -
   * @description 输入控件类型为 textarea 时使用，详见[Input.TextArea](https://ant.design/components/input-cn/#InputTextArea)
   */
  @property({ attribute: false }) autoSize?: boolean | AutoSizeType;

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

  /**
   * @params CustomEvent
   * @description 打开模态框，支持在事件的 detail 中传递要更新的属性
   */
  @method()
  open(event?: CustomEvent): void {
    if (event && event.detail) {
      const props = pick(event.detail, [
        "visible",
        "title",
        "label",
        "type",
        "placeholder",
        "initialValue",
        "options",
        "labelKey",
        "valueKey",
        "rules",
        "autoSize",
      ]);
      merge(this, props);
    }
    this.visible = true;
  }

  /**
   * @params -
   * @description 关闭模态框
   */
  @method()
  close(): void {
    this.visible = false;
  }

  handleOk = (value?: any) => {
    const defaultAction = this.editOk.emit(value);
    if (defaultAction) {
      this.close();
    }
  };

  handleCancel = () => {
    const defaultAction = this.editCancel.emit();
    if (defaultAction) {
      this.close();
    }
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <SingleFieldEdit
            visible={this.visible}
            title={this.modalTitle || this.title}
            label={this.label}
            type={this.type}
            placeholder={this.placeholder}
            initialValue={this.initialValue}
            options={this.options}
            labelKey={this.labelKey}
            valueKey={this.valueKey}
            rules={this.rules}
            autoSize={this.autoSize}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.single-field-edit",
  SingleFieldEditElement
);
