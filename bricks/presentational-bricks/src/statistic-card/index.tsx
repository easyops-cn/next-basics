import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { MenuIcon } from "@next-core/brick-types";
import { StatisticCard, IconType } from "./StatisticCard";
import { parseTemplate } from "@next-libs/cmdb-utils";
import { pick, forEach, set, get } from "lodash";

/**
 * @id presentational-bricks.statistic-card
 * @name presentational-bricks.statistic-card
 * @docKind brick
 * @description 展示统计数据的卡片，一般在首页使用
 * @author william
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class StatisticCardElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 标题
   */
  @property() cardTitle: string;

  /**
   * @kind string | number
   * @required false
   * @default -
   * @description 数值
   */
  @property({ attribute: false }) value: string | number;

  /**
   * @kind string
   * @required false
   * @default -
   * @description [已废弃]请使用 icon 代替
   */
  @property() iconType: string;

  /**
   * @kind [MenuIcon](http://docs.developers.easyops.cn/docs/brick-next/icon)
   * @required false
   * @default -
   * @description 图标配置
   */
  @property({ attribute: false }) icon: MenuIcon | string;

  /**
   * @kind Record<string, any>
   * @required false
   * @default -
   * @description [已废弃]数据来源
   */
  @property({ attribute: false }) dataSource: Record<string, any>;

  /**
   * @kind {icon?: string; disabled?: string;tip?: string;url?: string;cardTitle?: string;value?: string;}
   * @required false
   * @default -
   * @description [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时对应字段
   */
  @property({ attribute: false }) fields: {
    icon?: string;
    disabled?: string;
    tip?: string;
    url?: string;
    cardTitle?: string;
    value?: string;
  };

  /**
   * @kind string
   * @required false
   * @default -
   * @description 点击跳转的 url
   */
  @property() url: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description [已废弃]点击跳转 url，支持模版变量
   */
  @property() urlTemplate: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 鼠标悬浮的提示
   */
  @property() tip: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 禁用状态
   */
  @property({ type: Boolean }) disabled: boolean;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否用 Card 包裹
   */
  @property({ attribute: false }) showCard = true;

  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    if (this.iconType) {
      // eslint-disable-next-line
      console.warn(
        "The property `iconType` will be deprecated,replace it with `icon:MenuIcon`."
      );
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
        url: this.url,
        tip: this.tip,
        disabled: this.disabled,
        icon: this.icon,
        cardTitle: this.cardTitle,
        value: this.value,
      };
      if (this.dataSource && this.urlTemplate) {
        mutableProps.url = parseTemplate(this.urlTemplate, this.dataSource);
      }
      if (this.fields && this.dataSource) {
        this.initData(mutableProps);
      }
      ReactDOM.render(
        <BrickWrapper>
          <StatisticCard
            title={mutableProps.cardTitle}
            value={mutableProps.value}
            iconType={this.iconType as IconType}
            icon={mutableProps.icon}
            url={mutableProps.url}
            tip={mutableProps.tip}
            disabled={mutableProps.disabled}
            showCard={this.showCard}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  private initData(mutableProps: {
    url: string;
    tip: string;
    disabled: boolean;
    icon: MenuIcon | string;
    cardTitle: string;
    value: string | number;
  }): void {
    const pickFields = pick(this.fields, [
      "url",
      "tip",
      "disabled",
      "icon",
      "cardTitle",
      "value",
    ]);
    forEach(pickFields, (fieldKey, field: string) => {
      set(mutableProps, field, get(this.dataSource, fieldKey));
    });
  }
}

customElements.define(
  "presentational-bricks.statistic-card",
  StatisticCardElement
);
