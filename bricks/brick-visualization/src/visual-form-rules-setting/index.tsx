import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property } from "@next-core/brick-kit";
import { VisualFormRulesSetting } from "./VisualFormRulesSetting";
import { FormItemElement } from "@next-libs/forms";

export interface VisualFormRulesSettingElementProps {
  value?: Record<string, any>[];
  formChildren?: Record<string, any>[];
  name?: string;
  label?: string;
  labelTooltip?: string;
}

/**
 * @id brick-visualization.visual-form-rules-setting
 * @author kehua
 * @history
 * 1.x.0: 新增构件 `brick-visualization.visual-form-rules-setting`
 * @docKind brick
 * @noInheritDoc
 */
export class VisualFormRulesSettingElement extends FormItemElement implements VisualFormRulesSettingElementProps {
  /**
   * @kind Record<string, any>[]
   * @default
   * @required -
   * @description 初始值
   */
  @property({ attribute: false })
  value: Record<string, any>[];

  /**
   * @kind Record<string, any>[]
   * @default
   * @required -
   * @description 表单子项数据
   */
  @property({ attribute: false })
  formChildren: Record<string, any>[];

  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项字段名
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项字段说明
   * @group basic
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项字段说明
   * @group basic
   */
  @property({ attribute: false }) declare labelTooltip: string;

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <VisualFormRulesSetting
            formElement={this.getFormElement()}
            value={this.value}
            label={this.label}
            name={this.name}
            labelTooltip={this.labelTooltip}
            formChildren={this.formChildren}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "brick-visualization.visual-form-rules-setting",
  VisualFormRulesSettingElement
);
