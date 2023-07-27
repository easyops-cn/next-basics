import i18next from "i18next";
import { NS_TIME } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_TIME, en);
i18next.addResourceBundle("zh", NS_TIME, zh);
