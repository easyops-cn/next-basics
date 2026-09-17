import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { UseSingleBrickConf } from "@next-core/brick-types";

import {
  GeneralStructsFormItemV2,
  RowOperationConfig,
} from "./GeneralStructsFormItemV2";
export interface GeneralStructsFormItemV2ElementProps {
  name?: string;
  label?: string;
  btnText?: string;
  value?: any;
  structDefaultValues?: any;
  fieldsMap?: any;
  maskClosable?: boolean;
  createModalTitle?: string;
  editModalTitle?: string;
  modalWidth?: string | number;
  okText?: string;
  cancelText?: string;
  deleteText?: string;
  isVisible?: boolean;
  addBtnDisabled?: boolean;
  structItemShowRenderFN?: (
    text: any,
    rowData: Record<string, any>,
    dataIndex: any,
    columnKey: any
  ) => any;
  structInnerTableColumnsOrder?: string[];
  rowOperationConfig?: RowOperationConfig;
}


/**
 * @id forms.general-structs-form-item-v2
 * @name forms.general-structs-form-item-v2
 * @docKind brick
 * @description 添加/编辑结构体
 * @description.en Add/Edit struct
 * @author william
 * @history
 * 1.x.0:新增构件 `forms.general-structs-form-item-v2`
 * @excludesInherit
 *  placeholder
 *  pattern
 * @memo
 *
 * ### RowOperationConfig

 *| property                    | type        | required | default | description |
 *| -------------------------   | ---------   | -------- | ------- | ----------- |
 *| rowUniqueKey                | `string`    | true     | -       | 表格行唯一key  |
 *| disabledEditBtnRowValues    | `string[]`  | -        | -       | 禁用编辑操作的行唯一值 |
 *| disabledDeleteBtnRowValues  | `string[]`  | -        | -       | 禁用删除操作的行唯一值 |
 * @memo.en
 *
 * ### RowOperationConfig

 *| property                    | type        | required | default | description |
 *| -------------------------   | ---------   | -------- | ------- | ----------- |
 *| rowUniqueKey                | `string`    | true     | -       | Unique key of the table row  |
 *| disabledEditBtnRowValues    | `string[]`  | -        | -       | Unique values of rows whose edit action is disabled |
 *| disabledDeleteBtnRowValues  | `string[]`  | -        | -       | Unique values of rows whose delete action is disabled |
 */

export class GeneralStructsFormItemV2Element extends FormItemElement  implements GeneralStructsFormItemV2ElementProps {
  /**
   * @group basicFormItem
   * @required true
   * @description 下拉框字段名
   * @description.en Field name of the dropdown
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 添加结构体作为表单项时在表单中的字段说明
   * @description.en Field description of the struct when it is added as a form item
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @group basicFormItem
   * @required false
   * @default 添加
   * @description 点击打开模态框的按钮文字
   * @description.en Text of the button that opens the modal
   */
  @property({
    attribute: false,
  })
  btnText: string;

  /**
   * @group basicFormItem
   * @required true
   * @description 结构体数组数据源
   * @description.en Data source of the struct array
   */
  @property({
    attribute: false,
  })
  value: any;

  /**
   * @group basicFormItem
   * @required false
   * @description 新建结构体时给表单设置默认值
   * @description.en Set default values for the form when a struct is created
   */
  @property({
    attribute: false,
  })
  structDefaultValues: any;

  /**
   * @group basicFormItem
   * @required true
   * @description 结构体表格中字段与标签的键值对，见示例
   * @description.en Key-value pairs of fields and labels in the struct table, see the example
   */
  @property({
    attribute: false,
  })
  fieldsMap: any;

  /**
   * @group basicFormItem
   * @required false
   * @default true
   * @description 能否添加多个结构体
   * @description.en Whether multiple structs can be added
   */
  @property({
    attribute: false,
  })
  multiple = true;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 是否点击背景关闭模态框
   * @description.en Whether clicking the background closes the modal
   */
  @property({
    type: Boolean,
  })
  maskClosable: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @default 添加结构体
   * @description 添加结构体时模态框的标题
   * @description.en Title of the modal when adding a struct
   */
  @property()
  createModalTitle: string;

  /**
   * @group basicFormItem
   * @required false
   * @default 编辑结构体
   * @description 编辑结构体时模态框的标题
   * @description.en Title of the modal when editing a struct
   */
  @property()
  editModalTitle: string;

