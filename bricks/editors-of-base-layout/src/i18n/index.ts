import i18next from "i18next";
import { NS_BASE_LAYOUT } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_BASE_LAYOUT, en);
i18next.addResourceBundle("zh", NS_BASE_LAYOUT, zh);
