import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@next-core/brick-kit";
import { EntryCardItem, Color } from "./EntryCardItem";
import { MenuIcon } from "@next-core/brick-types";
import { get, pick, forEach, set } from "lodash";
import { parseTemplate } from "@next-libs/cmdb-utils";

/**
 * @id presentational-bricks.entry-card-item
 * @name presentational-bricks.entry-card-item
 * @docKind brick
 * @description 可配置icon和title的卡片项
 * @author lynette
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class EntryCardItemElement extends UpdatingElement {
  /**
   * @kind Record<string, any>
   * @required true
   * @default -
   * @description 卡片信息数据源
   */
  @property({
    attribute: false,
  })
  dataSource: Record<string, any>;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片 title
   */
  @property()
  cardTitle: string;

  /**
   * @kind { cardTitle?: string; icon?:string;iconColor?:string; }
   * @required true
   * @default -
   * @description 字段映射, 跟 dataSource 一起使用来获得运行时 cardTitle、 icon、iconColor
   */
  @property({
    attribute: false,
  })
  fields: {
    cardTitle?: string;
    icon?: string;
    iconColor?: string;
  };

  /**
   * @kind MenuIcon
   * @required false
   * @default -
   * @description 卡片 icon
   */
  @property({
    attribute: false,
  })
  icon: MenuIcon;

  /**
   * @kind 'purple'/'red'/'softOrange'/'cyan'/'blue'/'darkPurple'/'lightCyan'/'brightOrange'
   * @required false
   * @default -
   * @description icon 颜色
   */
  @property()
  iconColor: Color;

  /**
   * @kind string
   * @required false
   * @default -
   * @description url target，如_blank
   */
  @property()
  target: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片跳转 url
   */
  @property()
  url: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 卡片跳转 url 模板，支持模版变量
   */
  @property()
  urlTemplate: string;

  /**
   * @required false
   * @default true
   * @description 是否用 Card 包裹
   */
  @property({
    attribute: false,
  })
  showCard = true;

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
      const mutableProps = {
        target: this.target,
        url: this.urlTemplate,
        cardTitle: this.cardTitle,
        icon: this.icon,
        iconColor: this.iconColor,
      };
      if (this.dataSource && this.urlTemplate) {
        mutableProps.url = parseTemplate(this.urlTemplate, this.dataSource);
      }
      if (this.fields && this.dataSource) {
        this.initData(mutableProps);
      }
      ReactDOM.render(
        <BrickWrapper>
          <EntryCardItem
            cardTitle={mutableProps.cardTitle}
            icon={mutableProps.icon}
            iconColor={mutableProps.iconColor}
            target={mutableProps.target}
            url={this.url || mutableProps.url}
            showCard={this.showCard}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  private initData(mutableProps: {
    cardTitle: string;
    icon: MenuIcon;
    iconColor: Color;
  }): void {
    const pickFields = pick(this.fields, ["cardTitle", "icon", "iconColor"]);
    forEach(pickFields, (fieldKey, field: string) => {
      set(mutableProps, field, get(this.dataSource, fieldKey));
    });
  }
}

customElements.define(
  "presentational-bricks.entry-card-item",
  EntryCardItemElement
);
