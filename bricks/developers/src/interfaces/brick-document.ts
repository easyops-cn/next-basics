import { StoryConf, Action } from "@next-core/brick-types";

export interface TypeDescItem {
  type: string;
  description: string;
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
