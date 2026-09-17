import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { DropdownSelect } from "./DropdownSelect";
import { Option } from "../interfaces";


export interface DropdownSelectElementProps {
  options?: Option[];
  dataSource?: any[];
  value?: any[];
  label?: string;
  disabled?: boolean;
  heightFix?: boolean;
  buttonIcon?: any;
  dropdownButtonType?: "default" | "shape";
  labelFontSize?: string;
  placeholder?: string;
  optionTitle?: string;
  optionContent?: string;
  valuePath?: string;
  multipleSelect?: boolean;
  selectedKeys?: string[] ;
  selectTipText?: string;
  selectBoxStyle?: React.CSSProperties;
  defaultSelectedKeys?: string[] ;
  minSelectedItemLength?: number;
  multipleLabel?: string;
  tipBrick?: { useBrick: UseBrickConf };
  hideLabel?: boolean;
  dropdownTriggerStyle?: React.CSSProperties;
  labelBrick?: {
    useBrick: UseBrickConf;
  }
}

/**
 * @id presentational-bricks.dropdown-select
 * @name presentational-bricks.dropdown-select
 * @docKind brick
 * @description 用于菜单项较多时收纳相关菜单项
 * @description.en Used to tuck away related menu items when there are many of them
 * @author jo
 * @slots
 * @history
 * 1.122.0:新增 `labelFontSize` 属性
 * @memo
 * @noInheritDoc
 */
export class DropdownSelectElement extends UpdatingElement implements DropdownSelectElementProps {
  /**
   * @detail {value: any; item: any}
   * @description 选项改变事件
   * @description.en Option change event
   */
  @event({ type: "select.change", cancelable: true })
  selectChange: EventEmitter<{ value: any; item: any }>;

  /**
   * @detail {value: any}
   * @description 多选选项选中事件
   * @description.en Multiple-select option selection event
   */
  @event({ type: "multiple.select.change", cancelable: true })
  multipleSelectChange: EventEmitter<{ value: any }>;

  /**
   * @required false
   * @description 选项列表，不能与 dataSource + label + optionTitle + optionContent + valuePath 同时使用
   * @description.en Option list, cannot be used together with dataSource + label + optionTitle + optionContent + valuePath
   * @group basic
   */
  @property({ attribute: false }) options: Option[];

  /**
   * @required false
   * @default []
   * @description 数据源
   * @description.en Data source
   * @group other
   * @deprecated
   */
  @property({ attribute: false }) dataSource: any[];

  /**
   * @required false
   * @description 选中项的值，跟 `valuePath` 搭配使用，根据指定的字段路径与 value 的值得出当前选中项
   * @description.en Value of the selected item, used together with `valuePath`; the currently selected item is derived from the specified field path and the value of value
   * @group basic
   */
  @property({ attribute: false }) value: any[];

  /**
   * @required false
   * @default 使用 optionTitle 的值
   * @description 选中项显示的 label，支持模板替换，替换上下文为当前项 `item` 使用时需要带上 item 前缀 `#{item.xxx}`
   * @description.en Label displayed for the selected item, supports template replacement; the replacement context is the current `item`, and the item prefix `#{item.xxx}` is required when using it
   * @group other
   * @deprecated
   */
  @property() label?: string;

  /**
   * @required false
   * @default false
   * @description 是否禁用
   * @description.en Whether to disable
   * @group basic
   */
  @property({ type: Boolean }) disabled?: boolean;

  /**
   * @required false
   * @default false
   * @description 单选时，下拉内容区高度是否固定
   * @description.en In single-select mode, whether the height of the dropdown content area is fixed
   * @group basic
   */
  @property({ type: Boolean }) heightFix?: boolean;

  /**
   * @kind MenuIcon
   * @required false
   * @description 按钮 icon，支持[icon 图标库](developers/icon)，可直接复制图标图标的配置（antd、fa 及 easyops 三种库都支持），也可只取 icon 字段的值（仅支持 antd 库）。配置{ "lib": "antd", "icon": "edit" }与 "edit"等价 [类型定义](https://github.com/easyops-cn/next-core/blob/34a0808712ecaa925d0860d281ab23cf3bec7317/packages/brick-types/src/menu.ts#L104)
   * @description.en Button icon, supports the [icon library](developers/icon). You can copy the icon configuration directly (all three libraries antd, fa and easyops are supported), or take only the value of the icon field (only the antd library is supported). The configuration { "lib": "antd", "icon": "edit" } is equivalent to "edit" [type definition](https://github.com/easyops-cn/next-core/blob/34a0808712ecaa925d0860d281ab23cf3bec7317/packages/brick-types/src/menu.ts#L104)
   * @group basic
   */
  @property({
    attribute: false,
  })
  buttonIcon: any;

  /**
   * @required false
   * @default "default"
   * @description 设置下拉选择器按钮样式
   * @description.en Set the dropdown select button style
   * @group ui
   */
  @property()
  dropdownButtonType: "default" | "shape";

  /**
   * @required false
   * @description label 的 fontSize
   * @description.en Font size of the label
   * @group ui
   */
  @property() labelFontSize?: string;

