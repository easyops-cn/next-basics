import React from "react";
import ReactDOM from "react-dom";
import { keyBy } from "lodash";

import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { CmdbModels } from "@next-sdk/cmdb-sdk";

import { CmdbInstanceSelectPanelWrapper } from "./CmdbInstanceSelectPanelWrapper";
import { FormItemElement } from "@next-libs/forms";

export interface CmdbInstanceSelectPanelElementProps {
  name?: string;
  value?: string[];
  objectId?: string;
  objectList?: Partial<CmdbModels.ModelCmdbObject>[];
  label?: string;
  addButtonText?: string;
  fields?: string[];
  showSizeChanger?: boolean;
  addInstancesModalPageSize?: number;
  pageSizeOptions?: string[];
  instanceQuery?: any;
  showBindButton?: boolean;
  bindButtonDisabled?: boolean;
  bindButtonText?: string;
}


/**
 * @id forms.cmdb-instance-select-panel
 * @name forms.cmdb-instance-select-panel
 * @docKind brick
 * @description 通过 instance-list-modal 选择 CMDB 实例
 * @description.en Select CMDB instances via instance-list-modal
 * @author cyril
 * @slots
 * @history
 * 1.28.0:新增 `instance.select.change` 事件
 * @excludesInherit
 *  placeholder
 *  pattern
 * @memo
 */

export class CmdbInstanceSelectPanelElement extends FormItemElement  implements CmdbInstanceSelectPanelElementProps {
  /* =========================== Group: basic =========================== */

  /**
   * @kind string
   * @required true
   * @default -
   * @group basic
   * @description 下拉框字段名
   * @description.en Field name of the dropdown
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string[]
   * @required false
   * @default []
   * @group basic
   * @description 默认选择实例的 ID 列表
   * @description.en ID list of the instances selected by default
   */
  @property({ attribute: false })
  value: string[];

  /**
   * @kind string
   * @required true
   * @default -
   * @group basic
   * @description 模型 ID
   * @description.en Model ID
   */
  @property({ attribute: false })
  objectId: string;

  /**
   * @kind CmdbModels.ModelCmdbObject
   * @required true
   * @default -
   * @group basic
   * @description 模型列表
   * @description.en Model list
   */
  @property({ attribute: false })
  objectList: Partial<CmdbModels.ModelCmdbObject>[];

  /* =========================== Group: formLabel =========================== */

  /**
   * @kind string
   * @required false
   * @default -
   * @group formLabel
   * @description 下拉框字段说明
   * @description.en Field description of the dropdown
   */
  @property({ attribute: false }) declare label: string;

  /* =========================== Group: ui =========================== */

  /**
   * @kind string
   * @required false
   * @default 选择实例
   * @group ui
   * @description 添加实例按钮的文本
   * @description.en Text of the add instance button
   */
  @property({ attribute: false })
  addButtonText: string;

  /**
   * @kind string[]
   * @required false
   * @default -
   * @group ui
   * @description 模型的属性 ID 数组，控制实例弹窗和已选表格的显示列
   * @description.en Array of the attribute IDs of the model, controls the columns displayed in the instance modal and the selected table
   */
  @property({ attribute: false })
  fields: string[];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 添加实例弹窗是否展示分页
   * @description.en Whether pagination is shown in the add instance modal
   * @group ui
   */
  @property({ type: Boolean })
  showSizeChanger: boolean;

  /**
   * @kind number
   * @required false
   * @default 10
   * @description 添加实例弹窗的默认分页个数
   * @description.en Default page size of the add instance modal
   * @group ui
   */
  @property({ type: Number })
  addInstancesModalPageSize: number;

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 添加实例弹窗的分页个数选项
   * @description.en Page size options of the add instance modal
   * @group ui
   */
  @property({ attribute: false })
  pageSizeOptions: string[];

  /* =========================== Group: advanced =========================== */

  /**
   * @kind any
   * @required false
   * @default -
   * @group advanced
   * @description 预设弹窗内实例的筛选条件，格式与参见请求数据中的 query
   * @description.en Preset filter conditions for instances in the modal; for the format, refer to the query in the request data
   */
  @property({ attribute: false })
  instanceQuery: any;

  /**
   * @default false
   * @required false
   * @description 弹窗左下方是否显示新建并绑定按钮
   * @description.en Whether the create and bind button is shown at the bottom left of the modal
   */
  @property({ type: Boolean })
  showBindButton: boolean;
  /**
   * @default false
   * @required false
   * @description 新建并绑定按钮是否禁用
   * @description.en Whether the create and bind button is disabled
   */
  @property({ type: Boolean }) bindButtonDisabled: boolean;

  /**
   * @kind string
   * @required false
   * @group ui
   * @description 选择实例的弹窗左下方按钮文案
   * @description.en Button text at the bottom left of the instance selection modal
   */
  @property({ attribute: false })
  bindButtonText: string;

  /* =========================== events =========================== */

  /**
   * @detail `string[]`
   * @description 当选择项变化时触发，detail 为所有选择实例的实例 ID
   * @description.en Triggered when the selection changes, detail is the instance IDs of all selected instances
   */
  @event({ type: "instance.select.change" }) changeEvent: EventEmitter<
    string[]
  >;
  /**
   * @detail `any[]`
   * @description 当选择项变化时触发，detail 为所有选择实例的实例数据
   * @description.en Triggered when the selection changes, detail is the instance data of all selected instances
   */
  @event({ type: "instance.select.change.v2" }) changeEventV2: EventEmitter<
    any[]
  >;

  /**
   * @detail
   * @description 点击新建并绑定按钮发出的事件
   * @description.en Event emitted when the create and bind button is clicked
   */
  @event({ type: "bind.button.click" }) bindClickEvent: EventEmitter<
    Record<string, any>
  >;
  private _handBinkClick = () => {
    this.bindClickEvent.emit();
  };

  private _handleChange = (value: string[]): void => {
    this.value = value;
    this.changeEvent.emit(value);
  };

  private _handleChangeV2 = (value: any[]): void => {
    this.value = value;
    this.changeEventV2.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      const objectMap = keyBy(this.objectList, "objectId");

      ReactDOM.render(
        <BrickWrapper>
          <CmdbInstanceSelectPanelWrapper
            formElement={this.getFormElement()}
            name={this.name}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            required={this.required}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            objectMap={objectMap}
            objectId={this.objectId}
            instanceIdList={this.value}
            onChange={this._handleChange}
            onChangeV2={this._handleChangeV2}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            label={this.label}
            bindEvent={this._handBinkClick}
            addButtonText={this.addButtonText}
            showBindButton={this.showBindButton}
            bindButtonDisabled={this.bindButtonDisabled}
            bindButtonText={this.bindButtonText}
            instanceQuery={this.instanceQuery}
            fields={this.fields}
            addInstancesModalPageSize={this.addInstancesModalPageSize}
            showSizeChanger={this.showSizeChanger}
            pageSizeOptions={this.pageSizeOptions}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "forms.cmdb-instance-select-panel",
  CmdbInstanceSelectPanelElement
);
