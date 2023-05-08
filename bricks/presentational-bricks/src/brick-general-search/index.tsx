import React from "react";
import ReactDOM from "react-dom";
import { BrickGeneralSearch } from "./BrickGeneralSearch";
import {
  getHistory,
  UpdatingElement,
  property,
  event,
  EventEmitter,
  BrickWrapper,
} from "@next-core/brick-kit";
import { forEach } from "lodash";
import { Input } from "antd";

export type Size = "small" | "default" | "large" | "extraLarge";
export type Shape = "round" | "default";

/**
 * @id presentational-bricks.brick-general-search
 * @name presentational-bricks.brick-general-search
 * @editor shared-editors.general-search--editor
 * @docKind brick
 * @description 搜索框，满足大部分的搜索需求
 * @author lynette
 * @slots
 * @history
 * 1.180.0:新增事件 `query.change.v2`,新增属性 `debounceTime`
 * 1.68.0:新增属性 `qField`
 * @memo
 * @noInheritDoc
 */
export class BrickGeneralSearchElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 提示语
   * @group basic
   */
  @property()
  placeholder: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 输入的搜索关键字，常用于回填搜索框，如\${query.q}
   * @group basic
   */
  @property({
    attribute: false,
  })
  q = "";

  /**
   * @kind {field: string;value: any;}[]
   * @required false
   * @default -
   * @description 进行搜索的时候需重置的其他默认参数，如[{"field": "page", "value": 1}]即表示搜索的时候需要把页码重置成 1
   * @group basic
   */
  @property({
    attribute: false,
  })
  defaultArgs: { field: string; value: any }[];

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否更新 url 参数
   * @group advanced
   */
  @property({
    attribute: false,
  })
  shouldUpdateUrlParams = true;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否对输入框剔除前后空格
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  shouldTrimQuery: boolean;

  /**
   * @kind string
   * @required false
   * @default "q"
   * @description 当 `shouldUpdateUrlParams` 为真时，将以该值为 key 更新到 url 上
   * @group advanced
   */
  @property()
  qField: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁用自动聚焦
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  disableAutofocus: boolean;

  /**
   * @kind "all"|"ip"
   * @required false
   * @default 'all'
   * @description 搜索类型
   * @group advanced
   */
  @property({
    attribute: false,
  })
  searchType: "all" | "ip" = "all";

  /**
   * @kind boolean
   * @required false
   * @description 是否支持ip搜索
   * @group basic
   */
  @property({ type: Boolean })
  searchTypeEnabled: boolean;

  /**
   * @kind number
   * @required false
   * @default 0
   * @description 默认延迟时间
   * @group advanced
   */
  @property({
    attribute: false,
  })
  debounceTime = 0;

  /**
   * @kind Size
   * @required false
   * @default default
   * @description 尺寸大小，可选`default、small、large、extraLarge`
   * @enums "small"|"default"|"large"|"extraLarge"
   * @group ui
   */
  @property({
    attribute: false,
  })
  size: Size = "default";

  /**
   * @kind Shape
   * @required false
   * @default default
   * @description 形状，可选`default、round`
   * @enums "round"|"default";
   * @group ui
   */
  @property({
    attribute: false,
  })
  shape: Shape = "default";

  /**
   * @kind Record<string,any>
   * @required false
   * @default -
   * @description 输入框样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  inputStyle: Record<string, any>;

  /**
   * @kind Record<string,any>
   * @required false
   * @default -
   * @description 按钮样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  buttonStyle: Record<string, any>;

  /**
   * @kind "defalut"|"radio"
   * @required "defalut"
   * @default true
   * @description 按类型搜索框样式
   * @enums "defalut"|"radio"
   * @group ui
   */
  @property({
    attribute: false,
  })
  searchBoxStyleType: "defalut" | "round" = "defalut";

  /**
   * @description 可以点击清除图标删除内容
   * @group ui
   */
  @property({
    type: Boolean,
  })
  allowClear?: boolean;

  /**
   * @kind string
   * @required false
   * @default query
   * @deprecated
   * @description [已废弃]filter.update 中 detail 的字段名
   */
  @property({
    attribute: false,
  })
  field = "query";

  /**
   * @detail Record<string,any>
   * @description 更新的数据，包括 defaultArgs 和输入框的组合，注意在事件中 q 的 field 为 query。点击搜索时触发
   */
  @event({ type: "filter.update", bubbles: true }) filterUpdate: EventEmitter<
    Record<string, any>
  >;

  /**
   * @detail string
   * @description 输入的搜索字符，输入变化时触发
   */
  @event({ type: "query.change", bubbles: true })
  queryChange: EventEmitter<string>;

  /**
   * @detail {q:string}
   * @description 当搜索框的值变化时发出的事件，事件内容为{q: value}，其中 value 为输入的字符。可直接和 brick-table 的前端搜索方法 filterSourceData 搭配使用。
   */
  @event({ type: "query.change.v2", bubbles: true })
  queryChangeV2: EventEmitter<{ q: string }>;

  /**
   * @detail string
   * @description 搜索类型变化时触发
   */
  @event({ type: "search.type.change", bubbles: true })
  searchTypeChange: EventEmitter<string>;

  /**
   * @detail string
   * @description 失焦时触发, 而且会传出当前输入框当前值
   */
  @event({ type: "input.blur" }) blurEvent: EventEmitter<string>;

  private _handleBlur = (value: string): void => {
    this.blurEvent.emit(value);
  };

  inputRef: Input;

  focus(): void {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  blur(): void {
    if (this.inputRef) {
      this.inputRef.blur();
    }
  }

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

  // istanbul ignore next
  private _handleUpdate = (value: string): void => {
    value = this.shouldTrimQuery ? value.trim() : value;
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);
    const detail = {
      [this.field]: value,
    };
    if (this.defaultArgs) {
      forEach(this.defaultArgs, (item) => {
        detail[`${item.field}`] = item.value;
        if (this.shouldUpdateUrlParams) {
          urlSearchParams.set(item.field, item.value);
        }
      });
    }
    this.filterUpdate.emit(detail);
    if (this.shouldUpdateUrlParams) {
      urlSearchParams.set(this.qField ?? "q", value);
      history.push(`?${urlSearchParams}`);
    }
  };

  private _handleOnChange = (value: string): void => {
    this.queryChange.emit(value);
    this.queryChangeV2.emit({ q: value });
    this.q = value;
  };
  private _handleSearchTypeChange = (value: string): void => {
    this.searchTypeChange.emit(value);
  };
  protected _render(): void {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <BrickGeneralSearch
            onUpdate={this._handleUpdate}
            onChange={this._handleOnChange}
            query={this.q}
            size={this.size}
            placeholder={this.placeholder}
            shape={this.shape}
            inputStyle={this.inputStyle}
            buttonStyle={this.buttonStyle}
            debounceTime={this.debounceTime}
            disableAutofocus={this.disableAutofocus}
            allowClear={this.allowClear}
            ref={(ref) => {
              this.inputRef = ref;
            }}
            searchTypeEnabled={this.searchTypeEnabled}
            searchType={this.searchType}
            onSearchTypeChange={this._handleSearchTypeChange}
            searchBoxStyleType={this.searchBoxStyleType}
            onBlur={this._handleBlur}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-general-search",
  BrickGeneralSearchElement
);
