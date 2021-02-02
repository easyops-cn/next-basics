import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { BrickTimeline, BrickTimelineProps, ItemProps } from "./BrickTimeline";
import { UseBrickConf } from "@next-core/brick-types";

export type StatusColor = "green" | "red" | "gray" | "blue";

export interface TimelineItem {
  title: string;
  description: string;
  time: string | number;
  status: string;
  link: string;
}

/**
 * @id presentational-bricks.brick-timeline
 * @name presentational-bricks.brick-timeline
 * @docKind brick
 * @description 垂直展示的时间流信息，常用于变更历史、工作动态等
 * @author jo
 * @slots
 * @history
 * @memo
 * ## useBrick
 *
 * 自定义展示子构件时，子构件收到的数据格式为：
 *
 * ```js
 * export interface Data {
 *   item: object; // 单项数据
 *   index: number; // 序号
 *   list: object[]; // 所有数据
 * }
 * ```
 *
 * ## StatusColor
 * ```js
 * // 根据时间轴UI规范不同颜色代表不同的状态，通常绿色表示已完成或者成功状态的，红色表示告警或者错误状态，蓝色表示正在进行的当前状态，灰色表示普通状态
 * export type StatusColor = "green" | "red" | "gray" | "blue";
 * ```
 *
 * ## TimelineItem
 * ```js
 * export interface TimelineItem {
 *   title: string;
 *   description: string;
 *   time: string | number;
 *   status: string;
 *   link?: string;
 *   [key: string]: any
 * }
 * ```
 * @noInheritDoc
 */
export class BrickTimelineElement extends UpdatingElement {
  /**
   * @kind TimelineItem[]|Record<string, any>[]
   * @required true
   * @default -
   * @description 数据源
   */
  @property({
    attribute: false,
  })
  itemList: BrickTimelineProps["itemList"];

  /**
   * @kind [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf)
   * @required true
   * @default -
   * @description 自定义构件
   */
  @property({
    attribute: false,
  })
  useBrick: UseBrickConf;

  /**
   * @kind Record<string, StatusColor>
   * @required false
   * @default -
   * @description 根据数据源状态值映射到相应的颜色
   */
  @property({
    attribute: false,
  })
  statusMap: BrickTimelineProps["statusMap"];

  /**
   * @kind base | extension
   * @required false
   * @default base
   * @description 平台内置的标准时间轴类型，支持内置的基本类型和内置的扩展类型，不使用 `useBrick` 配置第三方构件时，该字段才有效
   */
  @property({
    attribute: false,
  })
  type: BrickTimelineProps["type"] = "base";

  /**
   * @kind second | default
   * @required false
   * @default default
   * @description 时间轴时间的具体配置，值为`default`时可以是格式化的字符串 `date` 对象或者毫秒级的时间戳等
   */
  @property({
    attribute: false,
  })
  timeType: BrickTimelineProps["timeType"] = "default";

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示 card 边框
   */
  @property({
    attribute: false,
  })
  showCard = true;

  /**
   * @kind left | right | alternate
   * @required false
   * @default left
   * @description 时间轴和内容的相对位置，注意内置的标准时间轴类型不支持该字段的配置，只有使用 `useBrick` 配置第三方构件时可用
   */
  @property()
  mode: BrickTimelineProps["mode"];

  /**
   * @detail Record<string, any>
   * @description 标题点击事件，事件详情为所对应的该项的数据(当配置该点击事件时，不要再配置 `TimelineItem` 中的跳转链接 `link` 属性，否则该点击事件无效会优先响应url跳转)
   */
  @event({ type: "item.click" }) clickEvent: EventEmitter<ItemProps>;
  private _handleClick = (data: ItemProps) => {
    this.clickEvent.emit(data);
  };

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
          <BrickTimeline
            itemList={this.itemList}
            useBrick={this.useBrick}
            showCard={this.showCard}
            statusMap={this.statusMap}
            type={this.type}
            timeType={this.timeType}
            mode={this.mode}
            onClick={this._handleClick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.brick-timeline",
  BrickTimelineElement
);
