import type React from "react";
import type { UseBrickConf } from "@next-core/brick-types";
import type { BrickEventsMap } from "@next-core/brick-types";

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

export interface CustomCompProps {
  brick: string | any;
  properties?: any;
  events?: BrickEventsMap;
}

export interface GeneralCarouselPropsInterface {
  useBrick?: GeneralCarouselProps["useBrick"];
  autoplay?: boolean;
  dots?: boolean;
  arrows?: boolean;
  dataSource?: GeneralCarouselProps["dataSource"];
  carouselStyle?: Record<string, any>;
  slidesToShow?: number;
  slidesToScroll?: number;
  speed?: number;
  pauseOnDotsHover?: boolean;
  adaptiveHeight?: boolean;
  infinite?: boolean;
  autoplaySpeed?: number;
  responsive?: any[];
  noDataDesc?: string;
  dotsTheme?: GeneralCarouselProps["dotsTheme"];
  dotPosition?: "top" | "bottom" | "left" | "right";
  components?: GeneralCarouselProps["components"];
  useLazyLoad?: boolean;
}

export interface GeneralCarouselEvents {
  "general.carousel.click": CustomEvent<number>;
}

export interface GeneralCarouselEventsMap {
  onGeneralCarouselClick: "general.carousel.click";
}

export declare class GeneralCarouselElement extends HTMLElement {
  useBrick: GeneralCarouselProps["useBrick"] | undefined;
  autoplay: boolean | undefined;
  dots: boolean | undefined;
  arrows: boolean | undefined;
  dataSource: GeneralCarouselProps["dataSource"] | undefined;
  carouselStyle: Record<string, any> | undefined;
  slidesToShow: number | undefined;
  slidesToScroll: number | undefined;
  speed: number | undefined;
  pauseOnDotsHover: boolean | undefined;
  adaptiveHeight: boolean | undefined;
  infinite: boolean | undefined;
  autoplaySpeed: number | undefined;
  responsive: any[] | undefined;
  noDataDesc: string | undefined;
  dotsTheme: GeneralCarouselProps["dotsTheme"] | undefined;
  dotPosition: "top" | "bottom" | "left" | "right" | undefined;
  components: GeneralCarouselProps["components"] | undefined;
  useLazyLoad: boolean | undefined;
}
