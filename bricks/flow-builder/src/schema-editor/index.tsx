import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property } from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { SchemaEditor } from "./SchemaEditor";
import { SchemaRootNodeProperty, ModelDefinition } from "./interfaces";

/**
 * @id shared-editors.schema-editor
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `shared-editors.schema-editor`
 * @docKind brick
 * @noInheritDoc
 */
export class SchemaEditorElement extends FormItemElement {
  /**
   * @kind any[]
   * @required -️
   * @default -
   * @description schema编辑器的属性列表数据
   * @group basic
   */
  @property({
    attribute: false,
  })
  value: SchemaRootNodeProperty;

  /**
   * @kind boolean
   * @required -️
   * @default false
   * @description 是否只读
   * @group basic
   */
  @property({
    attribute: false,
  })
  readonly: boolean;

  /**
   * @kind boolean
   * @required -️
   * @default false
   * @description 是否隐藏根节点字段信息
   * @group basic
   */
  @property({
    type: Boolean,
  })
  hiddenRootNode: boolean;

  /**
   * @kind Record<string, boolean>
   * @required true
   * @default false
   * @description 配置根节点项是否必填
   * @group basic
   */
  @property({
    attribute: false,
  })
  rootNodeRequired = {
    description: false,
    type: false,
  };

  /**
   * @kind boolean
   * @required -️
   * @default false
   * @description 是否禁用模型的类型引用
   * @group basic
   */
  @property({
    type: Boolean,
  })
  disabledModelType: boolean;

  /**
   * @kind boolean
   * @required -️
   * @default false
   * @description 根节点是否增加 wrapper 的配置
   * @group basic
   */
  @property({
    type: Boolean,
  })
  enableWrapper: boolean;

  /**
   * @kind string[]
   * @required -️
   * @default false
   * @description 平台自定义的普通类型列表
   * @group basic
   */
  @property({
    attribute: false,
  })
  customTypeList: string[] = [];

  /**
   * @kind ModelDefinition[]
   * @required -️
   * @default false
   * @description 平台自定义的普通类型列表
   * @group basic
   */
  @property({
    attribute: false,
  })
  importModelDefinition: ModelDefinition[] = [];

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
          <SchemaEditor
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            required={this.required}
            value={this.value}
            labelTooltip={this.labelTooltip}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            readonly={this.readonly}
            hiddenRootNode={this.hiddenRootNode}
            disabledModelType={this.disabledModelType}
            enableWrapper={this.enableWrapper}
            customTypeList={this.customTypeList}
            rootNodeRequired={this.rootNodeRequired}
            importModelDefinition={this.importModelDefinition}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("flow-builder.schema-editor", SchemaEditorElement);
