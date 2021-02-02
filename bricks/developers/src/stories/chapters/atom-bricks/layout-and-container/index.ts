import { Chapter } from "../../../interfaces";
import { story as IndexCard } from "./index-card";
import { story as MicroApp } from "./micro-app";
import { story as carouselTemplate } from "./carousel-template";
import { story as advanceListContainer } from "./advance-list-container";

export const chapter: Chapter = {
  category: "layout",
  title: {
    en: "layout",
    zh: "布局与容器",
  },
  stories: [carouselTemplate, IndexCard, MicroApp, advanceListContainer],
};
