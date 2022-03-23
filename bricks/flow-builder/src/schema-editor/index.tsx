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
   * @kind ModelDefinition[]
   * @required -️
   * @default false
   * @description 模型定义
   * @group basic
   */
  @property({
    attribute: false,
  })
  modelDefinitionList: ModelDefinition[] = [];

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
            modelDefinitionList={this.modelDefinitionList}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("flow-builder.schema-editor", SchemaEditorElement);
