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
import { ColProps } from "antd/lib/col";
import { FormInstance } from "antd/lib/form";
import { HighlightTokenSettings } from "@next-libs/code-editor-components";
import { LifeCycle } from "../shared/visual-events/interfaces";
import { EventConfigForm, EventConfigFormProps } from "./EventConfigForm";

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
   * @kind string
   * @required false
   * @default -
   * @description provider 列表
   */
  @property({
    attribute: false,
  })
  providerList: string[] = [];

  /**
   * @kind string
   * @required false
   * @default -
   * @description flow api 列表
   */
  @property({
    attribute: false,
  })
  flowApiList: string[] = [];

  @property()
  type: "event" | "lifeCycle";

  @property()
  lifeCycle: LifeCycle;

  @property({
    type: Boolean,
  })
  useInCustomTemplate: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 跳转到文档中心地址
   */
  @property()
  docUrl: string;

  /**
   * @description 高亮标记设置。
   */
  @property({
    attribute: false,
  })
  highlightTokens: HighlightTokenSettings[];

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 路径列表
   */
  @property({
    attribute: false,
  })
  pathList: string[];

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description segue Id列表
   */
  @property({
    attribute: false,
  })
  segueList: EventConfigFormProps["segueList"];

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

  /**
   * @description 当高亮标记被点击时触发。该事件会冒泡。
   * @detail `{ type: string; value: string; }`
   */
  @event({ type: "highlightToken.click", bubbles: true })
  private _highlightTokenClickEvent: EventEmitter<{
    type: string;
    value: string;
  }>;

  private _handleHighlightTokenClick = (token: {
    type: string;
    value: string;
  }): void => {
    this._highlightTokenClickEvent.emit(token);
  };

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
            providerList={this.providerList}
            flowApiList={this.flowApiList}
            type={this.type}
            docUrl={this.docUrl}
            lifeCycle={this.lifeCycle}
            useInCustomTemplate={this.useInCustomTemplate}
            highlightTokens={this.highlightTokens}
            pathList={this.pathList}
            segueList={this.segueList}
            onValuesChange={this._handleValuesChange}
            onClickHighlightToken={this._handleHighlightTokenClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("next-builder.event-config-form", EventConfigFormElement);
