import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { InfoDisplayCardList } from "./InfoDisplayCardList";
import { MenuIcon } from "@next-core/brick-types";
import { UseBrickConf } from "@next-core/brick-types";

export interface CardDetail {
  title: string;
  desc: string;
  useBrick?: boolean;
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

  /**
   * @kind { useBrick: UseBrickConf }
   * @required false
   * @default -
   * @description 设置titleBrick，不设置就不显示
   */
  @property({
    attribute: false,
  })
  titleBrickConf: { useBrick: UseBrickConf };

  /**
   * @kind { useBrick: UseBrickConf }
   * @required false
   * @default -
   * @description 设置iconBrick，不设置就不显示
   */
  @property({
    attribute: false,
  })
  iconBrickConf: { useBrick: UseBrickConf };

  /**
   * @kind { useBrick: UseBrickConf }
   * @required false
   * @default -
   * @description 设置detailOfDescBrickConf，不设置显示为纯文本
   */
  @property({
    attribute: false,
  })
  detailOfDescBrickConf: { useBrick: UseBrickConf };

  /**
   * @kind { useBrick: UseBrickConf }
   * @required false
   * @default 16px
   * @description 设置卡片 title 的字体大小，默认为 16px
   */
  @property({
    attribute: false,
  })
  titleFontSize: number | string;

  /**
   * @kind { useBrick: UseBrickConf }
   * @required false
   * @default 18px
   * @description 设置卡片右侧描述部分 desc 的字体大小，默认为18px
   */
  @property({
    attribute: false,
  })
  detailDescFontSize: number | string;

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
            titleBrickConf={this.titleBrickConf}
            iconBrickConf={this.iconBrickConf}
            detailOfDescBrickConf={this.detailOfDescBrickConf}
            titleFontSize={this.titleFontSize}
            detailDescFontSize={this.detailDescFontSize}
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
