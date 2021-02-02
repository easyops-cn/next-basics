import i18next from "i18next";
import { NS_BASIC_BRICKS } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_BASIC_BRICKS, en);
i18next.addResourceBundle("zh", NS_BASIC_BRICKS, zh);
