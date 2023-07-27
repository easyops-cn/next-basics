import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { GeneralList } from "./GeneralList";
import { Card } from "antd";
import styles from "./GeneralList.shadow.less";

/**
 * @id presentational-bricks.general-list
 * @name presentational-bricks.general-list
 * @docKind brick
 * @description 可配置具体每个item构件，常用于卡片列表
 * @author lynette
 * @slots
 * items:每个子项的 slot，例如可以搭配"presentational-bricks.card-item"使用。
 * @history
 * 1.19.0:新属性 `cardMinWidth`
 * @memo
 * ## 描述
 *
 * 通用列表，可以配置每个 item 构件。通常不会单独使用，而是搭配 dynamic template 使用，具体参考"general-list.general-card-list"中，具体事例看同[general-card-list](developers/brick-book/template/general-list.general-card-list)。
 * @noInheritDoc
 */
export class GeneralListElement extends UpdatingElement {
  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否卡片列表
   */
  @property({
    type: Boolean,
  })
  isCardList: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否在外层包一层卡片
   */
  @property({
    type: Boolean,
  })
  showCard: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片项的宽度，非响应式卡片可设置该属性
   */
  @property()
  cardWidth: string;

  /**
   * @kind string
   * @required false
   * @default 260px
   * @description 卡片项的最小宽度，响应式卡片可设置该属性
   */
  @property()
  cardMinWidth: string;

  private _mountPoint: HTMLElement;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
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
    ReactDOM.unmountComponentAtNode(this._mountPoint);
  }

  private getGeneralListNode() {
    return (
      <GeneralList
        isCardList={this.isCardList}
        cardWidth={this.cardWidth}
        cardMinWidth={this.cardMinWidth}
      />
    );
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          {this.showCard ? (
            <Card bordered={false}>{this.getGeneralListNode()}</Card>
          ) : (
            this.getGeneralListNode()
          )}
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define("presentational-bricks.general-list", GeneralListElement);
