import i18next from "i18next";
import { NS_DEVELOPERS } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_DEVELOPERS, en);
i18next.addResourceBundle("zh", NS_DEVELOPERS, zh);
