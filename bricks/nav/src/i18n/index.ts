import i18next from "i18next";
import { NS_NAV } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_NAV, en);
i18next.addResourceBundle("zh", NS_NAV, zh);