  /**
   * @required false
   * @description placeholder, 当没有当前项选中时显示
   * @description.en placeholder, displayed when no item is currently selected
   * @group basic
   */
  @property() placeholder?: string;

  /**
   * @required false
   * @default #{item}
   * @description 选项的标题，支持模板替换，使用跟 label 字段一样
   * @description.en Title of the option, supports template replacement, used in the same way as the label field
   * @group other
   * @deprecated
   */
  @property() optionTitle?: string;

  /**
   * @required false
   * @description 选项的内容，支持模板替换，使用跟 label 字段一样
   * @description.en Content of the option, supports template replacement, used in the same way as the label field
   * @group other
   * @deprecated
   */
  @property() optionContent?: string;

  /**
   * @required false
   * @default item
   * @description 依据当前项 `item`，指定选项值的 path
   * @description.en Specifies the path of the option value based on the current `item`
   * @group other
   * @deprecated
   */
  @property() valuePath?: string;

  /**
   * @required false
   * @default false
   * @description 是否支持多选，支持多选时，单选的value属性失效
   * @description.en Whether multiple selection is supported; when multiple selection is enabled, the value property of single selection becomes invalid
   * @group basic
   */
  @property({ type: Boolean }) multipleSelect?: boolean;

  /**
   * @required false
   * @default []
   * @description 多选的选中项
   * @description.en Selected items for multiple selection
   * @group basic
   */
  @property({ attribute: false }) selectedKeys?: string[] = [];

  /**
   * @required false
   * @default -
   * @description 下拉框提示信息
   * @description.en Hint text of the dropdown
   */
  @property({ attribute: false })
  selectTipText: string;

  /**
   * @required false
   * @description 下拉框样式
   * @description.en Style of the dropdown
   */
  @property({ attribute: false })
  selectBoxStyle: React.CSSProperties;

  /**
   * @required false
   * @default []
   * @description 多选的默认选中项
   * @description.en Default selected items for multiple selection
   * @group basic
   */
  @property({ attribute: false }) defaultSelectedKeys?: string[] = [];

  /**
   * @required false
   * @description 最小选择数量（多选）
   * @description.en Minimum number of selected items (multiple selection)
   * @group basic
   */
  @property({ type: Number }) minSelectedItemLength?: number;

  /**
   * @required false
   * @description 多选时，当前label仅支持显示从构件外部传入,multipleLabel属性仅在dropdownButtonType为multiple时生效
   * @description.en In multiple-selection mode, the current label can only be passed in from outside the brick; the multipleLabel property is effective only when dropdownButtonType is multiple
   * @group basic
   */
  @property() multipleLabel?: string;

  /**
   * @required false
   * @description 提示构件
   * @description.en Tip brick
   * @group other
   */
  @property({
    attribute: false,
  })
  tipBrick: { useBrick: UseBrickConf };

  /**
   * @required false
   * @description 不展示label
   * @description.en Do not display the label
   * @group other
   */
  @property({
    attribute: false,
  })
  hideLabel: boolean;

  /**
   * @required false
   * @description 额外的下拉开关样式
   * @description.en Extra dropdown trigger style
   * @group other
   */
  @property({
    attribute: false,
  })
  dropdownTriggerStyle: React.CSSProperties;

  /**
   * @required false
   * @description label 的构件配置
   * @description.en Brick configuration of the label
   * @group ui
   */
  @property({
    attribute: false,
  })
  labelBrick?: {
    useBrick: UseBrickConf;
  };

  connectedCallback(): void {
    this.style.display = "inline-block";
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }
  // istanbul ignore next
  private _handleChange = (value: any, item: any) => {
    this.value = value;
    this.selectChange.emit({ value, item });
  };
  // istanbul ignore next
  private _multipleSelectChange = (value: any) => {
    this.selectedKeys = value;
    this.multipleSelectChange.emit({ value });
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <DropdownSelect
            options={this.options}
            dataSource={this.dataSource}
            value={this.value}
            label={this.label}
            labelFontSize={this.labelFontSize}
            placeholder={this.placeholder}
            optionTitle={this.optionTitle}
            optionContent={this.optionContent}
            valuePath={this.valuePath}
            onChange={this._handleChange}
            selectedKeys={this.selectedKeys}
            defaultSelectedKeys={this.defaultSelectedKeys}
            multipleSelect={this.multipleSelect}
            onSelect={this._multipleSelectChange}
            buttonIcon={this.buttonIcon}
            multipleLabel={this.multipleLabel}
            dropdownButtonType={this.dropdownButtonType}
            disabled={this.disabled}
            heightFix={this.heightFix}
            tipBrick={this.tipBrick}
            minSelectedItemLength={this.minSelectedItemLength}
            selectTipText={this.selectTipText}
            selectBoxStyle={this.selectBoxStyle}
            hideLabel={this.hideLabel}
            dropdownTriggerStyle={this.dropdownTriggerStyle}
            labelBrick={this.labelBrick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.dropdown-select",
  DropdownSelectElement
);