  /**
   * @group ui
   * @required false
   * @default 520px
   * @description 模态框宽度
   * @description.en Width of the modal
   */
  @property({
    attribute: false,
  })
  modalWidth: string | number;

  /**
   * @group basicFormItem
   * @required false
   * @default 确定
   * @description 模态框确认按钮文字
   * @description.en Text of the modal OK button
   */
  @property()
  okText: string;

  /**
   * @group basicFormItem
   * @required false
   * @default 取消
   * @description 模态框取消按钮文字
   * @description.en Text of the modal Cancel button
   */
  @property()
  cancelText: string;

  /**
   * @group basicFormItem
   * @required false
   * @default 确定要删除该结构体吗？
   * @description 删除确认框标题
   * @description.en Title of the delete confirmation dialog
   */
  @property()
  deleteText: string;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 是否显示modal
   * @description.en Whether to show the modal
   */
  @property({
    type: Boolean,
  })
  isVisible: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @default false
   * @description 添加按钮是否置灰
   * @description.en Whether the add button is grayed out
   */
  @property({
    type: Boolean,
  })
  addBtnDisabled: boolean;

  /**
   * @group advancedFormItem
   * @required false
   * @description 自定义结构体表格渲染函数
   * @description.en Custom render function of the struct table
   */
  @property({
    attribute: false,
  })
  structItemShowRenderFN: (
    text: any,
    rowData: Record<string, any>,
    dataIndex: any,
    columnKey: any
  ) => any;

  /**
   * @group basicFormItem
   * @required false
   * @description 自定义结构体表格列的顺序
   * @description.en Custom order of the struct table columns
   */
  @property({
    attribute: false,
  })
  structInnerTableColumnsOrder: string[];

  /**
   * @group basicFormItem
   * @required false
   * @description 表格中行操作配置
   * @description.en Row operation configuration in the table
   */
  @property({
    attribute: false,
  })
  rowOperationConfig: RowOperationConfig;

  /**
   * @group basicFormItem
   * @required false
   * @description 添加/编辑结构体项的模态框的内容部分的构件配置，一般使用 forms.general-form 作为第一层
   * @description.en Brick configuration of the content part of the modal that adds/edits a struct item; generally use forms.general-form as the first layer
   */
  @property({
    attribute: false,
  })
  modalContentBrick?: UseSingleBrickConf;

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  /**
   * @detail `Record<string, any>`
   * @description 增删改结构体时触发
   * @description.en Triggered when a struct is added, edited or deleted
   */
  @event({ type: "struct.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail `Record<string, any>`
   * @description 调用`getData`时触发
   * @description.en Triggered when `getData` is called
   */
  @event({ type: "struct.data.get" }) getDataEvent: EventEmitter<
    Record<string, any>
  >;
  /**
   * @detail `Record<string, any>`
   * @description 设置内部form表单
   * @description.en Set the inner form
   */
  @event({ type: "struct.inner.form.init" }) innerFormInitEvent: EventEmitter<
    Record<string, any>
  >;

  /* istanbul ignore next */
  private _handleChange = (value: Record<string, unknown>[]): void => {
    this.value = value;
    this.changeEvent.emit(value);
  };

  /* istanbul ignore next */
  private _handleInnerFormInit = (
    itemValues?: Record<string, unknown>
  ): void => {
    this.innerFormInitEvent.emit(itemValues);
  };

  /**
   * @description 获得结构体数组
   * @description.en Get the struct array
   */
  @method() getData(): void {
    this.getDataEvent.emit(this.value);
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralStructsFormItemV2
            name={this.name}
            formElement={this.getFormElement()}
            label={this.label}
            required={this.required}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            value={this.value}
            structDefaultValues={this.structDefaultValues}
            modalVisible={this.isVisible}
            btnText={this.btnText}
            fieldsMap={this.fieldsMap}
            multiple={this.multiple}
            createModalTitle={this.createModalTitle}
            editModalTitle={this.editModalTitle}
            modalWidth={this.modalWidth}
            okText={this.okText}
            cancelText={this.cancelText}
            deleteText={this.deleteText}
            addBtnDisabled={this.addBtnDisabled}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            structItemShowRenderFN={this.structItemShowRenderFN}
            structInnerTableColumnsOrder={this.structInnerTableColumnsOrder}
            rowOperationConfig={this.rowOperationConfig}
            modalContentBrick={this.modalContentBrick}
            onChange={this._handleChange}
            onInnerFormInit={this._handleInnerFormInit}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "forms.general-structs-form-item-v2",
  GeneralStructsFormItemV2Element
);
