import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { BannerDisplayCardList, CardItem } from "./BannerDisplayCardList";

/**
 * @id presentational-bricks.banner-display-card-list
 * @author dophjing
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.banner-display-card-list`
 * @docKind brick
 * @noInheritDoc
 */
export class BannerDisplayCardListElement extends UpdatingElement {
  /**
   * @kind CardItem[]
   * @required true
   * @default -
   * @description 列表数据
   */
  @property({
    attribute: false,
  })
  cardList: CardItem[];
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
          <BannerDisplayCardList cardList={this.cardList} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.banner-display-card-list",
  BannerDisplayCardListElement
);
