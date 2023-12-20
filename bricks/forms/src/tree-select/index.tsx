import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";

import { TreeSelect, showCheckedStrategyType } from "./TreeSelect";
import {
  DataNode,
  DefaultValueType,
  SimpleModeConfig,
} from "rc-tree-select/lib/interface";

/**
 * @id forms.tree-select
 * @name forms.tree-select
 * @docKind brick
 * @description 树型选择构件
 * @author steve
 * @slots
 * @history
 * 1.90.0:新增构件 `forms.tree-select`
 * 1.92.0:属性 `selectStyle` 改为 `inputBoxStyle`
 * 1.93.0:新增属性 `treeDataSimpleMode`
 * @memo
 * ```typescript
 * type RawValueType = string | number;
 *
 * interface LabelValueType {
 *     key?: Key;
 *     value?: RawValueType;
 *     label?: React.ReactNode;
 *     halfChecked?: boolean;
 * }
 *
 * type DefaultValueType = RawValueType | RawValueType[] | LabelValueType | LabelValueType[];
 *
 * interface DataNode {
 *   value?: RawValueType;
 *   title?: React.ReactNode;
 *   label?: React.ReactNode;
 *   key?: Key;
 *   disabled?: boolean;
 *   disableCheckbox?: boolean;
 *   checkable?: boolean;
 *   children?: DataNode[];
 *   [prop: string]: any;
 * }
 *
 * interface SimpleModeConfig {
 *   id?: React.Key;
 *   pId?: React.Key;
 *   rootPId?: React.Key;
 * }
 * ```
 */
export class TreeSelectElement extends FormItemElement {
  /**
   * @group basicFormItem
   * @required true
   * @description 字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @group basicFormItem
   * @required false
   * @default `[]`
   * @description 树选择控件的节点数据
   */
  @property({ attribute: false }) treeData: DataNode[];

  /**
   * @group basicFormItem
   * @required false
   * @default -
   * @description 树选择控件的值（仅当不在表单中使用时有效）
   */
  @property({ attribute: false }) value: DefaultValueType;

  /**
   * @group basicFormItem
   * @required false
   * @default `false`
   * @description 是否禁用
   */
  @property({ type: Boolean }) disabled: boolean;

  /**
   * @group ui
   * @required false
   * @default `false`
   * @description 是否支持搜索框
   */
  @property({ type: Boolean }) showSearch: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @description 选择框默认文字
   */
  @property() declare placeholder: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 搜索框默认文字
   */
  @property() searchPlaceholder: string;

  /**
   * @group basicFormItem
   * @required false
   * @default `'value'`
   * @description 输入项过滤对应的 treeNode 属性
   */
  @property({ attribute: false }) treeNodeFilterProp: string;

  /**
   * @group ui
   * @required false
   * @description 选择框的样式
   */
  @property({ attribute: false }) inputBoxStyle: React.CSSProperties;

  /**
   * @group ui
   * @required false
   * @default `false`
   * @description 显示清除按钮
   */
  @property({ type: Boolean }) allowClear: boolean;

  /**
   * @group ui
   * @required false
   * @default `false`
   * @description 显示 checkbox
   * @group advanced
   */
  @property({ type: Boolean }) treeCheckable: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @default `false`
   * @description `checkable` 状态下节点选择完全受控（父子节点选中状态不再关联），会使得 `labelInValue` 强制为 `true`
   */
  @property({ type: Boolean }) treeCheckStrictly: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @default `false`
   * @description 单选：`false`，多选：`true`（当设置 `treeCheckable` 时自动变为 `true`）
   */
  @property({ type: Boolean }) multiple: boolean;

  /**
   * @group ui
   * @required false
   * @default `true`
   * @description 下拉菜单和选择器同宽。默认将设置 `min-width`
   */
  @property({ attribute: false }) dropdownMatchSelectWidth = true;

  /**
   * @group ui
   * @required false
   * @description 下拉菜单的样式
   */
  @property({ attribute: false }) dropdownStyle: React.CSSProperties;

  /**
   * @group basicFormItem
   * @required false
   * @description 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', title:"test1",...},...], pId 是父节点的 id)
   */
  @property({ attribute: false }) treeDataSimpleMode:
    | boolean
    | SimpleModeConfig;

  /**
   * @group basicFormItem
   * @required false
   * @default `'title'`
   * @description 作为显示的 treeNode 属性
   */
  @property({ attribute: false }) treeNodeLabelProp: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 默认展开项
   */
  @property({ attribute: false }) defaultExpandedKeys: string[];

  /**
   * @group showCheckedStrategy
   * @required false
   * @description 展示节点情况。默认只显示子节点
   */
  @property({ attribute: false }) showCheckedStrategy: showCheckedStrategyType =
    "child";
  /**
   * @detail `{value: DefaultValueType, label: any, extra: any}`
   * @description 输入变化时被触发，`event.detail` 为当前值
   */
  @event({ type: "treeSelect.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;
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

  onChange = (value: DefaultValueType, label: any, extra: any): void => {
    this.value = value;
    this._render();
    this.changeEvent.emit({ value, label, extra });
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <TreeSelect
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            required={this.required}
            pattern={this.pattern}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            helpBrick={this.helpBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            treeData={this.treeData}
            treeCheckable={this.treeCheckable}
            treeCheckStrictly={this.treeCheckStrictly}
            allowClear={this.allowClear}
            disabled={this.disabled}
            inputBoxStyle={this.inputBoxStyle}
            dropdownMatchSelectWidth={this.dropdownMatchSelectWidth}
            dropdownStyle={this.dropdownStyle}
            multiple={this.multiple}
            placeholder={this.placeholder}
            searchPlaceholder={this.searchPlaceholder}
            showSearch={this.showSearch}
            treeDataSimpleMode={this.treeDataSimpleMode}
            treeNodeFilterProp={this.treeNodeFilterProp}
            treeNodeLabelProp={this.treeNodeLabelProp}
            value={this.value}
            onChange={this.onChange}
            defaultExpandedKeys={this.defaultExpandedKeys}
            showCheckedStrategy={this.showCheckedStrategy}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.tree-select", TreeSelectElement);
