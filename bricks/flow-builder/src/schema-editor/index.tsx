import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property } from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { SchemaEditor } from "./SchemaEditor";
import { SchemaRootNodeProperty, ModelDefinition } from "./interfaces";
import { UseBrickConf } from "@next-core/brick-types";

export interface SchemaEditorElementProps {
  value: SchemaRootNodeProperty;
  readonly: boolean;
  hiddenRootNode: boolean;
  rootNodeRequired: Record<string, boolean>;
  hiddenRootNodeRequired?: boolean;
  disabledModelType: boolean;
  enableWrapper: boolean;
  customTypeList: string[];
  simpleTypeList: string[];
  hiddenArrayTypeCheckbox: boolean;
  importModelDefinition: ModelDefinition[];
  titleBrick: {
    useBrick: UseBrickConf;
  };
  projectId: string;
  hiddenFieldRequired: boolean;
  hiddenFieldDesc: boolean;
  hiddenCategories: string[];
}

/**
 * @id shared-editors.schema-editor
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `shared-editors.schema-editor`
 * @docKind brick
 * @noInheritDoc
 */
export class SchemaEditorElement extends FormItemElement implements SchemaEditorElementProps {
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
   * @description 配置根节点中哪些相关字段是必填
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
   * @description 是否隐藏整个根节点必填项的设置
   * @group basic
   */
  @property({
    type: Boolean,
  })
  hiddenRootNodeRequired?: boolean;
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
   * @description 自定义简单类型列表
   */
  @property({
    attribute: false,
  })
  simpleTypeList: string[];

  /**
   * @description 隐藏支持数组选项的配置
   */
  @property({
    attribute: false,
  })
  hiddenArrayTypeCheckbox: boolean;

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

  /**
   * @description 标题的构件配置
   * @group basic
   */
  @property({
    attribute: false,
  })
  titleBrick: {
    useBrick: UseBrickConf;
  };

  /**
   * @description 项目 ID
   * @group basic
   */
  @property() projectId: string;

  /**
   * @description 隐藏字段必填项
   * @group basic
   */
  @property({
    type: Boolean,
  })
  hiddenFieldRequired: boolean;

  @property({
    type: Boolean,
  })
  hiddenFieldDesc: boolean;

  @property({
    attribute: false,
  })
  hiddenCategories: string[];

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
            projectId={this.projectId}
            hiddenRootNode={this.hiddenRootNode}
            disabledModelType={this.disabledModelType}
            enableWrapper={this.enableWrapper}
            simpleTypeList={this.simpleTypeList}
            customTypeList={this.customTypeList}
            hiddenArrayTypeCheckbox={this.hiddenArrayTypeCheckbox}
            rootNodeRequired={this.rootNodeRequired}
            importModelDefinition={this.importModelDefinition}
            hiddenRootNodeRequired={this.hiddenRootNodeRequired}
            titleBrick={this.titleBrick}
            hiddenFieldRequired={this.hiddenFieldRequired}
            hiddenFieldDesc={this.hiddenFieldDesc}
            hiddenCategories={this.hiddenCategories}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("flow-builder.schema-editor", SchemaEditorElement);
