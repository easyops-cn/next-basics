import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { InputWithUnit } from "./InputWithUnit";
import { UnitType } from "./libs/constants";

/**
 * @id forms.input-with-unit
 * @name forms.input-with-unit
 * @docKind brick
 * @description 根据单位输出值
 * @author ice
 * @slots
 * @history
 * 1.43.0:新增构件 `forms.input-with-unit`
 * 1.55.0:新增属性，`precision`, `availableUnits`
 * @excludesInherit
 *  placeholder
 *  pattern
 * @memo
 *
 *```typescript
 * const timeUnits = ["ms", "s", "min", "hour", "day", "week"];
 * const byteUnits = ["b", "B", "KB", "MB", "GB"];
 * const byteRateUnits = ["bps", "Bps", "KBps", "MBps", "GBps"];
 * ```
 */
export class InputWithUnitElement extends FormItemElement {
  /* =========================== Group: basic =========================== */

  /**
   * @group basic
   * @required true
   * @description 下拉框字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @group basic
   * @required false
   * @description 初始值
   */
  @property({ type: Number })
  value: number;

  /**
   * @group basic
   * @required false
   * @description 占位说明
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @group basic
   * @required true
   * @description 单位类型，目前支持 "time" | "byte" | "byteRate"
   * @editor radio
   * @editorProps {
   *   "optionType": "button",
   *   "options": [
   *     {
   *       "label": "Time",
   *       "value": "time"
   *     },
   *     {
   *       "label": "Byte",
   *       "value": "byte"
   *     },
   *     {
   *       "label": "ByteRate",
   *       "value": "byteRate"
   *     }
   *   ]
   * }
   */
  @property()
  unitType: UnitType;

  /**
   * @group basic
   * @required true
   * @description 使用单位
   */
  @property()
  unit: string;

  /* =========================== Group: formLabel =========================== */

  /**
   * @group formLabel
   * @required false
   * @description 字段说明
   */
  @property({ attribute: false }) declare label: string;

  /* =========================== Group: formValidation =========================== */

  /**
   * @group formValidation
   * @required false
   * @description 是否必填项
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @group formValidation
   * @default Number.MIN_SAFE_INTEGER
   * @required false
   * @description 输入数字的最小值
   */
  @property({ type: Number })
  inputNumberMin: number;

  /* =========================== Group: advanced =========================== */

  /**
   * @required false
   * @default 0
   * @description 单位转换精确度；如果为 0，仅当整除时才转换
   * @group advanced
   */
  @property({ type: Number })
  precision: number;

  /**
   * @group advanced
   * @default true
   * @required false
   * @description 默认开启整数整除自动转换
   */
  @property({ attribute: false })
  useAutoCalculate = true;

  /**
   * @group advanced
   * @required false
   * @description 可使用单位列表
   */
  @property({ attribute: false })
  availableUnits: string[];

  /* =========================== Group: style =========================== */

  /**
   * @group style
   * @required false
   * @description 输入框样式
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties;

  /* =========================== events =========================== */

  /**
   * @detail `number`
   * @description 输入框或单位变化时触发，`event.detail` 为当前值
   */
  @event({ type: "general.input-with-unit.change" })
  changeEvent: EventEmitter<number>;

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

  private handleChange = (value: number): void => {
    this.changeEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <InputWithUnit
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            required={this.required}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            placeholder={this.placeholder}
            value={this.value}
            precision={this.precision}
            unit={this.unit}
            unitType={this.unitType}
            availableUnits={this.availableUnits}
            onChange={this.handleChange}
            inputBoxStyle={this.inputBoxStyle}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            useAutoCalculate={this.useAutoCalculate}
            inputNumberMin={this.inputNumberMin}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.input-with-unit", InputWithUnitElement);
