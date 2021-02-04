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

/**
 * @id forms.cmdb-instance-select-panel
 * @name forms.cmdb-instance-select-panel
 * @docKind brick
 * @description 通过 instance-list-modal 选择 CMDB 实例
 * @author cyril
 * @slots
 * @history
 * 1.28.0:新增 `instance.select.change` 事件
 * @memo
 * @noInheritDoc
 */
export class CmdbInstanceSelectPanelElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 下拉框字段名
   */
  @property({ attribute: false }) name: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 下拉框字段说明
   */
  @property({ attribute: false }) label: string;

  /**
   * @kind string[]
   * @required false
   * @default []
   * @description 默认选择实例的 ID 列表
   */
  @property({ attribute: false })
  value: string[];
  @property({ attribute: false })
  addButtonText: string;
  /**
   * @kind any
   * @required false
   * @default -
   * @description 预设弹窗内实例的筛选条件，格式与参见请求数据中的 query
   */
  @property({ attribute: false })
  instanceQuery: any;
  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 模型的属性 ID 数组，控制实例弹窗和已选表格的显示列
   */
  @property({ attribute: false })
  fields: string[];
  /**
   * @kind CmdbModels.ModelCmdbObject
   * @required true
   * @default -
   * @description 模型列表
   */
  @property({ attribute: false })
  objectList: Partial<CmdbModels.ModelCmdbObject>[];
  /**
   * @kind number
   * @required false
   * @default 10
   * @description 添加实例弹窗的默认分页个数
   */
  @property({ type: Number })
  addInstancesModalPageSize: number;
  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 添加实例弹窗是否展示分页
   */
  @property({ type: Boolean })
  showSizeChanger: boolean;
  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 添加实例弹窗的分页个数选项
   */
  @property({ attribute: false })
  pageSizeOptions: string[];
  /**
   * @kind string
   * @required true
   * @default -
   * @description 模型 ID
   */
  @property({ attribute: false })
  objectId: string;
  /**
   * @detail `string[]`
   * @description 当选择项变化时触发，detail 为所有选择实例的实例 ID
   */
  @event({ type: "instance.select.change" }) changeEvent: EventEmitter<
    string[]
  >;
  /**
   * @detail `any[]`
   * @description 当选择项变化时触发，detail 为所有选择实例的实例数据
   */
  @event({ type: "instance.select.change.v2" }) changeEventV2: EventEmitter<
    any[]
  >;
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
            addButtonText={this.addButtonText}
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
