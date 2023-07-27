import React, { useCallback, useState } from "react";
import { compact } from "lodash";
import classNames from "classnames";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel, Empty } from "antd";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import style from "./index.module.css";
import { CustomCompProps } from "./index";

export interface GeneralCarouselProps {
  autoplay?: boolean;
  dots?: boolean;
  components: CustomCompProps | CustomCompProps[];
  carouselStyle?: React.CSSProperties;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  pauseOnDotsHover?: boolean;
  onHandleClick: (index: number) => void;
  infinite?: boolean;
  adaptiveHeight?: boolean;
  responsive?: any[];
  noDataDesc?: string;
  arrows?: boolean;
  dotsTheme?: "light" | "dark";
  useBrick: UseBrickConf;
  dataSource: any[];
  autoplaySpeed?: number;
  dotPosition?: "top" | "bottom" | "left" | "right";
  useLazyLoad?: boolean;
}

export function renderCustomComp(
  components: CustomCompProps[],
  slideClickCallback: (index: number) => void
) {
  return components.map((comp, index) => {
    return (
      <div
        key={index}
        className={style.customContainer}
        onClick={() => slideClickCallback(index)}
      >
        <BrickAsComponent useBrick={comp} />
      </div>
    );
  });
}
export function renderCustomBrick(
  useBrick: UseBrickConf,
  dataSource: any[],
  slideClickCallback: (index: number) => void
) {
  return dataSource.map((data, index) => {
    return (
      <div
        key={index}
        className={style.customContainer}
        onClick={() => slideClickCallback(index)}
      >
        <BrickAsComponent useBrick={useBrick} data={data}></BrickAsComponent>
      </div>
    );
  });
}

export function GeneralCarousel({
  speed,
  slidesToShow,
  slidesToScroll,
  autoplay,
  dots,
  components,
  carouselStyle,
  pauseOnDotsHover,
  adaptiveHeight,
  infinite,
  responsive,
  onHandleClick,
  noDataDesc,
  arrows,
  dotsTheme,
  useBrick,
  dataSource,
  autoplaySpeed,
  dotPosition,
  useLazyLoad,
}: GeneralCarouselProps): React.ReactElement {
  const comps = Array.isArray(components) ? components : compact([components]);
  const data = Array.isArray(dataSource) ? dataSource : compact([dataSource]);
  const setEleDisplay = useCallback((selector, display) => {
    const slickSlideEles = document.querySelectorAll(selector);
    slickSlideEles.forEach((ele) => {
      (ele.firstChild as HTMLElement).style.display = display;
    });
  }, []);
  const carousel = (
    <Carousel
      className={classNames({
        "carousel-dots-dark": dotsTheme === "dark",
      })}
      style={carouselStyle}
      autoplay={autoplay}
      dots={dots}
      speed={speed}
      autoplaySpeed={autoplaySpeed}
      slidesToShow={slidesToShow}
      slidesToScroll={slidesToScroll}
      pauseOnDotsHover={pauseOnDotsHover}
      arrows={arrows}
      infinite={infinite}
      adaptiveHeight={adaptiveHeight}
      responsive={responsive}
      prevArrow={<LeftOutlined />}
      nextArrow={<RightOutlined />}
      dotPosition={dotPosition}
      onInit={() =>
        useLazyLoad &&
        setEleDisplay(
          `.slick-slide:not([data-index="0"]):not([data-index="${data.length}"])`,
          "none"
        )
      }
      beforeChange={(currentSlide, nextSlide) =>
        useLazyLoad &&
        setEleDisplay(`.slick-slide[data-index="${nextSlide}"]`, "block")
      }
      afterChange={(currentSlide) =>
        useLazyLoad &&
        setEleDisplay(`.slick-slide[data-index="${--currentSlide}"]`, "none")
      }
    >
      {useBrick
        ? renderCustomBrick(useBrick, data, onHandleClick)
        : renderCustomComp(comps, onHandleClick)}
    </Carousel>
  );

  return (
    <div className={style.generalCarousel}>
      {useBrick ? (
        data.length !== 0 ? (
          carousel
        ) : (
          <Empty description={noDataDesc} />
        )
      ) : comps.length !== 0 ? (
        carousel
      ) : (
        <Empty description={noDataDesc} />
      )}
    </div>
  );
}
