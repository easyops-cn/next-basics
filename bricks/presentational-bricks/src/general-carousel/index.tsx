import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralCarousel, GeneralCarouselProps } from "./GeneralCarousel";
import { BrickEventsMap } from "@next-core/brick-types";

export interface CustomCompProps {
  brick: string | any;
  properties?: any;
  events?: BrickEventsMap;
}

/**
 * @id presentational-bricks.general-carousel
 * @name presentational-bricks.general-carousel
 * @docKind brick
 * @description 通用的轮播图
 * @author jo
 * @slots
 * @history
 * @memo
 * ### CustomCompProps
 * ```typescript
 * export interface CustomCompProps {
 *   brick: string;
 *   properties?: any;
 *   events?: BrickEventsMap;
 * }
 * ```
 * @noInheritDoc
 */
export class GeneralCarouselElement extends UpdatingElement {
  /**
   * @detail number
   * @description 传出当前所点击的轮播序列号
   */
  @event({ type: "general.carousel.click" })
  generalCarouselClick: EventEmitter<number>;

  /**
   * @kind UseBrickConf
   * @required false
   * @default -
   * @description 统一定义轮播图显示的内容, 相当于自定义构件
   */
  @property({
    attribute: false,
  })
  useBrick: GeneralCarouselProps["useBrick"];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否播放轮播图
   */
  @property({
    type: Boolean,
  })
  autoplay: boolean;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示面板指示点
   */
  @property({
    attribute: false,
  })
  dots = true;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示左右翻页按钮
   */
  @property({
    attribute: false,
  })
  arrows = true;

  /**
   * @kind  any[]
   * @required false
   * @default -
   * @description 配合useBrick使用，轮播图根据dataSource数组数量来决定轮播数量
   */
  @property({
    attribute: false,
  })
  dataSource: GeneralCarouselProps["dataSource"];
  /**
   * @kind any
   * @required false
   * @default -
   * @description 轮播样式
   */
  @property({
    attribute: false,
  })
  carouselStyle = {};

  /**
   * @kind number
   * @required false
   * @default 1
   * @description 一次轮播同时显示多少组内容，跟 slidesToScroll 搭配使用表示轮播一次同时显示 N 组件内容，滑动也是 N 组内容
   */
  @property({
    attribute: false,
  })
  slidesToShow = 1;

  /**
   * @kind number
   * @required false
   * @default 1
   * @description 一次切换多少组内容
   */
  @property({
    attribute: false,
  })
  slidesToScroll = 1;

  /**
   * @kind number
   * @required false
   * @default 500
   * @description 动效播放速度
   * @group advanced
   */
  @property({
    attribute: false,
  })
  speed = 500;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 鼠标移上去是否停止自动切换
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  pauseOnDotsHover: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 自适应轮播内容高度
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  adaptiveHeight: boolean;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 内容是否循环轮播
   * @group advanced
   */
  @property({
    attribute: false,
  })
  infinite = true;

  /**
   * @kind any[]
   * @required false
   * @default -
   * @description 相应式布局设置
   * @group advanced
   */
  @property({
    attribute: false,
  })
  responsive: any[];

  /**
   * @kind string
   * @required false
   * @default 暂无数据
   * @description 没有轮播内容时显示的提示语
   * @group advanced
   */
  @property({
    attribute: false,
  })
  noDataDesc: string;

  /**
   * @kind light | dark
   * @required false
   * @default light
   * @description 面板指示点的主题样式分为浅色和深色，浅色的图片对应深色的面板指示点样式
   * @group advanced
   */
  @property({
    attribute: false,
  })
  dotsTheme: GeneralCarouselProps["dotsTheme"] = "light";

  /**
   * @kind CustomCompProps|CustomCompProps[]
   * @required false
   * @default -
   * @deprecated
   * @description 定义轮播图显示的内容, 相当于自定义构件, 请使用 useBrick
   * @group advanced
   */
  @property({
    attribute: false,
  })
  components: GeneralCarouselProps["components"];

  connectedCallback(): void {
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  setComponent(value: GeneralCarouselProps["components"]): void {
    this.components = value;
    this._render();
  }

  handleClickEvent = (curSlide: number) => {
    this.generalCarouselClick.emit(curSlide);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralCarousel
            carouselStyle={this.carouselStyle}
            autoplay={this.autoplay}
            dots={this.dots}
            slidesToShow={this.slidesToShow}
            slidesToScroll={this.slidesToScroll}
            speed={this.speed}
            components={this.components}
            useBrick={this.useBrick}
            dataSource={this.dataSource}
            infinite={this.infinite}
            adaptiveHeight={this.adaptiveHeight}
            pauseOnDotsHover={this.pauseOnDotsHover}
            responsive={this.responsive}
            onHandleClick={this.handleClickEvent}
            noDataDesc={this.noDataDesc}
            arrows={this.arrows}
            dotsTheme={this.dotsTheme}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.general-carousel",
  GeneralCarouselElement
);
