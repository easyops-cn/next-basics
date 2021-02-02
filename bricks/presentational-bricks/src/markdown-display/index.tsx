import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { MarkdownDisplay } from "./MarkdownDisplay";
import { get } from "lodash";

/**
 * @id presentational-bricks.markdown-display
 * @name presentational-bricks.markdown-display
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
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description [已废弃]数据来源
   */
  @property({ attribute: false }) dataSource: Record<string, any>;

  /**
   * @kind { value?: string; }
   * @required false
   * @default -
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 value
   */
  @property({ attribute: false }) fields: {
    value?: string;
  };
  /**
   * @kind string
   * @required false
   * @default -
   * @description markdown 展示内容
   */
  @property({ attribute: false }) value: string;

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
          <MarkdownDisplay value={mutableProps.value} />
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
