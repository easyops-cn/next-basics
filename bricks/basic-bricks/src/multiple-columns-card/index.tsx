import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { MultipleColumnsCard } from "./MultipleColumnsCard";
import style from "./index.shadow.less";

/**
 * @id basic-bricks.multiple-columns-card
 * @name basic-bricks.multiple-columns-card
 * @docKind brick
 * @description 支持多列布局的容器
 * @author jo
 * @slots
 * @history
 * @memo
 * Tips: 多列布局默认每一列都会有 padding，如果其中某一列不需要则在相应的用户构件 storyboard 内配置 columns-card-no-padding 的类名属性即可，如示例二所示
 * @noInheritDoc
 */
export class MultipleColumnsCardElement extends UpdatingElement {
  /**
   * @kind `Array<string | number>`
   * @required false
   * @default -
   * @description 配置多列布局时每一列的宽度，可以是具体的像素长度`200px`，也可以是数字`1，2...`等等，表示该列的宽度为相应的比例值，列数要与放入插槽的构件数相符
   */
  @property({
    attribute: false,
  })
  gridColumns: string;

  /**
   * @kind string
   * @required true
   * @default 是否显示卡片边框
   * @description -
   */
  @property({
    attribute: false,
  })
  cardBorder = true;

  private _mountPoint: HTMLElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    shadowRoot.appendChild(styleElement);

    this._mountPoint = document.createElement("div");
    shadowRoot.appendChild(this._mountPoint);
  }

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
      ReactDOM.render(
        <BrickWrapper>
          <MultipleColumnsCard
            cardBorder={this.cardBorder}
            gridColumns={this.gridColumns}
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define(
  "basic-bricks.multiple-columns-card",
  MultipleColumnsCardElement
);
