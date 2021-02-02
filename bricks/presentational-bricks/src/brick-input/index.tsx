import React from "react";
import ReactDOM from "react-dom";
import {
  getHistory,
  UpdatingElement,
  property,
  event,
  EventEmitter,
  BrickWrapper,
} from "@next-core/brick-kit";
import { BrickInput } from "./BrickInput";

/**
 * @id presentational-bricks.brick-input
 * @name presentational-bricks.brick-input
 * @docKind brick
 * @description 输入框，只发起事件不更新url，注意与brick-general-search的区别
 * @author momo
 * @slots
 * @history
 * 1.58.0:新增 `debounceTime`、`value` 属性和 `input.change` 事件
 * @memo
 * @noInheritDoc
 */
export class BrickInputElement extends UpdatingElement {
  /**
   * @detail Record<string,any>
   * @description 事件内容为{q: value}，其中 value 为输入的字符
   */
  @event({ type: "input.emit", cancelable: true }) inputEmit: EventEmitter<
    Record<string, any>
  >;

  /**
   * @detail Record<string,any>
   * @description 当搜索框的值变化时发出的事件，事件内容为{q: value}，其中 value 为输入的字符
   */
  @event({ type: "input.change" }) inputChange: EventEmitter<
    Record<string, any>
  >;

  _defaultValKey: string;
  _defaultValue: string;

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
   * @kind string
   * @required false
   * @default -
   * @description 指定 key，从 url 获取默认值
   */
  set defaultValKey(value: string) {
    this._defaultValKey = value;
    this.handleDefaultVal(value);
  }

  /**
   * @kind string
   * @required false
   * @default -
   * @description 输入提示语
   */
  @property()
  placeholder: string;

  /**
   * @kind "change" | "enter"
   * @required false
   * @default change
   * @description 触发方式，可选`change、enter`
   */
  @property({
    attribute: false,
  })
  trigger: "change" | "enter";

  /**
   * @kind string
   * @required false
   * @default ""
   * @description 搜索框的值
   */
  @property({
    attribute: false,
  })
  value = "";

  /**
   * @kind number
   * @required false
   * @default 500
   * @description 默认延迟时间
   */
  @property({
    attribute: false,
  })
  debounceTime = 500;

  // istanbul ignore next
  handleDefaultVal = (val: string) => {
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);
    this._defaultValue = urlSearchParams.get(val) || "";
    this.value = this._defaultValue;
    this._render();
  };

  // istanbul ignore next
  handleValueNotify = (val: string) => {
    this.inputEmit.emit({
      q: val,
    });
  };

  // istanbul ignore next
  handleValueChange = (val: string) => {
    this.inputChange.emit({
      q: val,
    });
    this.value = val;
    this._render();
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickInput
            trigger={this.trigger}
            defaultValue={this._defaultValue}
            value={this.value}
            handleValueEmit={this.handleValueNotify}
            handleValueChange={this.handleValueChange}
            placeholder={this.placeholder}
            debounceTime={this.debounceTime}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.brick-input", BrickInputElement);
