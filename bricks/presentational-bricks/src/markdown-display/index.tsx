import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { MarkdownDisplay } from "./MarkdownDisplay";
import { get } from "lodash";

/**
 * @id presentational-bricks.markdown-display
 * @name presentational-bricks.markdown-display
 * @editor shared-editors.general-code--editor
 * @docKind brick
 * @description Markdown展示
 * @author lynette
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class MarkdownDisplayElement extends UpdatingElement {
  /**
   * @description markdown 展示内容
   * @group basic
   */
  @property({ attribute: false }) value: string;

  /**
   * @description [已废弃]数据来源
   * @deprecated
   * @group advanced
   */
  @property({ attribute: false }) dataSource: Record<string, any>;

  /**
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 value
   * @deprecated
   * @group advanced
   */
  @property({ attribute: false }) fields: {
    value?: string;
  };

  /**
   * @default true
   * @description markdown 图片是否支持预览
   * @group basic
   */
  @property({ attribute: false }) imagePreview: boolean;

  connectedCallback(): void {
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
    if (this.isConnected) {
      const mutableProps = {
        value: this.value,
      };
      if (this.dataSource) {
        mutableProps.value = this.fields?.value
          ? get(this.dataSource, this.fields.value)
          : this.dataSource;
      }
      ReactDOM.render(
        <BrickWrapper>
          <MarkdownDisplay
            value={mutableProps.value}
            imagePreview={this.imagePreview}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.markdown-display",
  MarkdownDisplayElement
);
