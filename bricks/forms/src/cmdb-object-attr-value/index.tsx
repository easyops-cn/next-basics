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
import { NS_FORMS, K } from "../i18n/constants";
import i18n from "i18next";
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

*/
export class CmdbObjectAttrValueElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 表单项字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项字段说明
   */
  @property({ attribute: false }) declare label: string;

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
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否禁用
   */
  @property({
    type: Boolean,
  })
  disabled: boolean;

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

  hasValue = (value: any) =>
    !isNil(value) && value.default !== "" && !isNil(value.default);

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
          !new RegExp(
            "((^\\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\\s*$)|(^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$))",
            "ig"
          ).test(value.default)
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

  strSeriesNumberAndAutoIncrementIDValidator = (
    rule: any,
    value: any,
    callback: (params?: any) => void
  ): void => {
    try {
      if (!isNil(value) && value.type === "str") {
        // 流水号校验
        if (value.default_type === "series-number") {
          if (!value.series_number_length) {
            throw new Error(
              i18n.t(
                `${NS_FORMS}:${K.PLEASE_ENTER_THE_LENGTH_OF_THE_SERIAL_NUMBER}`
              )
            );
          }
          if (
            value.start_value?.toString().length > value.series_number_length
          ) {
            throw new Error(
              i18n.t(`${NS_FORMS}:${K.PLEASE_ENTER_A_LEGAL_STARTING_VALUE}`)
            );
          }
          if (
            value.prefix !== "" &&
            !isNil(value.prefix) &&
            !/^[-\w]{0,11}$/u.test(value.prefix)
          ) {
            throw new Error(
              i18n.t(`${NS_FORMS}:${K.PLEASE_ENTER_A_LEGAL_PREFIX}`)
            );
          }
        }
        // 自增id校验
        if (value.default_type === "auto-increment-id") {
          if (
            value.prefix !== "" &&
            !isNil(value.prefix) &&
            !/^[-\w]{0,11}$/u.test(value.prefix)
          ) {
            throw new Error(
              i18n.t(`${NS_FORMS}:${K.PLEASE_ENTER_A_LEGAL_PREFIX}`)
            );
          }
        }
      }
      callback();
    } catch (err) {
      callback(err);
    }
  };

  private _builtInvalidator: Pick<ValidationRule, "validator" | "message">[] = [
    {
      message: i18n.t(`${NS_FORMS}:${K.DEFAULT_DIFFERENT_REGULAR}`),
      validator: this.defaultValueNotMatchRegex,
    },
    {
      validator: this.strSeriesNumberAndAutoIncrementIDValidator,
    },
    // {
    //   message: i18n.t(`${NS_FORMS}:${K.FLOAT_LIMIT}`),
    //   validator: this.floatMaxLengthNotMatch,
    // },
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
            disabled={this.disabled}
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
