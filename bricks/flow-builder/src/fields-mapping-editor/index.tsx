import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FieldsMappingEditor } from "./FieldsMappingEditor";
import { FieldItem } from "./interfaces";

/**
 * @id flow-builder.fields-mapping-editor
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `flow-builder.fields-mapping-editor`
 * @docKind brick
 * @noInheritDoc
 */
export class FieldsMappingEditorElement extends UpdatingElement {
  /**
   * @kind FieldItem[]
   * @required false
   * @default -
   * @description 字段数据信息
   */
  @property({
    attribute: false,
  })
  dataSource: FieldItem[];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 加载中状态
   */
  @property({
    type: Boolean,
  })
  loadding: boolean;

  /**
   * @description 表单值变化触发
   */
  @event({ type: "values.change" }) valueChange: EventEmitter<FieldItem[]>;

  private handleChange = (values: FieldItem[]): void => {
    this.valueChange.emit(values);
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
          <FieldsMappingEditor
            dataSource={this.dataSource}
            onChange={this.handleChange}
            loading={this.loadding}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "flow-builder.fields-mapping-editor",
  FieldsMappingEditorElement
);
