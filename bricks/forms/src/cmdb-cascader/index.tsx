import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { CmdbCascader } from "./CmdbCascader";
import { FormItemElement } from "@next-libs/forms";

export interface valueCMDBCascaderProp {
  instanceId: string;
  [field: string]: any;
}

export interface FieldCMDBCascaderProps {
  objectIdPath: {
    showKey: string[];
    objectId: string;
  }[];
}

/**
 * @id forms.cmdb-cascader
 * @author frankshi
 * @history
 * 1.x.0: 新增构件 `forms.cmdb-cascader`
 * @docKind brick
 * @noInheritDoc
 */
export class CmdbCascaderElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 字段名
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 字段说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 初始值
   * @group basicFormItem
   */
  @property({ attribute: false }) value: valueCMDBCascaderProp[];

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description objectId关系数组
   * @group basicFormItem
   */
  @property({ attribute: false })
  objectIdPath: FieldCMDBCascaderProps["objectIdPath"] | string[];

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   * @group basicFormItem
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind `Record<string,string>`
   * @required false
   * @default -
   * @description 校验文本信息
   * @group basicFormItem
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 占位说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁用
   * @group basicFormItem
   */
  @property({ type: Boolean })
  disabled: boolean;

  /**
   * @kind `object`
   * @required false
   * @default -
   * @description 输入框样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties = {};

  /**
   * @detail `{[key: string]: any}`
   * @description 选项改变时触发
   */
  @event({ type: "forms.cmdb-cascader.change" })
  changeEvent: EventEmitter;
  handleChange = (value: valueCMDBCascaderProp[]): void => {
    this.value = value;
    this.changeEvent.emit(value);
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
          <CmdbCascader
            value={this.value}
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            placeholder={this.placeholder}
            inputBoxStyle={this.inputBoxStyle}
            required={this.required}
            objectIdPath={this.objectIdPath}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            onChange={this.handleChange}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            disabled={this.disabled}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.cmdb-cascader", CmdbCascaderElement);
