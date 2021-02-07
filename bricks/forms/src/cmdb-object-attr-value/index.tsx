import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { CmdbObjectAttrValue, ValueType } from "./CmdbObjectAttrValue";
import { FormItemElement } from "@next-libs/forms";
import { ValidationRule } from "@ant-design/compatible/lib/form";
import { isNil } from "lodash";

/**
* @id forms.cmdb-object-attr-value
* @name forms.cmdb-object-attr-value
* @docKind brick
* @description cmdb模型添加属性值，输出值类型
* @author dophi
* @slots
* @history
* 1.83.0:新增构件 `forms.cmdb-object-attr-value`
* @memo
* > type valueType =
  * | "str"
  * | "int"
  * | "date"
  * | "datetime"
  * | "enum"
  * | "arr"
  * | "struct"
  * | "structs"
  * | "ip"
  * | "bool"
  * | "float";

* @noInheritDoc
*/
export class CmdbObjectAttrValueElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 表单项字段名
   */
  @property({ attribute: false }) name: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项字段说明
   */
  @property({ attribute: false }) label: string;
  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 值类型初始值
   */
  @property({
    attribute: false,
  })
  value: string[];
  /**
   * @kind `ValueType[]`
   * @required false
   * @default['str','int','date','datetime','enum','arr','struct','structs','ip','bool','float']
   * @description 模型属性值可选择的值类型
   */
  @property({
    attribute: false,
  })
  valueType: ValueType[];
  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否必填项
   */
  @property({ type: Boolean }) required: boolean;
  /**
   * @kind `object`
   * @required false
   * @default -
   * @description 输入框样式
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties = {};

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
  /**
   * @detail `Object`
   * @description 值类型表单项改变时触发
   */
  @event({ type: "forms.cmdb-object-attr-value.change" })
  changeEvent: EventEmitter<Record<string, any>>;
  handleChange = (value: any): void => {
    this.value = value;
    this.changeEvent.emit(value);
  };

  hasValue = (value: any) => !isNil(value) && value.default !== "";

  hasValueWithRegex = (value: any) =>
    this.hasValue(value) && !isNil(value.regex);

  defaultValueNotMatchRegex = (
    rule: any,
    value: any,
    callback: (params?: any) => void
  ): void => {
    try {
      if (
        (this.hasValueWithRegex(value) &&
          value.type === "str" &&
          value.default_type === "value") ||
        (this.hasValueWithRegex(value) && ["int", "float"].includes(value.type))
      ) {
        if (!new RegExp(value.regex, "ig").test(value.default)) {
          throw new Error(rule.message);
        }
      }
      if (this.hasValueWithRegex(value) && value.type === "arr") {
        value.default.forEach((arrValue) => {
          if (!new RegExp(value.regex, "ig").test(arrValue)) {
            throw new Error(rule.message);
          }
        });
      }

      if (this.hasValue(value) && value.type === "ip") {
        if (
          !/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/gi.test(
            value.default
          )
        ) {
          throw new Error(rule.message);
        }
      }
      callback();
    } catch (err) {
      callback(err);
    }
  };

  floatMaxLengthNotMatch = (
    rule: any,
    value: any,
    callback: (params?: any) => void
  ): void => {
    try {
      if (this.hasValue(value) && value.type === "float") {
        if (
          /*eslint-disable no-useless-escape*/
          !/^[\-|0-9]+(\.[0-9]{1,4})?$/gi.test(value.default)
        ) {
          /*eslint-enable no-useless-escape*/

          throw new Error(rule.message);
        }
      }
      callback();
    } catch (err) {
      callback(err);
    }
  };

  strSeriesNumberLengthRequired = (
    rule: any,
    value: any,
    callback: (params?: any) => void
  ): void => {
    try {
      if (
        !isNil(value) &&
        value.type === "str" &&
        value.default_type === "series-number"
      ) {
        if (!value.series_number_length && this.required) {
          throw new Error(rule.message);
        }
      }
      callback();
    } catch (err) {
      callback(err);
    }
  };

  private _builtInvalidator: Pick<ValidationRule, "validator" | "message">[] = [
    {
      message: "默认值与正则不符",
      validator: this.defaultValueNotMatchRegex,
    },
    {
      message: "请输入流水号长度",
      validator: this.strSeriesNumberLengthRequired,
    },
    {
      message: "小数点后最多可输入四位",
      validator: this.floatMaxLengthNotMatch,
    },
  ];

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <CmdbObjectAttrValue
            value={this.value}
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            onChange={this.handleChange}
            valueType={this.valueType}
            placeholder={this.placeholder}
            required={this.required}
            message={this.message}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            validator={
              this.validator
                ? this._builtInvalidator.concat(this.validator)
                : this._builtInvalidator
            }
            inputBoxStyle={this.inputBoxStyle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "forms.cmdb-object-attr-value",
  CmdbObjectAttrValueElement
);
