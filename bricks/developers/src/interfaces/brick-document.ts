import { StoryConf, Action, I18nData } from "@next-core/brick-types";

export interface TypeDescItem {
  type: string;
  /** 展示文案；纯代码等语言无关的内容可直接使用字符串 */
  description: I18nData | string;
}

export interface TypeExtendItem {
  type: string;
  url: string;
}

export interface DemoConf {
  previewConf: StoryConf | StoryConf[];
  description: {
    title: string;
    message?: string;
  };
  actions?: Action[];
}
