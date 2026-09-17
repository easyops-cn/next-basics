import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { InfoDisplayCardList } from "./InfoDisplayCardList";
import { MenuIcon } from "@next-core/brick-types";
import { UseBrickConf } from "@next-core/brick-types";


export interface InfoDisplayCardListElementProps {
  dataSource?: CardItem[];
  urlTemplate?: string;
  url?: string;
  target?: string;
  optionConf?: { useBrick: UseBrickConf };
  titleBrickConf?: { useBrick: UseBrickConf };
  iconBrickConf?: { useBrick: UseBrickConf };
  detailOfDescBrickConf?: { useBrick: UseBrickConf };
  titleFontSize?: number | string;
  detailDescFontSize?: number | string;
  listStyle?: React.CSSProperties;
}

export interface CardDetail {
  title: string;
  desc: string;
  width?: string | number;
  useBrick?: boolean;
  detailBrickConf?: { useBrick: UseBrickConf };
}

export interface CardItem {
  title: string;
  desc: string;
  icon?: MenuIcon;
  detail?: CardDetail[];
  operateItemBrick?: { useBrick: UseBrickConf };
}

/**
 * @id presentational-bricks.info-display-card-list
 * @author dophijing
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.info-display-card-list`
 * @docKind brick
 * @noInheritDoc
 */
export class InfoDisplayCardListElement extends UpdatingElement implements InfoDisplayCardListElementProps {
  /**
   * @kind CardItem[]
   * @required true
   * @default -
   * @description 列表数据
   * @description.en List data
   */
  @property({
    attribute: false,
  })
  dataSource: CardItem[];

  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片跳转 url，支持模版变量
   * @description.en Card redirect url, supporting template variables
   */
  @property()
  urlTemplate: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片跳转 url， url 优先于 urlTemplate 执行
   * @description.en Card redirect url; url takes precedence over urlTemplate
   */
  @property()
  url: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片跳转 target，例如可以设置成 _blank
   * @description.en Card redirect target, for example it can be set to _blank
   */
  @property()
  target: string;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示列表的左侧icon
   * @description.en Whether to display the icon on the left side of the list
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
   * @description.en Sets the operation column; not displayed if not set
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
   * @description.en Sets titleBrick; not displayed if not set
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
   * @description.en Sets iconBrick; not displayed if not set
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
   * @description.en Sets detailOfDescBrickConf; displayed as plain text if not set
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
   * @description.en Sets the font size of the card title, default 16px
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
   * @description.en Sets the font size of the desc part on the right side of the card, default 18px
   */
  @property({
    attribute: false,
  })
  detailDescFontSize: number | string;

  /**
   * @kind React.CSSProperties
   * @required false
   * @default false
   * @description list样式
   * @description.en list style
   */
  @property({
    attribute: false,
  })
  listStyle: React.CSSProperties;

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
            url={this.url}
            urlTemplate={this.urlTemplate}
            target={this.target}
            listStyle={this.listStyle}
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
