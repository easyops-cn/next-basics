import i18next from "i18next";
import { NS_GENERAL_AUTH } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_GENERAL_AUTH, en);
i18next.addResourceBundle("zh", NS_GENERAL_AUTH, zh);
