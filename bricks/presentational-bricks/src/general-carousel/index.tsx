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


export interface GeneralCarouselElementProps {
  useBrick?: GeneralCarouselProps["useBrick"];
  autoplay?: boolean;
  dataSource?: GeneralCarouselProps["dataSource"];
  pauseOnDotsHover?: boolean;
  adaptiveHeight?: boolean;
  responsive?: any[];
  noDataDesc?: string;
  dotsTheme?: GeneralCarouselProps["dotsTheme"] ;
  dotPosition?: "top" | "bottom" | "left" | "right" ;
  components?: GeneralCarouselProps["components"];
  useLazyLoad?: boolean;
}

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
 * @description.en General carousel
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
export class GeneralCarouselElement extends UpdatingElement implements GeneralCarouselElementProps {
  /**
   * @detail number
   * @description 传出当前所点击的轮播序列号
   * @description.en Output the sequence number of the currently clicked carousel item
   */
  @event({ type: "general.carousel.click" })
  generalCarouselClick: EventEmitter<number>;

  /**
   * @kind UseBrickConf
   * @required false
   * @default -
   * @description 统一定义轮播图显示的内容, 相当于自定义构件
   * @description.en Uniformly define the content displayed by the carousel, equivalent to a custom brick
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
   * @description.en Whether to play the carousel
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
   * @description.en Whether to show the panel dots
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
   * @description.en Whether to show the left and right page-turning buttons
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
   * @description.en Used together with useBrick; the number of carousel items is determined by the length of the dataSource array
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
   * @description.en Carousel style
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
   * @description.en How many groups of content are displayed at the same time in one carousel; used together with slidesToScroll, it means N groups of content are displayed at the same time in one carousel and N groups of content are scrolled as well
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
   * @description.en How many groups of content are switched at a time
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
   * @description.en Animation playback speed
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
   * @description.en Whether to stop autoplay when the mouse hovers over it
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
   * @description.en Adapt the height of the carousel content automatically
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
   * @description.en Whether the content is looped
   * @group advanced
   */
  @property({
    attribute: false,
  })
  infinite = true;

  /**
   * @kind number
   * @required false
   * @default 3000
   * @description 自定义轮播项的停留时间
   * @description.en Dwell time of custom carousel items
   * @group advanced
   */
  @property({
    attribute: false,
  })
  autoplaySpeed = 3000;

  /**
   * @kind any[]
   * @required false
   * @default -
   * @description 相应式布局设置
   * @description.en Responsive layout settings
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
   * @description.en Hint text displayed when there is no carousel content
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
   * @description.en The theme style of the panel dots is divided into light and dark; light images correspond to the dark panel dot style
   * @group advanced
   */
  @property({
    attribute: false,
  })
  dotsTheme: GeneralCarouselProps["dotsTheme"] = "light";

  /**
   * @kind top | bottom | left | right
   * @required false
   * @default bottom
   * @description 面板指示点的位置,走马灯的滑动方向，“top、bottom"为从左至右，“left 、right”为从上至下
   * @description.en Position of the panel dots, the sliding direction of the carousel; "top, bottom" is from left to right, "left, right" is from top to bottom
   * @group advanced
   */
  @property({ attribute: false })
  dotPosition: "top" | "bottom" | "left" | "right" = "bottom";

  /**
   * @kind CustomCompProps|CustomCompProps[]
   * @required false
   * @default -
   * @deprecated
   * @description 定义轮播图显示的内容, 相当于自定义构件, 请使用 useBrick
   * @description.en Define the content displayed by the carousel, equivalent to a custom brick, please use useBrick
   * @group advanced
   */
  @property({
    attribute: false,
  })
  components: GeneralCarouselProps["components"];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 幻灯片懒加载（目前保持渲染首尾以及当前的幻灯片）
   * @description.en Slide lazy loading (currently the first, the last and the current slides are kept rendered)
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  useLazyLoad: boolean;

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
            autoplaySpeed={this.autoplaySpeed}
            dotPosition={this.dotPosition}
            useLazyLoad={this.useLazyLoad}
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
