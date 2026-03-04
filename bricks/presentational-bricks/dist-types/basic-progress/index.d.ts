export interface ColorObj {
  /**
   * 进度范围最大值，值（value）小于等于最大值则为该颜色
   */
  progress: string | number;
  /**
   * 颜色
   */
  color: Color;
}

export enum Color {
  green = "green",
  red = "red",
  blue = "blue",
  orange = "orange",
  cyan = "cyan",
  purple = "purple",
  geekblue = "geekblue",
  gray = "gray",
  slategray = "slategray",
  doderblue = "doderblue",
  royalblue = "royalblue",
  lightorange = "lightorange",
  goldenrod = "goldenrod",
  jewelryblue = "jewelryblue",
  orangered = "orangered",
  springgreen = "springgreen",
  mediumpurple = "mediumpurple",
  skyblue = "skyblue",
  yellowgreen = "yellowgreen",
  lightpurple = "lightpurple",
}

export interface BasicProgressProps {
  value?: number;
  type?: "line" | "circle" | "dashboard";
  text?: string;
  description?: string;
  textColor?: string;
  colorMap?: ColorObj[];
  fontSize?: string;
  configProps?: Record<string, any>;
}

export declare class BasicProgressElement extends HTMLElement {
  value: number | undefined;
  type: "line" | "circle" | "dashboard" | undefined;
  text: string | undefined;
  description: string | undefined;
  textColor: string | undefined;
  colorMap: ColorObj[] | undefined;
  fontSize: string | undefined;
  configProps: Record<string, any> | undefined;
}
