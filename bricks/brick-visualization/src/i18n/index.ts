import i18next from "i18next";
import { NS_BRICK_VISUALIZATION } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_BRICK_VISUALIZATION, en);
i18next.addResourceBundle("zh", NS_BRICK_VISUALIZATION, zh);
