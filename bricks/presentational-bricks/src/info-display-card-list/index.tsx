import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { InfoDisplayCardList } from "./InfoDisplayCardList";
import { MenuIcon } from "@next-core/brick-types";
import { UseBrickConf } from "@next-core/brick-types";

export interface CardDetail {
  title: string;
  desc: string;
}

export interface CardItem {
  title: string;
  desc: string;
  icon?: MenuIcon;
  detail?: CardDetail[];
}

/**
 * @id presentational-bricks.info-display-card-list
 * @author dophijing
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.info-display-card-list`
 * @docKind brick
 * @noInheritDoc
 */
export class InfoDisplayCardListElement extends UpdatingElement {
  /**
   * @kind CardItem[]
   * @required true
   * @default -
   * @description 列表数据
   */
  @property({
    attribute: false,
  })
  dataSource: CardItem[];

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示列表的左侧icon
   */
  @property({
    attribute: false,
  })
  showIcon = true;

  /**
   * @kind { useBrick: UseBrickConf }
   * @required false
   * @default -
   * @description 设置操作列，不设置就不显示
   */
  @property({
    attribute: false,
  })
  optionConf: { useBrick: UseBrickConf };

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
          <InfoDisplayCardList
            dataSource={this.dataSource}
            showIcon={this.showIcon}
            optionConf={this.optionConf}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.info-display-card-list",
  InfoDisplayCardListElement
);
