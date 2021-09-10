import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  method,
  EventEmitter,
} from "@next-core/brick-kit";
import { EventConfigForm } from "./EventConfigForm";
import { ColProps } from "antd/lib/col";
import { FormInstance } from "antd/lib/form";

/**
 * @id next-builder.event-config-form
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `next-builder.event-config-form`
 * @docKind brick
 * @noInheritDoc
 */
export class EventConfigFormElement extends UpdatingElement {
  private _formUtils = React.createRef<Partial<FormInstance>>();

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  /**
   * @property
   * @kind ColProps
   * @required false
   * @default -
   * @description 表单项 label 标签布局
   */
  @property({
    attribute: false,
  })
  labelCol: ColProps;

  /**
   * @property
   * @kind ColProps
   * @required false
   * @default -
   * @description 表单项控件布局
   */
  @property({
    attribute: false,
  })
  wrapperCol: ColProps;

  /**
   * @description 表单验证成功时触发
   */
  @event({ type: "validate.success" }) successEvent: EventEmitter<
    Record<string, unknown>
  >;

  /**
   * @description 表单验证错误时触发
   */
  @event({ type: "validate.error" }) errorEvent: EventEmitter<
    Record<string, unknown>
  >;

  /**
   * @description 表单字段值更新时触发
   */
  @event({ type: "values.change" }) valuesChangeEvent: EventEmitter<
    Record<string, unknown>
  >;

  /**
   *
   * @description 触发表单校验
   */
  @method()
  async validate(): Promise<void> {
    try {
      const values = await this._formUtils.current.validateFields();
      this.successEvent.emit(values);
    } catch (errInfo) {
      this.errorEvent.emit(errInfo);
    }
  }

  /**
   *
   * @description 设置表单值
   */
  @method()
  setFieldsValue(value: unknown): void {
    this._formUtils.current.setFieldsValue(value);
  }

  /**
   *
   * @param string[]
   * @description 重置表单项
   */
  @method()
  resetFields(names: string[]): void {
    this._formUtils.current.resetFields(names);
  }

  private _handleValuesChange = (
    changedValues: unknown,
    allValues: unknown
  ): void => {
    this.valuesChangeEvent.emit({
      changedValues,
      allValues,
    });
  };

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <EventConfigForm
            ref={this._formUtils}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            onValuesChange={this._handleValuesChange}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.event-config-form", EventConfigFormElement);
