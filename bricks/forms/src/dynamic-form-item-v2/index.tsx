import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import {
  DynamicFormItemV2,
  upperDynamicFormItemV2Ref,
} from "./DynamicFormItemV2";
import { FormItemElement, GeneralComplexOption } from "@next-libs/forms";
import { Column, SelectProps } from "../interfaces";
import lodash from "lodash";

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
   * @description 动态表单项的初始值
   * @group basicFormItem
   */
  @property({
    attribute: false,
  })
  value?: Record<string, any>[];

  /**
   * @description 每一列表单项的配置
   * @group basicFormItem
   */
  @property({
    attribute: false,
  })
  columns: Column[];

  /**
   * @kind boolean | ((row: Record<string, any>, index: number) => boolean)
   * @description 是否隐藏每一行删除的按钮
   * @group ui
   */
  @property({
    attribute: false,
  })
  hideRemoveButton?:
    | boolean
    | ((row: Record<string, any>, index: number) => boolean);

  /**
   * @kind boolean | ((row: Record<string, any>, index: number) => boolean)
   * @description 是否禁止每一行删除的按钮
   * @group ui
   */
  @property({
    attribute: false,
  })
  disabledRemoveButton?:
    | boolean
    | ((row: Record<string, any>, index: number) => boolean);

  /**
   * @kind boolean | ((value: Record<string, any>[]) => boolean)
   * @description 是否隐藏添加的按钮
   * @group ui
   */
  @property({
    attribute: false,
  })
  hideAddButton?: boolean | ((value: Record<string, any>[]) => boolean);

  /**
   * @kind boolean | ((value: Record<string, any>[]) => boolean)
   * @description 是否禁止添加的按钮
   * @group ui
   */
  @property({
    attribute: false,
  })
  disabledAddButton?: boolean | ((value: Record<string, any>[]) => boolean);

  /**
   * @description 动态表单样式
   * @group ui
   */
  @property({ attribute: false })
  dynamicFormStyle?: React.CSSProperties;

  /**
   * @description 表单项值改变时触发
   */
  @event({ type: "item.change" }) changeEvent: EventEmitter<
    Record<string, any>[]
  >;
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

  /**
   * @detail value: { rowIndex: number, name: string }
   * @description input类型表单项失焦时触发，返回所在行rowIndex，以及该输入框的name
   */
  @event({ type: "input.blur" }) inputBlurEvent: EventEmitter;
  private _handleInputBlur = (value: {
    rowIndex: number;
    name: string;
    value: string;
  }): void => {
    this.inputBlurEvent.emit(value);
  };

  private upperRef = React.createRef<upperDynamicFormItemV2Ref>();

  /**
   *
   * @description 当select表单项配置的props.options为二维数组时,用于更新指定的options; 若传入的options为null,则表示删除该options; 若传入的rowIndex为'all',则表示全覆盖更新
   */
  @method()
  updateOptions(args: {
    rowIndex: number | number[] | "all";
    name: string;
    options: SelectProps["options"];
  }): void {
    const { rowIndex, name, options } = args;
    const { columns, setColumns } = this.upperRef.current;
    const cloneOptions =
      (
        lodash.cloneDeep(columns).find((item) => item.name === name)
          ?.props as SelectProps
      )?.options || [];
    if (
      Array.isArray(rowIndex) &&
      (options as GeneralComplexOption<string | number>[]).every(
        (i) => Array.isArray(i) || i === null
      )
    ) {
      // 批量覆盖
      options.map((item, index) => {
        if (item !== null) {
          cloneOptions[rowIndex[index]] = item;
        } else {
          cloneOptions.splice(rowIndex[index], 1);
        }
      });
    } else if (
      typeof rowIndex === "number" &&
      (options === null ||
        (Array.isArray(options) &&
          !options.some((i) => Array.isArray(i) || i === null)))
    ) {
      // 单次覆盖
      if (options !== null) {
        cloneOptions[rowIndex] = options as GeneralComplexOption<
          string | number
        >[];
      } else {
        cloneOptions.splice(rowIndex, 1);
      }
    }
    setColumns(
      columns.map((item) =>
        item.name === name
          ? {
              ...item,
              props: {
                ...item.props,
                options: rowIndex === "all" ? options : cloneOptions,
              },
            }
          : item
      ) as Column[]
    );
  }

  /**
   * @description 是否显示导入导出按钮
   * @group ui
   * @default false
   */
  @property({ type: Boolean })
  showImportExport?: boolean;

  /**
   * @description 表单项的列数，设置后，表单项会以 grid 布局显示
   * @group ui
   */
  @property({ type: Number })
  gridColumns?: number;

  /**
   * @description 导入数据时触发
   */
  @event({ type: "import" }) importEvent: EventEmitter<Record<string, any>[]>;
  private _handleImport = (detail: Record<string, any>[]): void => {
    this.importEvent.emit(detail);
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
            labelColor={this.labelColor}
            labelBold={this.labelBold}
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
            onInputBlur={this._handleInputBlur}
            hideRemoveButton={this.hideRemoveButton}
            disabledRemoveButton={this.disabledRemoveButton}
            hideAddButton={this.hideAddButton}
            disabledAddButton={this.disabledAddButton}
            upperRef={this.upperRef}
            dynamicFormStyle={this.dynamicFormStyle}
            showImportExport={this.showImportExport}
            onImport={this._handleImport}
            gridColumns={this.gridColumns}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.dynamic-form-item-v2", DynamicFormItemV2Element);
