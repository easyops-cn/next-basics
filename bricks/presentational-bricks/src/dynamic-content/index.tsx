import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { parseTemplate } from "@next-libs/cmdb-utils";
import { isNil } from "lodash";

/**
 * @id presentational-bricks.dynamic-content
 * @name presentational-bricks.dynamic-content
 * @docKind brick
 * @description 支持解析模版的动态内容构件，例如：共 #{total} 条
 * @author lynette
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class DynamicContentElement extends UpdatingElement {
  /**
   * @kind Record<string, any>
   * @required true
   * @default -
   * @description 数据来源
   */
  @property({ attribute: false })
  dataSource: Record<string, any>;

  /**
   * @kind string
   * @required true
   * @default -
   * @description 动态模板内容。例如：共 #{total} 条。用`#{}`表示变量。
   */
  @property()
  dynamicContent: string;

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
    // istanbul ignore else
    if (this.isConnected) {
      const content =
        !isNil(this.dynamicContent) &&
        !isNil(this.dataSource) &&
        parseTemplate(this.dynamicContent, this.dataSource);
      ReactDOM.render(
        <BrickWrapper>
          <>{content}</>
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.dynamic-content",
  DynamicContentElement
);
